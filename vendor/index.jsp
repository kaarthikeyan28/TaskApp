<%@page import="java.util.Locale"%>
<%@page import="com.adventnet.la.I18NUtil"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="x-ua-compatible" content="IE=EDGE">
</head>
  <body>
	<script>
	// If newReport link navigated from old log360, then the request will be changed to new reports page
	var loc = window.location.href;
	if(loc.indexOf("url=newReport&tab=reportSettings") != -1){
		loc=loc.replace("url=newReport&tab=reportSettings","url=emberapp");
		loc=loc+"#/reports"; //No i18n
		window.location.href = loc;
	}
	var ember_LangObj = JSON.parse(JSON.stringify(<%= I18NUtil.getClientlocale((Locale)session.getAttribute("USER_LOCALE"))%>));
	var ember_Us_LangObj = JSON.parse(JSON.stringify(<%= I18NUtil.getClientlocale(new Locale("en", "US"))%>));

	/* Code from prototype js, which was removed to support dashboard elements, now added here to
	   support ember components... The mission now in hand is to remove prototype alltogether as 
	   soon as possible... */
	if (typeof Prototype !== "undefined") { // dont use Prototype !== undefined.. coz IE8 will find it and destroy ur sleep...
        if (Prototype.BrowserFeatures.XPath) {
        document._getElementsByXPath = function(expression, parentElement) {
        var results = [];
        var query = document.evaluate(expression, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);//No i18n
        for (var i = 0, length = query.snapshotLength; i < length; i++)
        results.push(query.snapshotItem(i));
        return results;
        };

        document.getElementsByClassName = function(className, parentElement) {
        var q = ".//*[contains(concat(' ', @class, ' '), ' " + className + " ')]";
        return document._getElementsByXPath(q, parentElement);
        }
        } else {
        document.getElementsByClassName = function (className, parentElement) {
        var children = (document.body).getElementsByTagName('*');
        var elements = [], child, pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
        for (var i = 0, length = children.length; i < length; i++) {
        child = children[i];
        var elementClassName = child.className;
        if (elementClassName.length == 0) continue;
        if(elementClassName instanceof Object) continue;
        if (elementClassName == className || elementClassName.match(pattern))
        elements.push(Element.extend(child));
        }
        return elements;
        };
        }
	}

	//date.now ie8 fix
 	if(!Date.now) {
 	  Date.now = function() {return +new Date();};		
 	}
	</script>
	<div id="ELAEmberIncluder" class="<%if( request.getAttribute("isLog360Request") == "true" ){%>ela-newflat<%}%>" >
		<jsp:include page="../../index.html" />
	<script>
	  emberjQuery = jQuery.noConflict( true );
	  emberjQuery(window).on('hide.bs.dropdown',function(event){event.target['hide']=function(element) {return element;};}); //No i18n
	  emberjQuery(window).on('hide.bs.tooltip',function(event){event.target['hide']=function(element) {return element;};}); //No i18n
	  emberjQuery(window).on('show.bs.dropdown',function(event){event.target['show']=function(element) {return element;};}); //No i18n
	  emberjQuery(window).on('show.bs.tooltip',function(event){event.target['show']=function(element) {return element;};}); //No i18n
	  emberjQuery(window).on('hide.bs.modal',function(event){event.target['hide']=function(element) {return element;};}); //No i18n
	  emberjQuery(window).on('show.bs.modal',function(event){event.target['show']=function(element) {return element;};}); //No i18n

	  function licenseUpdator(json) {

	    emberjQuery("#license_alert").removeClass("hidden");
	    emberjQuery('#gray-loading-div').addClass('hidden');

	    if(json.STATUS_CODE === "0") {
	  	emberjQuery("#license_alert").html("<div class='alert alert-success license-in-alert'>"+ember_LangObj.ember_license_applied_successfully+"</div>");
		emberjQuery("#licensing_type").html(""+json.CUSTOM_STATUS.LICENSE.TYPE);
		emberjQuery("#licensed_to").html(""+json.CUSTOM_STATUS.LICENSE.LICENSED_TO);
		emberjQuery("#licensing_product_name").html(""+json.CUSTOM_STATUS.LICENSE.PRODUCT_NAME);

		var innerTable = "";

		for(var k in json.CUSTOM_STATUS.LICENSE.COMPONENTS) {
			innerTable+="<tr>";
			innerTable+="<td class='colorLight'>"+json.CUSTOM_STATUS.LICENSE.COMPONENTS[k].TEXT+"</td>";
			innerTable+="<td class='purchased'>"+json.CUSTOM_STATUS.LICENSE.COMPONENTS[k].PURCHASED+"</td>";
			innerTable+="<td>"+json.CUSTOM_STATUS.LICENSE.COMPONENTS[k].INUSE+"</td>";
			innerTable+="<td class='adap'>"+json.CUSTOM_STATUS.LICENSE.COMPONENTS[k].ADAP+"</td>";
			innerTable+="</tr>";
		}
		emberjQuery("#devicesList").html(innerTable);

		if(json.CUSTOM_STATUS.LICENSE.EXPIRY_DATE !== undefined) {
			emberjQuery("#licensing_expiry").parent().removeClass("hidden");
			emberjQuery("#licensing_expiry").html(""+json.CUSTOM_STATUS.LICENSE.EXPIRY_DATE);
		}
		else {
			emberjQuery("#licensing_expiry").parent().addClass("hidden");
		}
		if(json.CUSTOM_STATUS.LICENSE.AMS_EXPIRY_DATE !== undefined) {
			emberjQuery("#licensing_ams_expiry").parent().removeClass("hidden");
			emberjQuery("#licensing_ams_expiry").html(""+json.CUSTOM_STATUS.LICENSE.AMS_EXPIRY_DATE);
		}
		else {
			emberjQuery("#licensing_ams_expiry").parent().addClass("hidden");
		}
		if(json.CUSTOM_STATUS.LICENSE.ISLIMITALLOWED === true) {
			emberjQuery("#licensing .purchased").removeClass("purchased-hidden");
		}
		else {
			emberjQuery("#licensing .purchased").addClass("purchased-hidden");
		}
		if(json.CUSTOM_STATUS.LICENSE.ISADAPALLOWED === true) {
			emberjQuery("#licensing .adap").removeClass("adap-hidden");
		}
		else {
			emberjQuery("#licensing .adap").addClass("adap-hidden");			
		}
		if(json.CUSTOM_STATUS.LICENSE.ISCXDETAILSALLOWED === true) {
			emberjQuery("#licensing .purchased").removeClass("hidden");
		}
		else {
			emberjQuery("#licensing .purchased").addClass("hidden");
		}
	    }
	    else {
	  	emberjQuery("#license_alert").html("<div class='alert alert-danger license-in-alert'>"+json.STATUS_MSG+"</div>");
	    }
	  }

	</script>
	<iframe id="licenseIframe" name="hiddenIframe" style="display:none !important;">
	</iframe>
	</div>
  </body>
</html>
