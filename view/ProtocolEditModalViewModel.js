
Ext.define('taskBoard.view.ProtocolEditModalViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.protocoleditmodal',

    requires: [
        'Ext.data.Store',
        'Ext.data.field.Date',
        'Ext.data.field.Integer',
        'Ext.data.proxy.Direct',
        'Ext.data.reader.Json',
        'Ext.data.field.String'
    ],

    stores: {
        Status: {
            type: 'status',
            storeId: 'StatusStore'
        }

    }

});