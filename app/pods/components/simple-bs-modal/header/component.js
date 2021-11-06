//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ["modal-header"],

	actions: {

		closeModal: function() {
      Ember.$("#"+this.get("data.elementID")).modal("hide");
    }

	}

});
//ignorei18n_end
