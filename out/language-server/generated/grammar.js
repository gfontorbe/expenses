"use strict";
/******************************************************************************
 * This file was generated by langium-cli 0.2.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.grammar = void 0;
const langium_1 = require("langium");
let loaded;
const grammar = () => loaded || (loaded = (0, langium_1.loadGrammar)(`{
  "$type": "Grammar",
  "usedGrammars": [],
  "hiddenTokens": [
    {
      "$refText": "WS"
    },
    {
      "$refText": "SL_COMMENT"
    },
    {
      "$refText": "ML_COMMENT"
    }
  ],
  "metamodelDeclarations": [],
  "rules": [
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Model",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expenses",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "Expense"
              }
            },
            "elements": []
          },
          {
            "$type": "Assignment",
            "feature": "incomes",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "Income"
              }
            },
            "elements": []
          }
        ],
        "cardinality": "*"
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Expense",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "paid",
            "elements": []
          },
          {
            "$type": "Assignment",
            "feature": "amount",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "NUMBER"
              }
            }
          },
          {
            "$type": "Keyword",
            "value": "on"
          },
          {
            "$type": "Assignment",
            "feature": "paymentDate",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "STRING"
              }
            }
          },
          {
            "$type": "Keyword",
            "value": "for"
          },
          {
            "$type": "Assignment",
            "feature": "tag",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "STRING"
              }
            }
          }
        ]
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Income",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "received",
            "elements": []
          },
          {
            "$type": "Assignment",
            "feature": "amount",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "NUMBER"
              }
            }
          },
          {
            "$type": "Keyword",
            "value": "on"
          },
          {
            "$type": "Assignment",
            "feature": "paymentDate",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "STRING"
              }
            }
          },
          {
            "$type": "Keyword",
            "value": "from"
          },
          {
            "$type": "Assignment",
            "feature": "tag",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "STRING"
              }
            }
          }
        ]
      }
    },
    {
      "$type": "TerminalRule",
      "name": "WS",
      "regex": "\\\\s+"
    },
    {
      "$type": "TerminalRule",
      "name": "NUMBER",
      "type": "number",
      "regex": "\\\\d+(\\\\.\\\\d{1,2})?"
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "regex": "\\"[^\\"]*\\"|'[^']*'"
    },
    {
      "$type": "TerminalRule",
      "name": "ML_COMMENT",
      "regex": "\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/"
    },
    {
      "$type": "TerminalRule",
      "name": "SL_COMMENT",
      "regex": "\\\\/\\\\/[^\\\\n\\\\r]*"
    }
  ],
  "name": "ExpensesDsl",
  "definesHiddenTokens": true
}`));
exports.grammar = grammar;
//# sourceMappingURL=grammar.js.map