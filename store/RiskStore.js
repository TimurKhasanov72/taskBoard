Ext.define('taskBoard.store.RiskStore', {
    extend: 'Ext.data.Store',
    alias: 'store.risk',
    autoLoad: true,
    model: 'taskBoard.model.Risk',
    id:'RiskStore',
    remoteFilter:true,
    proxy: {
        type: 'direct',
        api: {
            prefix: 'Risk',
            read: 'getRisk',
            update:'updateRisk',
            create:'createRisk',
            destroy:'deleteRisk'

        },
        reader: {
            type: 'json'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Sga.exceptionStoreProxy(proxy,response,operation);
            },

        }
    },
    formulas:{
        currentRiskRec: {
            bind: {
                bindTo: '{_riskGrid.selection}',
                deep: true
            },
            get: function(risk) {
                return risk;
            },
            set: function(risk) {
                if (!risk.isModel) {
                    risk = this.get('risk').getById(risk);
                }
                this.set('currentRiskRec', risk);
            }
        }

    }
});

