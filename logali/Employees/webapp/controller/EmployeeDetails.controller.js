// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "ns/Employees/model/formatter"
], function (Controller, formatter) {

    function onInit() {
        this._bus = sap.ui.getCore().getEventBus();
    };

    function onCreateIncidence() {
        var tableIncidence = this.getView().byId("tableIncidence");
        var newIncidence = sap.ui.xmlfragment("ns.Employees.fragment.NewIncidence", this);
        var incidenceModel = this.getView().getModel("incidenceModel");
        var odata = incidenceModel.getData();
        var index = odata.length;
        odata.push({ index: index + 1 });
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/" + index);
        tableIncidence.addContent(newIncidence);
    };

    function onDeleteIncidence(oEvent){
        var oContext = oEvent.getSource().getBindingContext("incidenceModel").getObject();
        this._bus.publish("incidence", "onDeleteIncidence", { 
            IncidenceId: oContext.IncidenceId,
            SapId: oContext.SapId,
            EmployeeId: oContext.EmployeeId
        } );
    };

    function onSaveIncidence(oEvent){
        var incidence = oEvent.getSource().getParent().getParent();
        var incidenceRow = incidence.getBindingContext("incidenceModel");        
        this._bus.publish("incidence", "onSaveIncidence", { incidenceRow : incidenceRow.sPath.replace('/','') } );
    };

    function updateIncidenteCreationDate(oEvent){
        var context = oEvent.getSource().getBindingContext("incidenceModel");
        var oContext = context.getObject();
        oContext.CreationDateX = true;
    };

    function updateIncidenteReason(oEvent){
        var context = oEvent.getSource().getBindingContext("incidenceModel");
        var oContext = context.getObject();
        oContext.ReasonX = true;
    };

    function updateIncidenceType(oEvent){
        var context = oEvent.getSource().getBindingContext("incidenceModel");
        var oContext = context.getObject();
        oContext.TypeX = true;
    }    

    var EmployeeDetails = Controller.extend("ns.Employees.controller.EmployeeDetails", {});

    EmployeeDetails.prototype.onInit = onInit;
    EmployeeDetails.prototype.onCreateIncidence = onCreateIncidence;
    EmployeeDetails.prototype.onDeleteIncidence = onDeleteIncidence;
    EmployeeDetails.prototype.Formatter = formatter;
    EmployeeDetails.prototype.onSaveIncidence = onSaveIncidence;
    EmployeeDetails.prototype.updateIncidenteCreationDate = updateIncidenteCreationDate;
    EmployeeDetails.prototype.updateIncidenteReason = updateIncidenteReason;
    EmployeeDetails.prototype.updateIncidenceType = updateIncidenceType;


    return EmployeeDetails;
});
