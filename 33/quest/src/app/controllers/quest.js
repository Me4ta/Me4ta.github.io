import Ember from 'ember';
import _ from 'npm:lodash';
import levels from '../utils/levelsList';

var codes = [
  {level: 0, code: 'TEST'}
];

export default Ember.ObjectController.extend({
  code: '',
  //finishedLevels: Ember.A([]),

  currentLevel: function() {
    return _.find(levels, {number: this.get('model.currentLevelNumber')});
  }.property('model.currentLevelNumber'),

  _init: function() {
  }.on('init'),

  actions: {
    submitCode: function() {
      var enteredCode = this.get('code').toUpperCase();

      if (this.get('currentLevel.code') == enteredCode) {
        var controller = this;

        //add to finished levels
        controller.get('finishedLevels').addObject(controller.get('currentLevel'));

        //save model
        var currentLevel = this.get('model.currentLevelNumber');
        this.set('model.currentLevelNumber', ++currentLevel);
        this.get('model').save().then(function() {
          controller.transitionToRoute('/level/' + currentLevel);
          $('#input-code').val('');
        });

      } else {
        $('#btn-next')
          .removeClass('btn-success')
          .addClass('btn-danger')
          .addClass('animated shake')
          .text('Nope');
      }

    },
    onInputChange: function() {
      $('#btn-next')
        .removeClass('btn-danger')
        .addClass('btn-success')
        .removeClass('animated shake')
        .text('Next');
    }
  },

  sockets: {
    connect: function() {
      console.log('Sockets connected...');
    },

    disconnect: function() {
      console.log('Sockets disconnected...');
    }
  }

});
