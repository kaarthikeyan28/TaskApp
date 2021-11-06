//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ["left-top-pane"],
  classNameBindings:["type"],

  onRender: function() {
    Ember.$("#clientTab #selTab a span").css("background","#eeeff0");
  }.on("didInsertElement")

});
//ignorei18n_end
