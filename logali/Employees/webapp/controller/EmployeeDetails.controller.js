// @ts-nocheck
sap.ui.define([
    "ns/Employees/controller/Base.controller",
    "ns/Employees/model/formatter",
    "sap/m/MessageBox"
], function (Base, formatter, MessageBox) {

    function onInit() {
        this._bus = sap.ui.getCore().getEventBus();
    };

    function onCreateIncidence() {
        var tableIncidence = this.getView().byId("tableIncidence");
        var newIncidence = sap.ui.xmlfragment("ns.Employees.fragment.NewIncidence", this);
        var incidenceModel = this.getView().getModel("incidenceModel");
        var odata = incidenceModel.getData();
        var index = odata.length;
        odata.push({ index: index + 1, _ValidateDate: false, EnableSave: false });
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/" + index);
        tableIncidence.addContent(newIncidence);
    };

    function onDeleteIncidence(oEvent) {
        let oContext = oEvent.getSource().getBindingContext("incidenceModel").getObject();

        MessageBox.confirm(this.getView().getModel("i18n").getResourceBundle().getText("confirmDeleteIncidence"), {
            onClose: function (oAction) {

                if (oAction === "OK") {

                    this._bus.publish("incidence", "onDeleteIncidence", {
                        IncidenceId: oContext.IncidenceId,
                        SapId: oContext.SapId,
                        EmployeeId: oContext.EmployeeId
                    });
                }
            }.bind(this)
        });
    };

    function onSaveIncidence(oEvent) {
        var incidence = oEvent.getSource().getParent().getParent();
        var incidenceRow = incidence.getBindingContext("incidenceModel");
        this._bus.publish("incidence", "onSaveIncidence", { incidenceRow: incidenceRow.sPath.replace('/', '') });
    };

    function updateIncidenceCreationDate(oEvent) {
        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let oContext = context.getObject();
        let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

        if (!oEvent.getSource().isValidValue()) {
            oContext._ValidateDate = false;
            oContext.CreationDateState = "Error";
            MessageBox.error(oResourceBundle.getText("errorCreationDateValue"), {
                title: "Error",
                onClosed: null,
                styleClass: "",
                actions: MessageBox.Action.Close,
                emphasizeAction: null,
                initialFocus: null,
                textDirection: sap.ui.core.TextDirection.Inherit
            });
        } else {
            oContext.CreationDateX = true;
            oContext._ValidateDate = true;
            oContext.CreationDateState = "None";
        };

        if (oEvent.getSource().isValidValue() && oContext.Reason) {
            oContext.EnableSave = true;
        } else {
            oContext.EnableSave = false;
        }
        context.getModel().refresh();

    };

    function updateIncidenceReason(oEvent) {
        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let oContext = context.getObject();

        if (oEvent.getSource().getValue()) {
            oContext.ReasonX = true;
            oContext.ReasonState = "None";
            oContext.EnableSave = true;
        } else {
            oContext.ReasonState = "Error";
            oContext.EnableSave = false;
        };

        if (oContext._ValidateDate && oEvent.getSource().getValue()) {
            oContext.EnableSave = true;
        } else {
            oContext.EnableSave = false;
        }

    };

    function updateIncidenceType(oEvent) {
        let context = oEvent.getSource().getBindingContext("incidenceModel");
        let oContext = context.getObject();
        oContext.TypeX = true;

        if (oContext._ValidateDate && oContext.Reason) {
            oContext.EnableSave = true;
        } else {
            oContext.EnableSave = false;
        }

    };

    var EmployeeDetails = Base.extend("ns.Employees.controller.EmployeeDetails", {});

    EmployeeDetails.prototype.onInit = onInit;
    EmployeeDetails.prototype.onCreateIncidence = onCreateIncidence;
    EmployeeDetails.prototype.onDeleteIncidence = onDeleteIncidence;
    EmployeeDetails.prototype.Formatter = formatter;
    EmployeeDetails.prototype.onSaveIncidence = onSaveIncidence;
    EmployeeDetails.prototype.updateIncidenceCreationDate = updateIncidenceCreationDate;
    EmployeeDetails.prototype.updateIncidenceReason = updateIncidenceReason;
    EmployeeDetails.prototype.updateIncidenceType = updateIncidenceType;

    return EmployeeDetails;
});
