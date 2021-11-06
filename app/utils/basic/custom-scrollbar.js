//ignorei18n_start
import Ember from 'ember';
import Initializer from 'emberapp/utils/basic/initializer';

let scrollbar = Initializer({
	parent: "Components",
	name : "Scrollbar"
});

scrollbar.createOrUpdate = function(selector, scroll) {
	Ember.$(selector).each(function() {
		if(Ember.$(this).hasClass("mCustomScrollbar")) {
			Ember.$(this).mCustomScrollbar("update");
			if(scroll){
				let self = this;				
				Ember.run.later(function () {
            	    Ember.$(self).mCustomScrollbar("scrollTo", scroll);
				}, 100);
			}
		}
		else {
			if (Ember.$(this).attr('data-height')) {
				let height = Ember.$(this).attr('data-height');
				Ember.$(this).css({ "overflow": "hidden", "height": height+"px" });
			}
			Ember.$(this).mCustomScrollbar({
				autoHideScrollbar: true,
				scrollInertia: 400,
				mouseWheelPixels: 50,
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
};

scrollbar.destroy = function(selector) {
	Ember.$(selector).each(function() {
		Ember.$(this).mCustomScrollbar("destroy");
	});
};

export default scrollbar;
//ignorei18n_end
