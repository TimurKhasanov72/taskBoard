Ext.create('Ext.TabPanel', {
    fullscreen: true,
    tabBarPosition: 'top',

    defaults: {
        styleHtmlContent: true
    },

    items: [
        {
            title: 'УПЦ',
            iconCls: 'home',
            html: 'Home Screen'
        },
        {
            title: 'ИДЕИ',
            iconCls: 'user',
            html: 'ИДЕИ'
        }
        ,
        {
            title: 'КПЭ',
            iconCls: 'user',
            html: 'Contact Screen'
        }
    ]
});