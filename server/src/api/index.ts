interface Region {
    start: int;
    end: int;
}

// TODO don't return any
export function grok(src: string, highlight: Region): any {
    console.log(highlight);
}
