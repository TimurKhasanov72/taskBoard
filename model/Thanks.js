
Ext.define('taskBoard.model.Thanks', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.String',
        'Ext.data.field.Date'
    ],

    fields: [
        {
            type: 'string',
            name: 'description'
        },
        {
            type: 'string',
            name: 'respectedName'
        },
        {
            type: 'date',
            name: 'date',
            dateFormat:'Y-m-d',
        },
        {
            name: 'id',
            type:'number'
        },
        {
            name:'respected',
            type:'auto'
        }


    ]
});