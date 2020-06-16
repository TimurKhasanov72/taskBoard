Ext.define('taskBoard.view.AppointmentPanelViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appointment-panel',

    onKpiMonthFieldChange:function(field, newValue, oldValue, eOpts) {
        Ext.StoreManager.lookup('kpiAppointmentStore').load();
    },
    onKpiStoreBeforeload:function(store, operation, eOpts) {
        var kpiMonth=this.lookupReference('_kpiMonth').getValue(),
            params={month:Ext.Date.format(kpiMonth,'Y-m-d')}
        store.getProxy().extraParams=params
    },

    onProtocolCellDblClick: function (tableView, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var store=Ext.StoreManager.lookup('UserStore');
        store.load({'id': record.get('user_id')});
        this.dialogOper = Ext.create({
            xtype: 'protocoleditmodal',
            viewModel: {
                data: {
                    currentProtocolRec: record,
                    title: 'Редактировать пункт протокола'
                },
            }, session: true
        });
        this.dialogOper.show();
    },

    onDeleteProtocolButtonClick: function (button, e, eOpts) {
        var record = Sga.getSelectedRecord(this.lookupReference('_prtGrid'))
        if (record)
            Sga.confirmStoreDelete(record.get('name'), record)

    },
    onNewProtocolButtonClick: function (button, e, eOpts) {
        this.dialogOper = Ext.create({
            xtype: 'protocoleditmodal',
            viewModel: {
                data: {
                    currentProtocolRec: Ext.create('taskBoard.model.Protocol'),
                    title: 'Создать пункт протокола'
                },
            }, session: true
        });
        this.dialogOper.show();
    }
});