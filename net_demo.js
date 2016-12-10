$(function () {
  var canvas = document.getElementById("netDemo");
  var ctx = canvas.getContext("2d");

  generateAndPlotNet();

  $(canvas).click(generateAndPlotNet)
});

var generateAndPlotNet = function () {
  var canvas = document.getElementById("netDemo");
  var ctx = canvas.getContext("2d");

  var net = new Net(10);
  plotNetFunction(net, ctx, -10, 10);
}

var plotNetFunction = function (net, ctx, min, max) {
  var width = ctx.canvas.clientWidth;
  var height = ctx.canvas.clientHeight;

  ctx.fillStyle = "#222222";
  ctx.fillRect(0, 0, width, height);

  var barWidth = 1;

  ctx.fillStyle = "#666666";

  var barCount = Math.floor(width / barWidth);
  if (width % barWidth > 0) {
    barCount = barCount + 1;
  }

  var outputs = computeOutputs(net, min, max, barCount);
  var maxOutput = Math.max(...outputs);
  var minOutput = Math.min(...outputs);

  var currentBar = 0;
  while (currentBar < barCount) {
    var barHeight = height * (outputs[currentBar] / maxOutput);
    var x = currentBar * barWidth;
    var y = height - barHeight;

    ctx.fillRect(x, y, barWidth, barHeight);

    currentBar = currentBar + 1;
  }
}

var computeOutputs = function (net, min, max, count) {
  var currentInput = min;
  var inputStep = (max - min) / count;
  var outputs = [];
  while (outputs.length < count) {
    outputs.push(net.computeOutput(currentInput));
    currentInput = currentInput + inputStep;
  }

  return outputs;
}
