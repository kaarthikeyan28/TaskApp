//ignorei18n_start

import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  redirect: function() {
    this.transitionTo('login');
  }
});

Router.map(function() {
  this.route('login', {path: '/'});
  this.route('login');
  this.route('crash');
  this.route('register');
  this.route('addtask');
  this.route('mytask');



});

export default Router;

//ignorei18n_end
