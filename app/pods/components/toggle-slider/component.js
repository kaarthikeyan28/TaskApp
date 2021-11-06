//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ["toggler-parent"],

  onInsertion: function() {
    if(typeof this.get("disabled_tooltip") !== "undefined") {
      Ember.$("#"+this.get("elementId")+" > div.toggler.disabled").tooltip({container:"#ELAEmberIncluder",trigger:"hover",title:this.get("disabled_tooltip"),animation:false});
    }
  }.on("didInsertElement"),

  onDestroying: function() {
    Ember.$("#"+this.get("elementId")+" > div.toggler.disabled").tooltip("destroy");
  }.on("willDestroyElement"),

  onInitialLoad: function() {

    this.set("observerCallFlag",false);
    this.set("secObsCallFlag",false);
    Ember.run.scheduleOnce("afterRender",this,function(){
        var self=this;
        Ember.$('#'+this.get("elementId")+' .toggler').toggles({on:this.get("on_state")});
        Ember.$('#'+this.get("elementId")+' .toggler').on('toggle', function(e, active) {
          self.set("observerCallFlag",true);
          if (active) {
            self.set("on_state",true);
          } else {
            self.set("on_state",false);
          }
          self.sendAction("on_change",active);
          self.set("observerCallFlag",false);
        });
    });

  }.on("init"),


  state_observer: function() {
    if(this.get("observerCallFlag") !== true) {
      Ember.run.scheduleOnce("afterRender",this,function() {
        Ember.$('#'+this.get("elementId")+' .toggler').toggles(this.get("on_state"));
      });
    }
  }.observes("on_state")


});
//ignorei18n_end
