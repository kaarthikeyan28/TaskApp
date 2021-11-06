/* $Id$ */
//ignorei18n_start

import Ember from 'ember';

export default Ember.Component.extend({
	actions:{
		labelClicked:function(){
			var inputElement = this.$("input");
			var labelElement = this.$("label");
			 if(inputElement.prop("checked") === true) {
				 	this.set("data.checked",false);
				 	inputElement.prop("checked",false);
				 	labelElement.removeClass("checked");
			      }
			      else {
			    	  this.set("data.checked",true);
			    	  inputElement.prop("checked",true);
					  labelElement.addClass("checked");
			      }
		}
	},
	
	didInsertElement:function(){
		this._super();
		var inputElement = this.$("input");
		

		if(this.get('data.class')) {
			inputElement.addClass(this.get('data.class')) 
		};
		if(this.get('data.style')) {
			inputElement.attr("style",this.get('data.style')) 
		};
		
		//actions handling
		var self = this;
		this.sendAction("data.renderAction",inputElement);
	}
	
});
//ignorei18n_end



