//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ["modal","fade"],

  onInit: function() {
    var self=this;
    this.set("data.elementID",this.get("elementId")); // No I18N

    Ember.run.scheduleOnce("afterRender",this,function() {

			let obj = {
				backdrop:"static",
				keyboard:false
			}; 

      Ember.$("#"+self.get("elementId")).on("hidden.bs.modal",function(){
        try{
          self.set("data.open",false);
          if(!Ember.isEmpty(self.get("data.onClose"))) {
            self.sendAction("data.onClose");
          }
        }catch(exception){}
      });


				Ember.$("#"+self.get("elementId")).on("shown.bs.modal",function() {
				if(!Ember.isEmpty(self.get("data.onOpen"))) {
                          self.sendAction("data.onOpen");
                        }
      })

			if(this.get("data.isStatic")) {
				Ember.$("#"+self.get("elementId")).on("shown.bs.modal",function() {
        	self.set("data.open",true);
      	});

				if(this.get("data.open")) {
					obj.show = true;
				}
				else {
					obj.show = false;
				}
			}

			Ember.$("#"+self.get("elementId")).modal(obj);

    });

  }.on("init"),

  actions: {

    sendYesAction: function() {
      Ember.$("#"+this.get("elementId")).modal("hide");
      if(this.get("data.action") !== "DUMMY_ACTION") {
        this.sendAction("data.action");
      }
      if(this.get("data.promiseMode") === true) {
        this.get("data").promiseResolve();
      }
    },

    sendBackAction: function() {
      this.sendAction("data.backAction");
    },

    closeModal: function() {
      Ember.$("#"+this.get("elementId")).modal("hide");
      if(this.get("data.promiseMode") === true) {
        this.get("data").promiseReject();
      }
    },
    
    sendToParent : function(action){
		this.set("action",action);
		this.sendAction("action");
    }
    
  }
});
//ignorei18n_end
