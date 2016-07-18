var common = require("./commonscripts.js");
var Client = require('node-rest-client').Client;
var client = new Client();
var express = require('express');
var app = express();
var url=common.baseQueryUrl;
app.use(express.static('/usr/local/spendanalytics/WebServices/public'));
require('./listCustomers')(app,client,url);
require('./listExpensesByCategoryWeekly')(app,client,url);
require('./listExpensesByCategoryMonthly')(app,client,url);
require('./listExpensesByCategoryYearly')(app,client,url);
require('./listExpensesByCategoryQuarterly')(app,client,url);
require('./getMonthlyIncomeExpenses')(app,client,url);
require('./getYearlyIncomeExpenses')(app,client,url);
//require('./authenticateUser')(app,client,url);
require('./getAllYearIncomeExpenses')(app,client,url);
require('./getDaywiseExpensesforMonth')(app,client,url);
require('./getAllMonthExpenses')(app,client,url);
require('./listtransactiondata')(app,client,url);
require('./listExpensesByWeek')(app,client,url);
require('./listCustomerDetails')(app,client,url);
require('./listCategorySubcategoryExpense')(app,client,url);
require('./AvgSpendCategory')(app,client,url);


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("SpendAnalytics app listening at http://%s:%s", host, port)

})
