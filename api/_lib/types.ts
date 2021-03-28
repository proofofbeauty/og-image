export type FileType = 'png' | 'jpeg';

export interface ParsedRequest {
    type: string;

}

export interface PrintArtParsedRequest extends ParsedRequest {
    id: string;
    type: 'print-art';
}

export interface FullArtParsedRequest extends ParsedRequest {
    hash: string;
    type: 'full-art';
}

export interface ArtParsedRequest extends ParsedRequest {
    hash: string;
    type: 'art';
}

export interface PaletteParsedRequest extends ParsedRequest {
    address: string;
    type: 'palette';
}

export interface DefaultParsedRequest extends ParsedRequest {
    title: string;
    subtitle: string;
    type: 'default';
}
