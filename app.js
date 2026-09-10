/* ============================================================
   FC 4R 70 — Compositions — v3
   Interactions terrain : ajout direct sur un poste, déplacement
   libre des joueurs (Pointer Events : souris ET tactile).
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Formations ---------- */
  const FORMATIONS = {
    "4-4-2": [
      { role: "GK", x: 50, y: 92 },
      { role: "DEF", x: 15, y: 74 }, { role: "DEF", x: 38, y: 77 }, { role: "DEF", x: 62, y: 77 }, { role: "DEF", x: 85, y: 74 },
      { role: "MID", x: 15, y: 50 }, { role: "MID", x: 38, y: 53 }, { role: "MID", x: 62, y: 53 }, { role: "MID", x: 85, y: 50 },
      { role: "FWD", x: 35, y: 22 }, { role: "FWD", x: 65, y: 22 }
    ],
    "4-3-3": [
      { role: "GK", x: 50, y: 92 },
      { role: "DEF", x: 15, y: 74 }, { role: "DEF", x: 38, y: 77 }, { role: "DEF", x: 62, y: 77 }, { role: "DEF", x: 85, y: 74 },
      { role: "MID", x: 30, y: 53 }, { role: "MID", x: 50, y: 57 }, { role: "MID", x: 70, y: 53 },
      { role: "FWD", x: 20, y: 22 }, { role: "FWD", x: 50, y: 18 }, { role: "FWD", x: 80, y: 22 }
    ],
    "4-2-3-1": [
      { role: "GK", x: 50, y: 92 },
      { role: "DEF", x: 15, y: 74 }, { role: "DEF", x: 38, y: 77 }, { role: "DEF", x: 62, y: 77 }, { role: "DEF", x: 85, y: 74 },
      { role: "MID", x: 35, y: 60 }, { role: "MID", x: 65, y: 60 },
      { role: "MID", x: 20, y: 38 }, { role: "MID", x: 50, y: 34 }, { role: "MID", x: 80, y: 38 },
      { role: "FWD", x: 50, y: 16 }
    ],
    "3-5-2": [
      { role: "GK", x: 50, y: 92 },
      { role: "DEF", x: 25, y: 76 }, { role: "DEF", x: 50, y: 79 }, { role: "DEF", x: 75, y: 76 },
      { role: "MID", x: 12, y: 52 }, { role: "MID", x: 32, y: 56 }, { role: "MID", x: 50, y: 58 }, { role: "MID", x: 68, y: 56 }, { role: "MID", x: 88, y: 52 },
      { role: "FWD", x: 35, y: 22 }, { role: "FWD", x: 65, y: 22 }
    ],
    "3-4-3": [
      { role: "GK", x: 50, y: 92 },
      { role: "DEF", x: 25, y: 76 }, { role: "DEF", x: 50, y: 79 }, { role: "DEF", x: 75, y: 76 },
      { role: "MID", x: 15, y: 53 }, { role: "MID", x: 38, y: 55 }, { role: "MID", x: 62, y: 55 }, { role: "MID", x: 85, y: 53 },
      { role: "FWD", x: 20, y: 22 }, { role: "FWD", x: 50, y: 18 }, { role: "FWD", x: 80, y: 22 }
    ],
    "5-3-2": [
      { role: "GK", x: 50, y: 92 },
      { role: "DEF", x: 10, y: 70 }, { role: "DEF", x: 30, y: 76 }, { role: "DEF", x: 50, y: 79 }, { role: "DEF", x: 70, y: 76 }, { role: "DEF", x: 90, y: 70 },
      { role: "MID", x: 30, y: 50 }, { role: "MID", x: 50, y: 53 }, { role: "MID", x: 70, y: 50 },
      { role: "FWD", x: 35, y: 22 }, { role: "FWD", x: 65, y: 22 }
    ],
    "4-1-4-1": [
      { role: "GK", x: 50, y: 92 },
      { role: "DEF", x: 15, y: 74 }, { role: "DEF", x: 38, y: 77 }, { role: "DEF", x: 62, y: 77 }, { role: "DEF", x: 85, y: 74 },
      { role: "MID", x: 50, y: 60 },
      { role: "MID", x: 15, y: 40 }, { role: "MID", x: 38, y: 38 }, { role: "MID", x: 62, y: 38 }, { role: "MID", x: 85, y: 40 },
      { role: "FWD", x: 50, y: 16 }
    ]
  };

  const OPPONENT_LOGOS = {
    "marnaysienne": "data:image/png;base64,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",
    "pays minier": "data:image/png;base64,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",
    "ent. stloup luxeuil": "data:image/png;base64,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",
    "hericourt h lizaine": "data:image/png;base64,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",
    "perrouse": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABWGlDQ1BJQ0MgUHJvZmlsZQAAeJx9kLFLw1AQxr9WpaB1EB0cHDKJQ5SSCro4tBVEcQhVweqUvqapkMZHkiIFN/+Bgv+BCs5uFoc6OjgIopPo5uSk4KLleS+JpCJ6j+N+fO+74zggOW5wbvcDqDu+W1zKK5ulLSX1jAS9IAzm8Zyur0r+rj/j/T703k7LWb///43Biukxqp+UGcZdH0ioxPqezyXvE4+5tBRxS7IV8onkcsjngWe9WCC+JlZYzagQvxCr5R7d6uG63WDRDnL7tOlsrMk5lBNYxA48cNgw0IQCHdk//LOBv4BdcjfhUp+FGnzqyZEiJ5jEy3DAMAOVWEOGUpN3ju53F91PjbWDJ2ChI4S4iLWVDnA2Rydrx9rUPDAyBFy1ueEagdRHmaxWgddTYLgEjN5Qz7ZXzWrh9uk8MPAoxNskkDoEui0hPo6E6B5T8wNw6XwBA6diE8HYWhMAAACQUExURf////7///79/////f/+/v7+/v79/v3+/f39/fz8/P36/fr7/P39+fr8+vj4+fn2wP3zT+Lj5N7boerhTsvJnrSwipeUYX6LdX95XGRsWlhbXFJRUjpHZx5ApidCgh45iBkyjiYwSQ4woQ0jeQ8YKQUQIAQPHQMOHAMOGwIOGwINGwENGwEKGAAFEwABDwAADEC14gsAAAcRSURBVHjalZiJeqo6EIBHkAIC+cwVCAlBiWw9rcD7v92dsCgKnvakfmURfmfLZDLw9W7UVX1r+75rv/GsGU8bPHvzOGzfbuq67btSCRaFVI8wjFha3vruu65/D2rq765VPKLwPEjIZN23m6gtUP3d1yIi+lXXc11nGHjm6DuUqa7dUHANqpuu4loWROyeJbIcV8sVqe5Wff4A+lO1rUCM41qwOTSLsLL/qv8KqptehSiMA++H5WoFP9vqLyB0OPPA+RtmRoVlV70F1W0VDU/9OCwPaNrXb0BVW4bgWfCr4QLh3cJ7C1DdKQoemPs9Pjf8w4P+WCbs7wDTBGO0OgBbkGChF3KC/UdwMFzn43BwDMNwXNfy3YMfHD4MYxf4puX6vuca+zEYNGkFqtuSorx7fI/AjhDf/nA+XJ8EBhDTJ8T1PNsJ3IAQMIk9hRXwvnoBNbc6RA4+5B1Y5AN4nuM52n9+KBgF0/YQ5XqWaVK8tCZSkM6+g7uBIrQPWsT1fFniNPOHR30a8aIoZERREPwDitMNRben6ASq2noJqnoOg9v3B88XeV5IwfQQssizLMNrycdrVVwLOtlb+y78/GweIDQ0sZ0x1lwEZdn1es2LAv/jaTZc42VR5PqGukukSWwMpxkUjgKBiaqJq5BnLjPJZZqqVEghzimX8iwFlyLNEfTxCHIyKgejgcTEQVDgiyLmMkmvIuEJV0mS4kffkDzlaZLmxUIirVzbTKDmq6bgzL9g+2J4k+f44zxVHF/XHxypPgygxWx0INXRBIOlxf0ba5AoO+O4XvIM9bnk8nI5n2V+kdlZXqR8lkiLdPv8nGxEZ81GG6FVlR6FwhOJx/l6OnmSaBIJtIXSxy+MNrpck9PpxPCtFI9xfrlyfUQZ9TGZA3IWKWonUHQXCGwNyrMrO56OrEiT+HQ8xld9vTg+gyzQjgOcHOVCZ9sbbPQAxTPgdD++SDTEUgWD7x8qG4Hvi3N2ZoNqAt2Nx1HCU5Lnb0AYARoULZLi3veJtk98yTIRR3F84ng2gP7jpcy2QKhb2ULzXS+dMIKOR4ZqcJTieIqT8+WcszgyCC66EdroFYSvix70NFvct707KI+PsQZhEGJU4+JCcZlipw2QNhJUTyYCTIODagwjMkbF0MR4Ji9nRqJShUQlm6CwhapnQyK6q4Zeu5wzbewk0SSEam+RgPU9c1i8qRqtYM5os9e8A87+yc06GodAzK64+oYipUC3VNORBI8MMkY2ObhzHMUadBxBjAvqESxv3oKaZ9CHH3jiMsYRLyTXdhpUi+sIwhRNtHa/Hik0t6cpaMxxhMFTjEOdxziKQsyzbBNkrUE7P7jHEabnHLOtztqLubYFwkBag/yATXGkkFMWuVRPc+2oZ7/5CkpfbYQL644mg2pnWZRVWbBozgYTKI5MG9Y2evGacTgQm8khjlJVKsmTKCmeZj+n1otmO/AUPGUjvGfsXZOqUYVUH3GyPYFQILKHtftfInu8z7R34ii56BcxQy5Ap4QEgfH8gg20BJ35X0qrfUClVi1WeqrEp+R6mUE5T0KsMFa1Es41nP1TmfIYAUQqO8djXopPMptBuSqZ4frOChT1MGTal2+wmMGoTmOdbvMwLrJZtaKU1HQtewXi/ZAhdy+62d6eStXq6cBwhVWzjfICs9La9dbOUy08CpGFas7BjMp2UE2vY3NEFwUzgo3SG6heIF9S5CiRQXyWxLjgMpy0ST5GdFpwYvtbdemwinxhbL+UxPvAd12a8Kf1DHOupAaxtsruYV17WvonkO07GJbyOX5i3KEc3LWJXIvehiJC+81aF/uBGaox5Y75iKdYhINlbWjG+3qqRhisy307wER2inGxzHQcxWmIjt9QzLFoeWvG+mhTJCyJIRzspMs9kYRAtuSZiz/4eifSgQRkR0Vx1QttIeiOuI4FqySrVxAUaAQ1X9UqusEybBs3HEwO5TGBwLaMzT2J6OpHMdqljrvxmIW7BhoxrLpN693eJmoXVS2SVslkWJx8zzPNA+4D3mzhBksvQc2tohueMw6Gh6Yivr9/twMU0x4Clnuj1c/uHVwLfN93HWMT5M3l+mJ3VHUpAQf+aXhooObzdb+GZYn7byTkfN6ajR1kLwi4v8agfaL6Vm/uaXvUzvslx7Eh+npwnnfZ1bCrtX6nlsPaZRPhed9fdaVuH/yIwp0lEX3TvO9EVO0NN5o/oHRXI1Rd9edvvZH6sy8jtNNGApttjJ6ladvWP3Rr/lRtpzTK2WiQjO0ayqtu1UPa6B/VNaK0gnpf6jhjDrKQMUw4LxRV/13/rqOl+2KluDe0LNt6tLRU231vNdre9Njq+tZ1pcQEQsmgoa5DmVC3vm22+3XwrunXaFbf3Uo1jlJ373Tb79+6fhNr6Bu2Xde17U13Eev3D/8P6Nlz8jmA+50AAAAASUVORK5CYII=",
    "noidanais": "data:image/png;base64,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",
    "rigny": "data:image/png;base64,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",
    "franchevelle lure": "data:image/png;base64,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",
  };

  function getOpponentLogo(opponent) {
    return OPPONENT_LOGOS[opponent.trim().toLowerCase()] || null;
  }

  const ROLE_LABEL = { GK: "GB", DEF: "DEF", MID: "MIL", FWD: "ATT" };
  const ROLE_GROUP_TITLE = { GK: "Gardiens", DEF: "Défenseurs", MID: "Milieux", FWD: "Attaquants" };
  const ROLE_ORDER = { GK: 0, DEF: 1, MID: 2, FWD: 3 };

  const STORAGE_SQUAD = "fc4r_squad_v2";
  const STORAGE_LINEUPS = "fc4r_lineups_v2";
  const STORAGE_CAPTAIN = "fc4r_captain_v2";
  const STORAGE_MATCHES = "fc4r_matches_v2";
  const STORAGE_SEEDED = "fc4r_matches_seeded_v1";
  const DRAG_THRESHOLD = 14;

  const SEASON_MATCHES = [
    { date: "2026-09-19", time: "16:00", opponent: "Marnaysienne", venue: "away" },
    { date: "2026-10-03", time: "16:00", opponent: "Pays Minier", venue: "home" },
    { date: "2026-10-10", time: "16:00", opponent: "Groupement VV", venue: "away" },
    { date: "2026-10-17", time: "16:00", opponent: "Ent. Stloup Luxeuil", venue: "home" },
    { date: "2026-10-31", time: "16:30", opponent: "Hericourt H Lizaine", venue: "away" },
    { date: "2026-11-07", time: "16:00", opponent: "Perrouse", venue: "home" },
    { date: "2026-11-14", time: "16:00", opponent: "Noidanais", venue: "home" },
    { date: "2026-11-21", time: "16:00", opponent: "Rigny", venue: "away" },
    { date: "2027-03-06", time: "16:00", opponent: "Marnaysienne", venue: "home" },
    { date: "2027-03-13", time: "16:00", opponent: "Pays Minier", venue: "away" },
    { date: "2027-03-20", time: "16:00", opponent: "Groupement VV", venue: "home" },
    { date: "2027-04-10", time: "16:00", opponent: "Hericourt H Lizaine", venue: "home" },
    { date: "2027-05-01", time: "18:00", opponent: "Perrouse", venue: "away" },
    { date: "2027-05-08", time: "16:00", opponent: "Noidanais", venue: "away" },
    { date: "2027-05-22", time: "16:00", opponent: "Rigny", venue: "home" },
    { date: "2027-05-29", time: "16:00", opponent: "Franchevelle Lure", venue: "away" }
  ];

  /* ---------- State ---------- */
  let squad = loadJSON(STORAGE_SQUAD, []);
  let savedLineups = loadJSON(STORAGE_LINEUPS, []);
  let matches = loadJSON(STORAGE_MATCHES, []);
  if (!localStorage.getItem(STORAGE_SEEDED)) {
    matches = matches.concat(SEASON_MATCHES.map(m => ({ id: uid(), ...m })));
    localStorage.setItem(STORAGE_SEEDED, "1");
    localStorage.setItem(STORAGE_MATCHES, JSON.stringify(matches));
  }
  let captainId = localStorage.getItem(STORAGE_CAPTAIN) || null;
  let calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  let currentFormation = "4-4-2";
  let assignments = {};   // slotIndex -> playerId
  let positions = {};     // slotIndex -> {x,y} (déplacement libre, remplace la position de formation)
  let selectedPlayerId = null;
  let editingPlayerId = null;
  let editingMatchId = null;
  let pendingSlotIndex = null; // ajout d'un joueur déclenché depuis un poste vide du terrain

  /* ---------- DOM refs ---------- */
  const formationSelect = document.getElementById("formationSelect");
  const pitchSlotsEl = document.getElementById("pitchSlots");
  const benchListEl = document.getElementById("benchList");
  const benchPanelEl = document.querySelector(".bench-panel");
  const benchCountEl = document.getElementById("benchCount");
  const lineupTitleEl = document.getElementById("lineupTitle");
  const pitchBrandTitleEl = document.getElementById("pitchBrandTitle");
  const clearPitchBtn = document.getElementById("clearPitchBtn");
  const exportBtn = document.getElementById("exportBtn");
  const pitchEl = document.getElementById("pitch");

  const squadGroupsEl = document.getElementById("squadGroups");
  const squadTotalEl = document.getElementById("squadTotal");
  const addPlayerBtn = document.getElementById("addPlayerBtn");

  const savedGridEl = document.getElementById("savedGrid");
  const saveOpenBtn = document.getElementById("saveOpenBtn");

  const playerModalBackdrop = document.getElementById("playerModalBackdrop");
  const playerModalTitle = document.getElementById("playerModalTitle");
  const playerForm = document.getElementById("playerForm");
  const playerIdInput = document.getElementById("playerId");
  const playerNumberInput = document.getElementById("playerNumber");
  const playerNameInput = document.getElementById("playerName");
  const playerPositionInput = document.getElementById("playerPosition");
  const playerCaptainInput = document.getElementById("playerCaptain");
  const playerDeleteBtn = document.getElementById("playerDeleteBtn");
  const playerModalClose = document.getElementById("playerModalClose");

  const saveModalBackdrop = document.getElementById("saveModalBackdrop");
  const saveForm = document.getElementById("saveForm");
  const saveNameInput = document.getElementById("saveName");
  const saveModalClose = document.getElementById("saveModalClose");

  const calMonthLabel = document.getElementById("calMonthLabel");
  const calGrid = document.getElementById("calGrid");
  const calPrevBtn = document.getElementById("calPrevBtn");
  const calNextBtn = document.getElementById("calNextBtn");
  const agendaListEl = document.getElementById("agendaList");
  const addMatchBtn = document.getElementById("addMatchBtn");

  const matchModalBackdrop = document.getElementById("matchModalBackdrop");
  const matchModalTitle = document.getElementById("matchModalTitle");
  const matchForm = document.getElementById("matchForm");
  const matchIdInput = document.getElementById("matchId");
  const matchDateInput = document.getElementById("matchDate");
  const matchTimeInput = document.getElementById("matchTime");
  const matchOpponentInput = document.getElementById("matchOpponent");
  const matchVenueInput = document.getElementById("matchVenue");
  const matchDeleteBtn = document.getElementById("matchDeleteBtn");
  const matchModalClose = document.getElementById("matchModalClose");

  const navToggle = document.getElementById("navToggle");
  const sidebar = document.getElementById("sidebar");
  const scrim = document.getElementById("scrim");

  /* ---------- Utilities ---------- */
  function loadJSON(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch (e) { return fallback; }
  }
  function persistSquad() { localStorage.setItem(STORAGE_SQUAD, JSON.stringify(squad)); }
  function persistLineups() { localStorage.setItem(STORAGE_LINEUPS, JSON.stringify(savedLineups)); }
  function persistMatches() { localStorage.setItem(STORAGE_MATCHES, JSON.stringify(matches)); }
  function persistCaptain() {
    if (captainId) localStorage.setItem(STORAGE_CAPTAIN, captainId);
    else localStorage.removeItem(STORAGE_CAPTAIN);
  }
  function uid() { return Math.random().toString(36).slice(2, 10); }
  function playerById(id) { return squad.find(p => p.id === id); }
  function assignedPlayerIds() { return new Set(Object.values(assignments)); }
  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  }
  function pitchRelativeCoords(clientX, clientY) {
    const rect = pitchEl.getBoundingClientRect();
    let x = ((clientX - rect.left) / rect.width) * 100;
    let y = ((clientY - rect.top) / rect.height) * 100;
    x = Math.max(4, Math.min(96, x));
    y = Math.max(4, Math.min(96, y));
    return { x, y };
  }

  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  /* ============================================================
     Player token (sober circular chip)
     ============================================================ */
  function captainBadge() {
    const b = document.createElement("span");
    b.className = "captain-badge";
    b.textContent = "C";
    return b;
  }

  function buildToken(number, role, isCaptain) {
    const token = document.createElement("div");
    token.className = "token" + (role === "GK" ? " token--gk" : "");
    const span = document.createElement("span");
    span.textContent = number;
    token.appendChild(span);
    if (isCaptain) token.appendChild(captainBadge());
    return token;
  }

  /* ============================================================
     Navigation / views
     ============================================================ */
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });
  document.querySelectorAll(".home-tile").forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });

  function switchView(view) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.getElementById("view-" + view).classList.add("active");
    navItems.forEach(b => b.classList.toggle("active", b.dataset.view === view));
    closeSidebar();
    if (view === "effectif") renderSquadGroups();
    if (view === "agenda") { renderCalendar(); renderAgendaList(); }
    if (view === "compositions") renderSavedGrid();
  }

  navToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    scrim.classList.toggle("show");
  });
  scrim.addEventListener("click", closeSidebar);
  function closeSidebar() { sidebar.classList.remove("open"); scrim.classList.remove("show"); }

  /* ============================================================
     Formation select
     ============================================================ */
  function populateFormationSelect() {
    formationSelect.innerHTML = "";
    Object.keys(FORMATIONS).forEach(name => {
      const opt = document.createElement("option");
      opt.value = name; opt.textContent = name;
      formationSelect.appendChild(opt);
    });
    formationSelect.value = currentFormation;
  }

  formationSelect.addEventListener("change", () => {
    remapAssignmentsToFormation(currentFormation, formationSelect.value);
    positions = {};
    currentFormation = formationSelect.value;
    renderPitch(); renderBench();
  });

  function remapAssignmentsToFormation(oldName, newName) {
    const oldSlots = FORMATIONS[oldName], newSlots = FORMATIONS[newName];
    const newAssignments = {}; const usedNewSlots = new Set();
    Object.entries(assignments).forEach(([slotIdxStr, playerId]) => {
      const slotIdx = Number(slotIdxStr);
      const role = oldSlots[slotIdx] ? oldSlots[slotIdx].role : null;
      if (!role) return;
      let bestIdx = -1, bestDist = Infinity;
      newSlots.forEach((s, i) => {
        if (s.role !== role || usedNewSlots.has(i)) return;
        const oldSlot = oldSlots[slotIdx];
        const d = Math.hypot(s.x - oldSlot.x, s.y - oldSlot.y);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      if (bestIdx !== -1) { newAssignments[bestIdx] = playerId; usedNewSlots.add(bestIdx); }
    });
    assignments = newAssignments;
  }

  lineupTitleEl.addEventListener("input", () => {
    pitchBrandTitleEl.textContent = lineupTitleEl.value.trim() || "Titulaires";
  });

  /* ============================================================
     Pitch rendering
     ============================================================ */
  function renderPitch() {
    const slots = FORMATIONS[currentFormation];
    pitchSlotsEl.innerHTML = "";
    slots.forEach((slot, idx) => {
      const playerId = assignments[idx];
      const player = playerId ? playerById(playerId) : null;
      const coords = positions[idx] || slot;

      const el = document.createElement("div");
      el.className = "slot" + (player ? " slot--filled" : "");
      el.style.left = coords.x + "%";
      el.style.top = coords.y + "%";
      el.dataset.slotIndex = idx;

      if (player) {
        el.appendChild(buildToken(player.number, player.position, player.id === captainId));
        const nameEl = document.createElement("div");
        nameEl.className = "slot__name";
        nameEl.textContent = player.name;
        el.appendChild(nameEl);
        attachTokenDrag(el, idx);
      } else {
        const ph = document.createElement("div");
        ph.className = "slot__placeholder";
        ph.textContent = ROLE_LABEL[slot.role];
        el.appendChild(ph);
        el.addEventListener("click", () => onSlotTap(idx));
      }

      pitchSlotsEl.appendChild(el);
    });
  }

  // Tap sur un poste (pas de glissement détecté)
  function onSlotTap(idx) {
    const playerId = assignments[idx];
    if (selectedPlayerId) {
      placePlayerInSlot(selectedPlayerId, idx);
      selectedPlayerId = null;
      renderBench();
      return;
    }
    if (playerId) {
      openPlayerModal(playerId);
    } else {
      openPlayerModalForSlot(idx);
    }
  }

  function placePlayerInSlot(playerId, slotIdx, coords) {
    const player = playerById(playerId);
    if (!player) return;
    Object.keys(assignments).forEach(k => { if (assignments[k] === playerId) delete assignments[k]; });
    assignments[slotIdx] = playerId;
    if (coords) positions[slotIdx] = coords;
    renderPitch(); renderBench();
  }

  // Déplacement libre d'un joueur déjà placé (souris + tactile via Pointer Events)
  function attachTokenDrag(el, idx) {
    el.addEventListener("pointerdown", (e) => {
      if (e.button !== undefined && e.button > 0) return;
      const startX = e.clientX, startY = e.clientY;
      let moved = false;

      function onMove(ev) {
        const dx = ev.clientX - startX, dy = ev.clientY - startY;
        if (!moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
          moved = true;
          el.classList.add("is-dragging");
        }
        if (moved) {
          ev.preventDefault();
          const coords = pitchRelativeCoords(ev.clientX, ev.clientY);
          el.style.left = coords.x + "%";
          el.style.top = coords.y + "%";
          const over = document.elementFromPoint(ev.clientX, ev.clientY);
          const overBench = !!(over && over.closest(".bench-panel"));
          benchPanelEl.classList.toggle("drag-over", overBench);
        }
      }

      function onUp(ev) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        el.classList.remove("is-dragging");
        benchPanelEl.classList.remove("drag-over");

        if (!moved) { onSlotTap(idx); return; }

        const over = document.elementFromPoint(ev.clientX, ev.clientY);
        if (over && over.closest(".bench-panel")) {
          delete assignments[idx];
          delete positions[idx];
          renderPitch(); renderBench();
          return;
        }
        positions[idx] = pitchRelativeCoords(ev.clientX, ev.clientY);
        renderPitch();
      }

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    });
  }

  /* ============================================================
     Bench
     ============================================================ */
  function renderBench() {
    const onPitch = assignedPlayerIds();
    const benchPlayers = squad.filter(p => !onPitch.has(p.id));
    benchCountEl.textContent = benchPlayers.length;
    benchListEl.innerHTML = "";

    if (benchPlayers.length === 0) {
      const empty = document.createElement("p");
      empty.className = "bench-empty";
      empty.textContent = squad.length === 0 ? "Ton effectif est vide." : "Tous les joueurs sont sur le terrain.";
      benchListEl.appendChild(empty);
      return;
    }
    benchPlayers
      .sort((a, b) => (ROLE_ORDER[a.position] - ROLE_ORDER[b.position]) || a.number - b.number)
      .forEach(player => benchListEl.appendChild(buildPlayerChip(player)));
  }

  function buildPlayerChip(player) {
    const chip = document.createElement("div");
    chip.className = "player-chip" + (selectedPlayerId === player.id ? " selected" : "");

    const avatar = document.createElement("span");
    avatar.className = "chip-avatar role-" + player.position;
    avatar.textContent = initials(player.name);
    if (player.id === captainId) avatar.appendChild(captainBadge());

    const name = document.createElement("span");
    name.className = "player-chip__name";
    name.textContent = player.number + ". " + player.name;

    const pos = document.createElement("span");
    pos.className = "player-chip__pos";
    pos.textContent = ROLE_LABEL[player.position];

    chip.appendChild(avatar); chip.appendChild(name); chip.appendChild(pos);

    chip.addEventListener("pointerdown", (e) => startChipDrag(e, chip, player));
    chip.addEventListener("click", () => {
      if (chip._suppressClick) { chip._suppressClick = false; return; }
      selectedPlayerId = (selectedPlayerId === player.id) ? null : player.id;
      renderBench();
    });

    return chip;
  }

  // Glisser un joueur du banc directement vers un poste du terrain
  function startChipDrag(e, chipEl, player) {
    if (e.button !== undefined && e.button > 0) return;
    const startX = e.clientX, startY = e.clientY;
    let moved = false;
    let ghost = null;
    let lastSlotEl = null;

    function ensureGhost() {
      if (ghost) return;
      const rect = chipEl.getBoundingClientRect();
      ghost = chipEl.cloneNode(true);
      ghost.style.position = "fixed";
      ghost.style.left = "0"; ghost.style.top = "0";
      ghost.style.width = rect.width + "px";
      ghost.style.pointerEvents = "none";
      ghost.style.opacity = "0.92";
      ghost.style.zIndex = "150";
      ghost.style.boxShadow = "0 8px 20px -8px rgba(16,14,13,0.4)";
      document.body.appendChild(ghost);
    }

    function onMove(ev) {
      const dx = ev.clientX - startX, dy = ev.clientY - startY;
      if (!moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        moved = true;
        chipEl._suppressClick = true;
        ensureGhost();
      }
      if (moved) {
        ev.preventDefault();
        ghost.style.transform = "translate(" + (ev.clientX - ghost.offsetWidth / 2) + "px," + (ev.clientY - 18) + "px)";
        const over = document.elementFromPoint(ev.clientX, ev.clientY);
        const slotEl = over ? over.closest(".slot") : null;
        if (slotEl !== lastSlotEl) {
          if (lastSlotEl) lastSlotEl.classList.remove("drag-over");
          if (slotEl) slotEl.classList.add("drag-over");
          lastSlotEl = slotEl;
        }
      }
    }

    function onUp(ev) {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (lastSlotEl) lastSlotEl.classList.remove("drag-over");
      if (ghost) ghost.remove();
      if (!moved) return;

      const over = document.elementFromPoint(ev.clientX, ev.clientY);
      const slotEl = over ? over.closest(".slot") : null;
      if (slotEl && slotEl.dataset.slotIndex !== undefined) {
        const idx = Number(slotEl.dataset.slotIndex);
        placePlayerInSlot(player.id, idx, pitchRelativeCoords(ev.clientX, ev.clientY));
      }
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  clearPitchBtn.addEventListener("click", () => {
    assignments = {}; positions = {};
    renderPitch(); renderBench();
  });

  /* ============================================================
     Effectif view (grouped player cards + modal)
     ============================================================ */
  function renderSquadGroups() {
    squadTotalEl.textContent = squad.length;
    squadGroupsEl.innerHTML = "";

    if (squad.length === 0) {
      const empty = document.createElement("p");
      empty.className = "squad-empty";
      empty.textContent = "Aucun joueur pour l'instant. Clique sur \u00ab + Ajouter un joueur \u00bb, ou directement sur un poste du terrain.";
      squadGroupsEl.appendChild(empty);
      return;
    }

    ["GK", "DEF", "MID", "FWD"].forEach(role => {
      const players = squad.filter(p => p.position === role).sort((a, b) => a.number - b.number);
      if (players.length === 0) return;

      const group = document.createElement("div");
      const title = document.createElement("h2");
      title.className = "squad-group__title";
      title.textContent = ROLE_GROUP_TITLE[role] + " (" + players.length + ")";
      const cards = document.createElement("div");
      cards.className = "squad-group__cards";

      players.forEach(player => cards.appendChild(buildPlayerCard(player)));

      group.appendChild(title);
      group.appendChild(cards);
      squadGroupsEl.appendChild(group);
    });
  }

  function buildPlayerCard(player) {
    const card = document.createElement("div");
    card.className = "player-card";

    const avatar = document.createElement("span");
    avatar.className = "player-card__avatar role-" + player.position;
    avatar.textContent = initials(player.name);
    if (player.id === captainId) avatar.appendChild(captainBadge());

    const info = document.createElement("div");
    info.className = "player-card__info";
    const name = document.createElement("div");
    name.className = "player-card__name";
    name.textContent = player.name;
    const meta = document.createElement("div");
    meta.className = "player-card__meta";
    meta.textContent = "N\u00b0" + player.number + " \u00b7 " + ROLE_LABEL[player.position];
    info.appendChild(name); info.appendChild(meta);

    card.appendChild(avatar); card.appendChild(info);
    card.addEventListener("click", () => openPlayerModal(player.id));
    return card;
  }

  addPlayerBtn.addEventListener("click", () => openPlayerModal(null));

  function openPlayerModal(playerId) {
    pendingSlotIndex = null;
    editingPlayerId = playerId;
    const player = playerId ? playerById(playerId) : null;
    playerModalTitle.textContent = player ? "Modifier le joueur" : "Ajouter un joueur";
    playerIdInput.value = player ? player.id : "";
    playerNumberInput.value = player ? player.number : "";
    playerNameInput.value = player ? player.name : "";
    playerPositionInput.value = player ? player.position : "DEF";
    playerCaptainInput.checked = !!(playerId && playerId === captainId);
    playerDeleteBtn.hidden = !player;
    playerModalBackdrop.classList.add("show");
    playerNameInput.focus();
  }

  // Ouverture depuis un poste vide du terrain : poste pré-rempli, ajout + placement en un geste
  function openPlayerModalForSlot(slotIdx) {
    pendingSlotIndex = slotIdx;
    editingPlayerId = null;
    const role = FORMATIONS[currentFormation][slotIdx] ? FORMATIONS[currentFormation][slotIdx].role : "DEF";
    playerModalTitle.textContent = "Ajouter un joueur";
    playerIdInput.value = "";
    playerNumberInput.value = "";
    playerNameInput.value = "";
    playerPositionInput.value = role;
    playerCaptainInput.checked = false;
    playerDeleteBtn.hidden = true;
    playerModalBackdrop.classList.add("show");
    playerNameInput.focus();
  }

  function closePlayerModal() {
    playerModalBackdrop.classList.remove("show");
    editingPlayerId = null;
    pendingSlotIndex = null;
  }
  playerModalClose.addEventListener("click", closePlayerModal);
  playerModalBackdrop.addEventListener("click", (e) => { if (e.target === playerModalBackdrop) closePlayerModal(); });

  playerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const number = parseInt(playerNumberInput.value, 10);
    const name = playerNameInput.value.trim();
    const position = playerPositionInput.value;
    if (!name || !number) return;

    const targetSlot = pendingSlotIndex;
    let newPlayerId = null;

    if (editingPlayerId) {
      const player = playerById(editingPlayerId);
      if (player) { player.number = number; player.name = name; player.position = position; }
    } else {
      newPlayerId = uid();
      squad.push({ id: newPlayerId, number, name, position });
    }
    persistSquad();

    const refId = newPlayerId || editingPlayerId;
    if (playerCaptainInput.checked) { captainId = refId; }
    else if (captainId === refId) { captainId = null; }
    persistCaptain();

    closePlayerModal();
    if (newPlayerId && targetSlot !== null) placePlayerInSlot(newPlayerId, targetSlot);
    renderSquadGroups(); renderBench(); renderPitch();
  });

  playerDeleteBtn.addEventListener("click", () => {
    if (!editingPlayerId) return;
    squad = squad.filter(p => p.id !== editingPlayerId);
    Object.keys(assignments).forEach(k => {
      if (assignments[k] === editingPlayerId) { delete assignments[k]; delete positions[k]; }
    });
    if (captainId === editingPlayerId) { captainId = null; persistCaptain(); }
    persistSquad();
    closePlayerModal();
    renderSquadGroups(); renderBench(); renderPitch();
  });

  /* ============================================================
     Compositions view (save modal + gallery with mini preview)
     ============================================================ */
  saveOpenBtn.addEventListener("click", () => {
    saveNameInput.value = lineupTitleEl.value.trim();
    saveModalBackdrop.classList.add("show");
    saveNameInput.focus();
  });
  function closeSaveModal() { saveModalBackdrop.classList.remove("show"); }
  saveModalClose.addEventListener("click", closeSaveModal);
  saveModalBackdrop.addEventListener("click", (e) => { if (e.target === saveModalBackdrop) closeSaveModal(); });

  saveForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = saveNameInput.value.trim();
    if (!name) return;
    savedLineups.unshift({
      id: uid(),
      name,
      formation: currentFormation,
      title: lineupTitleEl.value.trim(),
      assignments: { ...assignments },
      positions: { ...positions },
      savedAt: Date.now()
    });
    persistLineups();
    closeSaveModal();
    toast("Composition enregistr\u00e9e");
    renderSavedGrid();
  });

  function renderSavedGrid() {
    savedGridEl.innerHTML = "";
    if (savedLineups.length === 0) {
      const empty = document.createElement("p");
      empty.className = "saved-empty";
      empty.textContent = "Aucune composition enregistr\u00e9e. Va sur \u00ab Terrain \u00bb, compose ton onze, puis clique sur \u00ab Enregistrer \u00bb.";
      savedGridEl.appendChild(empty);
      return;
    }
    savedLineups.forEach(lineup => savedGridEl.appendChild(buildSavedCard(lineup)));
  }

  function buildSavedCard(lineup) {
    const card = document.createElement("div");
    card.className = "saved-card";

    const preview = document.createElement("div");
    preview.className = "saved-card__preview";
    const slots = FORMATIONS[lineup.formation] || FORMATIONS[currentFormation];
    Object.entries(lineup.assignments).forEach(([slotIdx, playerId]) => {
      const slot = slots[Number(slotIdx)];
      if (!slot) return;
      const custom = lineup.positions && lineup.positions[slotIdx];
      const dot = document.createElement("span");
      dot.className = "mini-dot";
      dot.style.left = (custom ? custom.x : slot.x) + "%";
      dot.style.top = (custom ? custom.y : slot.y) + "%";
      preview.appendChild(dot);
    });

    const body = document.createElement("div");
    body.className = "saved-card__body";
    const name = document.createElement("div");
    name.className = "saved-card__name";
    name.textContent = lineup.name;
    const meta = document.createElement("div");
    meta.className = "saved-card__meta";
    const dateStr = lineup.savedAt ? new Date(lineup.savedAt).toLocaleDateString("fr-FR") : "";
    meta.textContent = lineup.formation + (dateStr ? " \u00b7 " + dateStr : "");

    const actions = document.createElement("div");
    actions.className = "saved-card__actions";
    const loadBtn = document.createElement("button");
    loadBtn.className = "icon-btn"; loadBtn.type = "button"; loadBtn.textContent = "Charger";
    loadBtn.addEventListener("click", () => loadLineup(lineup.id));
    const delBtn = document.createElement("button");
    delBtn.className = "icon-btn danger"; delBtn.type = "button"; delBtn.textContent = "Supprimer";
    delBtn.addEventListener("click", () => {
      savedLineups = savedLineups.filter(l => l.id !== lineup.id);
      persistLineups();
      renderSavedGrid();
    });
    actions.appendChild(loadBtn); actions.appendChild(delBtn);

    body.appendChild(name); body.appendChild(meta); body.appendChild(actions);
    card.appendChild(preview); card.appendChild(body);
    return card;
  }

  function loadLineup(id) {
    const lineup = savedLineups.find(l => l.id === id);
    if (!lineup) return;
    const validAssignments = {}; const validPositions = {};
    Object.entries(lineup.assignments).forEach(([slotIdx, playerId]) => {
      if (playerById(playerId)) {
        validAssignments[slotIdx] = playerId;
        if (lineup.positions && lineup.positions[slotIdx]) validPositions[slotIdx] = lineup.positions[slotIdx];
      }
    });
    currentFormation = FORMATIONS[lineup.formation] ? lineup.formation : currentFormation;
    assignments = validAssignments;
    positions = validPositions;
    lineupTitleEl.value = lineup.title || lineup.name;
    pitchBrandTitleEl.textContent = lineupTitleEl.value || "Titulaires";
    formationSelect.value = currentFormation;
    switchView("terrain");
    renderPitch(); renderBench();
    toast("Composition charg\u00e9e");
  }

  /* ============================================================
     Agenda (calendrier + liste des matchs)
     ============================================================ */
  function toDateKey(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function renderCalendar() {
    const year = calendarMonth.getFullYear(), month = calendarMonth.getMonth();
    const label = calendarMonth.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    calMonthLabel.textContent = label.charAt(0).toUpperCase() + label.slice(1);

    const firstOfMonth = new Date(year, month, 1);
    const startOffset = (firstOfMonth.getDay() + 6) % 7; // lundi = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
    const todayKey = toDateKey(new Date());

    calGrid.innerHTML = "";
    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - startOffset + 1;
      const cellDate = new Date(year, month, dayNum);
      const key = toDateKey(cellDate);
      const outside = dayNum < 1 || dayNum > daysInMonth;
      const dayMatches = outside ? [] : matches.filter(m => m.date === key);

      const cell = document.createElement("div");
      cell.className = "calendar__day"
        + (outside ? " is-outside" : "")
        + (!outside && key === todayKey ? " is-today" : "")
        + (dayMatches.length ? " has-match" : "");

      if (dayMatches.length) {
        const logoUrl = getOpponentLogo(dayMatches[0].opponent);
        if (logoUrl) {
          const img = document.createElement("img");
          img.className = "calendar__day-logo";
          img.src = logoUrl; img.alt = dayMatches[0].opponent;
          cell.appendChild(img);
        } else {
          const fb = document.createElement("span");
          fb.className = "calendar__day-fallback";
          fb.textContent = dayMatches[0].opponent.trim().charAt(0).toUpperCase();
          cell.appendChild(fb);
        }
        const badge = document.createElement("span");
        badge.className = "calendar__day-num";
        badge.textContent = cellDate.getDate();
        cell.appendChild(badge);
      } else {
        cell.textContent = cellDate.getDate();
      }

      if (!outside) {
        cell.addEventListener("click", () => {
          if (dayMatches.length) openMatchModal(dayMatches[0].id);
          else openMatchModalForDate(key);
        });
      }
      calGrid.appendChild(cell);
    }
  }

  calPrevBtn.addEventListener("click", () => {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
    renderCalendar();
  });
  calNextBtn.addEventListener("click", () => {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
    renderCalendar();
  });

  function renderAgendaList() {
    agendaListEl.innerHTML = "";
    if (matches.length === 0) {
      const empty = document.createElement("p");
      empty.className = "saved-empty";
      empty.textContent = "Aucun match programm\u00e9. Clique sur \u00ab + Ajouter un match \u00bb, ou directement sur une date du calendrier.";
      agendaListEl.appendChild(empty);
      return;
    }
    [...matches].sort((a, b) => a.date.localeCompare(b.date)).forEach(m => agendaListEl.appendChild(buildMatchCard(m)));
  }

  function buildMatchCard(m) {
    const card = document.createElement("div");
    card.className = "match-card";

    const d = new Date(m.date + "T00:00:00");
    const dateBox = document.createElement("div");
    dateBox.className = "match-card__date";
    const dayEl = document.createElement("span");
    dayEl.className = "day"; dayEl.textContent = d.getDate();
    const monthEl = document.createElement("span");
    monthEl.className = "month"; monthEl.textContent = d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "");
    dateBox.appendChild(dayEl); dateBox.appendChild(monthEl);

    const logoUrl = getOpponentLogo(m.opponent);
    const logoEl = document.createElement("div");
    logoEl.className = "match-card__logo";
    if (logoUrl) {
      const img = document.createElement("img");
      img.src = logoUrl; img.alt = m.opponent;
      logoEl.appendChild(img);
    } else {
      logoEl.classList.add("match-card__logo--fallback");
      logoEl.textContent = m.opponent.trim().charAt(0).toUpperCase();
    }

    const info = document.createElement("div");
    info.className = "match-card__info";
    const opp = document.createElement("div");
    opp.className = "match-card__opponent";
    opp.textContent = "vs " + m.opponent;
    const meta = document.createElement("div");
    meta.className = "match-card__meta";
    const dayLabel = d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    meta.textContent = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1) + (m.time ? " \u00b7 " + m.time : "");
    info.appendChild(opp); info.appendChild(meta);

    const venue = document.createElement("span");
    venue.className = "match-card__venue" + (m.venue === "home" ? " home" : "");
    venue.textContent = m.venue === "home" ? "Domicile" : "Ext\u00e9rieur";

    card.appendChild(dateBox); card.appendChild(logoEl); card.appendChild(info); card.appendChild(venue);
    card.addEventListener("click", () => openMatchModal(m.id));
    return card;
  }

  addMatchBtn.addEventListener("click", () => openMatchModal(null));

  function openMatchModal(matchId) {
    editingMatchId = matchId;
    const m = matchId ? matches.find(x => x.id === matchId) : null;
    matchModalTitle.textContent = m ? "Modifier le match" : "Ajouter un match";
    matchIdInput.value = m ? m.id : "";
    matchDateInput.value = m ? m.date : "";
    matchTimeInput.value = m && m.time ? m.time : "";
    matchOpponentInput.value = m ? m.opponent : "";
    matchVenueInput.value = m ? m.venue : "home";
    matchDeleteBtn.hidden = !m;
    matchModalBackdrop.classList.add("show");
    matchOpponentInput.focus();
  }

  function openMatchModalForDate(dateKey) {
    openMatchModal(null);
    matchDateInput.value = dateKey;
  }

  function closeMatchModal() {
    matchModalBackdrop.classList.remove("show");
    editingMatchId = null;
  }
  matchModalClose.addEventListener("click", closeMatchModal);
  matchModalBackdrop.addEventListener("click", (e) => { if (e.target === matchModalBackdrop) closeMatchModal(); });

  matchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const date = matchDateInput.value;
    const time = matchTimeInput.value;
    const opponent = matchOpponentInput.value.trim();
    const venue = matchVenueInput.value;
    if (!date || !opponent) return;

    if (editingMatchId) {
      const m = matches.find(x => x.id === editingMatchId);
      if (m) { m.date = date; m.time = time; m.opponent = opponent; m.venue = venue; }
    } else {
      matches.push({ id: uid(), date, time, opponent, venue });
    }
    persistMatches();
    closeMatchModal();
    renderCalendar(); renderAgendaList();
  });

  matchDeleteBtn.addEventListener("click", () => {
    if (!editingMatchId) return;
    matches = matches.filter(m => m.id !== editingMatchId);
    persistMatches();
    closeMatchModal();
    renderCalendar(); renderAgendaList();
  });

  /* ============================================================
     Export image
     ============================================================ */
  exportBtn.addEventListener("click", async () => {
    exportBtn.disabled = true;
    const originalText = exportBtn.textContent;
    exportBtn.textContent = "G\u00e9n\u00e9ration\u2026";
    try {
      const canvas = await html2canvas(pitchEl, { backgroundColor: null, scale: 2 });
      const link = document.createElement("a");
      const fileName = (lineupTitleEl.value.trim() || "composition-fc4r70")
        .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      link.download = fileName + ".png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      toast("Export impossible sur ce navigateur");
    } finally {
      exportBtn.disabled = false;
      exportBtn.textContent = originalText;
    }
  });

  /* ---------- Init ---------- */
  populateFormationSelect();
  renderPitch();
  renderBench();
  renderSquadGroups();
  renderSavedGrid();
  renderCalendar();
  renderAgendaList();
})();
