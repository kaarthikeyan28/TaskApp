//ignorei18n_start
import Ember from "ember";
import Translator from 'emberapp/utils/i18n-util';

var I18NDefinition = Ember.Object.extend({
	unknownProperty: function(key) {
		var value = Translator.translate(key);
		if(!value) {
			Ember.warn("cannot find I18N value for key:"+key);
			value = key;
		} else {
			this.set(key,value);
		}
		return value;
	}
});

var I18NInitializer = {
	name:"I18N",
	initialize: function(container,application) {
		application.register('I18N:main', I18NDefinition, { instantiate: true });
		application.inject('route', 'I18N', 'I18N:main');
		application.inject('controller', 'I18N', 'I18N:main');
		application.inject('component', 'I18N', 'I18N:main');
	}
};

export default I18NInitializer;
//ignorei18n_end
