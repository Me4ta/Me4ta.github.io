import Ember from 'ember';
import layout from '../templates/components/input-with-on-change';

export default Ember.TextField.extend({
  layout: layout,
  type: 'text',

  fewCharacters: 5, //how many characters we call a "few" after typing this many "typedFewCharacters" will be set to true
  typedFewCharacters: false,

  inputThresholdMs: 0,
  valueChanged: false,



  didInsertElement: function() {
    var self = this;

    self.$().focus();

    if (self.get('inputThresholdMs')) {
      setInterval(function() {
        self.checkInput()
      }, self.get('inputThresholdMs') / 4);
    }
  },

  checkInput: function() {

    var msPassedFromLastInput = (new Date()) - this.lastInputDateTime;

    if(msPassedFromLastInput> this.get('inputThresholdMs') && this.get('valueChanged') === true) {
      this.sendAction('onChangeWithDelay', this, this.get('value'));
      this.set('valueChanged', false);
    }
  },

  _onInput: function() {

    this.lastInputDateTime = new Date();
    this.set('valueChanged', true);

    var value = this.get('value');

    if (!this.typedFewCharacters) {
      if (value && value.length >= this.fewCharacters) {
        this.typedFewCharacters = true;
        this.sendAction('startedTyping', this);
      }
    }

    this.sendAction('onInputChange', this, this.get('value'));
  }.on('input')
});

