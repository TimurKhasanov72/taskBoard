Ext.define('taskBoard.store.DepartmentStore', {
    extend: 'Ext.data.Store',
    alias: 'store.department',
    model: 'taskBoard.model.Department',
    id:'DepartmentTreeStore',
    autoLoad: true,
    autoSync:true,
    type:'tree',
    proxy: {
        type: 'direct',
        api: {
            prefix: 'Department',
            read: 'getDepartment',
        },
        reader: {
            type: 'json'
        }
    }
});



