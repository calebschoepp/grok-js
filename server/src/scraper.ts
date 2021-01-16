import axios from 'axios';
import { HTMLElement, NodeType, parse } from 'node-html-parser';
import { inspect } from 'util';

type Document = {
    title?: string;
    source?: string;
    summary?: string;
};

const urls: string[] = [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment',
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions',
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator',
];

function findElementWithClassname(root: HTMLElement, className: string): HTMLElement | undefined {
    if (root.classNames.includes(className)) {
        return root;
    }

    for (const child of root.childNodes) {
        if (child.nodeType === NodeType.ELEMENT_NODE) {
            const el = findElementWithClassname(child as HTMLElement, className);
            if (el !== undefined) {
                return el;
            }
        }
    }
}

async function scrape(url: string) {
    const res = await axios.get(url);
    const root = parse(res.data);

    console.log(findElementWithClassname(root, 'title'));

    // console.log(inspect(root));

    let doc: Document = {
        title: '',
        source: url,
        summary: '',
    };

    return doc;
}

(async () => {
    for (const url of urls) {
        console.log(inspect(await scrape(url)));
    }
})();
