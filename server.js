var express = require('express');
var _ = require('lodash');

var app = express();

var sequences = {};

app.get('/sequence/:id', function (req, res) {
  var id = _.toLower(req.params.id);
  if (!_.has(sequences, _.toLower(id) )) {
      console.log(`Creating new sequence entry for id [${id}]`);
      sequences[id] = 0;
  }
  var currentValue = sequences[id];
  sequences[id] += 1;
  res.send({value: currentValue});
});

app.delete('/sequence/:id', function (req, res) {
  var id = _.toLower(req.params.id);
  if (_.has(sequences, _.toLower(id) )) {
      console.log(`Removing sequence entry for id [${id}]`);
      delete sequences[_.toLower(id)];
      res.sendStatus(200);
  } else {
      res.sendStatus(404);
  }
});

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    host   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
    console.log(`Sequence Increment Started. IP: ${host}, Port: ${port}`);
});