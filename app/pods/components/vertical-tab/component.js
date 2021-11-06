//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

	selected:'',
	action:'',
	
	onInit: function() {
		var self=this;
		this.set('action',this.get('ACTION'));
		this.set('selected',this.get('tabData.LIST')[0].ID);
		Ember.run.scheduleOnce("afterRender",this,function() {
			self.send('setSelected',self.get('selected'));
		});
	}.on('init'),

	didInsertElement: function(){
		this.$(".enable-scroll").each(function() {
			if(Ember.$(this).hasClass("mCustomScrollbar")) {
				Ember.$(this).mCustomScrollbar("update");
			}
			else {
				if (Ember.$(this).attr('data-height')) {
					Ember.$(this).height(Ember.$(this).attr('data-height')).css({ "overflow": "hidden" });
				}
				Ember.$(this).mCustomScrollbar({
					autoHideScrollbar: true,
					callbacks: {
						onScroll: function(evt) {
						},
						onTotalScroll: function(evt) {
							return false;
						},
						onTotalScrollBack: function(evt) {
							return false;
						},
						whileScrolling: function() {
							Ember.$(this).trigger('whileScrolling', [this.mcs.left, Math.abs(this.mcs.top)]);
						}
					}
				});
			}
	    });
	}.on("didInsertElement"),
	
	onDestroying: function() {
		this.$('.enable-scroll').each(function() {
			Ember.$(this).mCustomScrollbar("destroy");
		});
	}.on("willDestroyElement"),
  
	actions: {
		
		setSelected: function(id){
			this.set('selected',id);
			Ember.$("li[data-tabid='" + id + "']").addClass("active");
		},
		
		verticalTabAction:function(id){
			Ember.$("li[data-tabid=" + this.get('selected') + "]").removeClass("active");
			this.send('setSelected',id);
			this.sendAction('action',id);
		}
	}

});
//ignorei18n_end
