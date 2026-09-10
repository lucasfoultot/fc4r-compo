/* ============================================================
   FC 4R 70 — Compositions — v2
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

  const ROLE_LABEL = { GK: "GB", DEF: "DEF", MID: "MIL", FWD: "ATT" };
  const ROLE_GROUP_TITLE = { GK: "Gardiens", DEF: "Défenseurs", MID: "Milieux", FWD: "Attaquants" };
  const ROLE_ORDER = { GK: 0, DEF: 1, MID: 2, FWD: 3 };

  const STORAGE_SQUAD = "fc4r_squad_v2";
  const STORAGE_LINEUPS = "fc4r_lineups_v2";

  /* ---------- State ---------- */
  let squad = loadJSON(STORAGE_SQUAD, []);
  let savedLineups = loadJSON(STORAGE_LINEUPS, []);
  let currentFormation = "4-4-2";
  let assignments = {};
  let selectedPlayerId = null;
  let draggedPlayerId = null;
  let editingPlayerId = null;

  /* ---------- DOM refs ---------- */
  const formationSelect = document.getElementById("formationSelect");
  const pitchSlotsEl = document.getElementById("pitchSlots");
  const benchListEl = document.getElementById("benchList");
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
  const playerDeleteBtn = document.getElementById("playerDeleteBtn");
  const playerModalClose = document.getElementById("playerModalClose");

  const saveModalBackdrop = document.getElementById("saveModalBackdrop");
  const saveForm = document.getElementById("saveForm");
  const saveNameInput = document.getElementById("saveName");
  const saveModalClose = document.getElementById("saveModalClose");

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
  function uid() { return Math.random().toString(36).slice(2, 10); }
  function playerById(id) { return squad.find(p => p.id === id); }
  function assignedPlayerIds() { return new Set(Object.values(assignments)); }
  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
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
     Player token (sober circular chip, not an illustrated jersey)
     ============================================================ */
  function buildToken(number, role) {
    const token = document.createElement("div");
    token.className = "token" + (role === "GK" ? " token--gk" : "");
    const span = document.createElement("span");
    span.textContent = number;
    token.appendChild(span);
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

      const el = document.createElement("div");
      el.className = "slot";
      el.style.left = slot.x + "%";
      el.style.top = slot.y + "%";

      if (player) {
        el.appendChild(buildToken(player.number, player.position));
        const nameEl = document.createElement("div");
        nameEl.className = "slot__name";
        nameEl.textContent = player.name;
        el.appendChild(nameEl);
      } else {
        const ph = document.createElement("div");
        ph.className = "slot__placeholder";
        ph.textContent = ROLE_LABEL[slot.role];
        el.appendChild(ph);
      }

      el.addEventListener("click", () => onSlotClick(idx));
      el.addEventListener("dragover", (e) => { e.preventDefault(); el.classList.add("drag-over"); });
      el.addEventListener("dragleave", () => el.classList.remove("drag-over"));
      el.addEventListener("drop", (e) => {
        e.preventDefault(); el.classList.remove("drag-over");
        const pid = e.dataTransfer.getData("text/player-id") || draggedPlayerId;
        if (pid) placePlayerInSlot(pid, idx);
      });

      pitchSlotsEl.appendChild(el);
    });
  }

  function onSlotClick(idx) {
    const playerId = assignments[idx];
    if (selectedPlayerId) {
      placePlayerInSlot(selectedPlayerId, idx);
      selectedPlayerId = null;
      renderBench();
      return;
    }
    if (playerId) {
      delete assignments[idx];
      renderPitch(); renderBench();
    }
  }

  function placePlayerInSlot(playerId, slotIdx) {
    const player = playerById(playerId);
    if (!player) return;
    const slotRole = FORMATIONS[currentFormation][slotIdx].role;
    Object.keys(assignments).forEach(k => { if (assignments[k] === playerId) delete assignments[k]; });
    assignments[slotIdx] = playerId;
    renderPitch(); renderBench();
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
    chip.draggable = true;

    const avatar = document.createElement("span");
    avatar.className = "chip-avatar role-" + player.position;
    avatar.textContent = initials(player.name);

    const name = document.createElement("span");
    name.className = "player-chip__name";
    name.textContent = player.number + ". " + player.name;

    const pos = document.createElement("span");
    pos.className = "player-chip__pos";
    pos.textContent = ROLE_LABEL[player.position];

    chip.appendChild(avatar); chip.appendChild(name); chip.appendChild(pos);

    chip.addEventListener("click", () => {
      selectedPlayerId = (selectedPlayerId === player.id) ? null : player.id;
      renderBench();
    });
    chip.addEventListener("dragstart", (e) => {
      draggedPlayerId = player.id;
      e.dataTransfer.setData("text/player-id", player.id);
      e.dataTransfer.effectAllowed = "move";
    });
    chip.addEventListener("dragend", () => { draggedPlayerId = null; });

    return chip;
  }

  clearPitchBtn.addEventListener("click", () => { assignments = {}; renderPitch(); renderBench(); });

  benchListEl.addEventListener("dragover", (e) => e.preventDefault());
  benchListEl.addEventListener("drop", (e) => {
    e.preventDefault();
    const pid = e.dataTransfer.getData("text/player-id") || draggedPlayerId;
    if (pid) {
      Object.keys(assignments).forEach(k => { if (assignments[k] === pid) delete assignments[k]; });
      renderPitch(); renderBench();
    }
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
      empty.textContent = "Aucun joueur pour l'instant. Clique sur \u00ab + Ajouter un joueur \u00bb pour commencer.";
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
    editingPlayerId = playerId;
    const player = playerId ? playerById(playerId) : null;
    playerModalTitle.textContent = player ? "Modifier le joueur" : "Ajouter un joueur";
    playerIdInput.value = player ? player.id : "";
    playerNumberInput.value = player ? player.number : "";
    playerNameInput.value = player ? player.name : "";
    playerPositionInput.value = player ? player.position : "DEF";
    playerDeleteBtn.hidden = !player;
    playerModalBackdrop.classList.add("show");
    playerNameInput.focus();
  }
  function closePlayerModal() { playerModalBackdrop.classList.remove("show"); editingPlayerId = null; }
  playerModalClose.addEventListener("click", closePlayerModal);
  playerModalBackdrop.addEventListener("click", (e) => { if (e.target === playerModalBackdrop) closePlayerModal(); });

  playerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const number = parseInt(playerNumberInput.value, 10);
    const name = playerNameInput.value.trim();
    const position = playerPositionInput.value;
    if (!name || !number) return;

    if (editingPlayerId) {
      const player = playerById(editingPlayerId);
      if (player) { player.number = number; player.name = name; player.position = position; }
    } else {
      squad.push({ id: uid(), number, name, position });
    }
    persistSquad();
    closePlayerModal();
    renderSquadGroups(); renderBench(); renderPitch();
  });

  playerDeleteBtn.addEventListener("click", () => {
    if (!editingPlayerId) return;
    squad = squad.filter(p => p.id !== editingPlayerId);
    Object.keys(assignments).forEach(k => { if (assignments[k] === editingPlayerId) delete assignments[k]; });
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
      const dot = document.createElement("span");
      dot.className = "mini-dot";
      dot.style.left = slot.x + "%";
      dot.style.top = slot.y + "%";
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
    const validAssignments = {};
    Object.entries(lineup.assignments).forEach(([slotIdx, playerId]) => {
      if (playerById(playerId)) validAssignments[slotIdx] = playerId;
    });
    currentFormation = FORMATIONS[lineup.formation] ? lineup.formation : currentFormation;
    assignments = validAssignments;
    lineupTitleEl.value = lineup.title || lineup.name;
    pitchBrandTitleEl.textContent = lineupTitleEl.value || "Titulaires";
    formationSelect.value = currentFormation;
    switchView("terrain");
    renderPitch(); renderBench();
    toast("Composition charg\u00e9e");
  }

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
})();
