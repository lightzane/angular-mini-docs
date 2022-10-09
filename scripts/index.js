"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const marked_1 = require("marked");
const js_yaml_1 = __importDefault(require("js-yaml"));
const mini_docs_config_json_1 = __importDefault(require("./mini-docs.config.json"));
const outputFilename = (mini_docs_config_json_1.default === null || mini_docs_config_json_1.default === void 0 ? void 0 : mini_docs_config_json_1.default.output) || 'list.ts';
const WPM = (mini_docs_config_json_1.default === null || mini_docs_config_json_1.default === void 0 ? void 0 : mini_docs_config_json_1.default.wpm) || 220;
const DIR = (mini_docs_config_json_1.default === null || mini_docs_config_json_1.default === void 0 ? void 0 : mini_docs_config_json_1.default.docs) || 'docs';
const MD = '.md';
const targetFiles = [];
const miniDocsList = [];
const regexTruncate = /<!-- truncate -->/;
let globalAuthors;
try {
    globalAuthors = js_yaml_1.default.load(fs.readFileSync(`${DIR}/authors.yml`, { encoding: 'utf-8' }));
}
catch (err) {
    console.warn('authors.yml - not found or contains errors');
}
function readThroughDir(nextPath) {
    const files = fs.readdirSync(nextPath);
    files.forEach((file) => {
        const next = path_1.default.join(nextPath, file);
        if (fs.statSync(next).isDirectory()) {
            readThroughDir(next);
        }
        else if (path_1.default.extname(file) === MD) {
            targetFiles.push(next);
        }
    });
}
function readAndMark(files) {
    files.forEach((file) => {
        const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });
        const [metadata, updatedFileContent] = extractFrontMatter(fileContent);
        const title = getTitle(updatedFileContent);
        const markdownDocument = {
            title,
            markedTitle: (0, marked_1.marked)(`# ${title}`),
            timeToRead: getTimeToRead(updatedFileContent),
            truncatedContent: (0, marked_1.marked)(getTruncatedContent(updatedFileContent).replace(regexTruncate, '')),
            overview: (0, marked_1.marked)(getOverviewContent(updatedFileContent)),
            metadata
        };
        miniDocsList.push(markdownDocument);
    });
}
function getTimeToRead(content) {
    const words = content.trim().split(/s+/).length;
    const time = Math.ceil(words / WPM);
    return `${time} min read`;
}
function extractFrontMatter(markdownContent) {
    const delimeter = '---';
    const hasDelimiter = markdownContent.includes(delimeter);
    let start = markdownContent.indexOf(delimeter);
    let end = markdownContent.lastIndexOf(delimeter);
    start = start >= 0 ? start + delimeter.length + 1 : 0;
    end = end >= 0 ? end - 1 : 0;
    const spaceAllowance = hasDelimiter ? start : 0;
    const updatedMarkdownContent = markdownContent
        .substring(end + spaceAllowance).trimStart();
    let yaml = markdownContent.substring(start, end);
    yaml = yaml.includes('#') ? '' : yaml;
    return [
        parseYaml(yaml),
        updatedMarkdownContent
    ];
}
function parseYaml(yaml) {
    let metadata = undefined;
    if (yaml) {
        metadata = js_yaml_1.default.load(yaml);
    }
    if (metadata) {
        if (metadata.authors) {
            injectAuthors(metadata.authors);
        }
    }
    return metadata;
}
function injectAuthors(authors) {
    if (Array.isArray(authors)) {
        authors.forEach((author, index) => {
            if (typeof author === 'string') {
                if (globalAuthors && globalAuthors[author]) {
                    authors[index] = globalAuthors[author];
                }
                else {
                    authors[index] = undefined;
                }
            }
            else {
            }
        });
    }
    else {
        authors = [authors];
    }
}
function getTitle(markdownContent) {
    const [title] = /#.*/.exec(markdownContent) || ['# Untitled'];
    return title.replace(/.*#\s*/, '');
}
function getOverviewContent(markdownContent) {
    let overview = '';
    const truncateMatches = regexTruncate.exec(markdownContent);
    if (markdownContent && (truncateMatches === null || truncateMatches === void 0 ? void 0 : truncateMatches.length)) {
        const truncateIndex = truncateMatches.index;
        overview = markdownContent.substring(0, truncateIndex);
        overview = overview.replace(/\]\((?!http|#)/g, ']\(assets/') // for image src
        const lines = overview.split('\n');
        lines.splice(0, 1);
        overview = lines.join('\n');
    }
    return overview;
}
function getTruncatedContent(markdownContent) {
    let content = markdownContent;
    const truncateMatches = regexTruncate.exec(markdownContent);
    if (markdownContent && (truncateMatches === null || truncateMatches === void 0 ? void 0 : truncateMatches.length)) {
        const truncateIndex = truncateMatches.index;
        content = markdownContent.substring(truncateIndex);
    }
    content = content.replace(/^(.*)$/m, '');
    content = content.replace(/\]\((?!http|#)/g, ']\(assets/') // for image src
    return content;
}
readThroughDir(DIR);
readAndMark(targetFiles);
miniDocsList.sort((a, b) => {
    var _a, _b;
    const prev = +new Date(((_a = a.metadata) === null || _a === void 0 ? void 0 : _a.published_date) || -1);
    const next = +new Date(((_b = b.metadata) === null || _b === void 0 ? void 0 : _b.published_date) || -1);
    return next - prev;
});
const addImport = outputFilename.includes('.ts') ? 'import { MiniDocs } from "./interfaces";\n\n' : ''
const addExport = outputFilename.includes('.ts') ? 'export ' : '';
const addType = outputFilename.includes('.ts') ? ': MiniDocs[] ' : '';
fs.writeFileSync(`./src/app/shared/${outputFilename}`, `${addImport}${addExport}const miniDocsList${addType} = ${JSON.stringify(miniDocsList, null, 2)}\n`, { encoding: 'utf-8' });
