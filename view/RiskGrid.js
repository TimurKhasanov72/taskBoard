Ext.define('taskBoard.view.RiskGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'risk-grid',

    requires: [
        'taskBoard.store.RiskStore',
        'taskBoard.store.StatusStore',
        'taskBoard.view.RiskGridViewModel',
        'taskBoard.view.RiskGridViewController',
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
        'Ext.form.field.Number'
    ],
    controller: 'risk-grid',
    viewModel: {
        type: 'risk-grid'
    },
    reference: '_riskGrid',
    //flex:1,
    height:'auto',
    collapsed: false,
    collapseDirection: 'bottom',
    collapsible: true,
    hideCollapseTool: true,
    config:{
        department:null
    },
    title: {
        text:'Риски/Проблемы',

        cls: 'my-panel-header-title'
    },
    dockedItems:{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'button',
                reference: 'newRiskButton',
                text: 'Добавить',
                handler: 'onNewRiskButtonClick'
            },
            {
                xtype: 'button',
                reference: 'deleteRiskButton',
                text: 'Удалить',
                handler: 'onDeleteRiskButtonClick',
                bind:{disabled:'{!_riskGrid.selection}'}
            }

        ]
    },
    titleAlign: 'center',
    titleCollapse: true,
    autoLoad: true,
    bind: {
        store: '{Risk}'
    },

    initComponent: function () {
        this.columns = [
            {
                xtype: 'gridcolumn',
                flex: 3,
                dataIndex: 'name',
                text: 'Наименование',
                cellWrap: true
            },
            {
                xtype: 'datecolumn',
                flex: 1,
                text: 'Дата',
                format: 'd.m.Y',
                dataIndex: 'expected_date'
            },
            {
                xtype: 'gridcolumn',
                flex: 3,
                dataIndex: 'decision',
                text: 'Решение',
                cellWrap: true
            },
            {
                xtype: 'gridcolumn',
                flex: 2,
                dataIndex: 'full_name',
                text: 'Ответственный',
                cellWrap: true
            },
            {
                xtype: 'datecolumn',
                flex: 1,
                text: 'Срок',
                format: 'd.m.Y',
                dataIndex: 'expected_date'
            },
            {
                xtype: 'widgetcolumn',
                onWidgetAttach: function(column, widget, record) {
                    var currentDate= new Date();
                    if (record.get('expected_date')<currentDate && record.get('status')==1) {
                        widget.setBorderColor('#ff6d70');
                        widget.setSliceColors(['#ff6d70', '#FFFAFA']);
                    }


                },
                text: 'Прогресс, %',
                widget: {
                    xtype: 'sparklinepie',
                    height: 25,
                    width: 25,
                    borderColor: '#008000',
                    borderWidth: 1,
                    sliceColors: [
                        '#008000',
                        '#FFFAFA'
                    ],
                    bind: {
                        values: '{record.progressAr}',
                        offset: '270'
                    }
                },
                flex:1
            },
            {
                xtype: 'gridcolumn',
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    var val=Sga.renderColumnVal('StatusStore','id',value,'text',view);
                    return val;
                },
                flex: 2,
                dataIndex: 'status',
                text: 'Статус',
                cellWrap: true,
                hidden:true,
                filter: {
                    idField: 'id',
                    type: 'list',
                    store:this.getViewModel().getStore('Status'),
                    labelField: 'text',
                    value:1
                }
            }

        ]

        this.callParent();
    },
    listeners: {
        celldblclick:'onRiskCellDblClick'
    }

});
