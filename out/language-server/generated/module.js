"use strict";
/******************************************************************************
 * This file was generated by langium-cli 0.2.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesDslGeneratedModule = exports.languageMetaData = void 0;
const ast_1 = require("./ast");
const grammar_1 = require("./grammar");
exports.languageMetaData = {
    languageId: 'expenses-dsl',
    fileExtensions: ['.exp']
};
exports.ExpensesDslGeneratedModule = {
    Grammar: () => (0, grammar_1.grammar)(),
    AstReflection: () => new ast_1.ExpensesDslAstReflection(),
    LanguageMetaData: () => exports.languageMetaData,
    parser: {}
};
//# sourceMappingURL=module.js.map