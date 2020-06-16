Ext.define('taskBoard.view.RiskGridViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.risk-grid',

    onRiskCellDblClick: function (tableView, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var store=Ext.StoreManager.lookup('UserStore');
        store.load({'id': record.get('user_id')});
        this.dialogOper = Ext.create({
            xtype: 'riskeditmodal',
            viewModel: {
                data: {
                    currentRiskRec: record,
                    title: 'Редактировать риск'
                },
            }, session: true
        });
        this.dialogOper.show();
    },

    onDeleteRiskButtonClick: function (button, e, eOpts) {
        var record = Sga.getSelectedRecord(this.view)
        if (record)
            Sga.confirmStoreDelete(record.get('name'), record)

    },
    onNewRiskButtonClick: function (button, e, eOpts) {
        this.dialogOper = Ext.create({
            xtype: 'riskeditmodal',
            viewModel: {
                data: {
                    currentRiskRec: Ext.create('taskBoard.model.Risk'),
                    title: 'Создать риск'
                },
            }, session: true
        });
        this.dialogOper.show();
    },
    onRiskStoreBeforeload:function(store, operation, eOpts) {
        dep=this.getView().department.selection
        if(dep)
            store.getProxy().extraParams={department:this.getView().department.selection.getId()};
    }
});