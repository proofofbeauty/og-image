import { launch, Page } from 'puppeteer-core';
import { getOptions } from './options';
import { FileType } from './types';
let _page: Page | null;

async function getPage(isDev: boolean) {
    if (_page) {
        return _page;
    }
    const options = await getOptions(isDev);
    const browser = await launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getPrintArtScreenshot(id: string, type: FileType, quality: number, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setViewport({ width: 3000, height: 4800 });
    await page.goto(`https://pob.studio/preview/print-art/${id}`);
    const file = await page.screenshot({ type, quality, });
    return file;
}

export async function getArtScreenshot(hash: string, type: FileType, quality: number, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setViewport({ width: 1125, height: 1800 });
    await page.goto(`https://pob.studio/preview/art/${hash}`);
    const file = await page.screenshot({ type, quality, });
    return file;
}

export async function getPaletteScreenshot(address: string, type: FileType, quality: number, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setViewport({ width: 1200, height: 627 });
    await page.goto(`https://pob.studio/preview/palette/${address}`);
    const file = await page.screenshot({ type, quality, });
    return file;
}

export async function getDefaultScreenshot(hash: string, title: string, subtitle: string = '',type: FileType, quality: number, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setViewport({ width: 1200, height: 627 });
    await page.goto(`https://pob.studio/preview?hash=${hash}&title=${title}&subtitle=${subtitle}`);
    const file = await page.screenshot({ type, quality, });
    return file;
}