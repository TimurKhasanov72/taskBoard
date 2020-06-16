Ext.define('taskBoard.view.KpiTreeViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.kpi-tree',

    stores: {
        KPI: {
            type: 'kpi',
            storeId: 'KpiStore',
        },
        KPI: {
            type: 'kpi',
            storeId: 'KpiStore',
        }
    }
});
