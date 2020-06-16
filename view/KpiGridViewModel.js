Ext.define('taskBoard.view.KpiGridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.kpi-grid',

    stores: {
        KPI: {
            type: 'kpi',
            storeId: 'KpiStore',
            listeners:{
                beforeload:'onKpiStoreBeforeload'
            }
        }
    }
});
