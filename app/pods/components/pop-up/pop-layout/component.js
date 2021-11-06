//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

	classNameBindings: ['isNewCss:dropdown-menu','isNewCss:dropdown-menu-right','isNewCss:ela-pd-10'],
  onInitialLoad: function() {
    this.onResizing = Ember.run.bind(this, this.alignElement);
  }.on('init'),

  onInsertion: function() {
    this.alignElement();
    Ember.$(window).on("resize",this.onResizing);
    Ember.$("#"+this.get("parentElemId")).css("visibility","visible");
    this.alignElement();
  }.on("didInsertElement"),
  
  didRender : function(){
	if(this.isCenterAligned){
		Ember.$("#"+this.get("elementId")).removeClass("dropdown-menu-right");
	}
  },

  alignElement: function() {
    if(typeof this.get("fixto") !== "undefined") {
      let elem = Ember.$("#"+this.get("parentElemId"));
      let parent = Ember.$(this.get("fixto"));
      let actualParent = Ember.$("#"+this.get("parentElemId")).parent();

      let top = parent.offset().top - actualParent.offset().top + parent.height();

      let left = parent.offset().left - actualParent.offset().left + parent.width()/2 - elem.width()/2;
			if(this.get("isNewCss")) {

			}
      elem.css("left",left+"px");
       Ember.run.schedule("afterRender", this, function () {
		if(window.innerHeight  < (top + 450)) {
			this.set("dropup",true);
			elem.css("top",top-20+"px");
		}
		else
		{
			this.set("dropup",false);
			elem.css("top",top+"px");
		}
    });
    }
  }.observes("fixto"),

  goingToDestroy: function() {
    if(this.onResizing) {
      Ember.$(window).off('resize', this.onResizing);
    }
  }.on('willDestroyElement')

});
//ignorei18n_end
