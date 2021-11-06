//ignorei18n_start

import Ember from 'ember'; //No I18N

export default Ember.Component.extend({

  action: "",
  classNameBindings: ["json.PARENT_CLASS"],
  classNames: ["icon-set-view"],
  tt_placement: "top",
  onInsertion: function () {
    let html = this.get("json.IS_HTML") ? true : false;
    if (this.get("json.TOOLTIP_TEXT_PLACEMENT")) {
      this.set("tt_placement", this.get("json.TOOLTIP_TEXT_PLACEMENT"));
    }
    Ember.$("#" + this.get("elementId") + " > div").tooltip({ container: "#ELAEmberIncluder", trigger: "hover", placement: this.get("tt_placement"), title: this.get("json.TOOLTIP_TEXT"), animation: false, html: html });

  }.on("didInsertElement"),

  onDestroying: function () {
    Ember.$("#" + this.get("elementId") + " > div").tooltip("destroy");
  }.on("willDestroyElement"),

  actions: {
    sendToController: function (receiver) {
      if (typeof receiver !== "undefined") {
        this.set('action', receiver);
        this.sendAction('action', this.get("json.PARAM"), this.get("arg"));
      }
    }
  }

});

//ignorei18n_end
