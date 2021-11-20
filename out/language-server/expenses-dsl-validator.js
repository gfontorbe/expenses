"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesDslValidator = exports.ExpensesDslValidationRegistry = void 0;
const langium_1 = require("langium");
/**
 * Registry for validation checks.
 */
class ExpensesDslValidationRegistry extends langium_1.ValidationRegistry {
    constructor(services) {
        super(services);
        const validator = services.validation.ExpensesDslValidator;
        const checks = {
            Expense: [validator.checkExpenseHasAllAttributes, validator.checkPaymentDateFormat],
            Income: [validator.checkIncomeHasAllAttributes, validator.checkPaymentDateFormat]
        };
        this.register(checks, validator);
    }
}
exports.ExpensesDslValidationRegistry = ExpensesDslValidationRegistry;
/**
 * Implementation of custom validations.
 */
class ExpensesDslValidator {
    //check that Expense has an amount, paymentDate and tag
    checkExpenseHasAllAttributes(expense, accept) {
        if (!expense.amount) {
            accept('warning', 'Expense must have an amount.', { node: expense, property: 'amount' });
        }
        if (!expense.paymentDate) {
            accept('warning', 'Expense must have a payment date.', { node: expense, property: 'paymentDate' });
        }
        if (!expense.tag) {
            accept('warning', 'Expense must have a tag.', { node: expense, property: 'tag' });
        }
    }
    //check that Income has an amount, paymentDate and tag
    checkIncomeHasAllAttributes(income, accept) {
        if (!income.amount) {
            accept('warning', 'Expense must have an amount.', { node: income, property: 'amount' });
        }
        if (!income.paymentDate) {
            accept('warning', 'Expense must have a payment date.', { node: income, property: 'paymentDate' });
        }
        if (!income.tag) {
            accept('warning', 'Expense must have a tag.', { node: income, property: 'tag' });
        }
    }
    //check that paymentDate is in format dd.mm.yyyy
    checkPaymentDateFormat(expense, accept) {
        if (!/^\d{1,2}[\.]\d{1,2}[\.]\d{4}$/.test(expense.paymentDate)) {
            accept('error', 'Date must be in format dd.mm.yyyy', { node: expense, property: 'paymentDate' });
        }
    }
}
exports.ExpensesDslValidator = ExpensesDslValidator;
//# sourceMappingURL=expenses-dsl-validator.js.map