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

   PRIVACY NOTE: this file is public once deployed on GitHub
   Pages — do not put CNIC numbers, passwords, or other private
   details in student records, just a name and roll number.
   ============================================================ */

const students = [
  {
    id: "BSCS-2022-001",
    name: "Hassan Nasir"
    // no courseCodes → sees every course below
  }

  /*
  , // <-- uncomment this comma when you add another student

  {
    id: "BSCS-2022-002",
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
