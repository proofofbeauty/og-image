export type FileType = 'png' | 'jpeg';

export interface ParsedRequest {
    type: string;
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
    hash: string;
    title: string;
    subtitle: string;
    type: 'default';
}
