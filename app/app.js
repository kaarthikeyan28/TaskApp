//ignorei18n_start
import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;
//Ember.deprecate = function(){};

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

Ember.deprecate = function(){};
Ember.warn = function(i){};

loadInitializers(App, config.modulePrefix);

export default App;
//ignorei18n_end