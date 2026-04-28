/* ========================= */
/* PAGE SWITCHING FUNCTION */
/* ========================= */
function show(pageId){

    // Hide all pages
    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("show");
    });

    // Show selected page
    document.getElementById(pageId).classList.add("show");
}


/* ========================= */
/* LOGIN */
/* ========================= */
document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault(); // stop refresh
    show("dashboard");
});


/* ========================= */
/* LOAD DATA FROM STORAGE */
/* ========================= */
let students = JSON.parse(localStorage.getItem("students")) || [];
let results  = JSON.parse(localStorage.getItem("results")) || [];


/* ========================= */
/* ADD STUDENT */
/* ========================= */
document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();

    let inputs = this.querySelectorAll("input");

    let student = {
        name: inputs[0].value,
        roll: inputs[1].value,
        semester: inputs[2].value
    };

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Added Successfully!");

    this.reset();
});


/* ========================= */
/* ADD MARKS */
/* ========================= */
document.getElementById("marksForm").addEventListener("submit", function(e){
    e.preventDefault();

    let inputs = this.querySelectorAll("input");

    let roll = inputs[0].value;
    let subject = inputs[1].value;
    let marks = parseInt(inputs[2].value);
    let total = parseInt(inputs[3].value);

    let student = students.find(s => s.roll === roll);

    if(!student){
        alert("Student Not Found! Please add student first.");
        return;
    }

    let percentage = (marks / total) * 100;

    let grade = "";
    if(percentage >= 75) grade = "A";
    else if(percentage >= 50) grade = "B";
    else grade = "F";

    let resultStatus = percentage >= 50 ? "Pass" : "Fail";

    let record = {
        roll,
        name: student.name,
        subject,
        marks,
        grade,
        result: resultStatus
    };

    results.push(record);

    localStorage.setItem("results", JSON.stringify(results));

    alert("Marks Added Successfully!");

    this.reset();
});


/* ========================= */
/* LOAD RESULTS INTO TABLE */
/* ========================= */
function loadResults(){

    let tbody = document.getElementById("resultBody");

    tbody.innerHTML = "";

    results.forEach(r => {

        let row = `
            <tr>
                <td>${r.roll}</td>
                <td>${r.name}</td>
                <td>${r.subject}</td>
                <td>${r.marks}</td>
                <td>${r.grade}</td>
                <td>${r.result}</td>
            </tr>
        `;

        tbody.innerHTML += row;
    });
}