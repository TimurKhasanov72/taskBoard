/*
 * File: public/app/view/MyViewportViewController.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.6.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.6.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('taskBoard.view.MyViewportViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myviewport',

    onButtonClick: function (button, e, eOpts) {
        var tabPanel = this.lookup('_navigationMenu'),
            curwidth = tabPanel.tabBar.getWidth(),
            expand = curwidth === 0 ? 200 : 0;
        tabPanel.tabBar.animate({to: {width: expand}, duration: 150});
    },


    onLabelRender: function (component) {

        //component.setHtml('<p>Зеленцов В.С.</p>'+Ext.Date.format(new Date(),'d-m-Y'));
        component.setHtml(Ext.Date.format(new Date(), 'd-m-Y'));
    },
    onContainerShow: function (component, eOpts) {
        var abc = component.down('chart');
        abc.performLayout();
    },


    onPurposeCellDblClick: function (tableView, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        this.dialogOper = Ext.create({
            xtype: 'purposeeditmodal',
            viewModel: {
                data: {
                    currentPurposeRec: record,
                    title: 'Редактировать цель'
                },
            }, session: true
        });
        this.dialogOper.show();
    },
    onPurposePanelAfterRender: function (component, eOpts) {
        component.getView().getRowClass = function (record) {
            var cl = '', currentDate = new Date();
            if (record.get('limitation') < currentDate && record.get('status') == 1) {
                cl = 'alert-row';
            }
            return cl;
        };
    },
    onDepartmentSelect: function (combo, record, eOpts) {
        Ext.StoreManager.lookup('TaskStore').load();
        Ext.StoreManager.lookup('RiskStore').load();
        Ext.StoreManager.lookup('KpiStore').load();
        Ext.StoreManager.lookup('ideaStore').load();
        Ext.StoreManager.lookup('PurposeStore').load();
        /*  var Task=Ext.StoreManager.lookup('TaskStore')
                Risk=Ext.StoreManager.lookup('RiskStore')
                Purpose=Ext.StoreManager.lookup('PurposeStore')
                Kpi=Ext.StoreManager.lookup('KpiStore')
                Idea=Ext.StoreManager.lookup('ideaStore')
                dep={'department':record.get('id')};
                Risk.getProxy().extraParams=dep
                Purpose.getProxy().extraParams=dep
                Kpi.getProxy().extraParams=dep
                Idea.getProxy().extraParams=dep

            Ext.StoreManager.lookup('TaskStore').extraParams({'department':record.get('id')});

            Ext.StoreManager.lookup('RiskStore').load({'department':record.get('id')});
            Ext.StoreManager.lookup('PurposeStore').load({'department':record.get('id')});
            Ext.StoreManager.lookup('KpiStore').load({'department':record.get('id')});
            Ext.StoreManager.lookup('ideaStore').load({'department':record.get('id')});*/
    },

    /* onKpiMonthFieldChange:function(field, newValue, oldValue, eOpts) {
         var grid=this.lookupReference('_kpiGrid');
         grid.getStore().load();
     },
     onKPIDirectStoreBeforeLoad:function(store, operation, eOpts) {
         requestParam=this.getRequestParam();
         store.getProxy().extraParams=requestParam;
     },
     getRequestParam: function() {
             var kpiMonth=this.lookupReference('_kpiMonth').getValue(),
                 kpiMonth=Ext.Date.format(kpiMonth,'Y-m-d');
             requestParam={filter:[{property:'month',value:kpiMonth}]};

         return requestParam;
     },*/


    /*task = runner.start({
                    run: function() {
                        store.reload();
                    },
                    interval: 3000
                });

            runner.stop();*/
    onIdeaStoreBeforeload: function (store, operation, eOpts) {

        var dep =this.lookupReference('_department').getValue();
        if (dep)
            store.getProxy().extraParams = {department: dep};
    },
    onPurposeStoreBeforeload: function (store, operation, eOpts) {

        var dep =this.lookupReference('_department').getValue();
        if (dep)
            store.getProxy().extraParams = {department: dep};
    }
});