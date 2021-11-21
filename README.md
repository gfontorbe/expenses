# Langium Expenses
This is a test project using [Langium](https://github.com/langium/langium) to produce a DSL and CLI

## DSL Grammar
* The DSL accepts files with the extension ```.exp```
* Expense entity:
  ```
  paid amount on 'date' for 'tag'
  ```
* Income entity:
```
  received amount on 'date' from 'tag' 
```