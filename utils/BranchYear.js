const fs = require('fs');

const checkNumeric = (str) => {
    if(/[^0-9]/.test(str)) return false;
    return true;
}

const parseStudentEmail = (email) => {
    const result = {
        isValid: false,
        message: "",
        details: {
            yearOfJoining: "",
            branch: "",
            course: ""
        }
    };

    if (!email.endsWith("@student.nitw.ac.in")) {
        result.message = "Invalid student ID. Please provide a valid student email address.";
    } else {
        const branchMapping = {
            "ec": "Electronics and Communication Engineering",
            "ce": "Civil Engineering",
            "cs": "Computer Science & Engineering",
            "ee": "Electrical Engineering",
            "bt": "Biotechnology",
            "me": "Mechanical Engineering",
            "ch": "Chemical Engineering",
            "mm": "Metallurgical and Materials Engineering",
            "cy": "Chemistry",
            "ma": "Mathematics",
            "ph": "Physics"
        };
        const courseMapping = {
            "A": "Dual Degree",
            "B": "B.Tech.",
            "C": "M.Sc.",
            "D": "P.G. Diploma",
            "E": "M.Sc. Integrated",
            "F": "M.C.A.",
            "G": "M.B.A.",
            "H": "M.S.",
            "M": "M.Tech.",
            "R": "Research"
        }

        result.isValid = true;
        
        /*
        adding a new decoder with old, new email support and mtech/mca support
        new format: check this out: https://nitw.ac.in/api/static/files/2021_-_22_Regulations_2023-10-12-11-25-17.pdf#page=18
        */
       // 
       
        const rollNo = email.split("@")[0].slice(2);
        console.log(rollNo);
        if (checkNumeric(rollNo))
        {
            if (rollNo.length == 6) {
                // old roll number format (Only Btech though)
                try {
                    result.details.yearOfJoining = "20" + rollNo.slice(2, 4);
                    
                    // path to the list.json
                    const data = fs.readFileSync('./utils/list.json', 'utf8');
                
                    try {
                    const list = JSON.parse(data);
                    result.details.branch = rollNo in list ? branchMapping[list[rollNo]] : "Unknown Branch";
                    result.details.course = "B.Tech.";
                    } catch (error) {
                    console.log("Couldn't parse list");
                    }
                } catch (err) {
                    console.log(`Error: ${err}`);
                }
            } else {
                result.details.yearOfJoining = "pre"
                result.details.branch = "Unknown Branch"
                result.details.course = "Unknown Course"
            }
        }
        else
        {
            // new roll number
            result.details.yearOfJoining = "20" + rollNo.slice(0, 2);
            result.details.branch = branchMapping[rollNo.slice(2, 4)];
            result.details.course = courseMapping[rollNo[4].toUpperCase()];
        }
        
    }

    return result;
}

module.exports = { parseStudentEmail }

// const email1 = "sd22ecb0a57@student.nitw.ac.in";
// const email2 = "mb942076@student.nitw.ac.in";
// const email3 = "ab2121211@student.nitw.ac.in"

// let result = parseStudentEmail(email1);
// if (result.isValid) {
//     console.log("Student Information:");
//     console.log("Year of Joining:", result.details.yearOfJoining);
//     console.log("Branch:", result.details.branch);
//     console.log("Course:", result.details.course);
// } else {
//     console.log(result.message);
// }

// result = parseStudentEmail(email2);
// if (result.isValid) {
//     console.log("Student Information:");
//     console.log("Year of Joining:", result.details.yearOfJoining);
//     console.log("Branch:", result.details.branch);
//     console.log("Course:", result.details.course);
// } else {
//     console.log(result.message);
// }

// result = parseStudentEmail(email3);
// if (result.isValid) {
//     console.log("Student Information:");
//     console.log("Year of Joining:", result.details.yearOfJoining);
//     console.log("Branch:", result.details.branch);
//     console.log("Course:", result.details.course);
// } else {
//     console.log(result.message);
// }
