// @ts-nocheck
/* eslint-disable no-undef */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.m.MessageToast} MessageToast 
     */
    function (Controller, MessageToast) {
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
                this.getOwnerComponent().openHelloDialog();
            }
            
        });

    });