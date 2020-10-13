function print(current) {
  let str = '';
   while (current !== undefined) {
      str += current.val;
      current = current.next;
  }
  console.log(str);
}

function processData(input) {
  let list = [];
  let next;
  for (let i = input.length-1; i >= 0; i--) {
      next = {val: input[i], next};
      if (i < input.length - 1) next.next.prev = next;
  }
  let head = next;

  let current = head;
  while (current !== undefined) {
      if (current.val === 'a' && current.next.val === 'n' && current.next.next.val === 't' && current.next.next.next.val === 'i' && current.next.next.next.next.val === 'm' && current.next.next.next.next.next.val === 'a' && current.next.next.next.next.next.next.val === 't' && current.next.next.next.next.next.next.next.val === 't' && current.next.next.next.next.next.next.next.next.val === 'e' && current.next.next.next.next.next.next.next.next.next.val === 'r') {
          if (current == head) {
              head = current.next.next.next.next.next.next.next.next.next.next;
          } else {
              try {
                  current.prev.next = current.next.next.next.next.next.next.next.next.next.next;
                  current.prev.next.prev = current.prev;
              }  catch(e) {
                  current.prev.next = undefined;
              }
          }

          try {
              current = current.prev.prev.prev.prev.prev.prev.prev.prev.prev.prev.next;
          } catch(e) {
              current = head;
          }
      } else {
          current = current.next;
      }
  }
  current = head;
  print(current);
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