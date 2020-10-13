function processData(input) {
  let index = input.indexOf('antimatter');
  while (index >= 0 && index < input.length) {
    input = input.substr(0, index) + input.substr(index + 10);
    index = Math.max(0, index - 10);
    index = input.indexOf('antimatter', index);
  }
  console.log(input);
}
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
  _input += input;
});
process.stdin.on("end", function () {
 processData(_input);
});