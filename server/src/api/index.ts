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
    // TODO add more options?
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

    // First try to grab the least specific node from an exact selection.
    // If that fails try to grab the least specific node from an inexact selection.
    let found: walk.Found<acorn.Node> | undefined;
    try {
        found = walk.findNodeAt(ast, highlight.start, highlight.end, anyNode);
        if (!found) {
            console.log('Less exact.');
            found = walk.findNodeAfter(ast, highlight.start, anyNode);
            if (!found) {
                // Couldn't find anything, something went wrong
                throw Error('Failed to find any node.');
            }
        }
    } catch (error) {
        // TODO return something else
        console.log('Failed to parse AST.');
        return 'ERROR';
    }
    const subTree: acorn.Node = found.node;

    console.log(subTree);

    // console.log('\n\nwalk.findNodeAt:');
    // console.log(walk.findNodeAt(ast, highlight.start, highlight.end, anyNode));
    // console.log('\n\nwalk.findNodeAround:');
    // console.log(walk.findNodeAround(ast, highlight.start, anyNode));
    // console.log('\n\nwalk.findNodeAfter:');
    // console.log(walk.findNodeAfter(ast, highlight.start, anyNode));

    return '';
}

function anyNode(type: any, node: any): boolean {
    return true;
}

// TODO remove this is just for testing
function test(highlight: Region, label: string) {
    console.log(label);
    console.log(highlight);
    console.log(grok(fs.readFileSync('./server/src/api/example.js', 'utf8'), highlight));
}

test({ start: 78, end: 85 }, 'Rest element');
test({ start: 272, end: 302 }, 'Arrow function');
test({ start: 530, end: 548 }, 'Function');
test({ start: 381, end: 394 }, 'Identifier');
test({ start: 509, end: 510 }, 'Binary and literal');
