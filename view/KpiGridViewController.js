Ext.define('taskBoard.view.KpiGridViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.kpi-grid',

    onKpiMonthFieldChange:function(field, newValue, oldValue, eOpts) {
        this.getView().getStore().load();
    },
    onKpiStoreBeforeload:function(store, operation, eOpts) {
        var kpiMonth=this.lookupReference('_kpiMonth').getValue(),
            params={month:Ext.Date.format(kpiMonth,'Y-m-d')},
            dep=this.getView().department.selection;
        if(dep)
            params['department']=dep.getId()
        store.getProxy().extraParams=params
    }

});