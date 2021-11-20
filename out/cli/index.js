"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReportAction = void 0;
const commander_1 = require("commander");
const module_1 = require("../language-server/generated/module");
const expenses_dsl_module_1 = require("../language-server/expenses-dsl-module");
const cli_util_1 = require("./cli-util");
const generator_1 = require("./generator");
const generateReportAction = (filePath, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(options);
    let model = yield (0, cli_util_1.extractAstNode)(filePath, module_1.languageMetaData.fileExtensions, (0, expenses_dsl_module_1.createExpensesDslServices)());
    if (options.tag) {
        (0, generator_1.filterModelByTag)(model, options.tag);
    }
    if (options.date) {
        (0, generator_1.filterModelByDate)(model, options.date);
    }
    (0, generator_1.generateReport)(model, filePath, options);
    if (options.save) {
        (0, generator_1.saveReportOnDisk)(model, filePath, options);
    }
});
exports.generateReportAction = generateReportAction;
function default_1() {
    const program = new commander_1.Command();
    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);
    program
        .command('report')
        .argument('<file>', `possible file extensions: ${module_1.languageMetaData.fileExtensions.join(', ')}`)
        .option('-s, --save <dir>', 'save report in designated directory')
        .option('-t, --tag <tag>', 'report only for desired tag')
        .option('-d, --date <date>', 'report only for desired date')
        .description('generates report for expenses registered in the file')
        .action(exports.generateReportAction);
    program.parse(process.argv);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map