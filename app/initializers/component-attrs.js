//ignorei18n_start
import Ember from 'ember';

var Component = {
  loadAttrsHash: Ember.on('didReceiveAttrs',function(attrs){
    if(typeof this.get('attrsHash') === "object"){
      let hash = this.get('attrsHash');
      var keys = [];
      for(var i in hash) {
        if(hash.hasOwnProperty(i)) {
          keys.push(i);
        }
      }
      keys.forEach(key=>{
        this.set(key,hash[key]);
      });
    }
  })
};

var Route = {
	actions: {
		didTransition: function() {
			try {
				Ember.$.cookie('emberRoute',this.routeName,{expires: 3, path:'/'});
				if(typeof this.onTransition === "function") {
					this.onTransition();
				}
			}
			catch(exp) {}
		}
	}
};

var Controller = {
  GLOBALSERVICE: Ember.inject.service('global-service'),
  onInitialLoad: function() {
    if(this.get("GLOBALSERVICE.isInitialized")) {
      if(typeof this.onLoad === "function") {
        this.onLoad();
      }
    }
    else {
      var self=this;
      Ember.run.later((function(){
        self.onInitialLoad();
      }),120);
    }
  }.on('init')
};

export function initialize() {
  Ember.Component = Ember.Component.extend(Component);
	Ember.TextField.reopen({
		attributeBindings:['data-element','data-min-val','data-max-val','max-length', 'data-empty-i18n', 'data-maxlen-i18n', 'data-specialchars-i18n', 'autofocus']
	});
	Ember.ELAroute = Ember.Route.extend(Route);
	Ember.ELAcontroller = Ember.Controller.extend(Controller);
}

export default {
  name: 'component-attrs',
  initialize: initialize
};
//ignorei18n_end
