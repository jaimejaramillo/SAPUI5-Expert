// @ts-nocheck
sap.ui.define([
<<<<<<< HEAD
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
=======
    "sap/ui/core/mvc/Controller"
>>>>>>> 05 Estructura Proyectos SAPUI5 05
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.m.MessageToast} MessageToast 
     */
<<<<<<< HEAD
    function (Controller, MessageToast, Models, ResourceModel) {
=======
    function (Controller) {
>>>>>>> 05 Estructura Proyectos SAPUI5 05
        "use strict";

        return Controller.extend("ns.SAPUI5.controller.App", {

            onInit: function () {

<<<<<<< HEAD
=======
            },
            onOpenDialogHeader: function(){
                 this.getOwnerComponent().openHelloDialog();
>>>>>>> 05 Estructura Proyectos SAPUI5 05
            }

        });

    });