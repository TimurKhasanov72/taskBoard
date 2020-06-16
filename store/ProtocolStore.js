Ext.define('taskBoard.store.ProtocolStore', {
    extend: 'Ext.data.Store',
    alias: 'store.protocol',
    autoLoad: true,
    model: 'taskBoard.model.Protocol',
    id:'ProtocolStore',
    proxy: {
        type: 'direct',
        api: {
            prefix: 'Protocol',
            read: 'getProtocol',
            update:'updateProtocol',
            create:'createProtocol',
            destroy:'deleteProtocol'

        },
        reader: {
            type: 'json'
        }
    },
        listeners: {
            exception: function(proxy, response, operation){
                Sga.exceptionStoreProxy(proxy,response,operation);
            },

        }
    }

);

