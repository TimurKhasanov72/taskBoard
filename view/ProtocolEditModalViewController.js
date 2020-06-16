Ext.define('taskBoard.view.ProtocolEditModalViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.protocoleditmodal',


    save: function (button, e, eOpts) {

        var form = button.up('form'),
            window = form.up('window'),
            store=Ext.StoreManager.lookup('ProtocolStore'),
            storeUser=Ext.StoreManager.lookup('UserStore'),
            rec = this.getViewModel().get('currentProtocolRec'),
            recordUser=storeUser.findRecord('id',rec.get('user_id'));
        if (form.isValid()){
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
        };
    },

    cancel: function (button, e, eOpts) {
        var form = button.up('form'),
            window = form.up('window'),
            rec = this.getViewModel().get('currentProtocolRec');
        rec.reject();
        window.close();
    }
});