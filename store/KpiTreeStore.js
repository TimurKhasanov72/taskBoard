Ext.define('taskBoard.store.KpiTreeStore', {
    extend: 'Ext.data.Store',
    alias: 'store.treeKpi',
    model: 'taskBoard.model.KPI',
    requires: [
        'Ext.data.TreeStore',
        'Ext.data.proxy.Direct',
        'Wdl.DirectAPI',
    ],
    id:'KpiTreeStore',
        groupField: 'evaluated',
        autoLoad: true,
        autoSync:true,
        type:'tree',
        proxy: {
            type: 'direct',
            api: {
                prefix: 'Kpi',
                read: 'getKPI',
                update: 'updateKpi',
            },
            reader: {
                type: 'json'
            }
        },
        listeners: {
            beforeload: 'onKPIDirectStoreBeforeLoad'
        }
});



