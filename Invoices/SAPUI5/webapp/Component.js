// @ts-nocheck
sap.ui.define([
    "sap/ui/core/UIComponent",
<<<<<<< HEAD
    "ns/SAPUI5/model/Models",
    "sap/ui/model/resource/ResourceModel"
=======
    "./model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog"
>>>>>>> 05 Estructura Proyectos SAPUI5 05
],
    /**
     * 
     * @param {typeof sap.ui.core.UIComponent} UIComponent 
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel 
     */
<<<<<<< HEAD
    function (UIComponent, Models, ResourceModel) {
=======
    function (UIComponent, Models, ResourceModel, HelloDialog) {
>>>>>>> 05 Estructura Proyectos SAPUI5 05

        return UIComponent.extend("ns.SAPUI5.Component", {

            metadata: {
                manifest : "json"
            },

            init: function () {
                //Call The init function of the parent
                UIComponent.prototype.init.apply(this, arguments);

                // set data model on the view
                this.setModel(Models.createRecipient());

                //set i18n model on the view
                var i18nModel = new ResourceModel({ bundleName: "ns.SAPUI5.i18n.i18n" });
                this.setModel(i18nModel, "i18n");
<<<<<<< HEAD
=======

                this._helloDialog = new HelloDialog(this.getRootControl());
            },

            exit: function(){
                this._helloDialog.destroy();
                delete this._helloDialog;
            },

            openHelloDialog: function(){
                this._helloDialog.open();
>>>>>>> 05 Estructura Proyectos SAPUI5 05
            }

        });
    });