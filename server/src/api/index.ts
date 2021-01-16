import * as fs from 'fs';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';

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
    let ast: acorn.Node = {} as acorn.Node;
    try {
        ast = acorn.parse(src, opts);
    } catch (error) {
        // TODO return something else
        console.log('Failed to parse AST.');
        return 'ERROR';
    }

    console.log('\n\nwalk.findNodeAt:');
    console.log(walk.findNodeAt(ast, highlight.start, highlight.end, anyNode));
    console.log('\n\nwalk.findNodeAround:');
    console.log(walk.findNodeAround(ast, highlight.start, anyNode));
    console.log('\n\nwalk.findNodeAfter:');
    console.log(walk.findNodeAfter(ast, highlight.start, anyNode));

    return '';
}

function anyNode(type: any, node: any): boolean {
    return true;
}

// TODO remove this is just for testing
function test(highlight: Region) {
    console.log(highlight);
    console.log(grok(fs.readFileSync('./server/src/api/example.js', 'utf8'), highlight));
}

test({ start: 53, end: 107 });
test({ start: 264, end: 302 });
test({ start: 166, end: 170 });
