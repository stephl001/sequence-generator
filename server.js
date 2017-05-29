var express = require('express');
var _ = require('lodash');

var app = express();

var sequences = {};

app.get('/sequence/:id', function (req, res) {
  var id = _.toLower(req.params.id);
  if (!_.has(sequences, _.toLower(id) )) {
      sequences[id] = 0;
  }
  var currentValue = sequences[id];
  sequences[id] += 1;
  res.send({value: currentValue});
});

app.listen(8080, function () {
  console.log('Example app listening on port 3000!');
});