//ignorei18n_start
import Ember from 'ember';

export default Ember.Object.create({

  /*

		DIRECTLY MANIPULATING EMBER'S CONTAINER ( WHICH IS DOUBLE PRIVATE )
		MAY/MAYNOT WORK ON UPGRADING EMBER. USE AS MINIMAL AS POSSIBLE.

  */


  getEmberElement(instance,elemId) {
    var ct = instance.container.lookup("-view-registry:main");
    return ct[elemId];
  },

  rerenderEmberElement(instance,elemId) {
    if(typeof elemId !== "undefined") {
      this.getEmberElement(instance,elemId).rerender();
    }
  },

  setParamForComponent(instance,elemId,param,value) {
    if(typeof this.getEmberElement(instance,elemId) !== "undefined") {
      this.getEmberElement(instance,elemId).set(param,value);
    }
  },

  sendActionToComponent(instance,compId,action) {
    if(typeof this.getEmberElement(instance,compId) !== "undefined") {
      this.getEmberElement(instance,compId).send(action);
    }
  }

});
//ignorei18n_end
