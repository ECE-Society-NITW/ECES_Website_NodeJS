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
            "ec": "Electronics & Communication Engineering",
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

        result.isValid = true;
        result.details.yearOfJoining = "20" + email.slice(2, 4);
        result.details.branch = branchMapping[email.slice(4, 6).toLowerCase()] || "Unknown Branch";
        result.details.course = email.slice(6, 7).toUpperCase();

        if (result.details.course === "B") {
            result.details.course = "B.TECH";
        }
    }

    return result;
}

module.exports = { parseStudentEmail }

// const email = "sd22ecb0a57@nitw.ac.in";
// const result = parseStudentEmail(email);

// if (result.isValid) {
//     console.log("Student Information:");
//     console.log("Year of Joining:", result.details.yearOfJoining);
//     console.log("Branch:", result.details.branch);
//     console.log("Course:", result.details.course);
// } else {
//     console.log(result.message);
// }