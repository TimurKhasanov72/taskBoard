Ext.define('taskBoard.view.KpiTree', {
    extend: 'Ext.tree.Panel',
    xtype: 'kpi-tree',

    requires: [
        'taskBoard.store.KpiStore',
        'taskBoard.view.KpiTreeViewModel',
        'taskBoard.view.KpiTreeViewController',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.form.field.ComboBox',
        'Ext.tree.Column',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Number',
        'Ext.grid.column.Template',
        'Ext.XTemplate',
        'Ext.form.field.Date',
        'Ext.grid.column.Action',
        'Ext.grid.column.Date',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.selection.RowModel'
    ],
    controller: 'kpi-grid',
    viewModel: {
        type: 'kpi-grid'
    },


    reference: '_kpiGrid',
    bind: {
        store: '{KPI}'
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
                reference: '_kpiMonth',
                format: 'm-Y',
                value:new Date(new Date().getFullYear(),new Date().getMonth()-1,1),
                listeners: {
                    change: 'onKpiMonthFieldChange'
                }

            },
            {
                xtype:'slider',
                width: 50,
                value: 0,
                increment: 1,
                minValue: 0,
                maxValue: 1,
                tipText: function(thumb){
                    var kpiShow = ['График','Таблица'];
                    var value = Ext.String.format(kpiShow[thumb.value]);
                    return value;
                },
                renderTo: Ext.getBody()
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