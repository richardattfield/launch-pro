// date utility
// get current date when server starts up for initial launch data retrieval
const getCurrentDate = () => {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();
    currentMonth < 10 ? currentMonth = `0${currentMonth}` : currentMonth = currentMonth;
    currentDay < 10 ? currentDay = `0${currentDay}` : currentDay = currentDay;
    return `${currentDate.getFullYear()}-${currentMonth}-${currentDay}`
}

module.exports = getCurrentDate;