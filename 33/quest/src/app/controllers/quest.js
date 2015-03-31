import Ember from 'ember';
import _ from 'npm:lodash';
import levels from '../utils/levelsList';
import slack from '../utils/slack';

export default Ember.ObjectController.extend({
  code: '',

  firstLevel: function() {
      return this.get('model.currentLevelNumber') === 0;
  }.property('model.currentLevelNumber'),

  currentLevel: function() {
    return _.find(levels, {number: this.get('model.currentLevelNumber')});
  }.property('model.currentLevelNumber'),

  _init: function() {

  }.on('init'),

  levelContextToString: function() {
    return 'Level ' + this.get('currentLevel.number') + ', ' + this.get('currentLevel.name') + '\n';
  },

  actions: {
    skipLevel: function() {
      this.send('submitCode', {skip: true});

      slack.sendBlue(this.levelContextToString(), 'Pressed Skip');
    },

    prevLevel: function() {
      var controller = this;
      var currentLevel = this.get('model.currentLevelNumber');

      if (currentLevel == 0)
        return;

      this.set('model.currentLevelNumber', --currentLevel);
      this.get('model').save().then(function() {
        $('#input-code').val('');
        controller.get('finishedLevels').removeObject(controller.get('currentLevel'));
        controller.showCodeValid();
        slack.sendBlue(controller.levelContextToString(), 'Pressed Prev');
        controller.transitionToRoute('/level/' + currentLevel);
      });
    },

    submitCode: function(options) {
      options = options || {
        skip: false
      };

      var enteredCode = this.get('code').toUpperCase();

      $('.progress-list .active').removeClass('animated bounceIn');

      if (options.skip === true || this.get('currentLevel.code') == enteredCode) {
        var controller = this;

        if (options.skip !== true) {
          slack.sendGreen(this.levelContextToString(), 'Entered valid code: ' + enteredCode);
        }

        //add to finished levels
        controller.get('finishedLevels').addObject(controller.get('currentLevel'));

        var currentLevel = this.get('model.currentLevelNumber');

        if (currentLevel === 32) {
          slack.sendViolet(this.levelContextToString(), 'Almost There!');
        }

        if (currentLevel === 33) {
          console.log('33?');
          slack.sendViolet('Happy 33th Birthday!', 'The End of Quest and The Beginning of ');
          controller.transitionToRoute('/the-end');
          return;
        }

        //save model
        this.set('model.currentLevelNumber', ++currentLevel);
        this.get('model').save().then(function() {
          $('#input-code').val('');
          controller.showCodeValid();
          controller.transitionToRoute('/level/' + currentLevel);
        });

      } else {
        slack.sendLightRed(this.levelContextToString(), 'Entered invalid code: ' + enteredCode);
        this.showCodeInvalid()
      }

    },
    onInputChange: function(sender, value) {
      this.showCodeValid();
    },

    onInputChangeWithDelay: function(sender, value) {
      if (value) {
        slack.sendOrange(this.levelContextToString(), 'Typed: ' + value.toUpperCase());
      }
    }

  },

  showCodeInvalid: function() {
    $('#btn-next')
      .removeClass('btn-success')
      .addClass('btn-danger')
      .addClass('animated shake')
      .text('Nope');
  },

  showCodeValid: function() {
    $('#btn-next')
      .removeClass('btn-danger')
      .addClass('btn-success')
      .removeClass('animated shake')
      .text('Enter');
    $('#input-code').focus();
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
