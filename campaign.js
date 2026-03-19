"use strict";
// ── campaign.js ──
// Campaign mode: story-driven SQL quests with a continuous narrative.
// Depends on: datashop-engine.js, datashop-data.js, datashop-ui.js
//
// DEFENSIVE: All entry points are wrapped in try-catch so a campaign bug
// can never crash the core game (Start button, missions, etc.).

// ── CAMPAIGN DATA ─────────────────────────────────────────────────
const CAMPAIGN_QUESTS = [
  {
    id: 'camp_1',
    chapter: 1,
    title: { nl: 'De Eerste Klant', en: 'The First Customer' },
    story: {
      nl: 'Je webshop is net gelanceerd. <strong>Emma De Vries</strong> uit <strong>Brussel</strong> wil zich registreren. Haar email is <strong>emma@mail.be</strong>. Voeg haar toe als actieve klant!',
      en: 'Your webshop just launched. <strong>Emma De Vries</strong> from <strong>Brussels</strong> wants to register. Her email is <strong>emma@mail.be</strong>. Add her as an active customer!'
    },
    objective: {
      nl: 'INSERT INTO klant (naam, email, stad, actief) VALUES (\'Emma De Vries\', \'emma@mail.be\', \'Brussel\', 1)',
      en: 'INSERT INTO klant (naam, email, stad, actief) VALUES (\'Emma De Vries\', \'emma@mail.be\', \'Brussel\', 1)'
    },
    sqlType: 'insert',
    check: 'INSERT INTO klant',
    xp: 15,
    unlock: 0,  // always available
    time: 120,
  },
  {
    id: 'camp_2',
    chapter: 1,
    title: { nl: 'Inventaris Controle', en: 'Inventory Check' },
    story: {
      nl: 'De eerste orders stromen binnen! Voordat je verder gaat, moet je weten welke producten je verkoopt. <strong>Toon alle producten</strong> met hun naam en prijs.',
      en: 'First orders are coming in! Before continuing, check which products you sell. <strong>Show all products</strong> with their name and price.'
    },
    objective: {
      nl: 'SELECT naam, prijs FROM product',
      en: 'SELECT naam, prijs FROM product'
    },
    sqlType: 'select',
    check: 'SELECT',
    xp: 10,
    unlock: 1,
    time: 90,
  },
  {
    id: 'camp_3',
    chapter: 1,
    title: { nl: 'Prijzenslag', en: 'Price War' },
    story: {
      nl: 'Een concurrent verlaagt zijn prijzen! Je moet de prijs van het product met <strong>product_id = 3</strong> verlagen naar <strong>€19.99</strong> om competitief te blijven.',
      en: 'A competitor is cutting prices! You need to lower the price of the product with <strong>product_id = 3</strong> to <strong>€19.99</strong> to stay competitive.'
    },
    objective: {
      nl: 'UPDATE product SET prijs = 19.99 WHERE product_id = 3',
      en: 'UPDATE product SET prijs = 19.99 WHERE product_id = 3'
    },
    sqlType: 'update',
    check: 'UPDATE product SET',
    xp: 20,
    unlock: 2,
    time: 90,
  },
  {
    id: 'camp_4',
    chapter: 2,
    title: { nl: 'Klantanalyse', en: 'Customer Analysis' },
    story: {
      nl: 'Het marketingteam wil weten hoeveel klanten er per stad zijn. <strong>Groepeer de klanten op stad</strong> en tel ze.',
      en: 'The marketing team wants to know how many customers there are per city. <strong>Group customers by city</strong> and count them.'
    },
    objective: {
      nl: 'SELECT stad, COUNT(*) FROM klant GROUP BY stad',
      en: 'SELECT stad, COUNT(*) FROM klant GROUP BY stad'
    },
    sqlType: 'select',
    check: 'GROUP BY',
    xp: 25,
    unlock: 3,
    time: 120,
  },
  {
    id: 'camp_5',
    chapter: 2,
    title: { nl: 'Bestellingen Koppelen', en: 'Linking Orders' },
    story: {
      nl: 'De CEO wil een overzicht: welke <strong>klant</strong> heeft welke <strong>bestelling</strong> geplaatst? Gebruik een <strong>JOIN</strong> om klant- en bestellingtabellen te koppelen.',
      en: 'The CEO wants an overview: which <strong>customer</strong> placed which <strong>order</strong>? Use a <strong>JOIN</strong> to link the customer and order tables.'
    },
    objective: {
      nl: 'SELECT k.naam, b.bestelling_id FROM klant k JOIN bestelling b ON k.klant_id = b.klant_id',
      en: 'SELECT k.naam, b.bestelling_id FROM klant k JOIN bestelling b ON k.klant_id = b.klant_id'
    },
    sqlType: 'select',
    check: 'JOIN',
    xp: 30,
    unlock: 4,
    time: 150,
  },
];

// ── CAMPAIGN STATE ────────────────────────────────────────────────
const CAMP = {
  doneQuests: new Set(),
  _timers: {},  // campaign-specific timer handles

  init() {
    // Load saved campaign progress
    try {
      const saved = localStorage.getItem('datashop_campaign');
      if (saved) {
        const data = JSON.parse(saved);
        if (data && data.done && Array.isArray(data.done)) {
          this.doneQuests = new Set(data.done);
        }
      }
    } catch (e) {
      console.warn('Campaign: could not load saved progress', e);
    }
  },

  save() {
    try {
      localStorage.setItem('datashop_campaign', JSON.stringify({
        done: [...this.doneQuests]
      }));
    } catch (e) { /* ignore — quota or sandboxed */ }
  },

  isUnlocked(quest) {
    if (!quest) return false;
    return this.doneQuests.size >= quest.unlock;
  },

  render() {
    try {
      this._renderInner();
    } catch (e) {
      console.warn('Campaign render error:', e);
      // Don't let a render crash propagate
    }
  },

  _renderInner() {
    const content = document.getElementById('camp-content');
    if (!content) return;

    const lang = (typeof LANG !== 'undefined') ? LANG : 'nl';
    const done = this.doneQuests.size;
    const total = CAMPAIGN_QUESTS.length;
    const pct = total ? Math.round(done / total * 100) : 0;

    // Update progress bar
    const fill = document.getElementById('camp-prog-fill');
    const lbl = document.getElementById('camp-prog-lbl');
    if (fill) fill.style.width = pct + '%';
    if (lbl) lbl.textContent = done + '/' + total + ' · ' + pct + '%';

    if (!CAMPAIGN_QUESTS.length) {
      content.innerHTML = '<div class="empty-state">' + (typeof t === 'function' ? t('camp_no_quests') : 'Geen quests beschikbaar.') + '</div>';
      return;
    }

    // Group by chapter
    const chapters = {};
    CAMPAIGN_QUESTS.forEach(function(q) {
      if (!chapters[q.chapter]) chapters[q.chapter] = [];
      chapters[q.chapter].push(q);
    });

    let html = '';
    const self = this;
    Object.entries(chapters).forEach(function(entry) {
      const ch = entry[0];
      const quests = entry[1];
      html += '<div class="camp-chapter">';
      html += '<div class="camp-chapter-title">' + (typeof t === 'function' ? t('js_camp_chapter_label') : 'Hoofdstuk') + ' ' + ch + '</div>';
      quests.forEach(function(q) {
        const isDone = self.doneQuests.has(q.id);
        const unlocked = self.isUnlocked(q);
        const title = (q.title && q.title[lang]) || (q.title && q.title.nl) || q.id;
        const story = (q.story && q.story[lang]) || (q.story && q.story.nl) || '';
        const obj = (q.objective && q.objective[lang]) || (q.objective && q.objective.nl) || '';

        const escFn = (typeof esc === 'function') ? esc : function(s) { return String(s || ''); };
        // Fix #18: sanitize story HTML to match main game security architecture
        const sanitizeFn = (typeof sanitizeHTML === 'function') ? sanitizeHTML : function(s) { return String(s || ''); };

        html += '<div class="sc-card ' + (isDone ? 'done' : '') + (unlocked ? '' : ' locked') + '" id="camp-' + q.id + '">';
        html += '<div class="sc-header" data-action="toggle-camp-quest" data-quest="' + q.id + '" aria-expanded="false">';
        html += '<div class="sc-left">';
        html += '<span class="sc-status">' + (isDone ? '✅' : unlocked ? '⚔️' : '🔒') + '</span>';
        html += '<div><div class="sc-title">' + escFn(title) + '</div>';
        html += '<div class="sc-meta"><span class="sc-diff ' + q.sqlType + '">' + q.sqlType.toUpperCase() + '</span>';
        html += '<span class="sc-xp">+' + q.xp + ' XP</span>';
        if (q.time) html += '<span class="sc-timer-badge">⏱ ' + q.time + 's</span>';
        html += '</div></div></div>';
        html += '<span class="sc-chevron" id="camp-chev-' + q.id + '">▸</span>';
        html += '</div>';

        // Body (initially hidden)
        html += '<div class="sc-body" id="camp-body-' + q.id + '">';
        html += '<div class="sc-story">' + sanitizeFn(story) + '</div>';
        html += '<div class="sc-obj"><strong>' + (typeof t === 'function' ? t('js_camp_objective') : 'Doel:') + '</strong> <code>' + escFn(obj) + '</code></div>';
        if (!isDone && unlocked) {
          html += '<div class="sc-input-area">';
          html += '<div class="timer-wrap" id="camp-timer-' + q.id + '">';
          html += '<div class="timer-bar"><div class="timer-fill" id="camp-tb-' + q.id + '"></div></div>';
          html += '<div class="timer-count" id="camp-tn-' + q.id + '"></div>';
          html += '</div>';
          html += '<textarea class="sql-input" id="camp-sql-' + q.id + '" placeholder="' + (typeof t === 'function' ? t('js_camp_sql_placeholder') : 'Schrijf je SQL hier...') + '" spellcheck="false"></textarea>';
          html += '<div class="sc-actions">';
          html += '<button class="btn btn-primary btn-sm" data-action="camp-run" data-quest="' + q.id + '">▶ Run</button>';
          html += '</div>';
          html += '<div class="feedback" id="camp-fb-' + q.id + '"></div>';
          html += '</div>';
        } else if (isDone) {
          html += '<div class="feedback ok visible">' + (typeof t === 'function' ? t('camp_quest_completed') : '✅ Quest voltooid!') + '</div>';
        } else {
          html += '<div class="feedback hint visible">🔒 ' + (typeof t === 'function' ? t('camp_quest_locked') : 'Voltooi eerdere quests om te ontgrendelen.') + '</div>';
        }
        html += '</div>';
        html += '</div>';
      });
      html += '</div>';
    });

    content.innerHTML = html;
  },

  toggleQuest(id) {
    try {
      this._toggleQuestInner(id);
    } catch (e) {
      console.warn('Campaign toggleQuest error:', e);
    }
  },

  _toggleQuestInner(id) {
    const body = document.getElementById('camp-body-' + id);
    const chev = document.getElementById('camp-chev-' + id);
    if (!body) return;
    const wasOpen = body.classList.contains('open');

    // Close all
    const campContent = document.getElementById('camp-content');
    if (campContent) {
      campContent.querySelectorAll('.sc-body').forEach(function(b) { b.classList.remove('open'); });
      campContent.querySelectorAll('.sc-chevron').forEach(function(c) { c.classList.remove('open'); });
    }

    // Clear any running campaign timer
    this._clearTimer(id);

    if (!wasOpen) {
      body.classList.add('open');
      if (chev) chev.classList.add('open');

      // Start timer if quest has one and not done
      const quest = CAMPAIGN_QUESTS.find(function(q) { return q.id === id; });
      if (quest && quest.time && !this.doneQuests.has(id) && this.isUnlocked(quest)) {
        this._startTimer(id, quest.time);
      }
    }
  },

  _clearTimer(id) {
    if (this._timers[id]) {
      cancelAnimationFrame(this._timers[id]);
      delete this._timers[id];
    }
  },

  _startTimer(id, secs) {
    this._clearTimer(id);
    const self = this;
    if (!self._timerRemaining) self._timerRemaining = {};
    self._timerRemaining[id] = secs;
    const end = Date.now() + secs * 1000;
    function tick() {
      const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      self._timerRemaining[id] = left;
      const numEl = document.getElementById('camp-tn-' + id);
      const barEl = document.getElementById('camp-tb-' + id);
      if (numEl) {
        numEl.textContent = left + 's';
        numEl.className = 'timer-count' + (left <= 10 ? ' danger' : left <= 20 ? ' warn' : '');
      }
      if (barEl) {
        barEl.style.width = (left / secs * 100) + '%';
        barEl.className = 'timer-fill' + (left <= 10 ? ' danger' : left <= 20 ? ' warn' : '');
      }
      if (left <= 0) {
        self._clearTimer(id);
        const fb = document.getElementById('camp-fb-' + id);
        if (fb) {
          fb.className = 'feedback hint visible';
          fb.innerHTML = '⏰ <strong>' + (typeof t === 'function' ? t('js_camp_timeout') : 'Tijd voorbij!') + '</strong> ' + (typeof t === 'function' ? t('js_camp_timeout_retry') : 'Probeer opnieuw.');
        }
        return;
      }
      self._timers[id] = requestAnimationFrame(tick);
    }
    self._timers[id] = requestAnimationFrame(tick);
  },

  runQuest(id) {
    try {
      this._runQuestInner(id);
    } catch (e) {
      console.warn('Campaign runQuest error:', e);
      const fb = document.getElementById('camp-fb-' + id);
      if (fb) {
        fb.className = 'feedback err visible';
        fb.innerHTML = '⚠️ ' + (typeof t === 'function' ? t('js_camp_something_wrong') : 'Er ging iets mis. Probeer opnieuw.');
      }
    }
  },

  _runQuestInner(id) {
    const quest = CAMPAIGN_QUESTS.find(function(q) { return q.id === id; });
    if (!quest || this.doneQuests.has(id) || !this.isUnlocked(quest)) return;

    const ta = document.getElementById('camp-sql-' + id);
    const fb = document.getElementById('camp-fb-' + id);
    if (!ta || !fb) return;

    const sql = ta.value.trim();
    if (!sql) {
      fb.className = 'feedback err visible';
      const lang = (typeof LANG !== 'undefined') ? LANG : 'nl';
      fb.innerHTML = '⚠️ ' + (typeof t === 'function' ? t('js_camp_enter_sql') : 'Voer een SQL-query in.');
      return;
    }

    // Check that runSQL exists
    if (typeof runSQL !== 'function') {
      fb.className = 'feedback err visible';
      fb.innerHTML = '⚠️ ' + (typeof t === 'function' ? t('js_camp_engine_unavailable') : 'SQL engine niet beschikbaar.');
      return;
    }

    // Run the SQL
    const res = runSQL(sql);
    if (!res || !res.ok) {
      fb.className = 'feedback err visible';
      const escFn2 = (typeof esc === 'function') ? esc : function(s) { return String(s || ''); };
      fb.innerHTML = '❌ ' + escFn2((res && res.msg) || (typeof t === 'function' ? t('js_camp_sql_error') : 'SQL fout.'));
      return;
    }

    // ── FIX #5: Result validation is now the PRIMARY check ──
    // Validate the actual result/state matches the expected objective FIRST.
    // The loose keyword check only runs as a fallback safety net.
    const validated = this._validateQuestResult(quest, sql, res);
    if (!validated) {
      fb.className = 'feedback hint visible';
      fb.innerHTML = '🤔 ' + (typeof t === 'function' ? t('js_camp_close_but_wrong') : 'Bijna goed! Het resultaat klopt niet helemaal. Controleer je waarden en probeer opnieuw.');
      return;
    }

    // Secondary structural check — must contain the expected keyword
    const normalSql = sql.toLowerCase().replace(/\s+/g, ' ');
    const checkStr = (quest.check || '').toLowerCase();
    if (checkStr && !normalSql.includes(checkStr)) {
      fb.className = 'feedback hint visible';
      fb.innerHTML = '🤔 ' + (typeof t === 'function' ? t('js_camp_wrong_query') : 'Query uitgevoerd, maar dit is niet wat de opdracht vraagt. Probeer opnieuw.');
      return;
    }

    // Quest completed!
    this.doneQuests.add(id);
    this.save();
    this._clearTimer(id);

    // Award XP safely — check every reference before using
    if (typeof G !== 'undefined' && G !== null) {
      G.xp = (G.xp || 0) + (quest.xp || 0);
      if (typeof UI !== 'undefined' && UI !== null) {
        if (typeof UI.updateXP === 'function') {
          try { UI.updateXP(); } catch(e) { console.warn('Campaign: UI.updateXP error', e); }
        }
        if (typeof UI.xpPop === 'function') {
          try { UI.xpPop('+' + (quest.xp || 0) + ' XP'); } catch(e) { /* ignore */ }
        }
        if (typeof UI.addEvent === 'function') {
          try {
            const escFn2 = (typeof esc === 'function') ? esc : function(s) { return String(s || ''); };
            const lang3 = (typeof LANG !== 'undefined') ? LANG : 'nl';
            const titleStr = (quest.title && quest.title[lang3]) || (quest.title && quest.title.nl) || quest.id;
            UI.addEvent(
              'ok',
              '⚔️ ' + (typeof t === 'function' ? t('js_camp_event') : 'Campaign quest voltooid:') + ' <strong>' + escFn2(titleStr) + '</strong>',
              true
            );
          } catch(e) { /* ignore */ }
        }
      }
      if (typeof save === 'function') {
        try { save(); } catch(e) { console.warn('Campaign: save() error', e); }
      }
    }

    fb.className = 'feedback ok visible';
    fb.innerHTML = '✅ ' + (typeof t === 'function' ? t('js_camp_quest_done') : 'Quest voltooid!') + ' +' + (quest.xp || 0) + ' XP';

    // Re-render after short delay to show next quest unlocked
    const self = this;
    setTimeout(function() {
      try { self.render(); } catch(e) { /* ignore */ }
    }, 1500);
  },

  // ── FIX #7: Result-set validation for campaign quests ──
  // Instead of just checking if the SQL contains a keyword, we verify the
  // actual database state matches what the quest expects.
  _validateQuestResult(quest, sql, res) {
    const lang = (typeof LANG !== 'undefined') ? LANG : 'nl';
    const objective = (quest.objective && quest.objective[lang]) || (quest.objective && quest.objective.nl) || '';
    if (!objective) return true; // No objective defined — pass

    const normalSql = sql.toLowerCase().replace(/\s+/g, ' ').trim();
    const normalObj = objective.toLowerCase().replace(/\s+/g, ' ').trim();

    switch (quest.sqlType) {
      case 'insert': {
        // Verify the inserted row exists in the target table
        // Extract table and values from the objective
        const insertM = objective.match(/insert\s+into\s+(\w+)\s*\(([^)]+)\)\s*values\s*\(([^)]+)\)/i);
        if (!insertM) return true;
        const tbl = insertM[1].toLowerCase();
        const cols = insertM[2].split(',').map(function(c) { return c.trim(); });
        const vals = insertM[3].split(',').map(function(v) { return v.trim().replace(/^'|'$/g, ''); });
        if (typeof DB === 'undefined' || !DB[tbl]) return true;
        // Check if a row with these values exists
        return DB[tbl].rows.some(function(row) {
          return cols.every(function(col, i) {
            const expected = vals[i];
            const actual = row[col];
            if (actual == null) return false;
            // Numeric comparison
            if (!isNaN(Number(expected)) && !isNaN(Number(actual))) {
              return Number(actual) === Number(expected);
            }
            return String(actual).toLowerCase() === expected.toLowerCase();
          });
        });
      }
      case 'update': {
        // Verify the update was applied correctly
        const updateM = objective.match(/update\s+(\w+)\s+set\s+(.*?)\s+where\s+(.*)/i);
        if (!updateM) return true;
        const tbl2 = updateM[1].toLowerCase();
        if (typeof DB === 'undefined' || !DB[tbl2]) return true;
        // Parse SET assignments
        const setStr = updateM[2];
        const whereStr = updateM[3];
        const assignments = {};
        const setRe = /(\w+)\s*=\s*('(?:[^']*)'|[\d.]+)/g;
        let sm;
        while ((sm = setRe.exec(setStr)) !== null) {
          assignments[sm[1]] = sm[2].replace(/^'|'$/g, '');
        }
        // Find rows matching WHERE and verify the SET values
        return DB[tbl2].rows.some(function(row) {
          // Check each assignment
          return Object.keys(assignments).every(function(col) {
            const expected = assignments[col];
            const actual = row[col];
            if (actual == null) return false;
            if (!isNaN(Number(expected)) && !isNaN(Number(actual))) {
              return Number(actual) === Number(expected);
            }
            return String(actual).toLowerCase() === expected.toLowerCase();
          });
        });
      }
      case 'delete': {
        // Verify the target row was actually deleted
        const deleteM = objective.match(/delete\s+from\s+(\w+)\s+where\s+(.*)/i);
        if (!deleteM) return true;
        const tbl3 = deleteM[1].toLowerCase();
        if (typeof DB === 'undefined' || !DB[tbl3]) return true;
        // The WHERE condition from the objective should match 0 rows after deletion
        const whereCol = deleteM[2].match(/(\w+)\s*=\s*('(?:[^']*)'|[\d.]+)/);
        if (!whereCol) return true;
        const col3 = whereCol[1];
        const val3 = whereCol[2].replace(/^'|'$/g, '');
        return !DB[tbl3].rows.some(function(row) {
          const actual = row[col3];
          if (!isNaN(Number(val3))) return Number(actual) === Number(val3);
          return String(actual || '').toLowerCase() === val3.toLowerCase();
        });
      }
      case 'select': {
        // For SELECT queries, verify the result matches what the objective would produce
        // Run the objective SQL and compare results
        if (typeof runSQL !== 'function') return true;
        try {
          const expectedRes = runSQL(objective);
          if (!expectedRes || !expectedRes.ok || !res || !res.ok) return true;
          if (!expectedRes.rows || !res.rows) return true;
          // Compare row counts
          if (expectedRes.rows.length !== res.rows.length) return false;
          // Compare column names
          if (expectedRes.rows.length > 0 && res.rows.length > 0) {
            const expectedCols = Object.keys(expectedRes.rows[0]).sort();
            const actualCols = Object.keys(res.rows[0]).sort();
            if (expectedCols.join(',') !== actualCols.join(',')) return false;
            // Compare values row by row
            for (var i = 0; i < expectedRes.rows.length; i++) {
              for (var j = 0; j < expectedCols.length; j++) {
                const ek = expectedCols[j];
                if (String(expectedRes.rows[i][ek]) !== String(res.rows[i][ek])) return false;
              }
            }
          }
          return true;
        } catch (e) {
          return true; // If comparison fails, fall back to passing
        }
      }
      default:
        return true;
    }
  },
};

// ── FIX #19: CAMPAIGN TIMER PAUZEREN BIJ TABWISSEL ──────────────
document.addEventListener('visibilitychange', function() {
  if (!CAMP._timers) return;
  if (document.hidden) {
    // Pause: store remaining time, cancel animation frames
    if (!CAMP._timerPaused) CAMP._timerPaused = {};
    Object.keys(CAMP._timers).forEach(function(id) {
      const remaining = (CAMP._timerRemaining && CAMP._timerRemaining[id]) || 0;
      CAMP._timerPaused[id] = remaining;
      cancelAnimationFrame(CAMP._timers[id]);
      delete CAMP._timers[id];
    });
  } else {
    // Resume: restart timers with saved remaining time
    if (!CAMP._timerPaused) return;
    Object.keys(CAMP._timerPaused).forEach(function(id) {
      const left = CAMP._timerPaused[id];
      delete CAMP._timerPaused[id];
      if (left > 0) CAMP._startTimer(id, left);
    });
  }
});

// ── EVENT DELEGATION FOR CAMPAIGN ─────────────────────────────────
// IMPORTANT: Only handle campaign-specific actions. Never interfere with
// other data-action handlers (start-game, toggle-sc, etc.).
document.addEventListener('click', function (e) {
  const el = e.target.closest('[data-action]');
  if (!el) return;

  const action = el.dataset.action;

  // Only handle campaign actions — ignore everything else
  if (action === 'toggle-camp-quest') {
    CAMP.toggleQuest(el.dataset.quest);
    return;
  }
  if (action === 'camp-run') {
    CAMP.runQuest(el.dataset.quest);
    return;
  }
  // All other actions: do nothing, let the main event handler process them
});

// ── HOOK INTO PANEL SHOW ──────────────────────────────────────────
// Safely patch UI.showPanel to render campaign when its panel opens.
// Uses a delayed check so this works even if UI is defined later.
(function patchShowPanel() {
  try {
    if (typeof UI === 'undefined' || !UI || typeof UI.showPanel !== 'function') {
      // UI not yet available — should not happen given script load order,
      // but don't crash if it does.
      console.warn('Campaign: UI.showPanel not available for patching.');
      return;
    }
    const _origShowPanel = UI.showPanel;
    UI.showPanel = function (name) {
      // Always call the original first — campaign must never block panel switching
      _origShowPanel.call(UI, name);
      if (name === 'camp') {
        try {
          CAMP.init();
          CAMP.render();
        } catch (e) {
          console.warn('Campaign: render error on panel show', e);
        }
      }
    };
  } catch (e) {
    console.warn('Campaign: could not patch showPanel', e);
  }
})();

// Initialize campaign on load — wrapped for safety
try { CAMP.init(); } catch (e) { console.warn('Campaign init error', e); }
