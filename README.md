# Caesar cipher CLI tool

Console tool for text encoding/decoding by Caesar cipher algorithm.
It gets as an input some text file or you can print text direct to console. As result it returns transformed text to another file or console.

**Usage:**
1. Download or clone this repo
2. Install dependencies ```$ npm install```
3. Run ```$ node caesar_cli -a <action> -s <shift_value> -i <input_file> -o <output_file>```

To run add 4 params:
1.  **-s, --shift**: a shift - *REQUIRED*
2.  **-a, --action**: an action encode/decode - *REQUIRED*
3.  **-i, --input**: an input file
4.  **-o, --output**: an output file

Options **shift** and **action** are required.
You can omit options **input** or **output**. And in that case text will be received from console and printed to console.

**Usage example:**

```bash
$ node caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt
```