Ext.define('taskBoard.store.StatusStore', {
    extend: 'Ext.data.Store',
    alias: 'store.status',
    id:'StatusStore',
    data: [
        {
            id: 1,
            text: 'В работе'
        },
        {
            id: 2,
            text: 'Выполнено'
        },
        {
            id: 3,
            text: 'Отложено'
        }
    ],
    fields: [
        {
            type: 'number',
            name: 'id'
        },
        {
            type: 'string',
            name: 'text'
        }
    ]
});




