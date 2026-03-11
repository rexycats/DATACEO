"use strict";
(function(){
  window.LANG = window.LANG || "nl";
  try {
    const l = localStorage.getItem("datashop_lang");
    if (l) window.LANG = l;
  } catch(e) {}
  if (typeof applyTranslations === "function") applyTranslations();
})();
