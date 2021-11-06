//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

	showStyle:false,
	tagName:"",
	previous:'',
	onInit: function() {
		this.send('getItReady');
	}.on('init'),
 
	didUpdateParams: function(){
		Ember.$("tr[data-primarykey='"+this.get('previous')+"']").removeClass("active");
		this.send('getItReady');
	}.on('didUpdateAttrs'),
 
	actions: {
		
		setTwoColumnClass: function(){
			Ember.$("tr[data-primarykey='"+this.get('ID')+"']").addClass("active");
			Ember.$(".ela-subtable-box").addClass("ela-left-scroll-280");
		},
		
		getItReady: function(){
			this.set('previous',this.get('ID'));
			this.send('setTwoColumnClass');
			this.set('closeAct',this.get('onClose'));
			this.set('showStyle',true);
		},
		
		closeAction: function(){
			Ember.$("tr[data-primarykey='"+this.get('ID')+"']").removeClass("active");
			Ember.$(".ela-subtable-box").removeClass("ela-left-scroll-280");
			this.set('action',this.get('closeAct'));
			this.sendAction('action');
		}
	}

});
//ignorei18n_end
