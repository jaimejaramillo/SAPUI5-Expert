/* eslint-disable no-undef */
/* eslint-env es6 */
/* eslint-disable no-console */
//@ts-nocheck
sap.ui.define([

],

    function () {

        return {
            invoiceStatus: function (sStatus) {

                const resourceBundle = this.getView().getModel("i18n").getResourceBundle();

                switch (sStatus) {
                    case 'A': return resourceBundle.getText("invoiceStatusA");
                    case 'B': return resourceBundle.getText("invoiceStatusB");
                    case 'C': return resourceBundle.getText("invoiceStatusC");
                    default: return sStatus;
                }
            }
        }

    });