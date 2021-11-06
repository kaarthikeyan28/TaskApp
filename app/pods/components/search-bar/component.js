//ignorei18n_start

import Ember from 'ember';

export default Ember.Component.extend({

    searchstate:"",
    autocompopen: false,
    search:false,
    searchText:"",
    selindex: 0,
    selected:"",
    focusOutListener: null,
    currstate: "closed",

    onInitialLoad:function() {
      this.set("searchValue","");
    	if(!this.get("TOOLTIP")){
    		this.set("TOOLTIP",this.get("I18N.ember_search"));
    	}
    }.on("init"),

    insElem: function() {
      this.focusOutListener = Ember.run.bind(this, this.onFocusOut);
      Ember.run.scheduleOnce("afterRender",this,function() {
        Ember.$(document).on("click",this.focusOutListener);
      });
    }.on('didInsertElement'),

    goingToDestroy: function() {
      if(this.focusOutListener) {
        Ember.$(document).off("click",this.focusOutListener);
      }
    }.on('willDestroyElement'),

    //window.event used to support IE8
    onFocusOut: function(e) {
      var target = null;
      if(!e) {
        e = window.event;
        target = e.srcElement;
      }
      else {
        target = e.target;
      }
      try {
        if(Ember.$(target).closest("#"+this.get("elementId")).length === 0 && this.get("currstate") === "opened") {
          if(this.get("search") === false) {
            this.send("searchclose");
          }
          else if(this.get("search") && this.get("searchValue") !== this.get("searchText")) {
            this.set('autocompopen',false);
            this.set("searchValue",this.get("searchText").toString());
          }
        }
      }
      catch(exception) {
        window.console.log("Exception in search bar : "+exception);
      }
    },

    actions: {

        searchopen: function() {
          if(this.get("alwaysOpen") !== true) {
            this.set('selindex',-1);
            this.set("selected","");
            this.set('searchstate',"open hover");
            this.set("currstate","opened");
            this.set("AC_CONTENT",[]);
            this.set('autocompopen',true);
            var elemId = '#'+this.get('elementId')+" .search-input";
            Ember.run.scheduleOnce("afterRender",this,function(){
              Ember.$(elemId).focus();
            });
          }
        },

        searchclose: function() {
            this.set('selindex',-1);
            this.set("selected","");
            this.set('AC_CONTENT',[]);
            this.set('searchstate',"");
            this.set("currstate","closed");
            this.set("searchValue","");
            if(this.get('search') === true) {
              this.sendAction('actionReceiver',this.get("ONCLEAR"));
            }
            if(this.get("alwaysOpen") === true) {
              this.sendAction('actionReceiver',this.get("ON_AC_CLEAR"));
            }
            this.set('autocompopen',false);
            this.set('search',false);
            this.set("searchText","");
        },

        searchSimplyClose: function() {
          this.set('selindex',0);
          this.set('AC_CONTENT',[]);
          this.set('searchstate',"");
          this.set("currstate","closed");
          this.set("searchValue","");
          this.set('autocompopen',false);
          this.set('search',false);
          this.set("searchText","");
        },

        keyUp: function(text, event) {
          let key = (event.keyCode) ? event.keyCode : event.which;
          if(Ember.isEmpty(this.get("searchValue"))) {
            this.set("autocompopen",false);
            if(this.get("alwaysOpen")) {
              this.sendAction("actionReceiver",this.get("ON_AC_CLEAR"));
            }
            if(key !== 8 && key !== 46) {
              this.send("searchclose");
            }
          }
          else {
            switch (key) {
              case 13:
                if(parseInt(this.get("selindex")) !== -1) {
                  this.send('selected',this.get('AC_CONTENT')[this.get('selindex')]);
                }
                else {
                  this.send('selected',this.get("searchValue"));
                }
                event.preventDefault();
                return false;
              break;
              case 38:
                if(this.get('selindex') > -1) {
                  if(this.get('selindex') !== 0) {
                    let dummyVar = parseInt(this.get('selindex'));
                    for(; dummyVar > 1; dummyVar--) {
                      if(typeof this.get('AC_CONTENT')[dummyVar - 1] === "object" && !this.get('AC_CONTENT')[dummyVar - 1].IS_CHILD) {
                        continue;
                      }
                      else {
                        break;
                      }
                    }
                    if(typeof this.get('AC_CONTENT')[dummyVar - 1] !== "object" || this.get('AC_CONTENT')[dummyVar - 1].IS_CHILD) {
                      this.set('selindex',dummyVar-1);
                    }
                  }
                  this.set('selected',this.get('AC_CONTENT')[this.get('selindex')]);
                  this.send("searchSelector",this.get('AC_CONTENT')[this.get('selindex')]);
                }
              break;
              case 40:
                if(this.get('selindex') < this.get('AC_CONTENT').length) {
                  if(this.get('selindex') !== this.get('AC_CONTENT').length-1) {
                    let dummyVar = parseInt(this.get('selindex'));
                    for(; dummyVar < this.get('AC_CONTENT').length-2; dummyVar++) {
                      if(typeof this.get('AC_CONTENT')[dummyVar + 1] === "object" && !this.get('AC_CONTENT')[dummyVar + 1].IS_CHILD) {
                        continue;
                      }
                      else {
                        break;
                      }
                    }
                    if(typeof this.get('AC_CONTENT')[dummyVar + 1] !== "object" || this.get('AC_CONTENT')[dummyVar + 1].IS_CHILD) {
                      this.set('selindex',dummyVar+1);
                    }
                  }
                  this.set('selected',this.get('AC_CONTENT')[this.get('selindex')]);
                  this.send("searchSelector",this.get('AC_CONTENT')[this.get('selindex')]);
                }
              break;
              default:
                this.set('selindex',-1);
                this.set("selected","");
                this.set('autocompopen',true);
                this.sendAction('actionReceiver',this.get("AC_ACTION"),this.get("searchValue"));
            }
          }
        },

        searchSelector: function(opt) {
          if(typeof this.get("resultProperties") !== "undefined" && typeof opt === "object") {
            let res = opt[this.get("resultProperties").resDisplayKey];
            this.set("searchValue",res);
            this.set("searchText",res);
          }
          else {
            this.set("searchValue",opt);
            this.set("searchText",opt);
          }
          Ember.run.scheduleOnce("afterRender",this,function(){
            this.send("calcPosition");
          });
        },

        selected: function(opt) {
          if(this.get("alwaysOpen") !== true) {
            this.set('autocompopen',false);
            this.set('search',true);
            this.send("searchSelector",opt);
          }
          if(this.get("closeOnceClicked")) {
            this.send("searchclose");
          }
          this.sendAction('actionReceiver',this.get("ACTION"),opt);
        },

        calcPosition: function() {
          if(Ember.$("#"+this.get("elementId")+" .dropdown span").length > 0 && Ember.$("#"+this.get("elementId")+" .dropdown span.searchSelectedDD").length > 0) {
            let firstelemoffset = Math.abs(Ember.$("#"+this.get("elementId")+" .dropdown span").first().position().top);
            let elementOffset = Ember.$("#"+this.get("elementId")+" .dropdown span.searchSelectedDD").position().top;
            let parentHeight = Ember.$("#"+this.get("elementId")+" .dropdown").height();
            let elementHeight = Ember.$("#"+this.get("elementId")+" .dropdown span.searchSelectedDD").height();
            if(elementOffset < 0) {
              Ember.$("#"+this.get("elementId")+" .dropdown").scrollTop((firstelemoffset + elementOffset) - parentHeight + elementHeight);
            }
            else if(elementOffset > (parentHeight-elementHeight)) {
              Ember.$("#"+this.get("elementId")+" .dropdown").scrollTop(firstelemoffset + elementOffset);
            }
          }
        }

    }

});

//ignorei18n_end
