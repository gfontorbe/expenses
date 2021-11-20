import { ValidationAcceptor, ValidationCheck, ValidationRegistry } from 'langium';
import { ExpensesDslAstType, Expense, Income } from './generated/ast';
import { ExpensesDslServices } from './expenses-dsl-module';

/**
 * Map AST node types to validation checks.
 */
type ExpensesDslChecks = { [type in ExpensesDslAstType]?: ValidationCheck | ValidationCheck[] }

/**
 * Registry for validation checks.
 */
export class ExpensesDslValidationRegistry extends ValidationRegistry {
    constructor(services: ExpensesDslServices) {
        super(services);
        const validator = services.validation.ExpensesDslValidator;
        const checks: ExpensesDslChecks = {
            Expense: [validator.checkExpenseHasAllAttributes, validator.checkPaymentDateFormat],
            Income: [validator.checkIncomeHasAllAttributes, validator.checkPaymentDateFormat]
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class ExpensesDslValidator {

    //check that Expense has an amount, paymentDate and tag
    checkExpenseHasAllAttributes(expense: Expense, accept: ValidationAcceptor): void{
        if(!expense.amount){
            accept('warning','Expense must have an amount.',{node: expense, property: 'amount'});
        }
        if(!expense.paymentDate){
            accept('warning','Expense must have a payment date.',{node: expense, property: 'paymentDate'});
        }
        if(!expense.tag){
            accept('warning','Expense must have a tag.',{node: expense, property: 'tag'});
        }

    }

    //check that Income has an amount, paymentDate and tag
    checkIncomeHasAllAttributes(income: Income, accept: ValidationAcceptor): void{
        if(!income.amount){
            accept('warning','Expense must have an amount.',{node: income, property: 'amount'});
        }
        if(!income.paymentDate){
            accept('warning','Expense must have a payment date.',{node: income, property: 'paymentDate'});
        }
        if(!income.tag){
            accept('warning','Expense must have a tag.',{node: income, property: 'tag'});
        }
    }

    //check that paymentDate is in format dd.mm.yy or dd.mm.yyyy
    checkPaymentDateFormat(expense: Expense | Income, accept: ValidationAcceptor):void{
        if(!/^\d{1,2}[\.]\d{1,2}[\.](\d{4}|\d{2})$/.test(expense.paymentDate)){
            accept('error','Date must be in format dd.mm.yyyy', {node: expense, property: 'paymentDate'});
        }
    }
}
