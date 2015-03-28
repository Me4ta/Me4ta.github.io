import Ember from 'ember';
import _ from 'npm:lodash';
import levels from '../utils/levelsList';
import slack from '../utils/slack';

export default Ember.ObjectController.extend({
  code: '',
  //finishedLevels: Ember.A([]),

  currentLevel: function() {
    return _.find(levels, {number: this.get('model.currentLevelNumber')});
  }.property('model.currentLevelNumber'),

  _init: function() {

  }.on('init'),

  levelContextToString: function() {
    return 'Level ' + this.get('currentLevel.number') + ', ' + this.get('currentLevel.name') + '\n';
  },

  actions: {
    submitCode: function() {
      var enteredCode = this.get('code').toUpperCase();

      $('.progress-list .active').removeClass('animated bounceIn');

      //if (this.get('currentLevel.code') == enteredCode) {
      if (true) {
        var controller = this;

        slack.sendGreen(this.levelContextToString(), 'Entered valid code: ' + enteredCode);

        //add to finished levels
        controller.get('finishedLevels').addObject(controller.get('currentLevel'));

        //save model
        var currentLevel = this.get('model.currentLevelNumber');

        if (currentLevel === 33) {
          console.log('33?');
          controller.transitionToRoute('/the-end');
          return;
        }

        this.set('model.currentLevelNumber', ++currentLevel);
        this.get('model').save().then(function() {
          $('#input-code').val('');
          controller.transitionToRoute('/level/' + currentLevel);

        });

      } else {
        slack.sendLightRed(this.levelContextToString(), 'Entered invalid code: ' + enteredCode);

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
        .text('Enter');
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
