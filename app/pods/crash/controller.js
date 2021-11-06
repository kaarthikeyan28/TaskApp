//ignorei18n_start
import Ember from 'ember';
import CommonUtil from 'emberapp/utils/common-utilities';

export default Ember.Controller.extend({
    startClient: false,
    init() {
    
    },

    usernameHelpIcon: {
        PARENT_CLASS: "ela-make-inline-block ela-absolute ela-m-null",
        CLASS: "ela-icon icn-circle-help ela-absolute ela-mt-m3 ela-ml-null",
        TOOLTIP_TEXT: "ember_fim_auditnote"
    },

    fileTypeFilter: {   
        selected: 'excludetypes',
        selectedTitle: 'Exclude',
        class: '',
        liveSearch: false,
        width: '110px',
        select: [{
            option: [{
                    value: 'excludetypes',
                    title: "Include"
                },
                {
                    value: 'includetypes',
                    title: "Exlude"
                }
            ]
        }]
    },

    willDestroy: function() {

    },

    actions: {
        onSave: function(){
            CommonUtil.showNotification("Success",3000,"success");
        }
    }

});
//ignorei18n_end
