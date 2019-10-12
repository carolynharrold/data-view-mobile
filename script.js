const fs = require('fs');



let newObj;
let counter = 0;

try {
    newObj = fs.readFileSync('/Users/carolynharrold/tidepool/data-view-mobile/data/tidepool-data.json','utf8')
} catch (err) {
  console.log(err);
}

newObj = JSON.parse(newObj);

// const newNewObj = newObj.map((cv, i) => {
//     const newArray = Object.entries(cv);
//     const objToReturn = {};
//     newArray.forEach(cv => {
//         if (!(cv[1] === null)) {
//             const newVal = cv[0];
//             objToReturn[newVal] = cv[1];
//         }
//     })
//     return objToReturn;
// })

const separators = ['-', 'T'];

const newNewObj = newObj.map((cv, i) => {
    const newArray = Object.entries(cv);
    const objToReturn = {};

    if (cv.deviceTime && cv.value) {
    objToReturn.deviceTime = cv.deviceTime;
    const dt = cv.deviceTime;

    if (dt) {
        counter += 1;
        const timeArray = dt.split(new RegExp(separators.join('|'), 'g'));
        objToReturn.year = Number(timeArray[0]);
        objToReturn.month = Number(timeArray[1]);
        objToReturn.day = Number(timeArray[2]);
        objToReturn.time = timeArray[3];

    }

    objToReturn.value = cv.value;
    return objToReturn;
    }
})

const filteredNewObj = newNewObj.filter(x => x != null);
// console.log(newNewObj);

const stringifiedObj = JSON.stringify(filteredNewObj);

console.log(counter);

//**    */
// try {
//     fs.writeFileSync('/Users/carolynharrold/tidepool/data-view-mobile/data/new3.json', stringifiedObj, 'utf8')
//     console.log("written");
// } catch (err) {
//   console.log(err);
// }




//*** Create averages by day */

const generateAveragesByDay = (obj) => {

    //declare an empty arragy to store the values
    const arrayOfAveragesByDay = [];
    //declare a variable to store the date
    let day;
    let month;
    //decalre a variable value, w value 0 to store the value
    let value = 0;
    //declare a counter variable to count the number of values in a day
    let count = 0;
    // iteerate through the array of objects

    for (let i = 0; i < obj.length; i += 1) {
        // if the date = the date already set:
        //console.log('inside fucntion: ', cv);
        let cv = obj[i];

        // if (obj[i +  1]) {
        //     console.log('DAY:', (obj[i +  1].day), day, value, count);

        // }


        if (!day) {
            day = cv.day;
            month = cv.month;
            value += cv.value;
            count += 1;
            console.log("day does not exist: ", count, day, month, value)
        } else if (!(obj[i+1]) || (cv.day !== day)) {
            console.log("HELLOOOOOOOOO");

            //declare and empty object
            const avgValuesObj = {};
            //divide the value / count
            const avg = value / count;
            //set the averageVal and the date as values onthe object 
            avgValuesObj.averageValue = avg;
            avgValuesObj.day = day;
            avgValuesObj.month = month;
            avgValuesObj.year = cv.year;
            arrayOfAveragesByDay.push(avgValuesObj);
            count = 0;
            value = 0;
            day = null;
            month = null;
            //console.log("count is reset", count, day, month, value)
        } else {
            // day = cv.day;
            // month = cv.month;
            value += cv.value;
            count += 1;
            console.log("incrementing: ", count, day, month, value)
        }
    };

    console.log("array to return: ", arrayOfAveragesByDay)

    return arrayOfAveragesByDay;
}

const avgByDay = generateAveragesByDay(filteredNewObj);
const stringifiedAvgPerDay = JSON.stringify(avgByDay);
//console.log(generateAveragesByDay(filteredNewObj));

try {
    fs.writeFileSync('/Users/carolynharrold/tidepool/data-view-mobile/data/new4.json', avgByDay, 'utf8')
    console.log("written2");
} catch (err) {
  console.log(err);
}