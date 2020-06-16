Ext.define('taskBoard.view.ThanksGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'thanks-grid',

    requires: [
        'taskBoard.store.ThanksStore',
        'taskBoard.store.DepartmentStore',
        'taskBoard.view.ThanksGridViewModel',
        'taskBoard.view.ThanksGridViewController',
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
    controller: 'thanks-grid',
    viewModel: {
        type: 'thanks-grid'
    },

    reference: '_thanksGrid',
    bind: {
        store: '{Thanks}'
    },
    config:{
        department:null
    },

    height:'25%',
    //layout: 'border',
    cls: 'my-panel-t',
    title: {
        text: 'Благодарность',
        cls: 'my-panel-header-title'
    },

    dockedItems: {
        xtype: 'toolbar',
        dock: 'top',


        items: [
            {
                xtype: 'button',
                reference: 'newThanksButton',
                text: 'Добавить',
                handler: 'onNewThanksButtonClick',
            },
            {
                xtype: 'button',
                reference: 'deleteThanksButton',
                text: 'Удалить',
                handler: 'onDeleteThanksButtonClick',
                bind: {disabled: '{!_thanksGrid.selection}'}
            }
        ]
    },
    autoLoad: true,
    titleAlign: 'center',
    flex: 2,
    border: false,
    resizable: true,
    hideHeaders: true,
    columns: [
        /*{
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                var val=Sga.renderColumnArray('Users','id',value,'fullName',view);
                if(!val)
                {

                    val='Не выбран сотрудник';

                }
                return val;
            },
            flex: 2,
            dataIndex: 'respected',
            text: 'Ответственный',
            editor: {
                xtype: 'tagfield',
                multipleSelect:true,
                displayField: 'fullName',
                valueField: 'id',
                forceSelection: true,
                bind: {
                    store: '{Users}'
                },
                listeners: {
                    expand: 'onComboboxExpand',
                    change: 'onComboboxChange'
                }

            }
        },*/
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

    ],
    plugins: [
        {ptype: 'cellediting'},
    ],
    listeners: {
        celldblclick: 'onThanksCellDblClick'

    },
});