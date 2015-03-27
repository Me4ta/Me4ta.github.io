import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.resource('quest', {path: '/'},  function() {
    this.route('intro');
  });
});

export default Router;
