Ext.define('taskBoard.store.TaskStore', {
    extend: 'Ext.data.Store',
    alias: 'store.task',
    autoLoad: true,
    model: 'taskBoard.model.Task',
    id:'TaskStore',
    remoteFilter:true,
    proxy: {
        type: 'direct',
        api: {
            prefix: 'Task',
            read: 'getTasks',
            update:'updateTask',
            create:'createTask',
            destroy:'deleteTask'
        },
        reader: {
            type: 'json'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Sga.exceptionStoreProxy(proxy,response,operation);
            },

        }

    },
    formulas:{
        currentTaskRec: {
            bind: {
                bindTo: '{_taskGrid.selection}',
                deep: true
            },
            get: function(task) {
                return task;
            },
            set: function(task) {
                if (!task.isModel) {
                    task = this.get('task').getById(task);
                }
                this.set('currentTaskRec', task);
            }
        }

    }
});



