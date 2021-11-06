//ignorei18n_start
import Ember from 'ember';

export default Ember.Component.extend({

    action: "",
    classNameBindings:["data.parentClass"],
    classNames:["bs-select-2"],

    attributeSetter: function() {

      var component = Ember.$("#"+this.get('elementId')+" select");

      ((this.get("data.placeholder")) ? component.attr("title", this.get("data.placeholder")) : "");

      ((this.get("data.selected-text-format")) ? component.attr("data-selected-text-format", this.get("data.selected-text-format")) : "");

      ((this.get("data.style")) ? component.attr("data-style", this.get("data.style")) : "");

      ((this.get("data.show-tick")) ? component.addClass("show-tick") : component.removeAttr("show-tick"));

      ((this.get("data.width")) ? component.attr("data-width",this.get("data.width")) : "");

      ((typeof this.get("data.disabled") !== "undefined") ? component.attr("disabled",this.get("data.disabled")) : component.removeAttr("disabled"));

      ((this.get("data.size")) ? component.attr("data-size",this.get("data.size")) : component.attr("data-size","5"));

      ((typeof this.get("data.liveSearch") !== "undefined") ? component.attr("data-live-search",this.get("data.liveSearch")) : component.attr("data-live-search","true"));

      ((this.get("data.multiple")) ? component.attr("multiple","") : "");

      ((this.get("data.container")) ? component.attr("data-container",this.get("data.container")) : "");

			((this.get("data.dataActionsBox")) ? component.attr("data-actions-box",this.get("data.dataActionsBox")) : "");

    }.on('didInsertElement'),

    destroy: function() {
      var component = Ember.$("#"+this.get('elementId')+" select");
      component.selectpicker('destroy');
    }.on("willDestroyElement"),

    afterRendering: function() {
			if(this.get("data")) {
        var component = Ember.$("#"+this.get('elementId')+" select");
        component.selectpicker('destroy');
        this.attributeSetter();
        component.selectpicker().selectpicker('val', this.get('data.selected'));
        if(this.get("data.multiple") !== true) {
          this.set('data.selectedTitle',component.find("[value='"+this.get('data.selected')+"']").attr("title"));
        }
        else if(this.get("data.selected").length === 0) {
            Ember.$("#"+this.get("elementId")+" .default-select.selectActionBS").parent("li").addClass("selectedAction");
        }
        else {
          Ember.$("#"+this.get("elementId")+" .default-select.selectActionBS").parent("li").removeClass("selectedAction");
        }
        if(this.get("data.nobutton") === true) {
          Ember.$("#"+this.get('elementId')).find("button").hide();
        }
			}
    }.on("didRender"),

    selectedTitleSetter: function() {
      var flag = 0;
      for(var i=0;i<this.get("data.select").length;i++) {
        if(!Ember.isEmpty(this.get("data.select")[i].option)) {
          for(var j=0;j<this.get("data.select")[i].option.length;j++) {
            if(typeof this.get("data.select")[i].option[j].value !== "undefined" && typeof this.get("data.selected") !== "undefined") {
              if(this.get("data.select")[i].option[j].value.toString() === this.get("data.selected").toString()) {
                this.set("data.selectedTitle",this.get("data.select")[i].option[j].title);
                this.renderSelectedTitle();
                return;
              }
            }
          }
        }
      }
      this.renderSelectedTitle();
    }.observes("data.selected"),

    renderSelectedTitle: function() {
      Ember.run.scheduleOnce("afterRender",this,function() {
        var component = Ember.$("#"+this.get('elementId')+" select");
        component.selectpicker('val', this.get('data.selected'));
      });
    },
    initialActions:function(){
      if(this.get("data.parentClass")){
        this.set("classNames",this.get("data.parentClass"));
      }
    }.on('init'),

    actions: {

        valueChanged: function() {
            var component = Ember.$("#"+this.get('elementId')+" select");
            var selected = component.selectpicker('val');
            var toSend = [], datatype, selectable, token, defselect, flag=false;
            Ember.$("#"+this.get("elementId")+" a.selectActionBS").parent("li").removeClass("selectedAction");
            if(this.get("data.multiple") === true) {
                if(selected !== null) {
                  for(var i=0;i<selected.length;i++) {
                      datatype = component.find("[value='"+selected[i].replace("'","\\'")+"']").attr("data-type");
                      if(datatype === "option") {
                        toSend.push(selected[i]);
                      }
                      else if(datatype === "action") {
                        selectable = component.find("[value='"+selected[i].replace("'","\\'")+"']").attr("data-selectable");
                        token = component.find("[value='"+selected[i]+"']").attr("data-tokens");
                        if((selectable === true || selectable === "true") && typeof token !== "undefined") {
                            Ember.$("#"+this.get("elementId")+" .default-select.selectActionBS").parent("li").removeClass("selectedAction");
                            Ember.$("#"+this.get("elementId")+" li > [data-tokens='"+token+"']").parent("li").addClass("selectedAction");
                        }
                        component.selectpicker().selectpicker('val', this.get('data.selected'));
                        Ember.$("#"+this.get("elementId")+" .dropdown-toggle").dropdown("toggle");
                        this.set('action',selected[i]);
                        this.sendAction('action');
                        flag = true;
                        break;
                      }
                  }
                }
                if(toSend.length === 0 && !flag) {
                  Ember.$("#"+this.get("elementId")+" .default-select.selectActionBS").parent("li").addClass("selectedAction");
                }
                this.set("data.selected",toSend);
                if(typeof this.get("data.changedAction") !== "undefined") {
                  this.sendAction("data.changedAction",toSend,this.get("data.ID"));
                }
            }
            else {
              switch(component.find("[value='"+selected.replace("'","\\'")+"']").attr("data-type")) {
                case "option":
                  this.set('data.selected',selected);
                  if(typeof this.get("data.changedAction") !== "undefined") {
                    this.sendAction("data.changedAction",this.get('data.selected'),this.get('data.selectedTitle'),this.get('data.ID'));
                  }
                break;
                case "action":
                  component.selectpicker().selectpicker('val', this.get('data.selected'));
                  this.set('action',selected);
                  this.sendAction('action');
                break;
              }
          }
        }
    }

});
//ignorei18n_end
