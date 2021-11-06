//ignorei18n_start

import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('crash');
  this.route('register');
  this.route('addtask');
  this.route('mytask');
  this.route('login');
});

export default Router;

//ignorei18n_end
