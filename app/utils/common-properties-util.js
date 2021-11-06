//ignorei18n_start

import Ember from 'ember';

export default Ember.Object.create({

  //TYPE DEFS
  installation_type: {
    stand_alone: 1,
    admin_server: 2,
    managed_server: 3
  },

  installation_usage: {
    normal: 1,
    demo: 2
  },

  installation_os: {
    windows: 1,
    linux: 2
  },

  technician_role: {
    administrator: 1,
    guest: 2,
    operator: 3
  },

  license_type: {
    free: 1,
    evaluation: 2,
    premium: 3
  },

  discovery_states: {
    success: 0,
    failure: 1,
    is_running: 2,
    not_fetched: 3,
    has_begun: 4
  },

  globalLoaderProperties: {
    subscribe:1,
    unsubscribe:-1
  },

  //constants
  view_per_page_max_value: 100,
  dateFormatWithSeconds: "YYYY-MM-DD HH:mm:ss",
	dateFormat: "YYYY-MM-DD HH:mm"

});
//ignorei18n_end
