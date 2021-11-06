//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({
  
  action:"",
  classNameBindings:['moreActions'],
  actions: {

    sendToParent: function(actionname, key) {
      this.set("action",actionname);
      this.sendAction("action", key);
    }

  }

});
//ignorei18n_end
