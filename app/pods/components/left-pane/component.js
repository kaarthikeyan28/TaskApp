//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

  AJAX: Ember.inject.service('ajax-service'),

  defaultOpenParent: function() {
    if(typeof this.get("openDefault") !== "undefined") {
      return this.get("openDefault");
    }
    return undefined;
  }.property("openDefault"),

  actions: {

    toggleLeftPane: function() {
      let elemId = "#"+this.get("elementId");
      let selector = elemId+" .ela-left-pane-shifter";
      if(Ember.$(elemId+" .ela-left-pane-child .left-top-pane").length === 0) {
        selector += " , "+elemId+" .left-pane-search";
      }
      if(Ember.$(elemId+" .ela-left-panel").hasClass("open")) {
        Ember.$(selector).animate({
          left: "-=250"
        }, 500, function() {
        });
        Ember.$(elemId+" .toggle-btn").animate({
          left: "-=242"
        }, 500, function() {
        });
        Ember.$(elemId+" .ela-left-panel").removeClass("open");
        Ember.$(elemId+" .ela-left-pane-child").removeClass("pane-open");
      }
      else {
        Ember.$(selector).animate({
          left: "+=250"
        }, 500, function() {
        });
        Ember.$(elemId+" .toggle-btn").animate({
          left: "+=242"
        }, 500, function() {
        });
        Ember.$(elemId+" .ela-left-panel").addClass("open");
        Ember.$(elemId+" .ela-left-pane-child").addClass("pane-open");
      }
      Ember.$(window).trigger('resize');
    },

    onSelection: function(obj) {
      if(this.get("onSelection") !== "undefined") {
        this.sendAction("onSelection", obj);
      }
    },

    searchAction: function(action,param) {
      var self=this;
      Ember.$("#"+this.get("elementId")+" .left-pane-search .loading_search").addClass("hidden");
      switch (action) {

        case "autoComplete": {
            let tempVar = new Date().getTime().toString();
            this.set(tempVar,"temp");
            Ember.$("#"+this.get("elementId")+" .left-pane-search").addClass("search-active");
            if(typeof param !== "undefined") {
              Ember.run.later(()=>{
                if(this.get(tempVar) !== null && Ember.$("#"+this.get("elementId")+" .left-pane-search").hasClass("search-active")) {
                  Ember.$("#"+this.get("elementId")+" .left-pane-search .no_result").addClass("hidden");
                  Ember.$("#"+this.get("elementId")+" .left-pane-search .search_results").addClass("hidden");
                  Ember.$("#"+this.get("elementId")+" .left-pane-search .loading_search").removeClass("hidden");
                }
              },1000);
              let req = this.get("search.request");
              req.SEARCH_QUERY = param;
              this.get('AJAX').request(this.get("search.queryURL"),"request="+encodeURIComponent(JSON.stringify(req))).then(function(json) {
                Ember.$("#"+self.get("elementId")+" .left-pane-search .loading_search").addClass("hidden");
                self.set(tempVar,null);
                self.set("search.autocompleteList",[]);
                let totalCount = 0;
                if(json.STATUS_CODE === "0" && typeof json.RESULT !== "undefined" && json.RESULT.length > 0 && Ember.$("#"+self.get("elementId")+" .left-pane-search").hasClass("search-active")) {
                  Ember.$("#"+self.get("elementId")+" .left-pane-search .no_result").addClass("hidden");
                  Ember.$("#"+self.get("elementId")+" .left-pane-search .search_results").removeClass("hidden");
                  for(var i=0;i<json.RESULT.length;i++) {
                    self.get("search.autocompleteList").pushObject({ID:json.RESULT[i][self.get("search.resultProperties.resPrimaryKey")], NAME: json.RESULT[i][self.get("search.resultProperties.resDisplayKey")]});
                    if(typeof json.RESULT[i].LIST !== "undefined" && json.RESULT[i].LIST.length > 0) {
                      for(var j=0;j<json.RESULT[i].LIST.length;j++) {
                        let obj = {
                          ID:json.RESULT[i].LIST[j][self.get("search.resultProperties.resPrimaryKey")],
                          NAME: json.RESULT[i].LIST[j][self.get("search.resultProperties.resDisplayKey")],
                          IS_CHILD: true
                        }
                        self.get("search.autocompleteList").pushObject(obj);
                        totalCount++;
                      }
                    }
                  }
                  if(totalCount >= 100) {
                    totalCount = totalCount+"+";
                  }
                  Ember.$("#"+self.get("elementId")+" .left-pane-search .search_results").text(totalCount+" search result(s)");
                }
                else if(Ember.$("#"+self.get("elementId")+" .left-pane-search").hasClass("search-active")) {
                  Ember.$("#"+self.get("elementId")+" .left-pane-search .search_results").addClass("hidden");
                  Ember.$("#"+self.get("elementId")+" .left-pane-search .no_result").removeClass("hidden");
                }
              });
            }
          break;
        }

        case "optionClicked": {
          Ember.$("#"+this.get("elementId")+" .left-pane-search .no_result").addClass("hidden");
          Ember.$("#"+this.get("elementId")+" .left-pane-search .search_results").addClass("hidden");
          if(param.ID !== "NORESFOUND" && param.IS_CHILD) {
            this.send("optionClicked",param);
          }
          break;
        }

        default: {
          Ember.$("#"+this.get("elementId")+" .left-pane-search .no_result").addClass("hidden");
          Ember.$("#"+this.get("elementId")+" .left-pane-search .search_results").addClass("hidden");
          if(typeof param === "undefined" || param.trim().length === 0) {
            Ember.$("#"+this.get("elementId")+" .left-pane-search").removeClass("search-active");
            this.set("search.autocompleteList",[]);
          }
        }

      }
    },

    optionClicked: function(selectedObj) {
      if(!Ember.$("[data-lp-pk='"+selectedObj.ID+"'].single_parent").first().parents(".normal_parent").hasClass("open")) {
        Ember.$("[data-lp-pk='"+selectedObj.ID+"'].single_parent").first().parents(".normal_parent").find("a").first().click();
      }
      Ember.$("#"+this.get("elementId")+" .left-navigation .lnav_leftpane [data-lp-pk='"+selectedObj.ID+"'] a.single_choosable_element").click();
    }


  }

});
//ignorei18n_end
