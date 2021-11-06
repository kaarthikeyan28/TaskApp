//ignorei18n_start
let generalUtils = {

  generateUniqueId: function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  },

  matches: function(element, selector) {
    if(element.matches) {
      return element.matches(selector);
    }
    else if(element.matchesSelector) {
      return element.matchesSelector(selector);
    }
    else if(element.msMatchesSelector) {
      return element.msMatchesSelector(selector);
    }
    else if(element.webkitMatchesSelector) {
      return element.webkitMatchesSelector(selector);
    }
    else {
      let node = element, nodes = (node.parentNode || node.document).querySelectorAll(selector), i = -1;
      while(nodes[++i]) {
        if(nodes[i] == node) {
          break;
        }
      }
      return !!nodes[i];
    }
  },

  closest: function(element, selector) {
    if(element.closest) {
      return element.closest(selector);
    }
    while (element && !generalUtils.matches(element,selector)) {
     element = element.parentNode;
    }
    return element;
  },

	err: function(text) {
		if(window.console) {
			window.console.log("ELA ERROR : "+text);
		}
	}

};

export default generalUtils;
//ignorei18n_end
