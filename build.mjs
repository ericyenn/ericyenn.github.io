import ts from "typescript";
import {readFile,writeFile} from "node:fs/promises";
const config=ts.readConfigFile("tsconfig.json",ts.sys.readFile);
const parsed=ts.parseJsonConfigFileContent(config.config,ts.sys,".");
const program=ts.createProgram(parsed.fileNames,parsed.options);
const diagnostics=ts.getPreEmitDiagnostics(program);
if(diagnostics.length){console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics,{getCurrentDirectory:ts.sys.getCurrentDirectory,getCanonicalFileName:p=>p,getNewLine:()=>"\n"}));process.exit(1);}
const source=await readFile("src/site.ts","utf8");
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}});
const {output}=await import("data:text/javascript;base64,"+Buffer.from(compiled.outputText).toString("base64"));
for(const [file,html] of Object.entries(output))await writeFile(file,html);
console.log("TypeScript checked; generated all three pages.");
