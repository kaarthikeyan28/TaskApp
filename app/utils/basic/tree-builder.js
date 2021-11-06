//ignorei18n_start
import Initializer from 'emberapp/utils/basic/initializer';
import Generals from 'emberapp/utils/basic/generals';
import Translator from 'emberapp/utils/i18n-util';

let tree = Initializer({
	parent: "Components",
	name : "Tree",
	requirements : {
		actionHandler : true //can be string or boolean
	}
});

tree._getTree = function(structure) {

	if(!structure.tree) {
		structure.tree = [];
	}

	let initialId = 0;

	let getId = function() {
		initialId++;
		return structure.id+"_"+initialId;
	};

	let getCollapseGroup = function() {
		let collapseGroup = document.createElement("div");
		collapseGroup.className="panel-group";
		collapseGroup.id = getId();
		return collapseGroup;
	};

	let getBasicCollapsePanel = function() {
		let tempPanel = document.createElement("div");
		tempPanel.innerHTML = "<div class='panel panel-default'>" +
				"<div class='panel-heading'>" +
				"<h4 class='panel-title'>" +
				"<a class='panel-handler' data-toggle='collapse'>" +
				"</a>" +
				"</h4>" +
				"</div>" +
				"</div>";
		return tempPanel.firstChild;
	};

	let eventHandler = function(e) {
		e = e||event;
		let target = e.target || e.srcElement;
		if(target) {
			target = Generals.closest(target, "a.panel-handler");
			let isParent = target.getAttribute("data-isparent");
			if(isParent !== "true") {
				let indexes = [], elementToSend = {};
				elementToSend.LIST = structure.tree;
				let closestPanel = Generals.closest(target,".panel"),closestPanelGroup;
				while(closestPanel && (closestPanelGroup = Generals.closest(closestPanel,".panel-group"))) {
					indexes.push(parseInt(closestPanel.getAttribute("data-index")));
					if(closestPanelGroup.parentElement.id === structure.id) {
						break;
					}
					closestPanel = Generals.closest(closestPanelGroup,".panel");
				}
				for(let i=indexes.length - 1;i>=0;i--) {
					elementToSend = elementToSend.LIST[indexes[i]];
				}
				structure.onClick(elementToSend);
			}
		}
	};

	let generateStructure = function(tree, collapseGroup) {
		let index = 0;
		tree.forEach(function(layer1) {
			let collapsePanel = getBasicCollapsePanel();
			collapsePanel.setAttribute("data-index",index);
			let anchor = collapsePanel.querySelector(".panel-handler");
			anchor.setAttribute("data-parent","#"+collapseGroup.id);
			anchor.onclick = eventHandler;
			let ttType=typeof layer1.TOOLTIP;
            if(ttType=="boolean")
            {
                anchor.setAttribute("data-showtt","true");
                anchor.setAttribute("data-original-title",layer1.NAME);
            }
            else if(ttType=="string")
            {
                anchor.setAttribute("data-showtt","true");
                anchor.setAttribute("data-original-title",layer1.TOOLTIP);
            }
			if(layer1.HASCHILD) {
                anchor.setAttribute("data-isparent","true");
                let caret = document.createElement("span");
                caret.className = "nav-caret";
                anchor.appendChild(caret);
                let layerName = document.createElement("span");
                layerName.innerText = layer1.NAME;
                layerName.className="panel-text";
                anchor.appendChild(layerName);
                let body = document.createElement("div");
                body.className = "panel-collapse collapse panel-body-container";
                body.id = getId();
                body.appendChild(generateStructure(layer1.LIST,getCollapseGroup()));
                anchor.setAttribute("href","#"+body.id);
                anchor.className=anchor.className+" collapsed";
                collapsePanel.appendChild(body);
            }
            else {
                let textNode = document.createTextNode(layer1.NAME);
                anchor.appendChild(textNode);
                let addOption = document.createElement("span");
                addOption.className = "additional-option";
                addOption.innerText = Translator.translate("ember_add");
                anchor.appendChild(addOption);
            }
			collapseGroup.appendChild(collapsePanel);
			index++;
		});
		return collapseGroup;
	};

	return generateStructure(structure.tree, getCollapseGroup());

}

tree._generate = function(structure) {
	document.getElementById(structure.id).appendChild(tree._getTree(structure));
};

tree.regenerate = function(structure) {
	if(structure && structure.id) {
		tree.destroy(structure);
		tree._generate(structure);
	}
};

tree.destroy = function(structure) {
	let element = document.getElementById(structure.id);
	let removableElement = element.querySelector(".panel-group");
	if(removableElement) {
		element.removeChild(removableElement);
	}
};

export default tree;
//ignorei18n_end
