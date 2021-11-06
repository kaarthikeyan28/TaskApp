//ignorei18n_start
import Ember from 'ember';
import CustomScrollbar from 'emberapp/utils/basic/custom-scrollbar';

/*
attributes:
onGrow  : [optional] .. [bottom, top] (SCroll bar move to position)
length  : [attribute binding to trigger onUpdate] 
          usually length is bound so if the under lying data chnages onUpdate is triggeerd 
data-height: height of the visiable area.
*/
export default Ember.Component.extend({
  scrollComponent: '',
  onInit: function() {
    this.set('scrollComponent', "#" + this.get('elementId'));     
  }.on('init'),
    
  onRedner: function() {
    var component = Ember.$(this.scrollComponent);
    component.attr("data-height", this.get('data-height'));
    CustomScrollbar.createOrUpdate(this.scrollComponent, this.get('onGrow'));
  }.on('didRender'),

  onUpdate: function(){
    CustomScrollbar.createOrUpdate(this.scrollComponent, this.get('onGrow'));
  }.on('didUpdateAttrs'),

  goingToDestroy: function() {
    CustomScrollbar.destroy(this.scrollComponent);
  }.on('willDestroyElement')

});
//ignorei18n_end
