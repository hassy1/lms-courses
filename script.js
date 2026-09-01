/* ============================================================
   script.js — Reads `courses` from data.js and renders the
   course cards. You should not need to edit this file to
   change course content — edit data.js instead.
   ============================================================ */

(function () {
  "use strict";

  const courseList = document.getElementById("courseList");
  const semesterLabelEl = document.getElementById("semesterLabel");
  const loginScreen = document.getElementById("loginScreen");
  const coursesPage = document.getElementById("coursesPage");
  const loginInput = document.getElementById("loginInput");
  const passwordInput = document.getElementById("passwordInput");
  const loginBtn = document.getElementById("loginBtn");
  const loginMessage = document.getElementById("loginMessage");
  const welcomeLine = document.getElementById("welcomeLine");
  const logoutBtn = document.getElementById("logoutBtn");
  const menuBtn = document.getElementById("menuBtn");
  const navBackdrop = document.getElementById("navBackdrop");
  const navOverlay = document.getElementById("navOverlay");
  const navCloseBtn = document.getElementById("navCloseBtn");
  const gradeBookPage = document.getElementById("gradeBookPage");
  const gradeBookContent = document.getElementById("gradeBookContent");
  const lectureSchedulePage = document.getElementById("lectureSchedulePage");
  const lectureScheduleList = document.getElementById("lectureScheduleList");
  const comingSoonPage = document.getElementById("comingSoonPage");
  const comingSoonTitle = document.getElementById("comingSoonTitle");

  // The currently logged-in student, set on successful login and
  // used by the Grade Book / Lecture Schedule pages.
  let currentStudent = null;
  let activeGradeTab = "midterm";

  if (typeof semesterLabel !== "undefined") {
    semesterLabelEl.textContent = semesterLabel;
  }

  // Icon paths, kept as small inline SVGs (no external files/fonts).
  const icons = {
    assignments:
      '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 3v4h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.5 12h7M8.5 15.5h7M8.5 8.5h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    gdb:
      '<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="9.5" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 19c.5-3.2 2.9-5 5.5-5s5 1.8 5.5 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M14.8 14.6c2.2.2 4 1.8 4.4 4.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    quiz:
      '<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9.5 9.3a2.5 2.5 0 1 1 3.7 2.2c-.9.5-1.2 1-1.2 1.9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="16.6" r="0.9" fill="currentColor"/></svg>',
    activity:
      '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 12a8 8 0 0 1 13.7-5.7L20 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M20 4v4h-4M4 20v-4h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    announcements:
      '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M3 10v4a1 1 0 0 0 1 1h2l1 4h2l-.8-4H12l6 3V6l-6 3H4a1 1 0 0 0-1 1Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 9.5a3.2 3.2 0 0 1 0 5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
  };

  function creditLabel(hours) {
    const n = Number(hours);
    return `${n} Credit Hour${n === 1 ? "" : "s"}`;
  }

  function actionButton(key, label) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "action-btn";
    btn.innerHTML = `
      <span class="action-icon">${icons[key]}</span>
      <span class="action-label">${label}</span>
    `;
    return btn;
  }

  function buildCard(course) {
    const card = document.createElement("article");
    card.className = "course-card";

    card.innerHTML = `
      <div class="card-header">
        <p class="course-code-title">${course.code} - ${course.title}</p>
        <p class="course-category">${course.category || ""}</p>
        <p class="course-hours">${creditLabel(course.creditHours)}</p>
        <span class="enrolled-badge">${course.enrolledCount != null ? course.enrolledCount : "—"}</span>
      </div>

      <div class="card-instructor">
        <div class="instructor-info">
          <p class="instructor-name">${course.instructorName || ""}</p>
          <p class="instructor-degree">${course.instructorDegree || ""}</p>
          <p class="instructor-org">${course.instructorOrg || ""}</p>
        </div>
      </div>

      <div class="card-divider"></div>

      <div class="card-actions"></div>
    `;

    const actionsRow = card.querySelector(".card-actions");
    const rowTop = document.createElement("div");
    rowTop.className = "actions-row";
    rowTop.appendChild(actionButton("assignments", "Assignments"));
    rowTop.appendChild(actionButton("gdb", "GDB"));
    rowTop.appendChild(actionButton("quiz", "Quiz"));

    const rowBottom = document.createElement("div");
    rowBottom.className = "actions-row actions-row-center";
    rowBottom.appendChild(actionButton("activity", "Activity"));
    rowBottom.appendChild(actionButton("announcements", "Announcements"));

    actionsRow.appendChild(rowTop);
    actionsRow.appendChild(rowBottom);

    return card;
  }

  function renderCourses(courseListToShow) {
    courseList.innerHTML = "";
    if (!Array.isArray(courseListToShow) || courseListToShow.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-message";
      empty.textContent = "No courses to show yet.";
      courseList.appendChild(empty);
      return;
    }
    courseListToShow.forEach(function (course) {
      courseList.appendChild(buildCard(course));
    });
  }

  /** Find a student record by id, case-insensitive. */
  function findStudent(id) {
    if (!id) return null;
    const normalized = String(id).trim().toLowerCase();
    if (!Array.isArray(students)) return null;
    return (
      students.find(function (s) {
        return s.id && String(s.id).trim().toLowerCase() === normalized;
      }) || null
    );
  }

  /** Return the course list for a given student (all, or their subset). */
  function coursesForStudent(student) {
    if (!Array.isArray(student.courseCodes)) return courses;
    const codes = student.courseCodes.map(function (c) {
      return String(c).trim().toLowerCase();
    });
    return courses.filter(function (course) {
      return codes.indexOf(String(course.code).trim().toLowerCase()) !== -1;
    });
  }

  function clearLoginMessage() {
    loginMessage.textContent = "";
    loginMessage.classList.remove("error");
  }

  function showLogin(message) {
    currentStudent = null;
    coursesPage.hidden = true;
    gradeBookPage.hidden = true;
    lectureSchedulePage.hidden = true;
    comingSoonPage.hidden = true;
    closeNav();
    loginScreen.hidden = false;
    logoutBtn.hidden = true;
    menuBtn.hidden = true;
    if (message) {
      loginMessage.textContent = message;
      loginMessage.classList.add("error");
    } else {
      clearLoginMessage();
    }
  }

  function showCoursesFor(student) {
    currentStudent = student;
    clearLoginMessage();
    loginScreen.hidden = true;
    coursesPage.hidden = false;
    logoutBtn.hidden = false;
    menuBtn.hidden = false;
    welcomeLine.textContent = student.name ? "Welcome, " + student.name : "";
    renderCourses(coursesForStudent(student));
    goToPage("home");
  }

  /* ============================================================
     PAGE ROUTER
     ============================================================
     All of the app's pages are plain <main class="page"> elements
     with a unique id (coursesPage, gradeBookPage, ...). goToPage()
     hides every page and shows the one requested, and updates
     which nav-drawer item is highlighted as "active".
     ============================================================ */

  const pageElements = {
    home: coursesPage,
    gradebook: gradeBookPage,
    lectureschedule: lectureSchedulePage
  };

  /* ------------------------------------------------------------
     HOW TO CHANGE WHAT A MENU BUTTON DOES
     ------------------------------------------------------------
     Every button in the ⋮ menu has a data-page="..." attribute in
     index.html (e.g. data-page="mail"). This object maps each of
     those values to a function that runs when it's clicked.

     - To make a menu item open one of the real pages above, point
       it at goToPage('home' | 'gradebook' | 'lectureschedule').
     - To leave it as a placeholder, point it at
       showComingSoon('Whatever Title').
     - To build a brand new page for one of them later: copy one of
       the <main class="page" hidden> blocks in index.html, give it
       a new id, add that id to `pageElements` above, then change
       its line below from showComingSoon(...) to
       () => goToPage('yourNewKey').
     ------------------------------------------------------------ */
  const menuActions = {
    home: function () { goToPage("home"); },
    todo: function () { showComingSoon("To Do Calendar"); },
    gradebook: function () { goToPage("gradebook"); },
    accountbook: function () { showComingSoon("Account Book"); },
    progress: function () { showComingSoon("Progress"); },
    lectureschedule: function () { goToPage("lectureschedule"); },
    mail: function () { showComingSoon("Mail"); },
    notes: function () { showComingSoon("Notes"); },
    studyscheme: function () { showComingSoon("My Study Scheme"); },
    studiedcourses: function () { showComingSoon("My Studied Courses"); },
    eid: function () { showComingSoon("e-ID Card"); },
    studentservices: function () { showComingSoon("Student Services"); },
    courseselection: function () { showComingSoon("Course Selection"); },
    contactus: function () { showComingSoon("Contact Us"); },
    help: function () { showComingSoon("Help"); }
  };

  function goToPage(pageKey) {
    if (!currentStudent) return; // pages require a logged-in student
    Object.keys(pageElements).forEach(function (key) {
      pageElements[key].hidden = key !== pageKey;
    });
    comingSoonPage.hidden = true;

    document.querySelectorAll(".nav-item").forEach(function (item) {
      item.classList.toggle("active", item.dataset.page === pageKey);
    });

    if (pageKey === "gradebook") renderGradeBook();
    if (pageKey === "lectureschedule") renderLectureSchedule();

    closeNav();
  }

  function showComingSoon(title) {
    if (!currentStudent) return;
    Object.keys(pageElements).forEach(function (key) {
      pageElements[key].hidden = true;
    });
    comingSoonPage.hidden = false;
    comingSoonTitle.textContent = title;

    document.querySelectorAll(".nav-item").forEach(function (item) {
      item.classList.remove("active");
    });

    closeNav();
  }

  function openNav() {
    navOverlay.hidden = false;
    navBackdrop.hidden = false;
  }

  function closeNav() {
    navOverlay.hidden = true;
    navBackdrop.hidden = true;
  }

  /* ============================================================
     GRADE BOOK PAGE
     ============================================================ */

  function courseTitleForCode(code) {
    const match = courses.find(function (c) {
      return String(c.code).trim().toLowerCase() === String(code).trim().toLowerCase();
    });
    return match ? match.code + " - " + match.title : code;
  }

  function buildSummaryStrip(summary) {
    if (!summary) return "";
    const resultClass = String(summary.result).toUpperCase() === "FAIL" ? "fail" : "pass";
    return (
      '<div class="gradebook-summary">' +
      '<span class="gradebook-summary-item"><span class="gradebook-summary-label">Semester GPA:</span> ' +
      '<span class="gradebook-summary-value">' + (summary.gpa || "—") + "</span></span>" +
      '<span class="gradebook-summary-divider">|</span>' +
      '<span class="gradebook-summary-item"><span class="gradebook-summary-label">Total Credit Hours:</span> ' +
      '<span class="gradebook-summary-value">' + (summary.totalCreditHours != null ? summary.totalCreditHours : "—") + "</span></span>" +
      '<span class="gradebook-summary-divider">|</span>' +
      '<span class="gradebook-summary-item"><span class="gradebook-summary-label">Total Quality Points:</span> ' +
      '<span class="gradebook-summary-value">' + (summary.totalQualityPoints || "—") + "</span></span>" +
      '<span class="gradebook-summary-divider">|</span>' +
      '<span class="gradebook-summary-item"><span class="gradebook-summary-label">Result:</span> ' +
      '<span class="gradebook-summary-value gradebook-result-' + resultClass + '">' + (summary.result || "—") + "</span></span>" +
      "</div>" +
      (summary.note ? '<p class="gradebook-note">Note: ' + summary.note + "</p>" : "")
    );
  }

  function buildGradeTable(section) {
    if (!section || !Array.isArray(section.rows) || section.rows.length === 0) {
      return '<p class="gradebook-placeholder">No data yet for this section.</p>';
    }
    const rowsHtml = section.rows
      .map(function (row) {
        return (
          "<tr>" +
          "<td>" + courseTitleForCode(row.code) + "</td>" +
          '<td class="numeric">' + (row.marks || "—") + "</td>" +
          '<td class="numeric">' + (row.percentage || "—") + "</td>" +
          '<td class="numeric">' + (row.classAverage || "—") + "</td>" +
          '<td class="numeric">' + (row.examAttendance || "—") + "</td>" +
          "<td>" + (row.remarks || "") + "</td>" +
          "</tr>"
        );
      })
      .join("");

    return (
      "<h2>" + section.label + "</h2>" +
      '<div class="gradebook-table-scroll">' +
      '<table class="gradebook-table">' +
      "<thead><tr>" +
      "<th>Course</th>" +
      '<th class="numeric">Marks</th>' +
      '<th class="numeric">Percentage</th>' +
      '<th class="numeric">Class Average Marks</th>' +
      '<th class="numeric">Exam Attendance</th>' +
      "<th>Remarks</th>" +
      "</tr></thead>" +
      "<tbody>" + rowsHtml + "</tbody>" +
      "</table></div>" +
      buildSummaryStrip(section.summary)
    );
  }

  function renderGradeBook() {
    document.querySelectorAll(".gradebook-tab").forEach(function (tab) {
      tab.classList.toggle("active", tab.dataset.tab === activeGradeTab);
    });

    if (typeof gradeBook === "undefined") {
      gradeBookContent.innerHTML = '<p class="gradebook-placeholder">No grade data added yet.</p>';
      return;
    }

    if (activeGradeTab === "midterm") {
      gradeBookContent.innerHTML = buildGradeTable(gradeBook.midterm);
    } else if (activeGradeTab === "final") {
      gradeBookContent.innerHTML = buildGradeTable(gradeBook.final);
    } else {
      // Grading Scheme / Projected CGPA Calculator / COUM-DAC tabs
      // are placeholders — build these out the same way as
      // buildGradeTable() whenever you have real content for them.
      gradeBookContent.innerHTML = '<p class="gradebook-placeholder">This section is coming soon.</p>';
    }
  }

  /* ============================================================
     LECTURE SCHEDULE PAGE
     ============================================================ */

  function renderLectureSchedule() {
    const list = currentStudent ? coursesForStudent(currentStudent) : [];
    lectureScheduleList.innerHTML = "";

    if (list.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-message";
      empty.textContent = "No courses to show yet.";
      lectureScheduleList.appendChild(empty);
      return;
    }

    list.forEach(function (course) {
      const item = document.createElement("div");
      item.className = "lecture-schedule-item";
      item.innerHTML =
        '<div class="lecture-schedule-main">' +
        '<p class="lecture-schedule-code-title">' + course.code + " - " + course.title + "</p>" +
        '<p class="lecture-schedule-instructor">' + (course.instructorName || "") + "</p>" +
        "</div>" +
        '<span class="lecture-schedule-hours">' + creditLabel(course.creditHours) + "</span>";
      lectureScheduleList.appendChild(item);
    });
  }

  /** Attempt login with the given id + password. Does NOT write the
      id into the address bar or remember it — every fresh reload of
      the plain site URL always starts at the login screen and needs
      both fields filled in again. */
  function attemptLogin(id, password) {
    const trimmedId = (id || "").trim();
    const enteredPassword = password || "";

    if (!trimmedId) {
      showLogin(null);
      return;
    }

    const student = findStudent(trimmedId);
    // Generic message on purpose — doesn't reveal whether the roll
    // number or the password was the wrong part.
    if (student && student.password === enteredPassword) {
      showCoursesFor(student);
    } else {
      showLogin("Invalid Roll Number or Password.");
    }
  }

  function clearUrlId() {
    const url = new URL(window.location.href);
    url.searchParams.delete("id");
    window.history.replaceState({}, "", url);
  }

  function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  // ============ Event wiring ============

  loginBtn.addEventListener("click", function () {
    attemptLogin(loginInput.value, passwordInput.value);
  });

  loginInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      passwordInput.focus();
    }
  });

  passwordInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      attemptLogin(loginInput.value, passwordInput.value);
    }
  });

  logoutBtn.addEventListener("click", function () {
    clearUrlId();
    loginInput.value = "";
    passwordInput.value = "";
    showLogin(null);
  });

  menuBtn.addEventListener("click", openNav);
  navCloseBtn.addEventListener("click", closeNav);
  navBackdrop.addEventListener("click", closeNav);

  // One click listener on the whole drawer, reading each button's
  // data-page attribute — this is what actually runs menuActions[...]
  // when a menu item is clicked.
  document.querySelectorAll(".nav-item").forEach(function (item) {
    item.addEventListener("click", function () {
      const key = item.dataset.page;
      if (menuActions[key]) menuActions[key]();
    });
  });

  document.querySelectorAll(".gradebook-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      activeGradeTab = tab.dataset.tab;
      renderGradeBook();
    });
  });

  // ============ Initial load ============
  // Only auto-shows a result when the URL itself contains ?id=...
  // (an intentional shared link). Otherwise it always starts at the
  // login screen — reloading the plain site URL never remembers a
  // previous login.
  // NOTE: this file is now loaded dynamically by index.html (for cache
  // -busting), which means the page has usually already finished
  // parsing by the time this code runs — so "DOMContentLoaded" may
  // never fire again. Run immediately in that case, and only wait for
  // the event if the document is still loading.

  function initApp() {
    const idFromUrl = getIdFromUrl();

    if (idFromUrl) {
      // A shared link can pre-fill the roll number, but can never
      // auto-login by itself now — the password still has to be
      // typed in, so this just saves a bit of typing.
      loginInput.value = idFromUrl;
      showLogin(null);
      clearUrlId();
      passwordInput.focus();
    } else {
      showLogin(null);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
