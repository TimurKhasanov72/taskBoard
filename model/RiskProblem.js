/*
 * File: public/app/model/Risk.js
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

Ext.define('taskBoard.model.Risk', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.String',
        'Ext.data.field.Date'
    ],

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
            name: 'expectedDate',
            dateFormat:'Y-m-d'
        },
        {
            name: 'user_id',
            type:'number'
        },
        {
            name: 'id'
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
        }
    ]
});