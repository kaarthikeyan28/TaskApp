//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ["nav","nav-tabs"],
	tagName: "ul",

  actions: {
    clickElement: function(tab) {
      if(tab.disabled !== true) {
        this.sendAction("onclick",tab);
      }
    },
	
	SettingsIcnClicked : function(action){
		this.set("action",action);
		this.sendAction("action");
	}
  }

});
//ignorei18n_end
