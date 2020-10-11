use std::io;
use std::io::Read;

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    input = input.trim().to_string();

    let mut output = input;

    loop {
        let size_before = output.len();
        output = output.replace("antimatter", "");
        let size_after = output.len();

        if size_before == size_after { break; }
    }

    println!("{}", output);
}
