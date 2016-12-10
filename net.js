

// A feedforward neural net mapping R --> R


var generateRandomArray = function (length, min = -10, max = 10) {
  var randomArray = [];
  while (randomArray.length < length) {
    randomArray.push(min + (max - min) * Math.random());
  }
  return randomArray;
}

var sum = function (a, b) {
  return a + b;
}

var sigmoid = function (input) {
  return 1 / (1 + Math.exp(-1 * input));
}

var Net = function (hidden_dim) {
  this.hidden_bias = 1.0;

  this.hidden_dim = hidden_dim;

  this.input_to_hidden_weights = generateRandomArray(hidden_dim);
  this.hidden_to_output_weights = generateRandomArray(hidden_dim);

  this.hidden_bias_to_output_weight = Math.random();
}

Net.prototype.computeOutput = function (input) {
  // Compute each hidden node's activation state from their weights and the input
  var hiddenActivations =
    this.input_to_hidden_weights.map(function (weight) {
      return input * weight;
    }).map(sigmoid);

  // Compute the sum of the hidden activation, weighted by the weights from the
  // hidden nodes to the output node.
  var weightedHiddenSum = this.hidden_bias * this.hidden_bias_to_output_weight;
  this.hidden_to_output_weights.forEach(function(weight, index) {
    weightedHiddenSum += weight * hiddenActivations[index];
  })

  return sigmoid(weightedHiddenSum);
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = Net;
