Ext.define('taskBoard.view.KpiTreeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.kpi-tree',


    onKpiMonthFieldChange:function(field, newValue, oldValue, eOpts) {
        //var grid=this.lookupReference('_kpiGrid');
        this.getView().getStore().load();
    },
    getRequestParam: function() {
        var kpiMonth=this.lookupReference('_kpiMonth').getValue(),
            kpiMonth=Ext.Date.format(kpiMonth,'Y-m-d');
        requestParam={filter:[{property:'month',value:kpiMonth}]};

        return requestParam;
    }
});