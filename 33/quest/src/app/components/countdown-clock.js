import Ember from 'ember';
import layout from '../templates/components/countdown-clock';

export default Ember.Component.extend({
  layout: layout,
  clock: {},
  hintText: 'До подсказки осталось:',
  timerDone: false,


  didInsertElement: function() {
    var component = this;

    var minute = 60; //seconds
    var hour = 60 * minute;

    component.set('clock', this.$('.clock').FlipClock(88 * minute, {
      countdown: true,
      stop: function() {
        component._onTimerStop();
      }
    }));
  },

  _onTimerStop: function() {
    if (!this.get('timerDone')) {
      this.set('hintText', 'Жду в ~7:20 вечера');

      this.set('timerDone', true);
    }

  }
});
