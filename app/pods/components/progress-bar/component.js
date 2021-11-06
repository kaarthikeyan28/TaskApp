//ignorei18n_start

import Ember from 'ember';

export default Ember.Component.extend({

    showContainer: true,

    progressObserver: function() {
      var parentFunc = this;
      if(parentFunc.get('progress')>=10 || parentFunc.get('progress')<=0 ) {
          Ember.run.later((function(){
              if(parentFunc.get('progress')>=10 || parentFunc.get('progress')<=0) {
                  parentFunc.set('showContainer',false);
              }
          }),600);
      }
      else {
          parentFunc.set('showContainer',true);
      }
    }.observes('progress')

});

//ignorei18n_end
