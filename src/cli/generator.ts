import fs from "fs";
import { CompositeGeneratorNode, NL, processGeneratorNode } from "langium";
import { Expense, Income, Model } from "../language-server/generated/ast";
import { GenerateOptions } from "./index";
import colors from "colors";
import path from "path";

// generate report in console
export function generateReport(
    model: Model,
    filePath: string, options: GenerateOptions
): void {
    const fileName = path.basename(filePath);
    console.log(`Generating report for ${fileName}... \n`);

    if (options.tag) {
        console.log(`Filtered by tag "${options.tag}".`);
    }
    if (options.date) {
        console.log(`Filtered by date "${options.date}".`);
    }

    console.log();

    console.log(
        `Found ${model.expenses.length} expense entr${model.expenses.length > 0 ? "ies" : "y"
        }`
    );
    console.log(
        `Found ${model.incomes.length} income entr${model.incomes.length > 0 ? "ies" : "y"
        }`
    );
    console.log();

    console.log("Expenses: ");
    logEntries(model.expenses);
    console.log(
        colors.red(
            `Total expenses: ${sumOfPayments(model.expenses).toFixed(2)}eur \n`
        )
    );

    console.log("Incomes: ");
    logEntries(model.incomes);
    console.log(
        colors.green(
            `Total incomes: ${sumOfPayments(model.incomes).toFixed(2)}eur \n`
        )
    );

    console.log(`Balance: `);
    let balance = getBalance(model);
    console.log(
        `${balance >= 0
            ? colors.green(`${balance.toFixed(2)}eur`)
            : colors.red(`${balance.toFixed(2)}eur`)
        }`
    );
}

// display a log in the console for each entry in Income or Expense Array
function logEntries(entries: Income[] | Expense[]): void {
    if (entries.length === 0) {
        console.log(`No entry found.`);
    } else {
        entries.sort((e1, e2) => {
            if (e1.paymentDate > e2.paymentDate) {
                return 1;
            } else if (e1.paymentDate < e2.paymentDate) {
                return -1;
            } else {
                return 0;
            }
        });

        entries.forEach((entry) =>
            console.log(
                `${entry.paymentDate} ${entry.amount.toFixed(2)}eur ${entry.tag}`
            )
        );
    }
}

// returns sum of 'amount' from an array of Income or Expense
function sumOfPayments(entries: Income[] | Expense[]): number {
    let sum = 0;
    entries.forEach((entry) => (sum += entry.amount));

    return sum;
}

// returns 'amount' difference between sum of Income and sum of Expense 
function getBalance(model: Model): number {
    return sumOfPayments(model.incomes) - sumOfPayments(model.expenses);
}

// filter model by tag
export function filterModelByTag(model: Model, tag: string): void {
    model.expenses = model.expenses.filter(x => x.tag === tag);
    model.incomes = model.incomes.filter(x => x.tag === tag);
}

// filter model by date
export function filterModelByDate(model: Model, date: string): void {
    model.expenses = model.expenses.filter(x => x.paymentDate === date);
    model.incomes = model.incomes.filter(x => x.paymentDate === date);
}

// create a report and saves it as a .txt file
export function saveReportOnDisk(model: Model, filePath: string, options: GenerateOptions): void {

    let saveFilePath = options.save as string;
    let fileName = path.basename(filePath).replace('.exp', '');
    let saveFileName = `${fileName}${options.tag ? `_${options.tag.replace(/\s/g, '_')}` : ''}${options.date ? `_${options.date.replace(/\'|\./g, '')}` : ''}.txt`;

    // sort model by date
    model.expenses = model.expenses.sort((e1, e2) => {
        if (e1.paymentDate > e2.paymentDate) {
            return 1;
        } else if (e1.paymentDate < e2.paymentDate) {
            return -1;
        } else {
            return 0;
        }
    });
    model.incomes = model.incomes.sort((i1, i2) => {
        if (i1.paymentDate > i2.paymentDate) {
            return 1;
        } else if (i1.paymentDate < i2.paymentDate) {
            return -1;
        } else {
            return 0;
        }
    });

    const fileNode = new CompositeGeneratorNode();

    fileNode.append(`Report for ${fileName}`, NL, NL);
    if (options.tag) {
        fileNode.append(`Filtered by tag "${options.tag}"`, NL);
    }
    if (options.date) {
        fileNode.append(`Filtered by date "${options.date}"`, NL);
    }

    fileNode.append(NL, `Expenses (${model.expenses.length}):`, NL);
    model.expenses.forEach(e => fileNode.append(`${e.paymentDate} ${e.amount.toFixed(2)}eur ${e.tag}`, NL));

    fileNode.append(NL, `Total expenses: ${sumOfPayments(model.expenses)}`, NL);

    fileNode.append(NL, `Incomes (${model.incomes.length}):`, NL);
    model.incomes.forEach(i => fileNode.append(`${i.paymentDate} ${i.amount.toFixed(2)}eur ${i.tag}`, NL));

    fileNode.append(NL, `Total incomes: ${sumOfPayments(model.incomes)}`, NL);

    fileNode.append(NL, `Balance: ${getBalance(model).toFixed(2)}eur`);

    if (!fs.existsSync(saveFilePath)) {
        fs.mkdirSync(saveFilePath, { recursive: true });
    }

    fs.writeFileSync(saveFilePath + saveFileName, processGeneratorNode(fileNode));
}
