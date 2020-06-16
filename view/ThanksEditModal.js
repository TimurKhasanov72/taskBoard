/*
 * File: public/app/view/TaskEidtModal.js
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

Ext.define('taskBoard.view.ThanksEditModal', {
    extend: 'Ext.window.Window',
    alias: 'widget.thankseditmodal',

    requires: [
        'taskBoard.view.ThanksEditModalViewModel',
        'taskBoard.view.ThanksEditModalViewController',
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

    controller: 'thankseditmodal',
    viewModel: {
        type: 'thankseditmodal'
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
            reference: '_formThanksEdit',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'textareafield',
                    reference: '_thanksDescription',
                    width: '80%',
                    fieldLabel: 'Благодарность',
                    bind: '{currentThanksRec.description}',
                    allowBlank: false
                },
                {
                    xtype: 'tagfield',
                    validator: function(value) {
                        return(value)?true:"Поле не может быть пустым";
                    },
                    reference: '_respected',
                    width: 600,
                    fieldLabel: 'Отличившийся',
                    emptyText: 'Выберите сотрудника',
                    displayField: 'full_name',
                    bind: {store:'{Users}',value:'{currentThanksRec.respected}'},
                    valueField: 'id',
                    allowBlank: false,
                    multipleSelect:true,
                    /*listeners:{
                        select:'onComboboxUserSelect'
                    }*/
                },


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
    ]
});