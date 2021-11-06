//ignorei18n_start
import Ember from 'ember';

export default Ember.Object.create({

    translate: function(key) {
        if(typeof ember_LangObj !== "undefined") {
          if(typeof ember_LangObj[key] !== "undefined" && ember_LangObj[key] !== "" && ember_LangObj[key] !== null) {
            return ember_LangObj[key];
          }else if(typeof ember_Us_LangObj !== "undefined" ){
        	  if(typeof ember_Us_LangObj[key] !== "undefined" && ember_Us_LangObj[key] !== "" && ember_Us_LangObj[key] !== null) {
                  return ember_Us_LangObj[key];
                }else{
                	return key;
                }
          }else {
            return key;
          }
        }
        else {
            return key;
        }
    },

    getI18NDataModel:function()
    {
        if(typeof ember_LangObj !== "undefined") {
            return ember_LangObj;
        }
        else
        {
            return Ember.A();
        }
    }

});
//ignorei18n_end
