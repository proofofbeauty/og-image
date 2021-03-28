import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ArtParsedRequest, PrintArtParsedRequest, FullArtParsedRequest, DefaultParsedRequest, PaletteParsedRequest, ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);

    const previewType = (pathname || '/').slice(1);

    const { id, hash, address, title, subtitle } = (query || {});

    if (previewType.includes('print-art')) {
        const parsedRequest: PrintArtParsedRequest = {
            id: id as string,
            type: 'print-art',
        };
    
        return parsedRequest;
    }

    if (previewType.includes('full-art')) {
        const parsedRequest: FullArtParsedRequest = {
            hash: hash as string,
            type: 'full-art',
        };
    
        return parsedRequest;
    }

    if (previewType.includes('art')) {
        const parsedRequest: ArtParsedRequest = {
            hash: hash as string,
            type: 'art',
        };
    
        return parsedRequest;
    }

    if (previewType.includes('palette')) {
        const parsedRequest: PaletteParsedRequest = {
            address: address as string,
            type: 'palette',
        };
    
        return parsedRequest;
    }

    if (previewType.includes('default')) {
        const parsedRequest: DefaultParsedRequest = {
            title: title as string,
            subtitle: subtitle as string,
            type: 'default',
        };
    
        return parsedRequest;
    }

    return {
        type: 'none'
    } as ParsedRequest
}

// function getArray(stringOrArray: string[] | string | undefined): string[] {
//     if (typeof stringOrArray === 'undefined') {
//         return [];
//     } else if (Array.isArray(stringOrArray)) {
//         return stringOrArray;
//     } else {
//         return [stringOrArray];
//     }
// }