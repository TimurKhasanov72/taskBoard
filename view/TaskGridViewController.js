Ext.define('taskBoard.view.TaskGridViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.task-grid',


    onTaskCellDblClick:function (tableView,td,cellIndex,record,tr,rowIndex,e,eOpts) {
        var store=Ext.StoreManager.lookup('UserStore');
        store.load({'id':record.get('user_id')});
        this.dialogOper=Ext.create({xtype:'taskeditmodal',
            viewModel:{
                data:{
                    currentTaskRec: record,
                    title: 'Редактировать задачу'
                },
            },session:true
        });
        this.dialogOper.show();
    },
    onNewTaskButtonClick:function (button, e, eOpts) {
        var task=Ext.create('taskBoard.model.Task');
        task.set('status',1);
        this.dialogOper=Ext.create({xtype:'taskeditmodal',
            viewModel:{
                data:{
                    currentTaskRec: task,
                    title: 'Создать задачу'
                },
            },session:true
        });
        this.dialogOper.show();
    },
    onDeleteTaskButtonClick:function(button, e, eOpts){
        var record=Sga.getSelectedRecord(this.view)
        if (record)
            Sga.confirmStoreDelete(record.get('name'),record)
    },
    onTaskStoreBeforeload:function(store, operation, eOpts) {
        dep=this.getView().department.selection
        if(dep)
            store.getProxy().extraParams={department:this.getView().department.selection.getId()};
    }

});