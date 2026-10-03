/* Lab 05 - Run through Live Server as an ES module. */
import formatStudentResult, { DEPARTMENT_NAME, calculateTotal, calculateAverage, getGrade, getStatus as getStudentStatus } from "./lab05-utils.js";

const setOutput = (id, html) => { document.getElementById(id).innerHTML = html; };
const appendOutput = (id, html) => { document.getElementById(id).innerHTML += `${html}<br>`; };
const createResultCard = (student, result) => {
  const { name, rollNumber, department, semester } = student;
  const { total, average, grade, status } = result;
  return `<div class="border rounded p-3 mb-3 result-card"><h5>${name}</h5><p><strong>Roll No:</strong> ${rollNumber}<br><strong>Department:</strong> ${department}<br><strong>Semester:</strong> ${semester}<br><strong>Total:</strong> ${total}<br><strong>Average:</strong> ${average.toFixed(2)}<br><strong>Grade:</strong> ${grade}<br><strong>Status:</strong> ${status}</p></div>`;
};

/* TASK 1 - University Course Enrollment Manager */
const coreCourses = ["Web Development", "Database Systems", "Data Structures"];
const electiveCourses = ["Artificial Intelligence", "Computer Networks", "Cloud Computing"];
const enrollmentStudent = { name: "Ali", rollNumber: "BSCS-001", department: "Computer Science", semester: 6 };
const cgpaValues = [3.2, 3.45, 3.75, 2.9, 3.3];
const allCourses = [...coreCourses, ...electiveCourses];
const allCoursesCopy = [...allCourses, "Software Engineering"];
const updatedEnrollmentStudent = { ...enrollmentStudent, semester: 7, cgpa: 3.45 };
function enrollStudent(name, ...courses) { return `${name} enrolled in ${courses.length} course(s): ${courses.join(", ")}`; }
const calculateAverageCGPA = (...cgpas) => cgpas.reduce((total, cgpa) => total + cgpa, 0) / cgpas.length;
function getStudentInfo(name, department = "Computer Science") { return `${name}'s department: ${department}`; }
setOutput("task1Output", `<strong>Core Courses:</strong> ${coreCourses.join(", ")}<br><strong>Elective Courses:</strong> ${electiveCourses.join(", ")}<br><br><strong>All Courses (${allCourses.length}):</strong> ${allCourses.join(", ")}<br><strong>Copy after adding a course (${allCoursesCopy.length}):</strong> ${allCoursesCopy.join(", ")}<br><strong>Original still has ${allCourses.length} courses:</strong> ${allCourses.join(", ")}<br><br><strong>Original Student:</strong> ${enrollmentStudent.name}, Semester ${enrollmentStudent.semester}<br><strong>Updated Student:</strong> ${updatedEnrollmentStudent.name}, Semester ${updatedEnrollmentStudent.semester}, CGPA ${updatedEnrollmentStudent.cgpa}<br><br>${enrollStudent(enrollmentStudent.name, ...coreCourses)}<br><strong>Average CGPA:</strong> ${calculateAverageCGPA(...cgpaValues).toFixed(2)}<br><strong>Highest CGPA:</strong> ${Math.max(...cgpaValues).toFixed(2)}<br><strong>Department (default):</strong> ${getStudentInfo(enrollmentStudent.name).split(": ")[1]}`);

/* TASK 2 - Student Utility Module */
const moduleStudents = [
  { name: "Ali", rollNumber: "BSCS-001", assignment: 18, midterm: 22, finalExam: 42 },
  { name: "Ahmed", rollNumber: "BSCS-002", assignment: 15, midterm: 20, finalExam: 32 },
  { name: "Sara", rollNumber: "BSCS-023", assignment: 20, midterm: 28, finalExam: 43 },
  { name: "Ayesha", rollNumber: "BSCS-014", assignment: 10, midterm: 12, finalExam: 26 }
];
let task2Html = `<strong>Department:</strong> ${DEPARTMENT_NAME}<br><br>`;
moduleStudents.forEach((student) => { const { name, rollNumber, assignment, midterm, finalExam } = student; const total = calculateTotal(assignment, midterm, finalExam); task2Html += `<div class="border rounded p-3 mb-3 result-card"><h5>${formatStudentResult(name, rollNumber, total)}</h5><p><strong>Average:</strong> ${calculateAverage(assignment, midterm, finalExam).toFixed(2)}<br><strong>Grade:</strong> ${getGrade(total)}<br><strong>Status:</strong> ${getStudentStatus(total)}</p></div>`; });
setOutput("task2Output", task2Html);

/* TASK 3 - Online Examination Workflow */
function verifyStudent(roll, callback) { setTimeout(() => { if (!roll) { callback("Roll number is required", null); return; } callback(null, `Student ${roll} verified`); }, 1000); }
function loadExamPaper(callback) { setTimeout(() => callback("Exam paper loaded"), 1500); }
function submitAnswers(callback) { setTimeout(() => callback("Answers submitted"), 2000); }
function generateResult(callback) { setTimeout(() => callback("Result generated: 82 marks"), 1000); }
function runExamWorkflow(roll) {
  appendOutput("task3Output", "<strong>Valid roll number test</strong>"); appendOutput("task3Output", "Exam workflow started...");
  verifyStudent(roll, (error, verification) => { if (error) { appendOutput("task3Output", `<span class="text-danger">Error: ${error}</span>`); return; } appendOutput("task3Output", `Step 1: ${verification}`);
    // Callback hell: each nested callback must wait for the previous step to finish.
    loadExamPaper((paper) => { appendOutput("task3Output", `Step 2: ${paper}`); submitAnswers((submission) => { appendOutput("task3Output", `Step 3: ${submission}`); generateResult((result) => { appendOutput("task3Output", `Step 4: ${result}`); appendOutput("task3Output", "<strong>Exam completed successfully!</strong>"); }); }); });
  });
}
function runErrorFirstTest() { appendOutput("task3Output", "<br><strong>Empty roll number test</strong>"); appendOutput("task3Output", "Exam workflow started..."); verifyStudent("", (error) => { if (error) appendOutput("task3Output", `<span class="text-danger">Error: ${error}</span>`); }); }
runExamWorkflow("BSCS-001"); runErrorFirstTest();

/* TASK 4 - University Result Portal */
const studentDatabase = [
  { name: "Ali", rollNumber: "BSCS-001", department: DEPARTMENT_NAME, semester: 6, assignment: 18, midterm: 22, finalExam: 42 },
  { name: "Ahmed", rollNumber: "BSCS-002", department: DEPARTMENT_NAME, semester: 5, assignment: 15, midterm: 20, finalExam: 32 },
  { name: "Sara", rollNumber: "BSCS-023", department: DEPARTMENT_NAME, semester: 6, assignment: 20, midterm: 28, finalExam: 43 },
  { name: "Ayesha", rollNumber: "BSCS-014", department: DEPARTMENT_NAME, semester: 4, assignment: 10, midterm: 12, finalExam: 26 },
  { name: "Hassan", rollNumber: "BSCS-031", department: DEPARTMENT_NAME, semester: 5, assignment: 16, midterm: 24, finalExam: 32 }
];
function findStudent(rollNumber) { return new Promise((resolve, reject) => { setTimeout(() => { const student = studentDatabase.find((record) => record.rollNumber === rollNumber.trim().toUpperCase()); if (student) resolve(student); else reject("Student not found"); }, 1000); }); }
function calculateResult(student) { return new Promise((resolve) => { setTimeout(() => { const { assignment, midterm, finalExam } = student; const total = calculateTotal(assignment, midterm, finalExam); resolve({ total, average: calculateAverage(assignment, midterm, finalExam), grade: getGrade(total), status: getStudentStatus(total) }); }, 1000); }); }
function showPromiseChainDemo() { setOutput("task4PromiseOutput", "Searching..."); findStudent("BSCS-001").then((student) => calculateResult(student).then((result) => ({ student, result }))).then(({ student, result }) => setOutput("task4PromiseOutput", `Searching...<br>${createResultCard(student, result)}`)).catch((error) => setOutput("task4PromiseOutput", `Searching...<br><span class="text-danger">Error: ${error}</span>`)).finally(() => appendOutput("task4PromiseOutput", "Search completed")); }
async function showResult(rollNumber) { setOutput("task4SearchOutput", "Searching..."); try { const student = await findStudent(rollNumber); const result = await calculateResult(student); setOutput("task4SearchOutput", `Searching...<br>${createResultCard(student, result)}`); } catch (error) { setOutput("task4SearchOutput", `Searching...<br><span class="text-danger">Error: ${error}</span>`); } finally { appendOutput("task4SearchOutput", "Search completed"); } }
async function loadAllResults() { setOutput("task4AllResultsOutput", "Loading all student results..."); try { const results = await Promise.all(studentDatabase.map(async (student) => ({ student, result: await calculateResult(student) }))); const passed = results.filter(({ result }) => result.status === "Pass").length; const cards = results.map(({ student, result }) => createResultCard(student, result)).join(""); setOutput("task4AllResultsOutput", `${cards}<div class="border-top pt-3"><strong>Final Statistics</strong><br>Total Students: ${results.length}<br>Passed Students: ${passed}<br>Failed Students: ${results.length - passed}</div>`); } catch (error) { setOutput("task4AllResultsOutput", `<span class="text-danger">Error: ${error}</span>`); } }
document.getElementById("searchResultBtn").addEventListener("click", () => showResult(document.getElementById("rollNumberInput").value));
document.getElementById("loadAllResultsBtn").addEventListener("click", loadAllResults);
showPromiseChainDemo();
