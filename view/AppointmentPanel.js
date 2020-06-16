Ext.define('taskBoard.view.AppointmentPanel', {
    extend: 'Ext.Panel',
    xtype: 'appointment-panel',

    requires: [
        'taskBoard.view.AppointmentPanelViewModel',
        'taskBoard.view.AppointmentPanelViewController',
        'taskBoard.store.ProtocolStore',
        'taskBoard.store.HSEStore',
        'taskBoard.store.StatusStore',
        'Ext.tab.Panel',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.feature.GroupingSummary',
        'Ext.XTemplate',
        'Ext.grid.column.Date',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Widget',
        'Ext.sparkline.Pie',
        'Ext.grid.plugin.RowExpander',
        'Ext.form.field.Number',
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Bar',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.legend.Legend',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.form.field.TextArea',
        'Ext.tab.Tab',
        'Ext.tab.Bar',
        'Ext.grid.filters.Filters',
        'Ext.picker.Date',
        'Ext.picker.Month'
    ],
    controller: 'appointment-panel',
    viewModel: {
        type: 'appointment-panel'
    },
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    cls: 'my-panel-t',
    resizable: true,
    items: [
        {
            xtype: 'panel',
            //flex: 1,
            width: '25%',
            resizable: true,
            title: {
                text: 'КПЭ',

                cls: 'my-panel-header-title'
            },

            titleAlign: 'center',
            cls: 'my-panel-r',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [

                {
                    xtype: 'gridpanel',

                    reference: '_kpiGrid',
                    bind: {
                        store: '{KpiAppointment}'
                    },
                    flex: 2,
                    border: false,
                    resizable: true,
                    dockedItems: {
                        xtype: 'toolbar',
                        dock: 'top',

                        items: [
                            {
                                xtype: 'monthfield',
                                width: 100,
                                reference: '_kpiMonth',
                                format: 'm-Y',
                                value: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
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
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 2,
                            dataIndex: 'value_fact',
                            text: 'Факт',
                            tooltip: 'Расчет с начала года',
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
                                '{name}'
                            ],
                            hideGroupedHeader: true,
                            startCollapsed: true,
                            cellWrap: true
                        }
                    ],
                    plugins: [
                        {ptype: 'gridfilters'}
                    ]
                },
                {
                    xtype: 'panel',
                    height: 250,
                    cls: 'my-panel-t',
                    title: {
                        text: 'Лента новостей',

                        cls: 'my-panel-header-title'
                    },
                    titleAlign: 'center',
                }

            ]
        },
        {
            xtype: 'panel',
            //flex: 3,

            width: '50%',

            resizable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'gridpanel',
                    height: '80%',
                    resizable: true,
                    collapsed: false,
                    collapseDirection: 'left',
                    collapseFirst: false,
                    collapsible: false,
                    title: {
                        text: 'Задачи',

                        cls: 'my-panel-header-title'
                    },
                    //hideHeaders: true,
                    bind: {
                        store: '{TaskAppointment}'
                    },
                    titleAlign: 'center',
                    autoLoad: true,
                    headerBorders: false,
                    cls: 'my-grid-b',
                    plugins: [
                        {
                            ptype: 'rowexpander',
                            rowBodyTpl: [
                                '<p><b>Описание:</b> {comment}</p>'
                            ]
                        },
                        {
                            ptype: 'gridfilters'
                        }
                    ],
                    listeners: {
                        celldblclick: 'onTaskCellDblClick'

                    },
                    columns: {
                        items: [
                            {
                                xtype: 'gridcolumn',
                                flex: 6,
                                dataIndex: 'name',
                                text: 'Наименование',
                                cellWrap: true
                            }
                            ,
                            {
                                xtype: 'datecolumn',
                                flex: 1,
                                dataIndex: 'date',
                                text: 'Срок',
                                format: 'd.m.y',
                            },
                            {
                                xtype: 'gridcolumn',
                                flex: 3,
                                dataIndex: 'department',
                                text: 'Цех/Служба',
                                cellWrap: true
                            },
                            {
                                xtype: 'widgetcolumn',
                                sortable: true,
                                dataIndex: 'id',
                                //rendered:true,
                                onWidgetAttach: function (column, widget, record) {
                                    var currentDate = new Date();
                                    if (record.get('date') < currentDate && record.get('status') == 1) {
                                        widget.setBorderColor('#ff6d70');
                                        widget.setSliceColors(['#ff6d70', '#FFFAFA']);
                                    } else {
                                        widget.setBorderColor('#008000');
                                        widget.setSliceColors(['#008000', '#FFFAFA']);
                                    }

                                },
                                updater: function (cell, value, record, view) {

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
                                        offset: '270',
                                        /*    sliceColors:'{record.progressArSlColor}',
                                            borderColor:'{record.progressArBrColor}',*/

                                    }
                                },
                                flex: 1
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    var val = Sga.renderColumnVal('StatusStore', 'id', value, 'text', view);
                                    return val;
                                },
                                flex: 1,
                                dataIndex: 'status',
                                text: 'Статус',
                                cellWrap: true,
                                hidden: true,
                                filter: {
                                    idField: 'id',
                                    type: 'list',
                                    store: '{Status}',
                                    labelField: 'text',
                                    value: 1
                                }

                            }

                        ]
                    }
                    ,
                    plugins: [
                        {
                            ptype: 'rowexpander',
                            rowBodyTpl: [
                                '<p>{comment}</p>'
                            ]
                        }
                    ],
                },


                , {
                    xtype: 'gridpanel',

                    reference: '_riskGrid',
                    bind: {store: '{RiskAppointment}'},
                    //flex:1,
                    height: 'auto',
                    headerBorders: false,
                    collapsed: false,
                    collapseDirection: 'bottom',
                    collapsible: true,
                    hideCollapseTool: true,
                    title: {
                        text: 'Риски/Проблемы-Задачи АУП',

                        cls: 'my-panel-header-title'
                    },
                    titleAlign: 'center',
                    titleCollapse: true,
                    autoLoad: true,
                    columns: [
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
                            dataIndex: 'department',
                            text: 'Цех/Служба',
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
                            onWidgetAttach: function (column, widget, record) {
                                var currentDate = new Date();
                                if (record.get('expected_date') < currentDate && record.get('status') == 1) {
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
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                var val = Sga.renderColumnVal('StatusStore', 'id', value, 'text', view);
                                return val;
                            },
                            flex: 2,
                            dataIndex: 'status',
                            text: 'Статус',
                            cellWrap: true,
                            hidden: true,
                            filter: {
                                idField: 'id',
                                type: 'list',
                                store: '{Status}',
                                labelField: 'text',
                                value: 1
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            //flex: 1,
            width: '25%',
            resizable: true,
            cls: 'my-panel-l',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            items: [

                {
                    xtype: 'gridpanel',
                    height: '20%',
                    resizable: true,
                    collapsed: false,
                    collapseDirection: 'left',
                    collapseFirst: false,
                    collapsible: false,
                    title: {
                        text: 'HSE',

                        cls: 'my-panel-header-title'
                    },
                    bind: {
                        store: '{HSE}'
                    },
                    titleAlign: 'center',
                    autoLoad: true,
                    headerBorders: false,
                    cls: 'my-grid-b',
                    columns: {
                        items: [

                            {
                                xtype: 'datecolumn',
                                flex: 1,
                                dataIndex: 'date',
                                text: 'Дата',
                                format: 'd.m.y',
                            }
                            , {
                                xtype: 'gridcolumn',
                                flex: 1,
                                dataIndex: 'reason',
                                text: 'Медпункт/Место проишествия',
                                cellWrap: true,

                            },
                            {
                                xtype: 'gridcolumn',
                                flex: 1,
                                dataIndex: 'fullName',
                                text: 'ФИО',
                                cellWrap: true,
                                hidden: true
                            },
                            {
                                xtype: 'gridcolumn',
                                flex: 1,
                                dataIndex: 'organization',
                                text: 'Организация',
                                cellWrap: true,
                                hidden: true,
                            },
                            {
                                xtype: 'gridcolumn',
                                flex: 2,
                                dataIndex: 'fullName',
                                text: 'Причина',
                                cellWrap: true
                            }


                        ]
                    }
                },

                {
                    xtype: "gridpanel",
                    reference: '_prtGrid',

                    height: '60%',
                    //flex:1,
                    title: {
                        text: 'Протокол',

                        cls: 'my-panel-header-title'
                    },
                    dockedItems: {
                        xtype: 'toolbar',

                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                reference: 'newProtocolButton',
                                text: 'Добавить',
                                handler: 'onNewProtocolButtonClick'
                            },
                            {
                                xtype: 'button',
                                reference: 'deleteProtocolButton',
                                text: 'Удалить',
                                handler: 'onDeleteProtocolButtonClick',
                                bind: {disabled: '{!_prtGrid.selection}'}
                            }

                        ]
                    },
                    resizable: true,
                    titleAlign: 'center',
                    titleCollapse: true,
                    autoLoad: true,
                    bind: {
                        store: '{Protocol}'
                    },
                    columns: [
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
                            hidden: true,
                            cellWrap: true
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 2,
                            dataIndex: 'full_name',
                            text: 'Ответственный',
                            cellWrap: true,
                            
                        },
                        {
                            xtype: 'datecolumn',
                            flex: 1,
                            text: 'Срок',
                            format: 'd.m.Y',
                            dataIndex: 'expected_date',

                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                var val = Sga.renderColumnVal('StatusStore', 'id', value, 'text', view);
                                return val;
                            },
                            flex: 2,
                            dataIndex: 'status',
                            text: 'Статус',
                            cellWrap: true,
                            hidden: true,
                            filter: {
                                idField: 'id',
                                type: 'list',
                                store: '{Status)',
                                labelField: 'text',
                                value: 1
                            }
                        }
                    ]
                    , listeners: {
                        celldblclick: 'onProtocolCellDblClick'
                    }
                }

                ,
                {
                    xtype: 'gridpanel',
                    bind: {
                        store: '{ThanksAppointment}'
                    },

                    height:'20%',
                    //layout: 'border',
                    cls: 'my-panel-t',
                    title: {
                        text: 'Благодарность',
                        cls: 'my-panel-header-title'
                    },

                    autoLoad: true,
                    titleAlign: 'center',
                    flex: 2,
                    border: false,
                    resizable: true,
                    hideHeaders: true,
                    columns: [
                        {
                            xtype: 'datecolumn',
                            flex: 2,
                            dataIndex: 'date',
                            text: 'Дата',
                            format: 'd.m.y',
                            hidden:true
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 4,
                            text: 'Сотрудник',
                            dataIndex: 'respectedName',
                            cellWrap: true
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 4,
                            text: 'Текст',
                            dataIndex: 'description',
                            cellWrap: true
                        },

                    ]

                }
            ]
        }
    ]

});