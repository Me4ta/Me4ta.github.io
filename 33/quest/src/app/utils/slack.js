export default {
  send: function(text) {
    var data = JSON.stringify({text: text});

    this._send(data);
  },

  sendBlue: function(title, text) {
    this._sendColored(title, text, '#00BFFF');
  },

  sendOrange: function(title, text) {
    this._sendColored(title, text, '#F08C2F');
  },

  sendViolet: function(title, text) {
    this._sendColored(title, text, '#8A2BE2');
  },

  sendLightRed: function(title, text) {
    this._sendColored(title, text, '#F08080');
  },

  sendRed: function(title, text) {
    this._sendColored(title, text, '#ED1111');
  },

  sendGreen: function(title, text) {
    this._sendColored(title, text, '#18BC9C');
  },

  _sendColored: function(title, text, color) {
    var attachments = [
      {
        "fallback": "quest info",
        "color": color,
        "pretext": title,
        "text": text
      }
    ];
    var data = JSON.stringify({attachments: attachments});

    this._send(data);
  },

  _send: function(dataStr) {
    $.ajax({
      type: 'POST',
      url: 'https://hooks.slack.com/services/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',
      data: dataStr,
      success: null,
      dataType: 'json'
    });
  }
};
