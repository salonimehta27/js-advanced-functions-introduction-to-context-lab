// Your code here
function createEmployeeRecord(employee)
{
const obj={
    firstName:employee[0],
    familyName:employee[1],
    title:employee[2],
    payPerHour:employee[3],
    timeInEvents:[],
    timeOutEvents:[]
}
return obj;
}

function createEmployeeRecords(arrayOfArrays)
{
return arrayOfArrays.map(record=>createEmployeeRecord(record))
}

function createTimeInEvent(empObj,dateStamp)
{
    let spl=dateStamp.split(" ");
    empObj.timeInEvents.push({
        type:"TimeIn",
        hour: parseInt(spl[1],10),
        date: spl[0]
  })
  return empObj;
}

function createTimeOutEvent(empObj,dateStamp) //dateStamp="YYYY-MM-DD HHMM"
{
    let spl=dateStamp.split(" ");
    empObj.timeOutEvents.push({
        type:"TimeOut",
        hour: parseInt(spl[1],10),
        date: spl[0]
  })
  return empObj;
}
function hoursWorkedOnDate(empObj,dateForm) //dateForm= "YYYY-MM-DD"
{
  let inEvent=empObj.timeInEvents.find((event)=>event.date===dateForm)
  let outEvent=empObj.timeOutEvents.find((event)=>event.date===dateForm)
  let calculateHours=(outEvent.hour-inEvent.hour)/100
  return calculateHours;
}
function wagesEarnedOnDate(empObj,dateForm)
{
 return empObj.payPerHour*hoursWorkedOnDate(empObj,dateForm);
 
}
function allWagesFor(empObj)
{
 let findMatchingDates=empObj.timeInEvents.map(x=>x.date);
 let returnMe=findMatchingDates.reduce((accum,x)=>accum+wagesEarnedOnDate(empObj,x),0)
 return returnMe;
}
function findEmployeeByFirstName(srcArr,firstName)
{
return srcArr.find(x=>x.firstName===firstName);

}
function calculatePayroll(arr)
{
 return arr.reduce((accum,x)=>accum+allWagesFor(x),0);
}