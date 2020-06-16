Ext.define('taskBoard.store.HSEStore', {
        extend: 'Ext.data.Store',
        alias: 'store.hse',
        autoLoad: true,
        id:'HSEStore',
        proxy: {
            type: 'direct',
            directFn: 'Task.getHSEByAppointment',
            reader: {
                type: 'json'
            }
        },
        listeners:{
           // beforeload:'onIdeaStoreBeforeload'
        },
        fields: [
            {
                name: 'date',
                type: 'date'
            },
            {
                name: 'sceneOfIncident',
                type: 'string'
            },
            {
                name: 'fullName',
                type: 'string'
            },
            {
                name: 'organization',
                type: 'string'
            }
            ,
            {
                name: 'reason',
                type: 'string'
            }
            ,
            {
                name: 'status',
                type: 'number'
            }
        ]

    }

);

