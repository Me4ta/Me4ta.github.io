import Ember from 'ember';
import _ from 'npm:lodash';
import slack from '../../utils/slack';

export default Ember.Route.extend({
  levelNumber: null,

  model: function(params) {
    var self = this;

    if ((!self.levelNumber && self.levelNumber !== 0) || !_.isNumber(self.levelNumber)) {
      throw 'Invalid level: ' + self.levelNumber;
    }

    if (self.levelNumber < 0 || self.levelNumber > 33) {
      throw 'Invalid level number: ' + self.levelNumber;
    }

    return {};
  },

  beforeModel: function(transition) {

    this.levelNumber = parseInt(transition.params['quest.level'].level_id);

    var self = this;

    this.store.find('quest').then(function(records) {
      var recordsArray = records.toArray();

      if (recordsArray.length === 1) {
        return recordsArray[0];
      } else {
        throw 'There multiple quests found, clear local storage and start over.';
      }
    }).then(function(quest) {

      if ((!self.levelNumber && self.levelNumber !== 0) || !_.isNumber(self.levelNumber)) {
        throw 'Invalid level: ' + self.levelNumber;
      }

      if (self.levelNumber < 0 || self.levelNumber > 33) {
        throw 'Invalid level number: ' + self.levelNumber;
      }

      if (quest.get('currentLevelNumber') !== self.levelNumber) {
        self.transitionTo('quest.level', quest.get('currentLevelNumber'));

      }
    });
  },


  renderTemplate: function() {
    slack.send('Level ' + this.levelNumber + ' opened');

    this.render('quest/levels/' + this.levelNumber);
  }
});
