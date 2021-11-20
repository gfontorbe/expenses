grammar ExpensesDsl
hidden(WS, SL_COMMENT, ML_COMMENT)

Model:
    (expenses+=Expense | incomes+=Income)*;

Expense:
    'paid' amount=NUMBER 'on' paymentDate=STRING 'for' tag=STRING;

Income:
    'received' amount=NUMBER 'on' paymentDate=STRING 'from' tag=STRING; 

terminal WS: /\s+/;
terminal NUMBER returns number: /\d+(\.\d{1,2})?/;
terminal STRING: /"[^"]*"|'[^']*'/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;