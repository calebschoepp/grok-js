import axios from 'axios';

const urls: string[] = [
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment',
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions',
    'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator',
];

async function scrape(url: string) {
    const res = await axios.get(url);
    console.log(res.data);
}

(async () => {
    for (const url of urls) {
        await scrape(url);
    }
})();
