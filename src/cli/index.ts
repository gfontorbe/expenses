// import colors from 'colors';
import { Command } from 'commander';
import { languageMetaData } from '../language-server/generated/module';
import { Model } from '../language-server/generated/ast';
import { createExpensesDslServices } from '../language-server/expenses-dsl-module';
import { extractAstNode } from './cli-util';
// import { generateJavaScript, generateReport } from './generator';
import { generateReport, filterModelByTag, filterModelByDate, saveReportOnDisk } from './generator';

// export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
//     const model = await extractAstNode<Model>(fileName, languageMetaData.fileExtensions, createExpensesDslServices());
//     const generatedFilePath = generateJavaScript(model, fileName, opts.destination);
//     console.log(colors.green(`JavaScript code generated successfully: ${generatedFilePath}`));
// };

export const generateReportAction = async (filePath: string, options: GenerateOptions) : Promise<void> => {
    console.log(options);
    let model = await extractAstNode<Model>(filePath, languageMetaData.fileExtensions, createExpensesDslServices());

    if(options.tag){
        filterModelByTag(model, options.tag);
    }
    if(options.date){
        filterModelByDate(model, options.date);
    }

    generateReport(model, filePath, options);

    if(options.save){
        saveReportOnDisk(model, filePath, options);
    }
}

export type GenerateOptions = {
    save?: string,
    tag?: string,
    date?: string
}

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);

    program
        .command('report')
        .argument('<file>', `possible file extensions: ${languageMetaData.fileExtensions.join(', ')}`)
        .option('-s, --save <dir>', 'save report in designated directory')
        .option('-t, --tag <tag>','report only for desired tag')
        .option('-d, --date <date>', 'report only for desired date')
        .description('generates report for expenses registered in the file')
        .action(generateReportAction);

    program.parse(process.argv);
}
