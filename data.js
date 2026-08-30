/* ============================================================
   data.js — EDIT THIS FILE TO ADD / CHANGE / REMOVE COURSES
   ============================================================
   This is the ONLY file you need to touch to update the course
   list. index.html, style.css, and script.js never need to
   change for normal content updates.

   HOW TO ADD A NEW COURSE
   -------------------------
   1. Copy one of the objects inside the `courses` array below
      (from the opening { to the closing },).
   2. Paste it as a new entry in the array.
   3. Update every field for the new course.
   4. Save the file — the new course card appears automatically,
      in the order it appears in this array.

   HOW TO REMOVE A COURSE
   -------------------------
   Delete its whole { ... } object from the array (and the comma
   before/after it, so the list stays valid).

   FIELD NOTES
   -------------------------
   - code            → short course code, e.g. "CS101"
   - title           → full course title, e.g. "Introduction to Computing"
   - category        → department / subject line under the title
   - creditHours     → number, e.g. 3
   - instructorName  → full name with title, e.g. "Dr. M. Tanvir Afzal"
   - instructorDegree→ qualification line, e.g. "PhD"
   - instructorOrg   → university / institute line
   - enrolledCount   → number shown in the badge (top right of card)
   ============================================================ */

const semesterLabel = "Spring 2026";

/* ============================================================
   STUDENTS — who is allowed to log in with an ID / roll number
   ============================================================
   HOW TO ADD A STUDENT
   -------------------------
   1. Copy one of the objects below and paste it as a new entry.
   2. Set "id" to the roll number they will type in to log in
      (matching is case-insensitive, so "bscs-2022-001" and
      "BSCS-2022-001" both work).
   3. Set "name" to how their name should be greeted.
   4. OPTIONAL — "courseCodes": if you want this student to see
      only some of the courses, list their course codes here,
      e.g. courseCodes: ["CS101", "ENG101"]. If you leave this
      field out entirely, the student sees every course in the
      `courses` list below.

/* ============================================================
   STUDENTS — who is allowed to log in with a roll number + password
   ============================================================
   HOW TO ADD A STUDENT
   -------------------------
   1. Copy one of the objects below and paste it as a new entry.
   2. Set "id" to the roll number they'll type in (matching is
      case-insensitive: "bscs-2022-001" works the same as
      "BSCS-2022-001").
   3. Set "password" to whatever they'll type in the password box
      (this IS case-sensitive, exact match only).
   4. Set "name" to how their name should be greeted.
   5. OPTIONAL — "courseCodes": if you want this student to see
      only some of the courses, list their course codes here,
      e.g. courseCodes: ["CS101", "ENG101"]. Leave it out entirely
      to show every course in the `courses` list below.

   ⚠️ IMPORTANT — THIS IS NOT REAL SECURITY
   This is a static site with no server or database, so this file
   is 100% public once deployed — anyone can open data.js directly
   (or just "View Source") and read every password in plain text.
   Treat this as a simple two-field access gate for a demo/personal
   project, NOT as protection for anything actually sensitive. Do
   not reuse a real password you use elsewhere, and don't put CNIC
   numbers or other private details in student records.
   ============================================================ */

const students = [
  {
    id: "BSCS-2022-001",
    password: "spring2026",
    name: "Hassan Nasir"
    // no courseCodes → sees every course below
  }

  /*
  , // <-- uncomment this comma when you add another student

  {
    id: "BSCS-2022-002",
    password: "example123",
    name: "Example Student",
    courseCodes: ["CS101", "ENG101"] // sees only these two courses
  }
  */
];

const courses = [
  {
    code: "CS101",
    title: "Introduction to Computing",
    category: "Computer Science / Information Technology",
    creditHours: 3,
    instructorName: "Dr. M. Tanvir Afzal",
    instructorDegree: "PhD",
    instructorOrg: "Graz University of Tech, Austria",
    enrolledCount: 172
  },
  {
    code: "ENG101",
    title: "English Comprehension",
    category: "English",
    creditHours: 3,
    instructorName: "Dr. Surriya Shaffi Mir",
    instructorDegree: "Ph.D English",
    instructorOrg: "(Leeds, UK)",
    enrolledCount: 45
  },
  {
    code: "MGT503",
    title: "Principles of Management",
    category: "Management",
    creditHours: 3,
    instructorName: "Dr. Rasheed Kausar",
    instructorDegree: "PhD",
    instructorOrg: "Michigan State University, USA",
    enrolledCount: 45
  },
  {
    code: "MGT211",
    title: "Introduction To Business",
    category: "Management",
    creditHours: 3,
    instructorName: "Dr. Rizwan Saleem",
    instructorDegree: "PhD Management",
    instructorOrg: "University of Management and Technology, Lahore",
    enrolledCount: 14
  },
  {
    code: "ISL202",
    title: "Islamic Studies",
    category: "Humanities Distribution",
    creditHours: 2,
    instructorName: "Abdul Quddoos Durrani",
    instructorDegree: "M.Phil",
    instructorOrg: "Minhaj University Lahore",
    enrolledCount: 30
  }
];

/* ============================================================
   GRADE BOOK — Midterm & Final Term results
   ============================================================
   HOW TO UPDATE
   -------------------------
   - "code" must match a course "code" in the `courses` list
     above (that's how the Grade Book page finds the course
     title to display).
   - Add/remove a row the same way as courses: copy a { ... }
     object, paste it in the right array, edit the values.
   - "classAverage" and "examAttendance" are plain numbers/text
     exactly as they should be displayed (e.g. "23.98", "88.54%").

   NOTE ON THE FINAL TERM DATA BELOW:
   The final-term screenshot you sent was identical to the
   midterm one, so real final-term marks weren't available yet.
   The rows below are PLACEHOLDERS (all zeros) so the page and
   table work correctly — replace the marks/percentage/etc. with
   your actual final term results whenever you have them.
   ============================================================ */

const gradeBook = {
  midterm: {
    label: "Midterm Result (SPRING 2026)",
    rows: [
      { code: "MGT503", marks: "18.00/40", percentage: "45%", classAverage: "23.98", examAttendance: "88.54%", remarks: "" },
      { code: "MGT211", marks: "22.00/40", percentage: "55%", classAverage: "24.87", examAttendance: "86.99%", remarks: "" },
      { code: "ISL202", marks: "20.00/40", percentage: "50%", classAverage: "27.17", examAttendance: "81.57%", remarks: "" },
      { code: "ENG101", marks: "16.00/40", percentage: "40%", classAverage: "24.69", examAttendance: "77.89%", remarks: "" },
      { code: "CS101", marks: "22.87/40", percentage: "57%", classAverage: "21.89", examAttendance: "78.99%", remarks: "" }
    ]
  },
  final: {
    label: "Final Term Result (SPRING 2026)",
    rows: [
      // PLACEHOLDER — replace with your real final term marks.
      { code: "MGT503", marks: "0.00/60", percentage: "0%", classAverage: "0.00", examAttendance: "0.00%", remarks: "" },
      { code: "MGT211", marks: "0.00/60", percentage: "0%", classAverage: "0.00", examAttendance: "0.00%", remarks: "" },
      { code: "ISL202", marks: "0.00/60", percentage: "0%", classAverage: "0.00", examAttendance: "0.00%", remarks: "" },
      { code: "ENG101", marks: "0.00/60", percentage: "0%", classAverage: "0.00", examAttendance: "0.00%", remarks: "" },
      { code: "CS101", marks: "0.00/60", percentage: "0%", classAverage: "0.00", examAttendance: "0.00%", remarks: "" }
    ]
  }
};
