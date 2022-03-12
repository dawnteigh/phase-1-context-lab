/* Your Code Here */
function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrRec) {
    return arrRec.map(rec => createEmployeeRecord(rec))
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    this.timeInEvents.push(timeIn)
    return this
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(timeOut)
    return this
}

function hoursWorkedOnDate(date) {
    const clockOut = this.timeOutEvents.find(d => d.date === date)
    const clockIn = this.timeInEvents.find(d => d.date === date)
    return (clockOut.hour - clockIn.hour) / 100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(name => name.firstName === firstName)
}

 function calculatePayroll(arrRec) {
     return arrRec.reduce((sum, rec) => {
         return sum + allWagesFor.call(rec)
     }, 0)
    }
