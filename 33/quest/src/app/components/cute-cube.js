import Ember from 'ember';
import layout from '../templates/components/cute-cube';

export default Ember.Component.extend({
  layout: layout,

  onCurrentLevelChanged: function() {
    this._updateVisible();
  }.observes('currentLevel'),

  didInsertElement: function() {
    this._updateVisible();
  },

  _updateVisible: function() {
    var currentLevel = this.get('currentLevel');

    if (currentLevel && currentLevel.number > 0 && currentLevel.number < 33) {
      for (var i = 1; i <= currentLevel.number; i++) {
        this.$('#code-' + i).addClass('visible');
      }
    }
  }
});
