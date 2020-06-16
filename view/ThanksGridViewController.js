Ext.define('taskBoard.view.ThanksGridViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.thanks-grid',

    onThanksStoreBeforeload:function(store, operation, eOpts) {
        var params={},
            dep=this.getView().department.selection;
        if(dep)
            params['department']=dep.getId()
        store.getProxy().extraParams=params
    },onThanksCellDblClick:function (tableView,td,cellIndex,record,tr,rowIndex,e,eOpts) {
        var store=Ext.StoreManager.lookup('UserStore');
        store.load({'id':record.get('user_id')});
        this.dialogOper=Ext.create({xtype:'thankseditmodal',
            viewModel:{
                data:{
                    currentThanksRec: record,
                    title: 'Редактировать благодарность'
                },
            },session:true
        });
        this.dialogOper.show();
    },
    onNewThanksButtonClick:function (button, e, eOpts) {
        var thanks=Ext.create('taskBoard.model.Thanks');
        this.dialogOper=Ext.create({xtype:'thankseditmodal',
            viewModel:{
                data:{
                    currentThanksRec: thanks,
                    title: 'Создать задачу'
                },
            },session:true
        });
        this.dialogOper.show();
    },
    onDeleteThanksButtonClick:function(button, e, eOpts){
        var record=Sga.getSelectedRecord(this.view)
        if (record)
            Sga.confirmStoreDelete(record.get('description'),record)
    },
});