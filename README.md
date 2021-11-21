# Langium Expenses
This is a test project using [Langium](https://github.com/langium/langium) to produce a DSL and CLI

## DSL Grammar
* The DSL accepts files with the extension ```.exp```
* Expense entity:
  ```
  paid amount on 'paymendDate' for 'tag'
  ```
  ```
  paid 125.25 on '10.10.2010' for 'office supplies'
  ```
* Income entity:
    ```
    received amount on 'paymentDate' from 'tag' 
    ```
    ```
    received 1000 on '01.10.2020' from 'grant'
    ```

* amount can have 1 or 2 decimals
* paymentDate must be in format dd.mm.yyyy
* tag can be any chain of characters

## CLI commands
The CLI has one command to generate a report according to the data found in the .exp file

General use:
```
report [options] <file>

Arguments:
<file> The path of the file the report is based one (.exp)

Options:
-s | --save <dir> save report as a .txt file in the designated directory
-d | --date <date> filter by desired date
-t | --tag <tag> filter by tag
```

Examples:
* Generate a report in the console
  ```
  report .\samples\sample.exp
  ```
* Generate a report in the console and save a .txt file
  ```
  report .\samples\sample.txt -s .\samples\reports\
  ```
* Generate a report filtered by date
  ```
  report .\samples\sample.txt -d "10.11.2021"
  ```
* Generate a report filtered by date and save a .txt file
  ```
  report .\samples\sample.txt -d "10.11.2021" -s .\samples\reports\
  ```
* Generate a report filtered by tag
  ```
  report .\samples\sample.txt -t salary
  ```
  ```
  report .\samples\sample.txt -t "tag with spaces"
  ```
* Generate a report filtered by tag and save a .txt file
  ```
  report .\samples\sample.txt -t salary -s .\samples\reports\
  ```
* Generate a report filtered by date and by tag
  ```
  report .\samples\sample.txt -d "10.11.2021" -t salary
  ```
* Generate a report filtered by date and tag and save a .txt file
  ```
  report .\samples\sample.txt -d "10.11.2021" -t salary -s .\samples\reports\
  ```
