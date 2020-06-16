Ext.define('taskBoard.view.RiskGridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.risk-grid',

    stores: {
        Risk: {
            type: 'risk',
            storeId: 'RiskStore',
            listeners:{
                beforeload:'onRiskStoreBeforeload'
            }
        },
        Status: {
            type: 'status',
            storeId: 'StatusStore'
        }
    }
});