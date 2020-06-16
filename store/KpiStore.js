Ext.define('taskBoard.store.KpiStore', {
    extend: 'Ext.data.Store',
    alias: 'store.kpi',
    model: 'taskBoard.model.KPI',
    id:'KpiStore',
        groupField: 'evaluated',
        autoLoad: true,
        autoSync:true,
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
});



