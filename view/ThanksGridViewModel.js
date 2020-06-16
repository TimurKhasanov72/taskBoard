Ext.define('taskBoard.view.ThanksGridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.thanks-grid',

    stores: {
        Thanks: {
            type: 'thanks',
            storeId: 'ThanksStore',
            listeners:{
                beforeload:'onThanksStoreBeforeload'
            }
        }
    }
});
