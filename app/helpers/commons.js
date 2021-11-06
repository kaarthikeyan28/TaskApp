//ignorei18n_start
import Ember from 'ember';
import CommonUtil from 'emberapp/utils/common-utilities';
import Translator from 'emberapp/utils/i18n-util';

function handleSearchResult(res, searchStr) {
  searchStr = CommonUtil.escapeHTML(searchStr);
  res = CommonUtil.escapeHTML(res);
  let replacer = "<span class='highlight-result'>"+searchStr+"</span>";
	return res.replace(new RegExp(searchStr,'gi'), function(match, g1, g2) {
		return "<strong class='tt-highlight'>"+match+"</strong>";
	});
}

function handleNewSearchResult(res, searchStr) {
  searchStr = CommonUtil.escapeHTML(searchStr);
  res = CommonUtil.escapeHTML(res);
  return res.replace(new RegExp(searchStr,'gi'), function(match, g1, g2) {
		return "<strong class='tt-highlight'>"+match+"</strong>";
	});
}
function createDropdownData(headerId,options,changedAction)
{
    var DATA = {
        "ID":headerId,
        "selected":"",
        "selectedTitle":"",
        "changedAction":changedAction,
        "class": "generalselect",
        "select": []
    };
    if(!Ember.isEmpty(options))
    {
        DATA.selected=options[0].VALUE;
        DATA.selectedTitle=Translator.translate(options[0].TITLE);
        let obj={"option":[]};
        for(let i=0;i<options.length;i++)
        {
            obj.option.push({"value":options[i].VALUE,"title":Translator.translate(options[i].TITLE)});
        }
        DATA.select.push(obj);
    }
    return DATA;
}

export function commons(params/*, hash*/) {

  var tmp,tmp2;

	switch (params[0]) {

		case "eqAll": {
	    for(tmp=2;tmp<params.length;tmp++) {
	        if(params[1] !== params[tmp]) {
	          return false;
	        }
	    }
	    return true;
	  }

		case "eqAllStr": {
	    for(tmp=2;tmp<params.length;tmp++) {
        if(!params[1] || !params[tmp] || (params[1].toString() !== params[tmp].toString())) {
          return false;
        }
	    }
	    return true;
	  }

		case "evenNumber": {
			return (params[1] % 2 === 0);
		}

	  case "eqAny": {
	    for(tmp=2;tmp<params.length;tmp++) {
	        if(params[1] === params[tmp]) {
	          return true;
	        }
	    }
	    return false;
	  }

	  case "notEqAll": {
	    for(tmp=2;tmp<params.length;tmp++) {
	        if(params[1] === params[tmp]) {
	          return false;
	        }
	    }
	    return true;
	  }

	  case "combine": {
	    tmp2='';
	    for(tmp=1;tmp<params.length;tmp++) {
	        tmp2+=params[tmp];
	    }
	    return tmp2;
	  }

	  case "not": {
	    return !params[1];
	  }

	  case "allTrue": {
	    for(tmp=1;tmp<params.length;tmp++) {
	      if(params[tmp]===false) {
	        return false;
	      }
	    }
	    return true;
	  }

	  case "AND": {
	    if(params[1] === true && params[2] === true) {
	      return true;
	    }
	    return false;
	  }

	  case "OR": {
	    return params[1]||params[2];
	  }

	  case "mul": {
	    for(tmp=2;tmp<params.length;tmp++) {
	      params[1]*=params[tmp];
	    }
	    return params[1];
	  }

	  case "add": {
	    for(tmp=2;tmp<params.length;tmp++) {
	      params[1]+=params[tmp];
	    }
	    return params[1];
	  }

	  case "isDefined": {
	    return (typeof params[1] !== "undefined");
	  }

	  case "arrayValueEquals": {
      	   try {
        	var val = params[1].toString().split(",");
          	for(var i=0;i<val.length;i++){
           	 if(val[i].toLowerCase() === params[2].toLowerCase()){
              	return true;
            	}
	        }
	      return false;
	    }
	    catch(exp) {
	      return false;
	    }
    }

	  case "containsAny": { //No I18N
	    try {
	      for(tmp=2;tmp<params.length;tmp++) {
	        if(params[1].toString().indexOf(params[tmp].toString())!==-1) {
	          return true;
	        }
	      }
	      return false;
	    }
	    catch(exp) {
	      return false;
	    }
	  }

	  case "isEmpty": {
	    return Ember.isEmpty(params[1]);
	  }

	  case "isEmptyString": {
	    return (typeof params[1] === "undefined" || params[1].toString().trim() === "");
	  }

	  case "retrieveSearchResult": {
	    if(typeof params[3] === "undefined") {
	      return params[1];
	    }
	    let searchStr= params[3].toString();
	    if(typeof params[2] === "undefined" || typeof params[1] !== "object") {
	      return handleSearchResult(params[1],searchStr);
	    }
	    else {
	      let res = params[1][params[2].resDisplayKey];
	      if(params[1].IS_CHILD) {
	        return "<span class='search-element-child'>"+handleSearchResult(res,searchStr)+"</span>";
	      }
	      else {
	        return "<span class='search-element'>"+CommonUtil.escapeHTML(res)+"</span>";
	      }
	    }
	  }

		case "retrieveNewSearchResult": {
			if(typeof params[3] === "undefined") {
            			return params[1];
            		}
            		let searchStr= params[3].toString();
            		if(typeof params[2] === "undefined" || typeof params[1] !== "object") {
            			return handleNewSearchResult(params[1],searchStr);
            		}
            		else {
            			let res = params[1][params[2].resDisplayKey];
            			if(params[1].IS_CHILD) {
            				return "<span class='search-element-child'>"+handleNewSearchResult(res,searchStr)+"</span>";
            			}
            			else {
            				return "<span class='search-element'>"+CommonUtil.escapeHTML(res)+"</span>";
            			}
            		}

  }

	  case "searchSelect": {
	    if(typeof params[3] !== "undefined" && typeof params[1] === "object") {
	      if(params[1].IS_CHILD && ((params[1][params[3].resPrimaryKey])) && ((params[2][params[3].resPrimaryKey]))) {
	        return params[1][params[3].resPrimaryKey].toString() === params[2][params[3].resPrimaryKey].toString();
	      }
	      return false;
	    }
	    return params[1] === params[2];
	  }

	  case "replaceNewLine": {
	    if(typeof params[1] !== "undefined") {
	      return params[1].toString().split("\n");
	    }
	    return [];
	  }

	  case "parseTimeHHMM": {
	    if(typeof params[1] !== "undefined") {
	      try {
	         var date = new Date(parseFloat(params[1].toString()));
	         return date.toUTCString().substring(20,25);
	      }
	      catch(exp) {
	        window.console.log(exp);
					return undefined;
	      }
	    }
	  }

	  case "buildLessThan": {
			return CommonUtil.isBuildLessThan(params[1],params[2]);
	  }

		case "lengthGreater": {
			if(typeof params[1] !== "undefined" && typeof params[2] !== "undefined") {
			  if(params[1].length > params[2]) {
				  return true;
		    }
		  }
		  return false;
		}

	  case "makeDropDown":{
        return createDropdownData(params[1],params[2],params[3]);
	  }

	  case "getPopUpString":{
	    if(typeof params[1]!="undefined")
	    {
	        return "window.open('"+CommonUtil.escapeHTML(params[1])+"','popup',width=600,height=300); return false;";
	    }
	  }

		default:
			return undefined;

	}

}

export default Ember.Helper.helper(commons);
//ignorei18n_end
