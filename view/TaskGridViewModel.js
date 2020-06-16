Ext.define('taskBoard.view.TaskGridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.task-grid',

    stores: {
        Task: {
            type: 'task',
            storeId: 'TaskStore',
            listeners:{
                beforeload:'onTaskStoreBeforeload'
            }
        },
        Status: {
            type: 'status',
            storeId: 'StatusStore'
        }
    }
});
