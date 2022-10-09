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
const mini_docs_config_json_1 = __importDefault(require("./mini-docs.config.json"));
const outputFilename = (mini_docs_config_json_1.default === null || mini_docs_config_json_1.default === void 0 ? void 0 : mini_docs_config_json_1.default.output) || 'list.ts';
const copyAssetsToPath = mini_docs_config_json_1.default.public || './docs';
const INDEX_HTML = (mini_docs_config_json_1.default === null || mini_docs_config_json_1.default === void 0 ? void 0 : mini_docs_config_json_1.default.index) || 'public';

fs.unlinkSync(`${copyAssetsToPath}/filler.md`)

const addImport = outputFilename.includes('.ts') ? 'import { MiniDocs } from "./interfaces";\n\n' : ''
const addExport = outputFilename.includes('.ts') ? 'export ' : '';
const addType = outputFilename.includes('.ts') ? ': MiniDocs[] ' : '';
fs.writeFileSync(`./src/app/shared/${outputFilename}`, `${addImport}${addExport}const miniDocsList${addType} = []\n`, { encoding: 'utf-8' });

let html = fs.readFileSync(`${INDEX_HTML}/index.html`, { encoding: 'utf-8' })
html = html.replace(/ type="module"/g,'')
html = html.replace(/\n/g, '')

fs.writeFileSync(`${INDEX_HTML}/index.html`, html, { encoding: 'utf-8' })
