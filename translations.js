// ── TRANSLATIONS ──────────────────────────────────────────────────
// DataShop CEO — i18n system
// Default: NL (Dutch). Add 'en' keys for English.

const TRANSLATIONS = {
  nl: {
    // Boot screen
    boot_eyebrow: 'SQL Story Game · v3',
    boot_tagline_build: 'Build · Query · ',
    boot_tagline_conquer: 'Conquer',
    boot_desc: 'Jij runt een startup webshop. Klanten wachten, crises breken los — alleen SQL redt je bedrijf.',
    boot_feature_story: 'Story Mode',
    boot_feature_timers: 'Timers',
    boot_feature_streaks: 'Streaks',
    boot_feature_office: 'Kantoor Upgrade',
    boot_feature_achievements: 'Achievements',
    boot_placeholder: 'Jouw naam, CEO...',
    boot_name_required: 'Voer je naam in, CEO!',
    boot_start_btn: '🚀 Starten',
    boot_continue_btn: '↩ Verdergaan (intro overslaan)',
    boot_dark: '🌙 Dark',
    boot_light: '☀️ Light',
    boot_copyright: 'Alle rechten voorbehouden · Gelicenseerd voor educatief gebruik',

    // Toast / overlays
    ach_toast_label: 'Achievement ontgrendeld',
    streak_label: 'REEKS OP RIJ',

    // Chapter recap
    recap_subtitle: 'Wat heb je geleerd?',
    recap_learned_title: '✦ Concepten onder de knie',
    recap_next_label: '→ Volgende hoofdstuk',
    recap_continue: 'Doorgaan →',

    // Completion screen
    comp_eyebrow: 'DataShop CEO — Voltooid',
    comp_title1: 'Je bent een',
    comp_title_accent: 'Data Legende',
    comp_cert_btn: '📜 Certificaat Downloaden',
    comp_close_btn: 'Terug naar Dashboard',

    // Sidebar
    sb_logo_sub: 'CEO Dashboard',
    xp_label: 'VOORTGANG',
    streak_sidebar: 'Reeks',
    kpi_customers: 'Klanten',
    kpi_orders: 'Orders',
    kpi_reputation: 'Reputatie',
    kpi_xp: 'XP',
    rep_label: 'Reputatie',
    nav_section_nav: 'Navigatie',
    nav_dashboard: 'Dashboard',
    nav_missions: 'Missies',
    nav_daily: 'Dagelijkse Uitdaging',
    nav_db: 'Databank',
    nav_terminal: 'Terminal',
    nav_syntax: 'SQL Syntaxen',
    nav_tutorial: 'SQL Tutorial',
    nav_badges: 'Badges',
    nav_section_sys: 'Systeem',
    nav_theme: 'Light mode',  // dynamisch bijgewerkt door THEME.apply()
    nav_theme_dark: 'Dark mode',
    nav_theme_light: 'Light mode',
    nav_settings: 'Instellingen',
    nav_shortcuts: 'Sneltoetsen',

    // Dashboard panel
    dash_bc: 'DataShop HQ',
    dash_title: '📊 Dashboard',
    dash_subtitle: 'Realtime bedrijfsstatus en activiteitsfeed.',
    dash_tut_title: 'SQL Tutorial',
    dash_tut_btn: 'Ga naar Tutorial →',
    dash_mastery: 'SQL CONCEPT BEHEERSING',
    dash_skill: '⚡ SKILL MASTERY',
    biz_feed: '📈 Bedrijfslog',
    sys_feed: '⚙️ Systeem & SQL',
    feed_live: 'Live',

    // Scenarios panel
    sc_bc: 'Missies',
    sc_title: "🎯 Scenario's",
    sc_subtitle: 'Elke situatie vereist SQL. De databank verandert live.',
    sc_search_placeholder: '🔍  Zoek missie...',
    filter_difficulty: 'Moeilijkheid',
    filter_all: 'Alle',
    filter_easy: '🟢 Makkelijk',
    filter_medium: '🟠 Gemiddeld',
    filter_hard: '🔴 Moeilijk',
    filter_done: '✅ Voltooid',
    filter_sqltype: 'SQL-type',

    // Database panel
    db_bc: 'Databank',
    db_title: '🗄️ Database Viewer',
    db_subtitle: 'Live weergave. Wijzigingen zijn direct zichtbaar.',
    db_tab_schema: '📋 Schema',
    db_tab_erd: '🔗 ERD Diagram',
    db_tab_data: '📊 Data',
    db_shortcuts_label: '🔗 Snelkoppelingen:',
    db_section_schema: 'Tabelstructuur',
    db_section_erd: 'Relatiediagram (ERD)',
    erd_pk: 'Primary Key',
    erd_fk: 'Foreign Key → verwijst naar PK van andere tabel',
    erd_rel: 'Relatie tussen tabellen',

    // Terminal panel
    term_bc: 'Terminal',
    term_title: '💻 Vrije Terminal',
    term_subtitle: 'Experimenteer vrijuit met SQL. om uit te voeren · voor query-history.',
    term_examples_label: 'Klik een voorbeeld om te laden',
    term_ex0: 'alle klanten',
    term_ex1: 'top 3 duurste',
    term_ex2: 'klanten per stad',
    term_ex3: 'klant + bestelling',
    term_ex4: 'CASE WHEN',
    term_ex5: 'boven gemiddelde prijs',
    term_ex6: 'klanten + bestellingen',
    term_hint: 'Ctrl+Enter uitvoeren · Tab voor inspringing',
    term_clear_btn: 'Wissen',
    term_run_btn: '▶ Uitvoeren',
    term_placeholder: '// Voer een query uit om resultaten te zien...',

    // Achievements panel
    ach_bc: 'Badges',
    ach_title: '🏆 Achievements',

    // Daily panel
    daily_bc: 'Dagelijkse Uitdaging',
    daily_title: '🌅 Uitdaging van de dag',
    daily_subtitle: 'Elke dag een nieuwe SQL-uitdaging. Haal de bonus XP!',

    // Settings panel
    set_bc: 'Systeem',
    set_title: '⚙️ Instellingen',
    set_subtitle: 'Beheer je profiel en voortgang.',

    // Syntax panel
    syn_bc: 'Referentie',
    syn_title: '📖 SQL Syntaxen',
    syn_subtitle: 'Overzicht van alle SQL-commando\'s die je nodig hebt als DataShop CEO.',
    syn_filter_all: 'Alles',

    // Tutorial panel
    tut_bc: 'Leren',
    tut_title: '🎓 SQL Tutorial',
    tut_subtitle: 'Leer SQL stap voor stap — van nul tot expert. Elke les bevat uitleg, voorbeelden en een oefening.',

    // Key help modal
    key_help_title: '⌨️ Sneltoetsen',
    key_run: 'SQL uitvoeren',
    key_indent: 'Inspringing in editor',
    key_help_key: 'Deze helpkaart',
    key_escape: 'Sluit venster / popups',
    key_close_btn: 'Sluiten',

    // JS dynamic strings
    js_progress_done: 'voltooid',
    js_unlocked: 'ontgrendeld',
    js_xp_next: 'XP →',
    js_max_level: '✦ MAX LEVEL ✦',
    js_shields: 'shields',
    js_write_sql_first: 'Schrijf eerst een SQL-statement.',
    js_all_steps_done: 'Alle stappen voltooid!',
    js_speed: 'snelheid ⚡',
    js_streak_bonus: 'reeks 🔥',
    js_hint_penalty: 'hint',
    js_step_done: 'Stap',
    js_step_done2: 'geslaagd!',
    js_next_step: '▶ Nu stap',
    js_timeout_title: 'Tijd voorbij — geen zorgen!',
    js_timeout_tip: 'Snelle tip:',
    js_timeout_hint: 'Gebruik de 💡 Hint-knop voor begeleiding, of druk op ↩ Oefenen om het opnieuw te proberen.',
    js_timeout_event: '⏰ Timeout op missie — probeer het opnieuw!',
    js_two_errors: '2 fouten op rij — reeks gereset',
    js_streak_warning: '⚠️ Nog één fout en je reeks',
    js_streak_reset: 'wordt gereset',
    js_query_correct_not: '⚠️ Query syntactisch correct maar resultaat klopt niet:',
    js_rep_low: '⚠️ Reputatie onder 80%! Klanten beginnen te twijfelen aan DataShop.',
    js_rep_critical: '🚨 Reputatie kritiek (<50%)! Investeerders overwegen terug te trekken!',
    js_rep_zero: '💀 Reputatie op nul. DataShop staat op instorten. Herstel via correcte SQL!',
    js_rep_critical_title: 'Reputatie Kritiek!',
    js_small_error: '⚠️ Kleine SQL-fout. −2 reputatie. Reeks intact.',
    js_error_streak_reset: '❌ Onjuiste query (2×). Reeks gereset. −5 reputatie.',
    js_streak_intact: 'Kleine fout — reeks blijft behouden',
    js_streak_intact2: 'Kleine fout — reeks intact',
    js_get_started: 'Aan de slag →',
    js_scenarios_none: 'Geen missies gevonden',
    js_scenarios_none_sub: 'Probeer een andere filter of zoekterm.',
    js_ddl_success: 'DDL geslaagd. Bekijk de Databank-tab.',
    js_dml_success: 'Geslaagd. Bekijk de Databank-tab.',
    js_rows_found: 'rij(en) gevonden.',
    js_rows: 'rijen',
    js_query_failed: 'Query mislukt.',
    js_result: 'Resultaat',
    js_completion_desc: 'missies voltooid als',
    js_completion_desc2: 'Je hebt DataShop van startup naar wereldleider gebracht.',
    js_total_xp: 'Totaal XP',
    js_missions: 'Missies',
    js_badges: 'Badges',
    js_tutorial_lessons: 'Tutoriallessen',
    js_current_streak: 'Huidige reeks',
    js_current_streak2: 'Huidige streak',
    js_progress_summary: '📊 Voortgang samenvatting',
    js_display: '🎨 Weergave',
    js_theme_intro: 'Kies een thema dat prettig leest voor jou.',
    js_profile: '👔 Jouw profiel',
    js_logged_as: 'Ingelogd als',
    js_rank: 'Rang:',
    js_total_xp2: 'Totaal XP',
    js_missions_completed: 'Missies voltooid',
    js_danger_zone: '⚠️ Gevaarzone',
    js_danger_desc: 'Onderstaande acties zijn onomkeerbaar. Alle voortgang gaat verloren.',
    js_reset_btn: '🗑️ Voortgang Resetten',
    js_export_btn: '📤 Data exporteren (JSON)',
    js_reset_warning: '⚠️ Ben je zeker? Dit verwijdert alle XP, missies, badges, tutorialvoortgang en reputatie!',
    js_reset_confirm_btn: 'Ja, alles verwijderen',
    js_reset_cancel_btn: 'Annuleren',
    js_theme_dark: '🌙 Dark mode',
    js_theme_light: '☀️ Light mode',
    js_mission_progress: 'Missie-voortgang',
    js_ach_unlocked: 'ontgrendeld',
    js_daily_done: 'Voltooid',
    js_daily_completed: 'Dagelijkse uitdaging',
    js_daily_completed2: 'voltooid!',
    js_daily_completed3: 'al voltooid!',
    js_solution_shown: 'Oplossing al getoond — je kan geen XP meer verdienen voor deze uitdaging vandaag.',
    js_scenario_not_found: 'Scenario niet gevonden. Herlaad de pagina.',
    js_scenario_multistep: 'Dit scenario heeft meerdere stappen — gebruik het in de missies-sectie.',
    js_challenge_ok: '✅ Uitdaging geslaagd!',
    js_show_solution_btn: '💡 Toon oplossing (geen XP)',
    js_cert_date: 'Behaald op',
    js_tut_exercise_done: '✅ Voltooid',
    js_tut_retry: '🔄 Opnieuw oefenen',
    js_tut_correct: '✅ Correct! Bewijs geleverd — oefening voltooid.',
    js_tut_not_correct: '❌ Niet helemaal juist.',
    js_tut_complete_first: '✏️ Voltooi eerst de oefening voordat je verdergaat!',
    js_tut_show_hint: '💡 Toon hint',
    js_tut_hide_hint: '🙈 Hint verbergen',
    js_tut_module_done: 'Tutorial module',
    js_tut_module_done2: 'voltooid!',
    js_explain_title: '🔍 Wat deed jouw SQL?',
    js_streak_bonus_popup: '+10 XP bonus!',
    js_streak_bonus_popup5: '+20 XP bonus!',
    js_saved_progress: '✓ Voortgang gevonden:',
    js_more_read: '↓ Meer lezen',
    js_less_read: '↑ Minder',
    js_hint_btn: '💡 Hint ①②③',
    js_lessen: 'lessen',
    js_diff_easy: 'Makkelijk',
    js_diff_medium: 'Gemiddeld',
    js_diff_hard: 'Moeilijk',
    js_daily_all_done_title: 'Alle uitdagingen voltooid!',
    js_daily_all_done_sub: 'Uitstekend werk. Kom morgen terug voor nieuwe missies.',
    js_daily_streak_badge: 'dagen op rij!',
    js_sc_no_results: 'Geen missies gevonden voor',
    js_sc_no_selection: 'Geen missies in deze selectie.',
    js_sc_show_all: 'Alle missies tonen',
    js_new_concept: '📚 Nieuw concept',
    js_sc_done_tag: '✓ Klaar',
  },

  en: {
    // Boot screen
    boot_eyebrow: 'SQL Story Game · v3',
    boot_tagline_build: 'Build · Query · ',
    boot_tagline_conquer: 'Conquer',
    boot_desc: 'You run a startup webshop. Customers are waiting, crises break out — only SQL can save your business.',
    boot_feature_story: 'Story Mode',
    boot_feature_timers: 'Timers',
    boot_feature_streaks: 'Streaks',
    boot_feature_office: 'Office Upgrade',
    boot_feature_achievements: 'Achievements',
    boot_placeholder: 'Your name, CEO...',
    boot_name_required: 'Enter your name, CEO!',
    boot_start_btn: '🚀 Start',
    boot_continue_btn: '↩ Continue (skip intro)',
    boot_dark: '🌙 Dark',
    boot_light: '☀️ Light',
    boot_copyright: 'All rights reserved · Licensed for educational use',

    // Toast / overlays
    ach_toast_label: 'Achievement unlocked',
    streak_label: 'STREAK IN A ROW',

    // Chapter recap
    recap_subtitle: 'What did you learn?',
    recap_learned_title: '✦ Concepts mastered',
    recap_next_label: '→ Next chapter',
    recap_continue: 'Continue →',

    // Completion screen
    comp_eyebrow: 'DataShop CEO — Completed',
    comp_title1: "You're a",
    comp_title_accent: 'Data Legend',
    comp_cert_btn: '📜 Download Certificate',
    comp_close_btn: 'Back to Dashboard',

    // Sidebar
    sb_logo_sub: 'CEO Dashboard',
    xp_label: 'PROGRESS',
    streak_sidebar: 'Streak',
    kpi_customers: 'Customers',
    kpi_orders: 'Orders',
    kpi_reputation: 'Reputation',
    kpi_xp: 'XP',
    rep_label: 'Reputation',
    nav_section_nav: 'Navigation',
    nav_dashboard: 'Dashboard',
    nav_missions: 'Missions',
    nav_daily: 'Daily Challenge',
    nav_db: 'Database',
    nav_terminal: 'Terminal',
    nav_syntax: 'SQL Syntax',
    nav_tutorial: 'SQL Tutorial',
    nav_badges: 'Badges',
    nav_section_sys: 'System',
    nav_theme: 'Light mode',  // dynamically updated by THEME.apply()
    nav_theme_dark: 'Dark mode',
    nav_theme_light: 'Light mode',
    nav_settings: 'Settings',
    nav_shortcuts: 'Shortcuts',

    // Dashboard panel
    dash_bc: 'DataShop HQ',
    dash_title: '📊 Dashboard',
    dash_subtitle: 'Real-time business status and activity feed.',
    dash_tut_title: 'SQL Tutorial',
    dash_tut_btn: 'Go to Tutorial →',
    dash_mastery: 'SQL CONCEPT MASTERY',
    dash_skill: '⚡ SKILL MASTERY',
    biz_feed: '📈 Business Log',
    sys_feed: '⚙️ System & SQL',
    feed_live: 'Live',

    // Scenarios panel
    sc_bc: 'Missions',
    sc_title: '🎯 Scenarios',
    sc_subtitle: 'Every situation requires SQL. The database changes live.',
    sc_search_placeholder: '🔍  Search mission...',
    filter_difficulty: 'Difficulty',
    filter_all: 'All',
    filter_easy: '🟢 Easy',
    filter_medium: '🟠 Medium',
    filter_hard: '🔴 Hard',
    filter_done: '✅ Completed',
    filter_sqltype: 'SQL type',

    // Database panel
    db_bc: 'Database',
    db_title: '🗄️ Database Viewer',
    db_subtitle: 'Live view. Changes are immediately visible.',
    db_tab_schema: '📋 Schema',
    db_tab_erd: '🔗 ERD Diagram',
    db_tab_data: '📊 Data',
    db_shortcuts_label: '🔗 Shortcuts:',
    db_section_schema: 'Table structure',
    db_section_erd: 'Relationship diagram (ERD)',
    erd_pk: 'Primary Key',
    erd_fk: 'Foreign Key → references PK of another table',
    erd_rel: 'Relationship between tables',

    // Terminal panel
    term_bc: 'Terminal',
    term_title: '💻 Free Terminal',
    term_subtitle: 'Experiment freely with SQL. to execute · for query history.',
    term_examples_label: 'Click an example to load',
    term_ex0: 'all customers',
    term_ex1: 'top 3 most expensive',
    term_ex2: 'customers per city',
    term_ex3: 'customer + order',
    term_ex4: 'CASE WHEN',
    term_ex5: 'above average price',
    term_ex6: 'customers + orders',
    term_hint: 'Ctrl+Enter to run · Tab for indent',
    term_clear_btn: 'Clear',
    term_run_btn: '▶ Run',
    term_placeholder: '// Run a query to see results...',

    // Achievements panel
    ach_bc: 'Badges',
    ach_title: '🏆 Achievements',

    // Daily panel
    daily_bc: 'Daily Challenge',
    daily_title: '🌅 Challenge of the Day',
    daily_subtitle: 'A new SQL challenge every day. Grab the bonus XP!',

    // Settings panel
    set_bc: 'System',
    set_title: '⚙️ Settings',
    set_subtitle: 'Manage your profile and progress.',

    // Syntax panel
    syn_bc: 'Reference',
    syn_title: '📖 SQL Syntax',
    syn_subtitle: "Overview of all SQL commands you need as DataShop CEO.",
    syn_filter_all: 'All',

    // Tutorial panel
    tut_bc: 'Learn',
    tut_title: '🎓 SQL Tutorial',
    tut_subtitle: 'Learn SQL step by step — from zero to expert. Each lesson contains explanation, examples and an exercise.',

    // Key help modal
    key_help_title: '⌨️ Keyboard Shortcuts',
    key_run: 'Run SQL',
    key_indent: 'Indent in editor',
    key_help_key: 'This help card',
    key_escape: 'Close window / popups',
    key_close_btn: 'Close',

    // JS dynamic strings
    js_progress_done: 'completed',
    js_unlocked: 'unlocked',
    js_xp_next: 'XP →',
    js_max_level: '✦ MAX LEVEL ✦',
    js_shields: 'shields',
    js_write_sql_first: 'Write a SQL statement first.',
    js_all_steps_done: 'All steps completed!',
    js_speed: 'speed ⚡',
    js_streak_bonus: 'streak 🔥',
    js_hint_penalty: 'hint',
    js_step_done: 'Step',
    js_step_done2: 'completed!',
    js_next_step: '▶ Now step',
    js_timeout_title: 'Time\'s up — no worries!',
    js_timeout_tip: 'Quick tip:',
    js_timeout_hint: 'Use the 💡 Hint button for guidance, or press ↩ Practice to try again.',
    js_timeout_event: '⏰ Timeout on mission — try again!',
    js_two_errors: '2 errors in a row — streak reset',
    js_streak_warning: '⚠️ One more error and your streak',
    js_streak_reset: 'will be reset',
    js_query_correct_not: '⚠️ Query syntactically correct but result is wrong:',
    js_rep_low: '⚠️ Reputation below 80%! Customers are starting to doubt DataShop.',
    js_rep_critical: '🚨 Reputation critical (<50%)! Investors are considering withdrawing!',
    js_rep_zero: '💀 Reputation at zero. DataShop is on the verge of collapse. Recover with correct SQL!',
    js_rep_critical_title: 'Reputation Critical!',
    js_small_error: '⚠️ Minor SQL error. −2 reputation. Streak intact.',
    js_error_streak_reset: '❌ Incorrect query (2×). Streak reset. −5 reputation.',
    js_streak_intact: 'Minor error — streak stays intact',
    js_streak_intact2: 'Minor error — streak intact',
    js_get_started: 'Let\'s go →',
    js_scenarios_none: 'No missions found',
    js_scenarios_none_sub: 'Try a different filter or search term.',
    js_ddl_success: 'DDL succeeded. Check the Database tab.',
    js_dml_success: 'Succeeded. Check the Database tab.',
    js_rows_found: 'row(s) found.',
    js_rows: 'rows',
    js_query_failed: 'Query failed.',
    js_result: 'Result',
    js_completion_desc: 'missions completed as',
    js_completion_desc2: 'You have taken DataShop from startup to world leader.',
    js_total_xp: 'Total XP',
    js_missions: 'Missions',
    js_badges: 'Badges',
    js_tutorial_lessons: 'Tutorial lessons',
    js_current_streak: 'Current streak',
    js_current_streak2: 'Current streak',
    js_progress_summary: '📊 Progress summary',
    js_display: '🎨 Display',
    js_theme_intro: 'Choose a theme that is comfortable to read for you.',
    js_profile: '👔 Your profile',
    js_logged_as: 'Logged in as',
    js_rank: 'Rank:',
    js_total_xp2: 'Total XP',
    js_missions_completed: 'Missions completed',
    js_danger_zone: '⚠️ Danger Zone',
    js_danger_desc: 'The following actions are irreversible. All progress will be lost.',
    js_reset_btn: '🗑️ Reset Progress',
    js_export_btn: '📤 Export Data (JSON)',
    js_reset_warning: '⚠️ Are you sure? This deletes all XP, missions, badges, tutorial progress and reputation!',
    js_reset_confirm_btn: 'Yes, delete everything',
    js_reset_cancel_btn: 'Cancel',
    js_theme_dark: '🌙 Dark mode',
    js_theme_light: '☀️ Light mode',
    js_mission_progress: 'Mission progress',
    js_ach_unlocked: 'unlocked',
    js_daily_done: 'Completed',
    js_daily_completed: 'Daily challenge',
    js_daily_completed2: 'completed!',
    js_daily_completed3: 'already completed today!',
    js_solution_shown: 'Solution already shown — you can no longer earn XP for this challenge today.',
    js_scenario_not_found: 'Scenario not found. Reload the page.',
    js_scenario_multistep: 'This scenario has multiple steps — use it in the missions section.',
    js_challenge_ok: '✅ Challenge completed!',
    js_show_solution_btn: '💡 Show solution (no XP)',
    js_cert_date: 'Achieved on',
    js_tut_exercise_done: '✅ Completed',
    js_tut_retry: '🔄 Practice again',
    js_tut_correct: '✅ Correct! Proof delivered — exercise completed.',
    js_tut_not_correct: '❌ Not quite right.',
    js_tut_complete_first: '✏️ Complete the exercise first before continuing!',
    js_tut_show_hint: '💡 Show hint',
    js_tut_hide_hint: '🙈 Hide hint',
    js_tut_module_done: 'Tutorial module',
    js_tut_module_done2: 'completed!',
    js_explain_title: '🔍 What did your SQL do?',
    js_streak_bonus_popup: '+10 XP bonus!',
    js_streak_bonus_popup5: '+20 XP bonus!',
    js_saved_progress: '✓ Progress found:',
    js_more_read: '↓ Read more',
    js_less_read: '↑ Less',
    js_hint_btn: '💡 Hint ①②③',
    js_lessen: 'lessons',
    js_diff_easy: 'Easy',
    js_diff_medium: 'Medium',
    js_diff_hard: 'Hard',
    js_daily_all_done_title: 'All challenges completed!',
    js_daily_all_done_sub: 'Excellent work. Come back tomorrow for new missions.',
    js_daily_streak_badge: 'days in a row!',
    js_sc_no_results: 'No missions found for',
    js_sc_no_selection: 'No missions in this selection.',
    js_sc_show_all: 'Show all missions',
    js_new_concept: '📚 New concept',
    js_sc_done_tag: '✓ Done',
  }
};

// Current language state
// Default language: Dutch. localStorage overrides this in the boot script.
let LANG = 'nl';

function t(key) {
  return (TRANSLATIONS[LANG] && TRANSLATIONS[LANG][key]) || (TRANSLATIONS['nl'][key]) || key;
}

function setLang(lang) {
  LANG = lang;
  try { localStorage.setItem('datashop_lang', lang); } catch(e) {}
  applyTranslations();
  // Re-render dynamic panels if game is running
  if (document.getElementById('s-game')?.classList.contains('active')) {
    UI.renderSidebar?.();
    UI.renderScenarios?.();
    UI.renderAch?.();
    const activePanel = document.querySelector('.panel.on');
    if (activePanel) {
      const panelId = activePanel.id.replace('panel-','');
      UI.showPanel?.(panelId);
    }
  }
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const attr = el.getAttribute('data-i18n-attr');
    if (attr) {
      el.setAttribute(attr, t(key));
    } else {
      el.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (typeof setHTML === 'function') {
      setHTML(el, t(key));
    } else {
      el.textContent = t(key);
    }
  });
  // Update lang switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === LANG);
  });
  // Update html lang attr
  document.documentElement.lang = LANG === 'en' ? 'en' : 'nl';
}
