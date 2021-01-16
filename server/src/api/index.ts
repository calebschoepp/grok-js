import * as fs from 'fs';
import * as acorn from 'acorn';

export interface Region {
    start: number;
    end: number;
}

// TODO don't return any but rather a proper type
export function grok(src: string, highlight: Region): any {
    // Parse the source code into an AST
    const opts: acorn.Options = {
        ecmaVersion: 2015,
    };
    const ast = acorn.parse(src, opts);

    //
}

// TODO remove this is just for testing
const highlight: Region = { start: 0, end: 10 };
console.log(grok(fs.readFileSync('./server/src/api/example.js', 'utf8'), highlight));
