//ignorei18n_start
import Ember from 'ember';

export default Ember.Route.extend({
  destroyer: function() {
    this.controller.destroy();
  }.on("deactivate"),

  actions: {
		didTransition: function () {

		}
  }
});
//ignorei18n_end
