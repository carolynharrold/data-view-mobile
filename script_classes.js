const fs = require('fs');
//const fsp = fs.promises;


class CreateObjFromFile {
    constructor () {
        this._objFromFile = {};
        this._objWithNoNulls = {};
        this._averagesByDay = [];
    }
    set objFromFile(filePath) {
        let tempFileString;
        try {
            tempFileString = fs.readFileSync(filePath,'utf8');
        } catch (err) {
            console.log('err in CreateObjClass', err);
        }
        this._objFromFile = JSON.parse(tempFileString); 
    }

    get objFromFile() {
        return this._objFromFile;
    }

    set objWithNoNulls(objFromFile) {
        let counter = 0;
        const separators = ['-', 'T'];
        const arrayWithCoreEntries = objFromFile.map((cv, i) => {
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
        });

        const arrayWithCoreEntriesWithoutNulls = arrayWithCoreEntries.filter(x => x != null);    

        this._objWithNoNulls = arrayWithCoreEntriesWithoutNulls;
    }

    get objWithNoNulls() {
        return this._objWithNoNulls;
    }

    set averagesByDay(obj) {
        const arrayOfAveragesByDay = [];
        let day;
        let month;
        let year;
        let value = 0;
        let count = 0;

        for (let i = 0; i < obj.length; i += 1) {
            let cv = obj[i];
            console.log('inside fucntion: ', cv);

            if (!day) {
                day = cv.day;
                month = cv.month;
                year = cv.year
                value += cv.value;
                count += 1;
                console.log("day does not exist: ", count, day, month, value)
                //if it is the last object, OR it is the last obj of a day
            } else if (!(obj[i+1]) || (cv.day !== day)) {
                console.log("HELLOOOOOOOOO tomorrow is a new day");
                const avgValuesObj = {};
                //divide the value / count
                const avg = value / count;
                avgValuesObj.averageValue = avg;
                avgValuesObj.day = day;
                avgValuesObj.month = month;
                avgValuesObj.year = year;
                arrayOfAveragesByDay.push(avgValuesObj);
                count = 0;
                value = 0;
                day = null;
                month = null;
                console.log("count is reset", count, day, month, value)
            // else it is just a regular day    
            } else if (cv.day === day) {
                value += cv.value;
                count += 1;
                console.log("incrementing: ", count, day, month, value)
            }
        };

        console.log("array to return: ", arrayOfAveragesByDay)

        this._averagesByDay = arrayOfAveragesByDay;
    }

    get averagesByDay() {
        return this._averagesByDay;
    }


    static writeFile(filePath, text) {
        const stringifiedArrayWithCoreEntriesWithoutNulls = JSON.stringify(text);


        try {
            fs.writeFileSync(filePath, stringifiedArrayWithCoreEntriesWithoutNulls, 'utf8')
            console.log("written");
        } catch (err) {
        console.log('error occurred when writing file', err);
        }
    }
}

const fileObj = new CreateObjFromFile();
fileObj.objFromFile = '/Users/carolynharrold/tidepool/data-view-mobile/data/new2.json';

fileObj.objWithNoNulls = fileObj.objFromFile;

console.log("hiiii: ", fileObj.objWithNoNulls);
console.log(typeof fileObj.objWithNoNulls);

const filePath1 = '/Users/carolynharrold/tidepool/data-view-mobile/data/new11.json';

const filePath2 = '/Users/carolynharrold/tidepool/data-view-mobile/data/new12.json';

CreateObjFromFile.writeFile(filePath1, fileObj.objWithNoNulls);

fileObj.averagesByDay = fileObj.objWithNoNulls;

console.log("hiiii: ", fileObj.averagesByDay);

CreateObjFromFile.writeFile(filePath2, fileObj.averagesByDay);



