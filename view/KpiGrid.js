Ext.define('taskBoard.view.KpiGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'kpi-grid',

    requires: [
        'taskBoard.store.KpiStore',
        'taskBoard.store.DepartmentStore',
        'taskBoard.view.KpiGridViewModel',
        'taskBoard.view.KpiGridViewController',
        'Ext.grid.filters.Filters',
        'Ext.grid.plugin.RowExpander',
        'Ext.XTemplate',
        'Ext.grid.column.Date',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Widget',
        'Ext.sparkline.Pie',
        'Ext.grid.plugin.RowExpander',
        'Ext.form.field.Number',
        'Ext.ux.TreePicker'
    ],
    controller: 'kpi-grid',
    viewModel: {
        type: 'kpi-grid'
    },

    reference: '_kpiGrid',
    bind: {
        store: '{KPI}'
    },
    config:{
        department:null
    },
    flex: 2,
    border: false,
    resizable: true,
    dockedItems:{
        xtype: 'toolbar',
        dock: 'top',

        items: [
            {
                xtype: 'monthfield',
                width:100,
                reference: '_kpiMonth',
                format: 'm-Y',
                value:new Date(new Date().getFullYear(),new Date().getMonth()-1,1),
                listeners: {
                    change: 'onKpiMonthFieldChange'
                }

            }
        ]
    },
    columns: [
        {
            xtype: 'gridcolumn',

            flex: 4,
            cellWrap: true,
            dataIndex: 'indicator',
            text: 'Показатель',
            summaryType: function (values) {
                return 'Выполняемость %';
            }
        },
        {
            xtype: 'gridcolumn',
            flex: 2,
            dataIndex: 'value_target',
            text: 'Цель',
            tooltip: 'Расчет с начала года',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true,
                selectOnFocus: true
            }
        },
        {
            xtype: 'gridcolumn',
            flex: 2,
            dataIndex: 'value_fact',
            text: 'Факт',
            tooltip: 'Расчет с начала года',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true,
                selectOnFocus: true
            }
        },
        {
            xtype: 'gridcolumn',
            flex: 2,
            dataIndex: 'targetFact',
            text: 'Цель/Факт',
            tooltip: 'Расчет с начала года',
            summaryType: function (values) {
                var percent = 0,
                    quInd = 0;
                Ext.Array.forEach(values, function (record) {
                    percent = percent + record.get('targetFact');
                    quInd++;
                });

                return Ext.util.Format.number(percent / quInd, '0');
            }

        }
    ],
    features: [
        {
            ftype: 'groupingsummary',
            enableGroupingMenu: false,
            groupHeaderTpl: [
                //'Подразделение: {name}'
                '{name}'
            ],
            hideGroupedHeader: true,
            startCollapsed: true,
            cellWrap:true
        }
    ],
    plugins: [
        {ptype: 'cellediting'},
        {ptype: 'gridfilters'}
    ]
});