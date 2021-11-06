//ignorei18n_start
import Ember from 'ember';
import CommonUtil from 'emberapp/utils/common-utilities';

export default Ember.Component.extend({
  classNames: ['site-list', 'ela-w-330', 'pull-left'],
  height: 258,
  onInsertion: function () {
    var size = this.get("data.size") ? this.get("data.size") * 37 : 5 * 37;
    this.set('height', size - 1);
  }.on('didInsertElement'),

  send: function () {
    if (arguments[0] !== null && arguments[0] !== "null") {
      this.set('action', arguments[0]);
      if (Ember.get(this._actions, arguments[0])) {
        this._super.apply(this, arguments);
      } else {
        if (typeof this.get('action') !== "undefined") {
          arguments[0] = 'action';
          this.sendAction.apply(this, arguments);
        }
      }
    }
  },
  actions: {
    onCheckClick: function (title, isEnabled) {
      var newsel = [];
      if (isEnabled) {
        newsel = CommonUtil.addIfNotThereInArray(title, this.get('data.selected'));
      } else {
        newsel = CommonUtil.removeOneItemFromArray(title, this.get('data.selected'));
      }
      this.set('data.selected', newsel);
      //call parent component
      this.sendAction("data.changedAction", this.get('data.selected'));
    },
  }
});
//ignorei18n_end