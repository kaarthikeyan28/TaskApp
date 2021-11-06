import Ember from 'ember';
import Translator from 'emberapp/utils/i18n-util';

export function i18nHelper(params/*, hash*/) {
  return Translator.translate(params);
}

export default Ember.Helper.helper(i18nHelper);
