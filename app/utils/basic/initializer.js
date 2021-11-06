//ignorei18n_start

/* for private use by utils */

export default function initializeObject(parameters) {

	let getParent = function(parentString) {
		let parentArray = parentString.split(".");
		let baseParent = window.ELA;
		parentArray.forEach(function(eachParent){
			if(typeof baseParent[eachParent] === "undefined") {
				baseParent[eachParent] = {};
			}
			baseParent = baseParent[eachParent];
		});
		return baseParent;
	};

	if(typeof window.ELA === "undefined") {
		window.ELA = {};
	}

	let object = {};

	if(parameters.requirements) {
		if(parameters.requirements.actionHandler) {

			let handlername = "_executeEvent";
			if(typeof parameters.requirements.actionHandler === "string") {
				handlername = parameters.requirements.actionHandler;
			}

			object[handlername] = function(e) {
			  e = e||event;
			  let target = e.target || e.srcElement;
			  if(target) {
			    let action = target.getAttribute("data-doaction");
			    if(action && typeof object[action] === "function") {
			      object[action](target);
			    }
			  }
			};

		}
	}

	//TODO : Multiple parent reinitialization.
	//TODO : Extend existing parent in such case!

	let parent = getParent(parameters.parent);
	parent[parameters.name] = object;

	return object;

}
//ignorei18n_end
