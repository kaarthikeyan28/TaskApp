//ignorei18n_start

import Ember from 'ember';
import Translator from 'emberapp/utils/i18n-util';

export default Ember.Object.create({

  validate: function(element) {
    return !Ember.isEmpty(element);
  },

  validateString: function(string) {
    if(typeof string !== "undefined" && string!=="" && string!==null) {
      return true;
    }
    return false;
  },

  validateNumber: function(num) {
    if(typeof num !== "undefined" && num!=="" && num!==null && Ember.$.isNumeric(num)) {
      return true;
    }
    return false;
  },

  checkIfNumber: function(element) {
    if(Ember.$.isNumeric(element)) {
      if(parseInt(element)>=10) { //put a separate method for number > 10
        return true;
      }
    }
    return false;
  },

  validateEmail: function(email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(pattern.test(email) && email.length<=100){
        return true;
    }
    return false;
  },

  validateMultipleEmails: function(emails) {
    var emailList = emails.split(',');
    for(var i = 0; i < emailList.length; i++) {
    	var email = emailList[i].trim();
    	 var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    	    if(!(pattern.test(email) && email.length<=100)){
    	    	return false;
    	    }
    }
    return true;
  },
  validWindowsLocation: function(location){
    const regex = /^[a-zA-Z]:.*$/g;
    return regex.test(location);
  },
  
	isValidDeviceName: function (path) {
		return /^[^`~!@#$%^&*()=+\[\]{}\\|;:"',<>\/?]*$/.test(path);
	},

  isNumber:function (element) {
      if (Ember.$.isNumeric(element)) {
        return true;
      }
      return false;
  },

	removeAllValidation: function(parentSelector) {
		let parent = Ember.$(parentSelector);
		parent.find(".validate-text,.validate-number").addBack(".validate-text,.validate-number").each(function(){
			Ember.$(this).removeClass("error-control").removeClass("empty-entry").removeClass("invalid-entry");
		});
	},

	isInvalidForm: function(parentSelector) {
        let hasError = false;
        let self = this;
        let parent = Ember.$(parentSelector);
        parent.find(".validate-text,.validate-number").addBack(".validate-text,.validate-number").each(function() {
          let enabledInputs = Ember.$(this).find("input:visible:not([disabled]):not(.hidden):not([data-element='search-bar'])");
          let spanElements = Ember.$(this).find("span.error-text");
          for(var i=0;i<enabledInputs.length;i++) {
            let enabledInput = enabledInputs[i];
            let val = enabledInput.value;
            if(!val || val.trim().length === 0) {
              hasError = true;
              Ember.$(this).addClass("error-control").addClass("empty-entry");
              let text = enabledInputs.attr('data-empty-i18n');
              Ember.$(this).find('span.error-text.empty-error').each(function(){
                if(text){
                  Ember.$(this).text("* "+text);
                }else{
                  Ember.$(this).text("* "+Translator.translate("ember_invalid_value"));
                }
              });
              if(enabledInputs.attr("data-custom-span")){
                Ember.$("#"+enabledInputs.attr("data-custom-span")).closest(".form-group").addClass("error-control").addClass("invalid-entry");
              }
            }
          }
        });
	parent.find(".validate-selector").addBack(".validate-selector").each(function() {
          let component = Ember.$(this).find("select");
          if(component.length > 0) {
            let val = component.val();
            if(!val || val.length === 0) {
              hasError = true;
              Ember.$(this).addClass("error-control").addClass("empty-entry").addClass("nothing-select");
            }
          }
        });
        parent.find(".validate-number").addBack(".validate-number").each(function() {
          let enabledInputs = Ember.$(this).find("input:not([disabled]):not(.hidden)");
          let spanElements = Ember.$(this).find("span.error-text");
          let hasInvalid = false;
          if(enabledInputs.length > 0) {
            let val = enabledInputs.val();
            if(val && val.trim().length !== 0) {
              if(!Ember.$.isNumeric(val.trim())) {
                hasInvalid = true;
              }
              else {
                let minval = enabledInputs.attr("data-min-val");
                let maxval = enabledInputs.attr("data-max-val");
                if(minval) {
                  if(parseInt(val.trim()) < parseInt(minval)) {
                    hasInvalid = true;
                  }
                }
                if(maxval) {
                  if(parseInt(val.trim()) > parseInt(maxval)) {
                    hasInvalid = true;
                  }
                }
              }
              if(hasInvalid) {
                hasError = true;
                Ember.$(this).addClass("error-control").removeClass("empty-entry").addClass("invalid-entry");
                if(enabledInputs.attr("data-custom-span")){
                  Ember.$("#"+enabledInputs.attr("data-custom-span")).closest(".form-group").addClass("invalid-entry").addClass("error-control");
                }
              }
            }
          }
        });
        parent.find(".validate-multiple-email,.validate-email").addBack(".validate-multiple-email,.validate-email").each(function() {
          let enabledInputs = Ember.$(this).find("input:not([disabled]):not(.hidden)");
          let spanElements = Ember.$(this).find("span.error-text");
          if(enabledInputs.length > 0) {
            let val = enabledInputs.val();
            if(!val || val.trim().length === 0) {
              hasError = true;
              Ember.$(this).addClass("error-control").removeClass("invalid-entry").addClass("empty-entry");
            }else if(!self.validateMultipleEmails(val)){
              hasError = true;
              Ember.$(this).addClass("error-control").removeClass("empty-entry").addClass("invalid-entry");
            }
          }
        });
        parent.find(".validate-max-length").addBack(".validate-max-length").each(function() {
        	let enabledInputs = Ember.$(this).find("textarea:not([disabled]):not(.hidden),input:not([disabled]):not(.hidden)");
          let spanElements = Ember.$(this).find("span.error-text.empt");
          for(var i=0;i<enabledInputs.length;i++) {
            let enabledInput = enabledInputs[i];
          	let val = enabledInput.value;
            let maxLength = enabledInputs.attr('max-length') ? enabledInputs.attr('max-length') : 250;
            if(val.length > parseInt(maxLength)){
              hasError = true;
              let text = enabledInputs.attr('data-maxlen-i18n');
              Ember.$(this).addClass("error-control").removeClass("invalid-entry").addClass("empty-entry");
              Ember.$(this).find('span.error-text.empty-error').each(function(){
                if(text){
                  Ember.$(this).text("* "+text);
                }else{
                  Ember.$(this).text("* "+Translator.translate("ember_input_maximum_length_250"));
                }
              });
            }
          }
        });
        parent.find(".validate-special-characters").addBack(".validate-special-characters").each(function() {
          let enabledInputs = Ember.$(this).find("input:not([disabled]):not(.hidden)");
          let spanElements = Ember.$(this).find("span.error-text.empty-error");
          if(enabledInputs.length > 0) {
            let val = enabledInputs.val();
            if(self.validateName(val)) {
              hasError = true;
              Ember.$(this).addClass("error-control").removeClass("empty-entry").addClass("invalid-entry");
              let text = enabledInputs.attr('data-specialchars-i18n');
              Ember.$(this).find('span.error-text.empty-error').each(function(){
                if(text){
                  Ember.$(this).text("* "+text);
                }else{
                  Ember.$(this).text("* "+Translator.translate("ember_filed_invalid_char"));
                }
              });
            }
          }
        });
        parent.find(".validate-port").addBack(".validate-port").each(function() {
          let enabledInputs = Ember.$(this).find("input:visible:not([disabled]):not(.hidden)");
          let spanElements = Ember.$(this).find("span.error-text.empty-error");
          if(enabledInputs.length > 0) {
            let val = enabledInputs.val();
            if(!self.validatePort(val)) {
              hasError = true;
              Ember.$(this).addClass("error-control").removeClass("empty-entry").addClass("invalid-entry");
            let text = enabledInputs.attr('data-empty-i18n');
              Ember.$(this).find('span.error-text.empty-error').each(function(){
                if(text){
                  Ember.$(this).text("* "+text);
                }else{
                  Ember.$(this).text("* "+Translator.translate("ember_listenerport_error_invalid"));
                }
              });
            }
          }
        });
        parent.find(".validate-eventid").addBack(".validate-eventid").each(function() {
          let enabledInputs = Ember.$(this).find("input:not([disabled]):not(.hidden)");
          let spanElements = Ember.$(this).find("span.error-text.empty-error");
          for(var i=0;i<enabledInputs.length;i++) {
            let enabledInput = enabledInputs[i];
            let val = enabledInput.value;
            if(!self.validateEventID(val)) {
              hasError = true;
              Ember.$(this).addClass("error-control").removeClass("empty-entry").addClass("invalid-entry");
            }
          }
        });
        parent.find(".error-control").addBack(".error-control").find("textarea:not([disabled]):not(.hidden),input:not([disabled]):not(.hidden)").each(function(){
          Ember.$(this).on("focus",function(){
            Ember.$(this).closest(".error-control").removeClass("error-control").removeClass("empty-entry").removeClass("invalid-entry").removeClass("nothing-select");
            Ember.$(this).off("focus");
          });
        });
        parent.find(".validate-disabled-input").addBack(".validate-disabled-input").each(function() {
          let enabledInputs = Ember.$(this).find("input:not(.hidden):not([data-element='search-bar'])");
          if(enabledInputs.length > 0) {
            let val = enabledInputs.val();
            if(!val || val.trim().length === 0) {
              hasError = true;
              Ember.$(this).addClass("error-control").addClass("empty-entry");
              if(enabledInputs.attr("data-custom-span")){
                Ember.$("#"+enabledInputs.attr("data-custom-span")).closest(".form-group").addClass("error-control").addClass("invalid-entry");
              }
            }
          }
        });
        return hasError;
      },

	isAllDropdownValid: function(element){
		let parent = Ember.$(element);
		let isValid = true;
		parent.find("select").each(function() {
			var selected = Ember.$(this).selectpicker('val');
			if(selected == null){
				isValid = false;
			}
        });
        return isValid;
	},

	isValidSiteName: function(element) {
            return (/^[^@$&=+\\|;:"',<>/?]*$/.test(element) && element != "");
        },

        isMax255chars: function(element) {
                return (element.length <= 255);
          },
        validateMonint:function(element){
                return (this.checkIfNumber(element)&&(element <= 1435)&&(element == parseInt(element)));
            },

            validateFileSize: function(element){
                return (this.checkIfNumber(element)&&(element > 1000));
            },

  validateName: function(name){
	  var pattern = /[@#*()&=+}|><\\$-/:-?{-~!"^_`[\]]/;
	  return pattern.test(name);
  },

  validateEventID: function(str){
	  var pattern = /^[0-9,]*$/;
	  return pattern.test(str);
  },
  
  validatePort: function(port){
    var pattern = /^[0-9]{1,5}$/;
	  if(pattern.test(port)){
      let iPort = parseInt(port);
      if(iPort > 0 && iPort <= 65535){
        return true;
      }
    }
    return false;
  },

  addCustomValidation: function(selector,closeElement){
    Ember.$(selector).closest(closeElement).addClass("error-control").addClass("empty-entry");
  },

  removeCustomValidation: function(selector,closeElement){
    Ember.$(selector).closest(closeElement).removeClass("error-control").addClass("empty-entry");
  }

});

//ignorei18n_end
