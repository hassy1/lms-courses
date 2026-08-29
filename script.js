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
  const loginBtn = document.getElementById("loginBtn");
  const loginMessage = document.getElementById("loginMessage");
  const welcomeLine = document.getElementById("welcomeLine");
  const logoutBtn = document.getElementById("logoutBtn");

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
    coursesPage.hidden = true;
    loginScreen.hidden = false;
    logoutBtn.hidden = true;
    if (message) {
      loginMessage.textContent = message;
      loginMessage.classList.add("error");
    } else {
      clearLoginMessage();
    }
  }

  function showCoursesFor(student) {
    loginScreen.hidden = true;
    coursesPage.hidden = false;
    logoutBtn.hidden = false;
    welcomeLine.textContent = student.name ? "Welcome, " + student.name : "";
    renderCourses(coursesForStudent(student));
  }

  /** Attempt login with the given id. Does NOT write the id into the
      address bar or remember it — every fresh reload of the plain
      site URL always starts at the login screen and needs the id
      typed again. */
  function attemptLogin(id) {
    const trimmed = (id || "").trim();
    if (!trimmed) {
      showLogin(null);
      return;
    }
    const student = findStudent(trimmed);
    if (student) {
      showCoursesFor(student);
    } else {
      showLogin("Student ID not found.");
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
    attemptLogin(loginInput.value);
  });

  loginInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      attemptLogin(loginInput.value);
    }
  });

  logoutBtn.addEventListener("click", function () {
    clearUrlId();
    loginInput.value = "";
    showLogin(null);
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
      loginInput.value = idFromUrl;
      attemptLogin(idFromUrl);
      clearUrlId(); // so a later reload of this tab asks for the id again
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
