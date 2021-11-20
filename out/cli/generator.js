"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveReportOnDisk = exports.filterModelByDate = exports.filterModelByTag = exports.generateReport = void 0;
const fs_1 = __importDefault(require("fs"));
const langium_1 = require("langium");
const colors_1 = __importDefault(require("colors"));
const path_1 = __importDefault(require("path"));
// generate report in console
function generateReport(model, filePath, options) {
    const fileName = path_1.default.basename(filePath);
    console.log(`Generating report for ${fileName}... \n`);
    if (options.tag) {
        console.log(`Filtered by tag "${options.tag}".`);
    }
    if (options.date) {
        console.log(`Filtered by date "${options.date}".`);
    }
    console.log();
    console.log(`Found ${model.expenses.length} expense entr${model.expenses.length > 0 ? "ies" : "y"}`);
    console.log(`Found ${model.incomes.length} income entr${model.incomes.length > 0 ? "ies" : "y"}`);
    console.log();
    console.log("Expenses: ");
    logEntries(model.expenses);
    console.log(colors_1.default.red(`Total expenses: ${sumOfPayments(model.expenses).toFixed(2)}eur \n`));
    console.log("Incomes: ");
    logEntries(model.incomes);
    console.log(colors_1.default.green(`Total expenses: ${sumOfPayments(model.incomes).toFixed(2)}eur \n`));
    console.log(`Balance: `);
    let balance = getBalance(model);
    console.log(`${balance >= 0
        ? colors_1.default.green(`${balance.toFixed(2)}eur`)
        : colors_1.default.red(`${balance.toFixed(2)}eur`)}`);
}
exports.generateReport = generateReport;
// display a log in the console for each entry in Income or Expense Array
function logEntries(entries) {
    if (entries.length === 0) {
        console.log(`No entry found.`);
    }
    else {
        entries.sort((e1, e2) => {
            if (e1.paymentDate > e2.paymentDate) {
                return 1;
            }
            else if (e1.paymentDate < e2.paymentDate) {
                return -1;
            }
            else {
                return 0;
            }
        });
        entries.forEach((entry) => console.log(`${entry.paymentDate} ${entry.amount.toFixed(2)}eur ${entry.tag}`));
    }
}
// returns sum of 'amount' from an array of Income or Expense
function sumOfPayments(entries) {
    let sum = 0;
    entries.forEach((entry) => (sum += entry.amount));
    return sum;
}
// returns 'amount' difference between sum of Income and sum of Expense 
function getBalance(model) {
    return sumOfPayments(model.incomes) - sumOfPayments(model.expenses);
}
// filter model by tag
function filterModelByTag(model, tag) {
    model.expenses = model.expenses.filter(x => x.tag === tag);
    model.incomes = model.incomes.filter(x => x.tag === tag);
}
exports.filterModelByTag = filterModelByTag;
// filter model by date
function filterModelByDate(model, date) {
    model.expenses = model.expenses.filter(x => x.paymentDate === date);
    model.incomes = model.incomes.filter(x => x.paymentDate === date);
}
exports.filterModelByDate = filterModelByDate;
// create a report and saves it as a .txt file
function saveReportOnDisk(model, filePath, options) {
    let saveFilePath = options.save;
    let fileName = path_1.default.basename(filePath).replace('.exp', '');
    let saveFileName = `${fileName}${options.tag ? `_${options.tag.replace(/\s/g, '_')}` : ''}${options.date ? `_${options.date.replace(/\'|\./g, '')}` : ''}.txt`;
    // sort model by date
    model.expenses = model.expenses.sort((e1, e2) => {
        if (e1.paymentDate > e2.paymentDate) {
            return 1;
        }
        else if (e1.paymentDate < e2.paymentDate) {
            return -1;
        }
        else {
            return 0;
        }
    });
    model.incomes = model.incomes.sort((i1, i2) => {
        if (i1.paymentDate > i2.paymentDate) {
            return 1;
        }
        else if (i1.paymentDate < i2.paymentDate) {
            return -1;
        }
        else {
            return 0;
        }
    });
    const fileNode = new langium_1.CompositeGeneratorNode();
    fileNode.append(`Report for ${fileName}`, langium_1.NL, langium_1.NL);
    if (options.tag) {
        fileNode.append(`Filtered by tag "${options.tag}"`, langium_1.NL);
    }
    if (options.date) {
        fileNode.append(`Filtered by date "${options.date}"`, langium_1.NL);
    }
    fileNode.append(langium_1.NL, `Expenses (${model.expenses.length}):`, langium_1.NL);
    model.expenses.forEach(e => fileNode.append(`${e.paymentDate} ${e.amount.toFixed(2)}eur ${e.tag}`, langium_1.NL));
    fileNode.append(langium_1.NL, `Incomes (${model.incomes.length}):`, langium_1.NL);
    model.incomes.forEach(i => fileNode.append(`${i.paymentDate} ${i.amount.toFixed(2)}eur ${i.tag}`, langium_1.NL));
    fileNode.append(langium_1.NL, `Balance: ${getBalance(model).toFixed(2)}eur`);
    if (!fs_1.default.existsSync(saveFilePath)) {
        fs_1.default.mkdirSync(saveFilePath, { recursive: true });
    }
    fs_1.default.writeFileSync(saveFilePath + saveFileName, (0, langium_1.processGeneratorNode)(fileNode));
}
exports.saveReportOnDisk = saveReportOnDisk;
//# sourceMappingURL=generator.js.map