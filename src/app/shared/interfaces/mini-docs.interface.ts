import { CustomMetadata } from "./custom-metadata.interface";

export interface MiniDocs {
    /** The very first `#` of the content */
    title: string;
    /** The title same as above but it is marked and imbued with anchor link inside `h1` tag */
    markedTitle: string;
    /** The calculated time to read in minutes. Returns: `time` min read */
    timeToRead: string;
    /** The content (excluding title) to be displayed as preview or summary of a subject */
    overview: string;
    /** The yaml front matter which contains other information such as `authors`, `tags`, `published_date`, and other custom fields */
    metadata?: Metadata;
    /** The remaining content without the `overview` content */
    truncatedContent: string;
}

/** The Yaml front matter in the markdown */
export interface Metadata extends CustomMetadata {
    /** The author */
    authors?: Author[];
    /** @example ['tags-here','another-tag','tag'] */
    tags?: string[];
    /** @example "OCT 5 2022 09:35 UTC+8", "2022-10-05 09:35 UTC+8" */
    published_date?: string;
}

export interface Author {
    name: string;
    title?: string;
    image_url?: string;
    url?: string;
}