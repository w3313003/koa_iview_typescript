const pinyin = require("pinyin");

export function getPinyinBySinger(singer: string) {
    return pinyin(singer, {
        segment: true
    })[0];
}

