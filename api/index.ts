import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_lib/parser';
import { getArtScreenshot, getDefaultScreenshot, getPaletteScreenshot, getPrintArtScreenshot } from './_lib/chromium';
import { ArtParsedRequest, DefaultParsedRequest, PrintArtParsedRequest, PaletteParsedRequest, FullArtParsedRequest } from './_lib/types';

const isDev = !process.env.AWS_REGION;
// const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';

// const allowCors = (fn: any) => async (req: IncomingMessage, res: ServerResponse) => {
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     // another common pattern
//     // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     )
//     if (req.method === 'OPTIONS') {
//       res.statusCode = 200;
//       res.end()
//       return
//     }
//     return await fn(req, res)
//   }

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
            console.log('here?')
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
