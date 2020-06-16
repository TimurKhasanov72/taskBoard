Ext.define('taskBoard.view.AppointmentPanelViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.appointment-panel',

    stores: {

    Status: {
        type: 'status',
        storeId: 'StatusStore'
    },

    TaskAppointment: {
            autoLoad: true,
            id: 'taskAppointmentStore',
            proxy: {
                type: 'direct',
                directFn: 'Task.getTaskByAppointment',
                reader: {
                    type: 'json'
                }
            },
            listeners:{
                //beforeload:'onIdeaStoreBeforeload'
            },
            fields: [
                {
                    type: 'string',
                    name: 'name'
                },
                {
                    type: 'date',
                    name: 'date',
                    dateFormat:'Y-m-d',
                },
                {
                    name: 'progress',
                    type:'number'
                },
                {
                    name:'status',
                    type:'number'
                }
                ,
                {
                    type: 'string',
                    name: 'comment'
                },
                {
                    name: 'department'
                },
                {
                    name: 'id',
                    type:'number'
                }
                ,
                {
                    name: 'progressAr',
                    calculate:function(date){
                        var ar=[];
                        ar.push(date.progress);
                        ar.push(100-date.progress);
                        return ar;
                    }
                },
                {
                    name: 'isAffectsPurpose',
                    calculate:function(date){
                        var rez;
                        if (Array.isArray(date.purpose) && date.purpose.length )
                            rez=true
                        else
                            rez=false
                        return rez;
                    }
                },
                {
                    name:'purpose',
                    type:'auto'
                }
            ]

        },
        RiskAppointment: {
            autoLoad: true,
            id: 'riskAppointmentStore',
            proxy: {
                type: 'direct',
                directFn: 'Risk.getRiskByAppointment',
                reader: {
                    type: 'json'
                }
            },
            listeners:{
                //beforeload:'onIdeaStoreBeforeload'
            },
            fields: [
                {
                    type: 'string',
                    name: 'name'
                },
                {
                    name: 'progress',
                    type:'number'
                },
                {
                    name:'status',
                    type:'number'
                }
                ,
                {
                    type: 'string',
                    name: 'decision'
                },
                {
                    type: 'date',
                    name: 'expected_date',
                    dateFormat:'Y-m-d'
                },

                {
                    name: 'id',
                    type:'number'
                }
                ,
                {
                    name: 'progressAr',
                    calculate:function(data){
                        var ar=[];
                        ar.push(data.progress);
                        ar.push(100-data.progress);
                        return ar;
                    }
                },
                {
                    name:'department',
                    type:'string',
                    persist:false

                }
            ]

        },
        KpiAppointment: {
            autoLoad: true,
            id: 'kpiAppointmentStore',
            groupField: 'evaluated',
            autoLoad: true,
            autoSync:true,
            proxy: {
                type: 'direct',
                directFn: 'Kpi.getKPIbyAppointment',
                reader: {
                    type: 'json'
                }
            },
            fields: [
                {
                    name: 'id',
                    type: 'number',
                },
                {
                    name: 'indicator',
                    type: 'string',
                    persist:false
                },
                {
                    name: 'evaluated',
                    persist:false
                },
                {
                    name: 'value_fact'
                },
                {
                    name: 'value_target'
                },
                {
                    name: 'month',
                    type:'date',
                    dateFormat:'m-Y',
                },
                {
                    name: 'is_asc',
                    persist:false
                },
                {
                    name: 'targetFact',
                    calculate:function(data){
                        if(data.value_fact && data.value_target )
                        {
                            if (data.is_asc)
                                return Math.round((data.value_fact/data.value_target)*100);
                            else
                                return Math.round((data.value_target/data.value_fact)*100);
                        }
                    }
                }
            ],
            listeners:{
                beforeload:'onKpiStoreBeforeload'
            }
        },
        Protocol: {
            type: 'protocol',
            storeId: 'ProtocolStore',
        },
        HSE: {
            type: 'hse',
            storeId: 'HSEStore',
        },
        ThanksAppointment:{
            autoLoad: true,
            model: 'taskBoard.model.Thanks',
            id:'ThanksAppointmentStore',
            proxy: {
                type: 'direct',
                directFn: 'Thanks.getThanksByAppointment',
                reader: {
                    type: 'json'
                },

                listeners: {
                    exception: function(proxy, response, operation){
                        Sga.exceptionStoreProxy(proxy,response,operation);
                    },

                }
            }
        }
    }
});
