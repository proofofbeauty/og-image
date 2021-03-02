import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_lib/parser';
import { getArtScreenshot, getDefaultScreenshot, getPaletteScreenshot, getPrintArtScreenshot } from './_lib/chromium';
import { ArtParsedRequest, DefaultParsedRequest, PrintArtParsedRequest, PaletteParsedRequest, FullArtParsedRequest } from './_lib/types';

const isDev = !process.env.AWS_REGION;
// const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const parsedRequest = parseRequest(req);

        console.log(parsedRequest);
        let file: Buffer = Buffer.alloc(0);
        if (parsedRequest.type === 'full-art') {
            file = await getArtScreenshot((parsedRequest as FullArtParsedRequest).hash, 'jpeg', 100, isDev);
        }
        if (parsedRequest.type === 'art') {
            file = await getArtScreenshot((parsedRequest as ArtParsedRequest).hash, 'jpeg', 20, isDev);
        }
        if (parsedRequest.type === 'print-art') {
            file = await getPrintArtScreenshot((parsedRequest as PrintArtParsedRequest).id, 'jpeg', 100, isDev);
        }
        if (parsedRequest.type === 'default') {
            file = await getDefaultScreenshot((parsedRequest as DefaultParsedRequest).hash, (parsedRequest as DefaultParsedRequest).title, (parsedRequest as DefaultParsedRequest).subtitle, 'jpeg', 20, isDev);
        }
        if (parsedRequest.type === 'palette') {
            file = await getPaletteScreenshot((parsedRequest as PaletteParsedRequest).address, 'jpeg', 20, isDev);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', `image/jpeg`);
        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        res.end(file);
    } catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
    }
}
