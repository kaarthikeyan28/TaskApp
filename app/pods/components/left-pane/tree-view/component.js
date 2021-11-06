//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

  GLOBALSERVICE: Ember.inject.service('global-service'),

  onInitialLoad: function() {
    this.set("showTree",this.get("treeData.count") > 0);
  }.on("init"),

  createLeftPane : function() {
    if(this.get("showTree")) {
      var id = '#'+this.get("elementId")+'treeview';
      var self=this;
      Ember.$(id).navgoco({
        caretHtml: '<span class="caret-arrow"></span>',
        accordion: this.get('accordion'),
        openClass: 'open',
        save: false,
        onClickAfter: function onClickAfter(e, submenu) {
          if (submenu === false) {
            if(self.get("disableSelection") !== true) {
              Ember.$(id).find("li").removeClass("active");
              Ember.$(this).parent().addClass("active");
            }
            self.send("selectionDone",Ember.$(this).parent().attr("data-parentIndex"),Ember.$(this).parent().attr("data-index"));
          }
        }
      });
      Ember.$(".ela-left-pane").each(function () {
        Ember.$(this).mCustomScrollbar({
          autoHideScrollbar: true,
          mouseWheel:{ preventDefault:false }
        });
      });
      if(typeof this.get("defaultOpenParent") !== "undefined") {
        Ember.$("[data-lp-pk='"+this.get("defaultOpenParent")+"'].single_parent").first().parents(".normal_parent").find("a").first().click();
        if(self.get("disableSelection") !== true) {
          Ember.$(id).find("li").removeClass("active");
          Ember.$("[data-lp-pk='"+this.get("defaultOpenParent")+"'].single_parent").first().addClass("active");
        }
      }
      else if(self.get("disableSelection") !== true) {
        Ember.$(".single_parent").first().addClass("active");
        Ember.$(".single_parent").first().parents(".normal_parent").find("a").first().click();
      }
    }
  }.on("didInsertElement"),

  onDestroying: function() {
    Ember.$(".ela-left-pane").each(function () {
        Ember.$(this).mCustomScrollbar("destroy");
    });
    Ember.$(".innerScroller").each(function () {
        Ember.$(this).mCustomScrollbar("destroy");
    });
    Ember.$('#'+this.get("elementId")+'treeview').navgoco("destroy");
    this.set("showTree",false);
    this.set("treeData.tree",[]);
    this.set("treeData.count",0);
  }.on("willDestroyElement"),

  observeTreeDataList:function() {
    this.set("showTree",false);
    if(this.get("treeData.count") > 0) {
      this.set("showTree",true);
      Ember.run.scheduleOnce("afterRender",this,function() {
        this.createLeftPane();
      });
    }
  }.observes('treeData.count'),

  actions : {
      selectionDone: function(parentIndex, index) {
        if(typeof index === "undefined") {
            this.sendAction("onSelection", this.get("treeData.tree")[parseInt(parentIndex)]);
        }
        else {
          this.sendAction("onSelection", this.get("treeData.tree")[parseInt(parentIndex)].LIST[parseInt(index)]);
        }
      }
  }

});
//ignorei18n_end
