/*
 * File: public/app/view/TaskEditModalViewController.js
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

Ext.define('taskBoard.view.TaskEditModalViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.taskeditmodal',


    save: function (button, e, eOpts) {
        var form = button.up('form'),
            window = form.up('window'),
            store=Ext.StoreManager.lookup('TaskStore'),
            storeUser=Ext.StoreManager.lookup('UserStore'),
            rec = this.getViewModel().get('currentTaskRec'),
            recordUser=storeUser.findRecord('id',rec.get('user_id'));
        if (form.isValid()){
            rec.set('thumbnail',recordUser.get('thumbnail'));
            rec.set('full_name',recordUser.get('full_name'));
            if (rec.isPhantom()) {
                store.add(rec);
            }
            store.sync({
                failure : function(){
                    store.rejectChanges();
                }
            });
            window.close();
        }
    },

    cancel: function (button, e, eOpts) {
        var form = button.up('form'),
            window = form.up('window'),
            rec = this.getViewModel().get('currentTaskRec');
        rec.reject();
        window.close();
    }
});