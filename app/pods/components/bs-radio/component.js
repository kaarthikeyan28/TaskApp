//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({
	checkedObserver: function() {
		var self = this;
		Ember.run.schedule("afterRender",function(){
			var inputElement = self.$("input");
			var labelElement = self.$("label");
			 if(self.get("data.checked")) {
				 inputElement.prop("checked",true);
				 labelElement.addClass("checked");
			 }else {
			     inputElement.prop("checked",false);
				 labelElement.removeClass("checked");
			 }
		});
	}.observes("data.checked"),
	
	init:function(){
        this._super();
},
actions:{
	labelClicked:function(){
		this.sendAction("data.clickAction",this.get("data.params"));
	}
},

	didInsertElement:function(){
		this._super();
		var self = this;
		Ember.run.schedule("afterRender",function(){
			self.checkedObserver();
		});
	}
});

//ignorei18n_end