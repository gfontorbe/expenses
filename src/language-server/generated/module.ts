/******************************************************************************
 * This file was generated by langium-cli 0.2.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import { LangiumGeneratedServices, LangiumServices, LanguageMetaData, Module } from 'langium';
import { ExpensesDslAstReflection } from './ast';
import { grammar } from './grammar';

export const languageMetaData: LanguageMetaData = {
    languageId: 'expenses-dsl',
    fileExtensions: ['.exp']
};

export const ExpensesDslGeneratedModule: Module<LangiumServices, LangiumGeneratedServices> = {
    Grammar: () => grammar(),
    AstReflection: () => new ExpensesDslAstReflection(),
    LanguageMetaData: () => languageMetaData,
    parser: {}
};