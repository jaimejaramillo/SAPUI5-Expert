// @ts-nocheck
<<<<<<< HEAD
//ts-nocheck
/* eslint-disable no-undef */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
=======
/* eslint-disable no-undef */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

>>>>>>> 05 Estructura Proyectos SAPUI5 05
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.m.MessageToast} MessageToast 
<<<<<<< HEAD
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel 
     * @param {typeof sap.ui.core.Fragment} Fragment
     */
    function (Controller, MessageToast, Fragment) {
=======
     */
    function (Controller, MessageToast) {
>>>>>>> 05 Estructura Proyectos SAPUI5 05
        "use strict";

        return Controller.extend("ns.SAPUI5.controller.HelloPanel", {

            onInit: function () {

            },

            onShowHello: function () {
                //read text from i18n
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMessage", [sRecipient]);
                MessageToast.show(sMsg);
            },

            onOpenDialog: function () {
<<<<<<< HEAD

                const oView = this.getView();

                if (!this.byId("helloDialog")) {
                    Fragment.load({
                        id: oView.getId(),
                        name: "ns.SAPUI5.view.HelloDialog",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else {
                    this.byId("helloDialog").open();
                }
            },
            onCloseDialog: function () {
                this.byId("helloDialog").close();
            }
=======
                this.getOwnerComponent().openHelloDialog();
            }
            
>>>>>>> 05 Estructura Proyectos SAPUI5 05
        });

    });