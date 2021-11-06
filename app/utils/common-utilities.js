//ignorei18n_start

/* Implemented only for the sake of IE8 and IE9 which do not have Array.prototype and other essential methods...
  This common util is cross browser and can guarantee proper results */

import Ember from 'ember';
import Translator from 'emberapp/utils/i18n-util';

export default Ember.Object.create({

  removeItemFromArray: function(item, array) {
    return Ember.$.grep(array,function(value){
        return value!==item;
    });
  },

  removeOneItemFromArray: function(item_value , array) {
    let arrindex = Ember.$.inArray(item_value,array);
    if(arrindex !== -1) {
      array = Ember.$.grep(array,function(value,index){
          return index!==arrindex;
      });
    }
    return array;
  },

  removeArrayFromArray: function(arrWithItemsToRemove, actualArray) {
    /* this will remove arrWithItemsToRemove from actualArray and return the remaining actualArray elements */
    return Ember.$.grep(actualArray,function(value){
        return Ember.$.inArray(value,arrWithItemsToRemove) === -1;
    });
  },

  removeItemFromObjectArray: function(array_pk, item_value , array) {
    return Ember.$.grep(array,function(value){
        return value[array_pk]!==item_value;
    });
  },

  getItemIndexObjectArray:function(array_pk,item_value,array)
  {
    for(let i=0;i<array.length;i++)
    {
        if(array[i][array_pk]==item_value)
        {
            return i;
        }
    }
    return -1;
  },

  addReplaceItem:function(array_pk,pk_value,newItem,array)
  {
    /*return Ember.$.grep(array,function(value){
        if(value[array_pk]==pk_value)
        {
            return value[item_key]=item_value;
        }
    });*/
    let index=this.getItemIndexObjectArray(array_pk,pk_value,array);
    if(index==-1)
    {
        array.pushObject(newItem);
    }
    else
    {
        array[index]=newItem;
    }
    return array;
  },

  addIfNotThereInArray: function(item, array) {
    if(Ember.$.inArray(item,array) === -1) {
      array.push(item);
    }
    return array;
  },

  addToArray: function(item, array) {
    array.push(item);
    return array;
  },

  showDemoNotification() {
    this.showNotification(Translator.translate("ember_operation_disabled_in_demo"),6000);
  },

  showNotification(text,delay,style) {
	Ember.$('.notifyjs-corner').empty();
	let notifyJSON = {};
	if(typeof delay === "undefined") {
	  notifyJSON.autoHideDelay = 1800;
	}else{
	  notifyJSON.autoHideDelay = delay;
	}
	if(typeof style !== "undefined" && style === "success"){
	  notifyJSON.style = "success_green";
  }
  var translated = Translator.translate(text);
	Ember.$.notify(translated,notifyJSON);
  },

  showNotificationResponseJSON(response){
    var style = 'success';
    if(response.STATUS_CODE !== '0'){
      style='error'
    }
    this.showNotification(response.STATUS_MSG,3000,style);
  },

  _simpleBSModal_areyousure: function(object, title, content, action, promiseMode) {
    Ember.set(object,"customModal",false);
    Ember.set(object,"type","YESNO");
    Ember.set(object,"title",title);
    Ember.set(object,"content",content);
    Ember.set(object,"action",action);
    Ember.set(object,"closeIcon",true);
    Ember.set(object,"open",true);
		if(object.NEW_CSS) {
			Ember.set(object,"class","modal-size-15 top-20");
			Ember.set(object, "icon_class", "icn-info-black");
		}
		else {
			Ember.set(object,"icon_class","ui-icon icn-alert");
		}
    if(promiseMode === true) {
      Ember.set(object,"promiseMode",true);
      return new Ember.RSVP.Promise(function (resolve,reject) {
        Ember.set(object,"promiseResolve",resolve);
        Ember.set(object,"promiseReject",reject);
		});
    }
  },

  _simpleBSModal_operation: function(object,title,content) {
    Ember.set(object,"customModal",false);
    Ember.set(object,"type","OPERATION");
    Ember.set(object,"title",title);
    Ember.set(object,"icon_class","loading-circle-icon");
    Ember.set(object,"content",content);
    Ember.set(object,"closeIcon",false);
    Ember.set(object,"open",true);
  },

  _simpleBSModal_alert: function(object,title,content) {
    Ember.set(object,"customModal",false);
    Ember.set(object,"type","ALERT");
    Ember.set(object,"title",title);
    Ember.set(object,"content",content);
    Ember.set(object,"open",true);
  },

  _simpleBSModal_yield: function(object,title,content) {
    Ember.set(object,"customModal",false);
    Ember.set(object,"type","YIELD");
    Ember.set(object,"title",title);
	if( !object.hasOwnProperty("closeIcon") ){
		Ember.set(object,"closeIcon",true);
	}
    Ember.set(object,"open",true);
  },

  _simpleBSModal_custom: function(object) {
    Ember.set(object,"customModal",true);
    Ember.set(object,"closeIcon",true);
		Ember.set(object,"open",true);
  },

	_simpleBSModal_static_init: function(object) {
		Ember.set(object,"customModal",true);
    Ember.set(object,"closeIcon",true);
	},

	_simpleBSModal_static_open: function(object) {
		Ember.run.scheduleOnce("afterRender",this,function(){
			Ember.$("#"+object.elementID).modal("show");
		});
	},

  _simpleBSModal_failurealert: function(object,title,content) {
    Ember.set(object,"customModal",false);
    Ember.set(object,"alert","danger");
    this._simpleBSModal_alert(object,title,content);
  },
  _setProperties_and_showStatusAlert(object,status,position,forceShow,isdismissible,isyield,timeOut){
    var type = status.STATUS_CODE === '0' ? 'success' : 'danger';
    this._setProperties_and_showAlert(object,status.STATUS_MSG,type,position,forceShow,isdismissible,isyield,timeOut)
  },
  _setProperties_and_showAlert(object,text,type,position,forceShow,isdismissible,isyield,timeOut){
		Ember.set(object,"text",text);
	    Ember.set(object,"type",type);
	    Ember.set(object,"left",position.left);
	    Ember.set(object,"right",position.right);
		Ember.set(object,"isVisible",true);
		Ember.set(object,"top",0);
		Ember.set(object,"forceShow",false);
		Ember.set(object,"dismissable",true);
		Ember.set(object,"yield",false);
		if(typeof forceShow !== "undefined")
		{
			Ember.set(object,"forceShow",forceShow);
		}
		if(typeof isdismissible !== "undefined")
		{
			Ember.set(object,"dismissable",isdismissible);
		}
		if(typeof position.top !== "undefined")
		{
			Ember.set(object,"top",position.top);
		} 
		if(typeof isyield !== "undefined" && isyield === true)
		{
			Ember.set(object,"yield",true);
		}
		if(typeof timeOut !== "undefined")
		{
			Ember.set(object,"timeOut",timeOut);
		}
	},
  
  _simpleBSModal_close: function(object) {
    Ember.run.scheduleOnce("afterRender",this,function() {
      Ember.$("#"+object.elementID).modal("hide");
    });
  },

  escapeHTML: function(string) {
    if(typeof string !== "undefined") {
      return string.toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    return string;
  },

  containsSpclChar: function(name) {
    if(name!=undefined) {
      var specialChars = "!@#$%^&*()+=[]';{}|\"<>?~";
      for (var i = 0; i < name.length; i++) {
        if (specialChars.indexOf(name.charAt(i)) != -1) {
          return true;
        }
      }
      return false;
    }
    return false;
  },

	showPageTopAlert: function(object) {
		return this.showAlert(object, Ember.$(".ela-body-pane"));
	},

	showAlert: function(object, jQueryElem) {
		if(!object.size) {
			object.size = "md";
		}
		let alert = document.createElement("div");
		let icon = "", closebutton = "";
		if(object.type === "success" || object.type === "failure") {
			icon = '<i class="ela-inline-icon icn-status-'+ object.type +'"></i>';
			closebutton = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		}
		alert.innerHTML = "<div class='status-alert status-alert-"+object.type+" status-alert-"+object.size+" alert-dismissible' role='alert' style='display: none;'>"+
				closebutton + '<table align="center"><tr><td> '+ icon + object.text + '</td></tr></table></div>';
		let statusAlert = Ember.$(alert).find(".status-alert");
		jQueryElem.append(statusAlert);
		statusAlert.slideDown(140);
		statusAlert.find(".close").on("click", function(e) {
		Ember.$(this).closest("div.status-alert").slideUp(140);
			Ember.$(this).off("click");
		});
		if(object.delay && object.type !== "info") {
			Ember.run.later(()=>{
				Ember.$(statusAlert).slideUp(140, function() {
					Ember.$(statusAlert).remove();
				});
			},object.delay);
		}
		return statusAlert;
	},

	removeAlert: function(alert) {
		Ember.$(alert).remove();
	},

	selectLeftPane: function(leftpaneid) {
		try {
			selectSettingsLHS(leftpaneid);
		}
		catch(exp) {
		//	window.console.log("Left pane not found");
		}
	},


	isIEorEdge: function() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') !== -1 || myNav.indexOf('edge') !== -1 || (myNav.indexOf(".net") !== -1 && myNav.indexOf("trident") !== -1));
    },

	isLtIE10: function() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') !== -1) ? (parseInt(myNav.split('msie')[1]) < 10) : false;
	},
  generateRequest: function(request){
    return 'request=' + encodeURIComponent(JSON.stringify(request));
  },
	getKeys: function(object) {
		var keys = [];
		if(typeof object !== "undefined" && object) {
			for(var i in object) {
				if(object.hasOwnProperty(i) && typeof object[i] !== "undefined") {
					keys.push(i);
				}
			}
		}
		return keys;
	},
   getDHMSfromMS:function(ms)
    {
        let s=ms/1000;
        let m=Math.floor(s/60);
        s=Math.floor(s%60);
        let h=Math.floor(m/60);
        m=Math.floor(m%60);
        let d=Math.floor(h/24);
        h=Math.floor(h%24);
        return {days:d,hours:h,minutes:m,seconds:s};
    },
    isBuildLessThan:function(baseVersion,comparingVersion)
    {
        if(typeof baseVersion !== "undefined" && typeof comparingVersion !== "undefined") {
            let productBase = baseVersion.toString().split(".");
            let toCompareWith = comparingVersion.toString().split(".");
            let productBaseMajor = parseInt(productBase[0]);
            let compareMajor = parseInt(toCompareWith[0]);
            if(productBaseMajor === compareMajor) {
                if(productBase.length > 1 && toCompareWith.length === 1) {
                    return (parseInt(productBase[1]) > 0);
                }
                else if(productBase.length === 1 && toCompareWith.length > 1) {
                    return (parseInt(toCompareWith[1]) > 0);
                }
                else {
                    return (parseInt(productBase[1]) < parseInt(toCompareWith[1]));
                }
            }
            else {
                return (productBaseMajor < compareMajor);
            }
        }
        return -1;
    },
	
	getDateAndTimeFormat: function(format)
	{
		var dateAndTimeFormats={};
		if(format[0]==='H' || format[0] === 'm' || format[0] === 's')
		{
			if(format.indexOf("ss")>=0)
			{
				dateAndTimeFormats.time=format.substring(0,8).trim();
				dateAndTimeFormats.date=format.substring(8).trim();
			}
			else
			{
				dateAndTimeFormats.time=format.substring(0,5).trim();
				dateAndTimeFormats.date=format.substring(5).trim();
			}
		}
		else
		{
			if(format.indexOf("MMM")>=0)
			{
				dateAndTimeFormats.date=format.substring(0,11).trim();
				dateAndTimeFormats.time=format.substring(11).trim();
			}
			else
			{
				dateAndTimeFormats.date=format.substring(0,10).trim();
				dateAndTimeFormats.time=format.substring(10).trim();
			}
		}
		return dateAndTimeFormats;
	},
	
	showPopUpAlert : function(alertDetails){
		var htmlContent = "";
		htmlContent = htmlContent + "<div class='alert _alert-container alert-"+alertDetails.type+"' role='alert' >";
		if(alertDetails.dismissable){
			htmlContent = htmlContent + "<button type='button' class='close _alert-close' ><i class='glyphicon glyphicon-remove'></i></button>";
		}
		htmlContent = htmlContent + "<span class='_alert-text' >"+alertDetails.text+"</span></div>";
		
		let alert = document.createElement("div");
		alert.innerHTML = htmlContent;
		let statusAlert = Ember.$(alert).find(".alert");
		Ember.$(alertDetails.container).append(statusAlert);
		statusAlert.find(".close").on("click", function(e) {
			Ember.$(this).closest("div.alert").hide();
			Ember.$(this).off("click");
		});
	},

	removePopUpAlert: function(container) {
		Ember.$(container).closest("div.alert").remove();
	}
	
});
//ignorei18n_end
