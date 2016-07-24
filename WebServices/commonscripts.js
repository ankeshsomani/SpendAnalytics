exports.findFirstWeekNumber=function (year,month){
var monthStart = new Date(year, month-1, 1);
var yearStart= new Date(year, 0, 1);
var day = monthStart.getDay();
var weekOfMonth=2;
//console.log(day);
var x=7-day;
var firstWeekEndDate=new Date(monthStart.getFullYear(),monthStart.getMonth(),monthStart.getDate()+x);
var daysPassed=(firstWeekEndDate-yearStart) / (1000 * 60 * 60 * 24);
//console.log(daysPassed);
var firstWeekNumber=Math.ceil(daysPassed/7);
return firstWeekNumber;
}
exports.baseQueryUrl="http://localhost:8047/query.json";
exports.listExpensesByCategoryWeekly='/listExpensesByCategoryWeekly';
exports.listExpensesByCategoryMonthly='/listExpensesByCategoryMonthly';
exports.listExpensesByCategoryYearly='/listExpensesByCategoryYearly';
exports.listExpensesByCategoryQuarterly='/listExpensesByCategoryQuarterly';
exports.getMonthlyIncomeExpenses='/getMonthlyIncomeExpenses';
exports.getYearlyIncomeExpenses='/getYearlyIncomeExpenses';
exports.listCustomers='/listCustomers';
exports.authenticateUser='/authenticateUser';
exports.getAllYearIncomeExpenses='/getAllYearIncomeExpenses';
exports.getDaywiseExpensesforMonth='/getDaywiseExpensesforMonth';
exports.getAllMonthExpenses='/getAllMonthExpenses';
exports.listtransactiondata='/listtransactiondata';
exports.listExpensesByWeek='/listExpensesByWeek';
exports.listCustomerDetails='/listCustomerDetails';
exports.listCategorySubcategoryExpense='/listCategorySubcategoryExpense';
exports.AvgSpendCategory='/AvgSpendCategory';
exports.addTransactions='/addTransactions';
exports.mongoUrl='mongodb://localhost:27017/spendanalytics';

