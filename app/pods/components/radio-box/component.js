//ignorei18n_start
import Ember from 'ember';
import Validator from 'emberapp/utils/validator';

export default Ember.Component.extend({

    initialActions: function () {
        this._super(...arguments);
        let options = this.get('data.option');
        for (var i = 0; i < options.length; ++i) {
            let option = options.objectAt(i);
            if (Validator.validateString(option.show)) {
                Ember.$(option.show).hide();
            }
        }
        let selected = this.get('data.checked');
        let option = options.objectAt(selected);
        Ember.$(option.show).show();
    }.on('didRender'),

    actions: {
        changeOption: function (selected) {
            let options = this.get('data.option');
            for (var i = 0; i < options.length; ++i) {
                let option = options.objectAt(i);
                Ember.set(option, 'checked', false);
                if (Validator.validateString(option.show)) {
                    Ember.$(option.show).hide();
                }
            }
            this.set('data.checked', selected);
            let option = options.objectAt(selected);
            Ember.$(option.show).show();
            var actionUp = this.get('actionUp');
            if (actionUp != null) {
                actionUp(selected);
            }
        }
    }
});
//ignorei18n_end