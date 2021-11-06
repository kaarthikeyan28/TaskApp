//ignorei18n_start
import Ember from 'ember';
import CommonUtil from 'emberapp/utils/common-utilities';

export default Ember.Component.extend({
	
	GLOBALSERVICE: Ember.inject.service('global-service'),
	
	dateAndTimeFormat:{},

	timeOnly: function() {
		this.set("dateAndTimeFormat",CommonUtil.getDateAndTimeFormat(this.get("GLOBALSERVICE.dateFormat.display")));
		return moment(this.get("time"),this.get("GLOBALSERVICE.dateFormat.display")).format(this.get("dateAndTimeFormat").time);
	}.property('time'),

	date: function() {
		return moment(this.get("time"),this.get("GLOBALSERVICE.dateFormat.display")).format(this.get("dateAndTimeFormat").date);
	}.property('time'),
	
	classNames: ["time-line-block"]

});
//ignorei18n_end
