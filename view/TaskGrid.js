Ext.define('taskBoard.view.TaskGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'task-grid',

    requires: [
        'taskBoard.store.TaskStore',
        'taskBoard.store.StatusStore',
        'taskBoard.view.TaskGridViewModel',
        'taskBoard.view.TaskGridViewController',
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
    controller: 'task-grid',
    viewModel: {
        type: 'task-grid'
    },
    reference: '_taskGrid',
    height: '82%',
    resizable: true,
    collapsed: false,
    collapseDirection: 'left',
    collapseFirst: false,
    collapsible: false,
    title: {
        text: 'Задачи',

        cls: 'my-panel-header-title'
    },
    config:{
        department:null
    },
    dockedItems: {
        xtype: 'toolbar',
        dock: 'top',


        items: [
            {
                xtype: 'button',
                reference: 'newTaskButton',
                text: 'Добавить',
                handler: 'onNewTaskButtonClick',
            },
            {
                xtype: 'button',
                reference: 'deleteTaskButton',
                text: 'Удалить',
                handler: 'onDeleteTaskButtonClick',
                bind: {disabled: '{!_taskGrid.selection}'}
            }
        ]
    },
    titleAlign: 'center',
    autoLoad: true,
    headerBorders: false,
    cls: 'my-grid-b',
    bind: {
        store: '{Task}'
    },
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
    /*listeners: {
        afterrender: function() {

            var runner = new Ext.util.TaskRunner();
            var task = runner.newTask({
                run: function() {
                    store.each(function (item)
                    {
                        var incReq = item.get('request') + 1;
                        item.set('request', incReq);
                    })
                },

                interval: 60000 // 1-minute interval
            });
            task.start();
        }
    },*/

    initComponent: function () {
        this.columns = [
            {
                xtype: 'gridcolumn',
                flex: 6,
                dataIndex: 'name',
                text: 'Наименование',
                cellWrap: true
            }
            ,
            {
                xtype: 'checkcolumn',
                dataIndex: 'isAffectsKPI',
                text: 'КПЭ',
                flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    if (!value) {
                        return '&nbsp;';
                    } else {
                        return '<img  src="/public/img/icons/fam/accept.png"  >';
                    }
                }

            },
            {
                xtype: 'checkcolumn',
                dataIndex: 'isAffectsPurpose',
                text: 'УПЦ',
                flex: 1,

                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    if (!value) {
                        return '&nbsp;';
                    } else {
                        return '<img  src="/public/img/icons/fam/accept.png"  >';
                    }
                },
            },
            {
                xtype: 'datecolumn',
                flex: 1,
                dataIndex: 'date',
                text: 'Срок',
                format: 'd.m.y',
            },
            {
                xtype: 'gridcolumn',
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    val2 = Sga.renderColumnVal('UserStore', 'id', value, 'thumbnail', view);
                    return '<img id=' + record.get('id') + ' src="data:image/jfif;base64,' + record.get('thumbnail') + '"title="' + record.get('full_name') + '" width="50" height="50" >';

                },
                flex: 1,
                //dataIndex: 'user_id',
                dataIndex: 'thumbnail',
                text: 'Ответственный',
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
                    store: this.getViewModel().getStore('Status'),
                    labelField: 'text',
                    value: 1
                }

            }
        ]

        this.callParent();
    },

});
