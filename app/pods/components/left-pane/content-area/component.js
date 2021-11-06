//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ["ela-pane-content-area"],

  onInsertion: function() {
    this.scrollTopFunction();
  }.on("didInsertElement"),

  scrollTopFunction: function() {
    let elementId = "#"+this.get("elementId");
    Ember.$(elementId).on("scroll", function() {
      if (Ember.$(this).scrollTop() > 160) {
        Ember.$(elementId+"goTop").fadeIn();
      } else {
        Ember.$(elementId+"goTop").fadeOut();
      }
    });
  },

  actions: {

    goToTop: function() {
      Ember.$("#"+this.get("elementId")).animate({scrollTop : 0},500);
    }

  }

});
//ignorei18n_end
