//@ts-nocheck
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],
    /**
     * 
     * @param{ typeof sap.ui.core.util.MockServer } MockServer 
     * @param{ typeof sap.ui.model.json.JSONModel } JSONModel 
     * @param{ typeof sap.base.util.UriParameters } UriParameters 
     * @param{ typeof sap.base.Log } Log 
     */
    function (MockServer, JSONModel, UriParameters, Log) {
        "use strict";
        var oMockServer,
            _sAppPath = "ns/SAPUI5/",
            _sJsonFilePath = _sAppPath + "localService/mockdata";

        var oMockServerInterface = {
            /**
             * Initializes the mock server asynchronously
             * @protected
             * @param {object} oOptionsParameter
             * @returns {Promise} a promise that is resolved when mock server has been started
             */
            init: function (oOptionsParameter) {
                var oOptions = oOptionsParameter || {};

                return new Promise(function (fnResolve, fnReject) {
                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function () {
                        var oUriParameters = new UriParameters(window.Location.href);

                        //parse manifest for local metadata URI
                        var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilePath);
                        var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                        var sMatadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

                        //ensure ther is a trailling slash
                        var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                        //create a mock servcer instance or stop the existing one to reinitialize
                        if (!oMockServer) {
                            oMockServer = new MockServer({
                                rootUri: sMockServerUrl
                            });
                        } else {
                            oMockServer.stop();
                        };

                        //Configure mock server with the given options or a default delay of 0.5s
                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptions.delay || oUriParameters.get("severDelay") || 500)
                        });

                        //simulate all request using mock data
                        oMockServer.simulate(sMatadataUrl, {
                            sMockDataBaseUrl: sJsonFilesUrl,
                            bGenerateMissingMockData: true
                        });

                        var aRequest = oMockServer.getRequests();

                        //compose an error response for each request
                        var fnResponse = function (iErrorCode, sMessage, aRequest) {
                            aRequest.response = function (oXhr) {
                                oXhr.response(iErrorCode, { "Content-Type": "text/plain;charset=utf-8" }, sMessage);
                            };
                        };

                        //Simulate metadata errors
                        if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                            aRequest.forEach(function (aEntry) {
                                if (aEntry.path.toString.indexof("$metadata") > -1) {
                                    fnResponse(500, "metadata Error", aEntry);
                                };
                            });
                        };

                        //Simulate request errors 
                        var sErrorParam = Option.errorType || oUriParameters.get("errorType");
                        var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                        if (sErrorParam) {
                            aRequest.forEach(function (aEntry) {
                                fnResponse(iErrorCode, sErrorParam, aEntry);
                            });
                        };

                        // set request and start the server
                        oMockServer.setRequests(aRequest);
                        oMockServer.start();
                        Log.info("Runing the app with mock data");
                        fnResolve();


                    });
                    oManifestModel.attachRequestFailed(function () {
                        var sError = "Faild to load the application manifest";
                        Log.error(sError);
                        fnReject(new Error(sError));
                    });
                });

            }

        };
        return oMockServerInterface;
    });