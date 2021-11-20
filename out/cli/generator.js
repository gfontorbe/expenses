"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJavaScript = void 0;
const fs_1 = __importDefault(require("fs"));
const langium_1 = require("langium");
const cli_util_1 = require("./cli-util");
const path_1 = __importDefault(require("path"));
function generateJavaScript(model, filePath, destination) {
    const data = (0, cli_util_1.extractDestinationAndName)(filePath, destination);
    const generatedFilePath = `${path_1.default.join(data.destination, data.name)}.js`;
    const fileNode = new langium_1.CompositeGeneratorNode();
    fileNode.append('"use strict";', langium_1.NL, langium_1.NL);
    model.expenses.forEach(greeting => fileNode.append(`console.log('Hello, ${greeting.amount}!');`, langium_1.NL));
    if (!fs_1.default.existsSync(data.destination)) {
        fs_1.default.mkdirSync(data.destination, { recursive: true });
    }
    fs_1.default.writeFileSync(generatedFilePath, (0, langium_1.processGeneratorNode)(fileNode));
    model.expenses.forEach(x => console.log(x.amount));
    return generatedFilePath;
}
exports.generateJavaScript = generateJavaScript;
//# sourceMappingURL=generator.js.map