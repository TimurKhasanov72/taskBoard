

Ext.define('taskBoard.view.ProtocolEditModal', {
    extend: 'Ext.window.Window',
    alias: 'widget.protocoleditmodal',

    requires: [
        'taskBoard.view.ProtocolEditModalViewModel',
        'taskBoard.view.ProtocolEditModalViewController',

        'Ext.grid.Panel',
        'Ext.grid.column.Date',
        'Ext.form.field.Date',
        'Ext.grid.column.Number',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar'
    ],
    /*
        config: {
            currentTaskRec: null
        },*/

    controller: 'protocoleditmodal',
    viewModel: {
        type: 'protocoleditmodal'
    },

    modal: true,
    height: 500,
    itemId: 'mywindow',
    width: 800,
    layout: 'fit',
    closeAction: 'hide',
    closable:false,
    plain: true,
    bind: {
        title: '{title}'
    }
    ,
    items: [
        {
            xtype: 'form',
            reference: '_formProtocolEdit',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'textareafield',
                    reference: '_ProtocolName',
                    width: '80%',
                    fieldLabel: 'Содержание',
                    bind: '{currentProtocolRec.name}'
                },
                {
                    xtype: 'textareafield',
                    reference: '_protocolDecision',
                    width: '80%',
                    fieldLabel: 'Решение',
                    bind: '{currentProtocolRec.decision}'
                },
                {
                    xtype: 'combobox',
                    validator: function(value) {
                        return(value.trim().length>0)?true:"Поле не может быть пустым";
                    },
                    reference: '_protocolUser',
                    width: 600,
                    fieldLabel: 'Ответственный',
                    allowBlank: false,
                    emptyText: 'Выберите ответственного',
                    displayField: 'full_name',
                    bind: {store:'{Users}',value:'{currentProtocolRec.user_id}'},
                    valueField: 'id',
                },
                {
                    xtype: 'combobox',
                    reference: '_protocolStatus',
                    width: 300,
                    fieldLabel: 'Текущий статус',
                    emptyText: 'Выберите статус',
                    displayField: 'text',
                    bind: {
                        store: '{Status}',
                        value:'{currentProtocolRec.status}'
                    },
                    valueField: 'id',
                },
                {
                    xtype: 'datefield',
                    reference: '_dateProtocol',
                    fieldLabel: 'Дата',
                    format: 'd.m.y',
                    bind: '{currentProtocolRec.expected_date}'
                }

            ],
            bbar:[{
                xtype: 'button',
                text: 'Сохранить',
                buttonAlign:'left',
                docked: 'left',
                listeners: {
                    click: 'save'
                }

            },
                '->',
                {
                    xtype: 'button',
                    text: 'Отмена',
                    docked: 'right',
                    listeners: {
                        click: 'cancel'
                    },
                }]


        }
    ]/*,
    listeners: {
        show: 'onWindowShow'
    }*/

});