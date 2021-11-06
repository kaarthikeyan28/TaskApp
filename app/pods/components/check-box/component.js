//ignorei18n_start
import Ember from 'ember';
import Translator from 'emberapp/utils/i18n-util';

export default Ember.Component.extend({
    classNames: ['iCheck', 'icheckbox_minimal'],
    classNameBindings: ['isChecked:checked', 'isDisabled:disabled', 'onHover:hover'],

    didReceiveAttrs(){
        if (this.get('classes')) {
            var classes = this.get('classes').split(' ');
            for(var i = 0 ; i < classes.length; i++){
                this.classNames.push(classes[i]);
            }
        }        
    },

    didInsertElement() {
        if (this.get('tooltip')) {
            Ember.run.scheduleOnce("afterRender", this, function () {
                this.element.title = Translator.translate(this.get('tooltip'));
                this.element.setAttribute("data-showtt", "true");
                this.element.setAttribute("data-container", "#ELAEmberIncluder");
                this.element.setAttribute("data-animation", "false");
            });
        }
    },
    click() {
        if (!this.get('isDisabled')) {
            if (this.get('component')) {
                if (this.get('isChecked')) {
                    Ember.$(this.get('component')).slideDown();
                } else {
                    Ember.$(this.get('component')).slideUp();
                }
            }
            this.set('isChecked', !this.get('isChecked'));
            this.set('onHover', false);
            if (this.get('onChanged')) {
                this.get('onChanged')(this.get('data'), this.get('isChecked'));
            }
        }
    },
    mouseEnter() {
        if (!this.get('isDisabled') && !this.get('isChecked')) {
            this.set('onHover', true);
        }
    },
    mouseLeave() {
        this.set('onHover', false);
    },

    willDestroyElement(){
        this.$("[data-showtt='true']").tooltip("destroy");
    }
});
//ignorei18n_end