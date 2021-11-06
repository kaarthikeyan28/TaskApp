//ignorei18n_start
import Ember from 'ember';
export default Ember.Component.extend({
  classNames: ["content-pop-up"],
	classNameBindings: ['isNewCss:dropdown','isNewCss:arrow-dropdown','isNewCss:absolute','isNewCss:open','dropup'],
  dropup:false,
  onInitialLoad: function() {
    this.focusOutListener = Ember.run.bind(this, this.onFocusOut);
  }.on('init'),
  
  onInsertion: function() {
    Ember.$(document).on("click",this.focusOutListener);
  }.on('didInsertElement'),
  
  onFocusOut: function(e) {
    if(Ember.$(e.target).closest("#"+this.get("elementId")).length === 0 && Ember.$(e.target).closest(this.get("fixto")).length === 0) {
      this.set("show",false);
      this.sendAction("onHide");
    }
  },

  goingToDestroy: function() {
    if(this.focusOutListener) {
      Ember.$(document).off("click",this.focusOutListener);
    }
  }.on('willDestroyElement')

});
//ignorei18n_end
