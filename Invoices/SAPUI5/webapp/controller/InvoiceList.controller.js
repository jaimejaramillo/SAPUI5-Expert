//@ts-nocheck
<<<<<<< HEAD
/* eslint-disable no-undef */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
=======
/* eslint-env es6 */
/* eslint-disable no-console */
/* eslint-disable no-undef */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/InvoicesFormatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
>>>>>>> 05 Estructura Proyectos SAPUI5 05
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
<<<<<<< HEAD
     */
    function (Controller, JSONModel) {
        return Controller.extend("ns.SAPUI5.controller.InvoiceList", {

            onInit: function(){
=======
     * @param {typeof sap.ui.model.Filter} Filter 
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator 
     */
    function (Controller, JSONModel, InvoicesFormatter, Filter, FilterOperator) {
        return Controller.extend("ns.SAPUI5.controller.InvoiceList", {

            iFormatter: InvoicesFormatter,

            onInit: function () {
>>>>>>> 05 Estructura Proyectos SAPUI5 05
                var oViewModel = new JSONModel({
                    usd: "USD",
                    eur: "EUR"
                });
                this.getView().setModel(oViewModel, "currency");
<<<<<<< HEAD
            }
=======
            },

            onFilterInvoices: function (oEvent) {
                
                const aFilter = [];
                const sQuery = oEvent.getParameter("query");

                if (sQuery){
                    aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery))
                };
                const oList = this.getView().byId("invoiceList");
                const oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            }

>>>>>>> 05 Estructura Proyectos SAPUI5 05
        })
    })