/*
 * File: public/app/view/MyPanel8.js
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

Ext.define('taskBoard.view.MyPanel8', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mypanel8',

    requires: [
        'taskBoard.view.MyPanel8ViewModel',
        'taskBoard.view.MyPanel8ViewController',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.feature.GroupingSummary',
        'Ext.XTemplate',
        'Ext.grid.column.Date',
        'Ext.form.field.Date',
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
        'Ext.form.field.ComboBox'
    ],

    controller: 'mypanel8',
    viewModel: {
        type: 'mypanel8'
    },
    reference: '_main',
    height: 250,
    width: 400,
    title: 'My Panel',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'panel',
            flex: 3,
            resizable: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    collapseDirection: 'left',
                    collapsible: true,
                    hideCollapseTool: true,
                    title: 'КПЭ',
                    titleCollapse: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            collapsible: false,
                            overlapHeader: false,
                            title: '',
                            autoLoad: true,
                            bind: {
                                store: '{KPI}'
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    summaryType: 'count',
                                    flex: 5,
                                    cellWrap: true,
                                    dataIndex: 'indicator',
                                    text: 'Показатель'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    summaryType: 'average',
                                    flex: 1,
                                    dataIndex: 'valueFact',
                                    text: 'Факт (с н.г.) ,%'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    summaryType: 'average',
                                    flex: 1,
                                    dataIndex: 'valueTarget',
                                    text: 'Цель (с н.г.) ,%'
                                }
                            ],
                            features: [
                                {
                                    ftype: 'groupingsummary',
                                    enableGroupingMenu: false,
                                    groupHeaderTpl: [
                                        'Подразделение: {name}'
                                    ],
                                    hideGroupedHeader: true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 2,
                    reference: '_taskGrid',
                    height: 250,
                    collapsed: false,
                    collapseDirection: 'left',
                    collapseFirst: false,
                    collapsible: false,
                    title: 'Задачи',
                    titleAlign: 'center',
                    autoLoad: true,
                    bind: {
                        store: '{Task}'
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            flex: 2,
                            dataIndex: 'name',
                            text: 'Наименование',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            flex: 1,
                            dataIndex: 'date',
                            text: 'Дата',
                            format: 'd.m.y',
                            editor: {
                                xtype: 'datefield',
                                format: 'd.m.y'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return '<img id='+record.get('id')+' src="data:image/jfif;base64,'+value+'">';
                            },
                            flex: 1,
                            dataIndex: 'photo',
                            text: 'Ответсвенный'
                        },
                        {
                            xtype: 'widgetcolumn',
                            onWidgetAttach: function(column, widget, record) {
                                var currentDate= new Date();
                                if (record.get('date')<currentDate)
                                widget.setSliceColors(['#800504','#FFFAFA']);
                            },
                            text: 'Статус, %',
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
                                    values: '{record.status}',
                                    offset: '270'
                                }
                            }
                        }
                    ],
                    plugins: [
                        {
                            ptype: 'cellediting'
                        },
                        {
                            ptype: 'rowexpander',
                            rowBodyTpl: [
                                '<p><b>Описание:</b> {comment}</p>'
                            ]
                        }
                    ],
                    listeners: {
                        afterrender: 'onGridpanelAfterRender'
                    }
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    collapsed: false,
                    collapseDirection: 'right',
                    collapsible: true,
                    hideCollapseTool: true,
                    title: 'СНУ',
                    titleCollapse: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            border: false,
                            title: 'ЛИНИЯ',
                            hideHeaders: true,
                            bind: {
                                store: '{Line}'
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    flex: 3,
                                    dataIndex: 'name',
                                    text: 'String',
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    flex: 1,
                                    dataIndex: 'status',
                                    text: 'MyColumn12',
                                    editor: {
                                        xtype: 'numberfield',
                                        maxValue: 100,
                                        minValue: 0
                                    }
                                }
                            ],
                            plugins: [
                                {
                                    ptype: 'cellediting'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            hidden: true,
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    border: false,
                                    disabled: true,
                                    hidden: true,
                                    title: 'ИДЕЯ',
                                    autoLoad: true,
                                    bind: {
                                        store: '{Idea}'
                                    },
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            flex: 1,
                                            dataIndex: 'filed',
                                            text: 'Подано',
                                            editor: {
                                                xtype: 'numberfield'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'approved',
                                            text: 'Одобрено',
                                            editor: {
                                                xtype: 'numberfield'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            flex: 1,
                                            dataIndex: 'implemented',
                                            text: 'Реализовано',
                                            editor: {
                                                xtype: 'numberfield'
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            flex: 1,
                                            dataIndex: 'engagement',
                                            text: 'Вовлеченность',
                                            editor: {
                                                xtype: 'numberfield',
                                                maxValue: 100,
                                                minValue: 0
                                            }
                                        }
                                    ],
                                    plugins: [
                                        {
                                            ptype: 'cellediting'
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                show: 'onContainerShow'
                            }
                        },
                        {
                            xtype: 'cartesian',
                            height: 250,
                            width: 400,
                            title: 'Идея',
                            colors: [
                                '#115fa6',
                                '#94ae0a',
                                '#a61120',
                                '#ff8809',
                                '#ffd13e',
                                '#a61187',
                                '#24ad9a',
                                '#7c7474',
                                '#a66111'
                            ],
                            bind: {
                                store: '{ideaQuarter}'
                            },
                            axes: [
                                {
                                    type: 'category',
                                    fields: [
                                        'quarter'
                                    ],
                                    position: 'bottom'
                                },
                                {
                                    type: 'numeric',
                                    fields: [
                                        'filed',
                                        'approved',
                                        'implemented'
                                    ],
                                    position: 'left',
                                    title: 'Кол-во идей, шт'
                                },
                                {
                                    type: 'numeric',
                                    fields: [
                                        'engagement'
                                    ],
                                    position: 'right',
                                    title: 'Вовлеченность, %'
                                }
                            ],
                            series: [
                                {
                                    type: 'bar',
                                    title: [
                                        'Подано',
                                        'Одобрено',
                                        'Реализовано'
                                    ],
                                    xField: 'quarter',
                                    yField: [
                                        'filed',
                                        'approved',
                                        'implemented'
                                    ]
                                },
                                {
                                    type: 'line',
                                    colors: [
                                        '#008000'
                                    ],
                                    title: 'Вовлеченность',
                                    xField: 'quarter',
                                    yField: [
                                        'engagement'
                                    ]
                                }
                            ],
                            interactions: [
                                {
                                    type: 'panzoom'
                                }
                            ],
                            legend: {
                                xtype: 'legend'
                            }
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            reference: '_thanksPanel',
                            layout: 'border',
                            collapsed: false,
                            collapseFirst: false,
                            collapsible: false,
                            title: 'Благодарность',
                            titleCollapse: false
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            flex: 1,
            resizable: true,
            collapsed: false,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    reference: '_riskGrid',
                    height: 250,
                    collapsed: false,
                    collapseDirection: 'bottom',
                    collapsible: true,
                    hideCollapseTool: true,
                    title: 'Риски/Проблемы',
                    titleAlign: 'center',
                    titleCollapse: true,
                    bind: {
                        store: '{Risk}'
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            flex: 2,
                            dataIndex: 'name',
                            text: 'Наименование',
                            editor: {
                                xtype: 'textfield'
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            flex: 1,
                            dataIndex: 'date',
                            text: 'Дата',
                            format: 'd.m.Y',
                            editor: {
                                xtype: 'datefield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            dataIndex: 'design',
                            text: 'Решение',
                            editor: {
                                xtype: 'textareafield'
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            dataIndex: 'fio',
                            text: 'Ответсвенный',
                            editor: {
                                xtype: 'combobox'
                            }
                        },
                        {
                            xtype: 'datecolumn',
                            flex: 1,
                            dataIndex: 'date',
                            text: 'Срок',
                            format: 'd.m.Y',
                            editor: {
                                xtype: 'datefield',
                                format: 'd.m.Y'
                            }
                        },
                        {
                            xtype: 'widgetcolumn',
                            onWidgetAttach: function(column, widget, record) {
                                var currentDate= new Date();
                                if (record.get('date')<currentDate)
                                widget.setSliceColors(['#800504','#FFFAFA']);
                            },
                            text: 'Статус, %',
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
                                    values: '{record.status}',
                                    offset: '270'
                                }
                            }
                        }
                    ],
                    plugins: [
                        {
                            ptype: 'cellediting'
                        }
                    ]
                }
            ]
        }
    ]

});