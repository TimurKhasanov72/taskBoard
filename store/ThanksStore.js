Ext.define('taskBoard.store.ThanksStore', {
    extend: 'Ext.data.Store',
    alias: 'store.thanks',
    autoLoad: true,
    model: 'taskBoard.model.Thanks',
    id:'ThanksStore',
    proxy: {
        type: 'direct',
        api: {
            prefix: 'Thanks',
            read: 'getThanks',
            update:'updateThanks',
            create:'createThanks',
            destroy:'deleteThanks'
        },
        reader: {
            type: 'json'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Sga.exceptionStoreProxy(proxy,response,operation);
            },

        }

    }
});



