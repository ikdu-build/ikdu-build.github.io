// Shared by every page (English and Arabic): photo helper, categories, language switcher,
// floating WhatsApp button, phone menu, footer.
(() => {
  // WhatsApp number in international format without + or spaces, e.g. "201001234567".
  const WHATSAPP = "201002021208";  // Amr's personal number for now (2026-09-27); switch to the business number here, one line
  const waLink = WHATSAPP ? `https://wa.me/${WHATSAPP}` : "#whatsapp";
  const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>`;
  window.IKDU_WA = waLink;

  // Language: Arabic pages live in /ar/ with <html lang="ar" dir="rtl">. Same file names in both folders.
  const AR = document.documentElement.lang === "ar";
  window.IKDU_AR = AR;
  const A = AR ? "../assets" : "assets";          // assets folder, seen from this page
  window.IKDU_ASSETS = A;
  const T = AR
    ? { cr: "من التصميم للتنفيذ", projects: "المشاريع", services: "خدماتنا", about: "عنّا وخدماتنا", connect: "تواصل معنا", menu: "القائمة", close: "إغلاق",
        waFloat: "واتساب", waFloatLabel: "كلّمنا على واتساب", waUs: "كلّمنا واتساب", place: "الجيزة، مصر",
        villa: "فيلات", apartments: "شقق", commercial: "تجاري", other: "EN", otherLabel: "English",
        ig: "إنستجرام", li: "لينكدإن", fb: "فيسبوك" }
    : { cr: "Concept → Reality", projects: "Projects", services: "Services", about: "About &amp; Services", connect: "Contact us", menu: "Menu", close: "Close",
        waFloat: "WhatsApp", waFloatLabel: "Chat on WhatsApp", waUs: "WhatsApp us", place: "Giza, Egypt",
        villa: "Villas", apartments: "Apartments", commercial: "Commercial", other: "عربي", otherLabel: "العربية",
        ig: "Instagram", li: "LinkedIn", fb: "Facebook" };
  window.IKDU_T = T;

  // Responsive photo: <picture> with WebP in 3 sizes + a JPG fallback (made by tools/optimize_images.py).
  // key = "<folder>/<file>.jpg" (folder = project or "connect"). o = { sizes, cls, id, alt, eager }
  window.ikduPic = (key, o = {}) => {
    const [folder, file] = key.split("/"), name = file.replace(/\.[a-z]+$/i, ""), base = `${A}/web/${folder}/${name}`;
    const alt = o.alt ?? (window.ikduAlt ? window.ikduAlt(key, "") : "");
    return `<picture><source type="image/webp" srcset="${base}-600.webp 600w, ${base}-1200.webp 1200w, ${base}-1600.webp 1600w" sizes="${o.sizes || "100vw"}">` +
      `<img src="${base}-1200.jpg" alt="${alt.replace(/"/g, "&quot;")}" data-pic="${key}"${o.cls ? ` class="${o.cls}"` : ""}${o.id ? ` id="${o.id}"` : ""}` +
      `${o.eager ? ` fetchpriority="high"` : ` loading="lazy"`} decoding="async"></picture>`;
  };
  window.ikduThumb = key => { const [folder, file] = key.split("/"); return `${A}/web/${folder}/${file.replace(/\.[a-z]+$/i, "")}-600.webp`; };

  // Building-type categories (Amanda's p28 icons, black only; "buildings" hidden until a building project exists)
  window.IKDU_CATS = {   // order = commercial, villas, apartments (Amr, 2026-09-29)
    commercial: { label: T.commercial, icon: `${A}/web/icons/icon-retail.png` },  // Amanda's "retail space" icon, closest match in her set
    villa:      { label: T.villa,      icon: `${A}/web/icons/icon-villa.png` },
    apartments: { label: T.apartments, icon: `${A}/web/icons/icon-apartments.png` }
  };
  window.IKDU_PROJECT_CAT = { "l-villa": "villa", "l-villa-2": "villa", "m-villa": "villa", "s-roof": "apartments", "polysh": "commercial", "sane": "commercial" };

  // Language switcher (عربي / EN): goes to the SAME page in the other language.
  // Only pages that exist in both languages get it; add a file name here when its twin is built.
  const TWINS = ["hero.html", "about.html", "connect.html", "transformation.html",
                 "l-villa.html", "l-villa-2.html", "polysh.html", "s-roof.html", "sane.html", "m-villa.html"];
  const file = (location.pathname.split("/").pop() || "hero.html").replace(/^index\.html$/, "hero.html");   // live home = index.html (copy of hero.html)
  // Pages are pre-rendered at build time (make_site.py), so the menu, footer, WhatsApp button etc. may already be in the HTML.
  // Take those copies out first and build them again, so nothing appears twice and every button works.
  document.querySelectorAll(".lang-switch, .nav-cr, .wa-float, .menu-btn, .menu-overlay, .site-footer").forEach(e => e.remove());
  document.querySelectorAll("header .nav-projects").forEach(w => { const a = w.querySelector("a"); w.replaceWith(a); });
  const twin = TWINS.includes(file) ? (AR ? `../${file}` : `ar/${file}`) : null;
  const twinLink = twin ? `<a class="lang-switch" href="${twin}${location.search}${location.hash}" hreflang="${AR ? "en" : "ar"}" lang="${AR ? "en" : "ar"}" aria-label="${T.otherLabel}">${T.other}</a>` : "";
  if (twin) document.querySelector("header nav.right")?.insertAdjacentHTML("beforeend", twinLink);

  // "Projects" hover legend (desktop): category icons with labels, each opens the filtered projects view
  document.querySelectorAll("header nav a").forEach(a => {
    if (a.getAttribute("data-nav") !== "projects" && a.textContent.trim() !== T.projects) return;
    a.href = "hero.html#projects";
    const wrap = document.createElement("span"); wrap.className = "nav-projects";
    a.replaceWith(wrap); wrap.appendChild(a);
    wrap.insertAdjacentHTML("beforeend", `<span class="legend" role="menu">${Object.entries(window.IKDU_CATS).map(([k, c]) =>
      `<a role="menuitem" href="hero.html#cat-${k}"><span class="chip"><img src="${c.icon}" alt=""></span><span>${c.label}</span></a>`).join("")}</span>`);
    // after picking a category the menu closes (it used to stay open while the mouse/focus was still on it); it can open again once the mouse leaves
    wrap.querySelector(".legend").addEventListener("click", e => { if (e.target.closest("a")) { wrap.classList.add("closed"); document.activeElement?.blur(); } });
    wrap.addEventListener("mouseleave", () => wrap.classList.remove("closed"));
  });
  // "Concept → Reality" tab (Amr, 2026-09-29): next to Projects in the header; highlighted on its own page
  document.querySelector("header nav:not(.right)")?.insertAdjacentHTML("beforeend",
    `<a class="nav-cr${file === "transformation.html" ? " on" : ""}" href="transformation.html">${T.cr}</a>`);
  document.querySelectorAll("[data-wa]").forEach(a => a.href = waLink);

  // Floating button
  document.body.insertAdjacentHTML("beforeend",
    `<a class="wa-float" href="${waLink}" aria-label="${T.waFloatLabel}">${WA_ICON}<span>${T.waFloat}</span></a>`);

  // Phone menu ("is-open", not "open": the About page already uses .open for its opening photo)
  const header = document.querySelector("header");
  if (header) {
    header.querySelector(".menu-btn")?.remove();
    header.insertAdjacentHTML("beforeend", `<button class="menu-btn" aria-label="${T.menu}">${T.menu}</button>`);
    // Editorial list (Amr, option A, 2026-09-29): header-like top bar (emblem centred, Close where MENU was), numbered links with
    // camel lines like "How we work", then language switch, WhatsApp and email at the bottom
    const links = [["hero.html", T.projects], ["transformation.html", T.cr], ["about.html", T.about], ["connect.html", T.connect]];
    document.body.insertAdjacentHTML("beforeend", `<nav class="menu-overlay" aria-label="${T.menu}">
      <div class="mo-top"><a class="mo-logo" href="hero.html"><img src="${A}/web/brand/emblem-brick.png" alt="${AR ? "إكدو" : "IKDU"}"></a><button class="close">${T.close}</button></div>
      <ol class="mo-links">${links.map(([h, t], n) => `<li><a href="${h}"${h === file ? ' class="on"' : ""}><span class="n">0${n + 1}</span>${t}</a></li>`).join("")}</ol>
      <div class="mo-foot">${twinLink}<a class="wa" href="${waLink}">${T.waUs}</a><a class="mail" href="mailto:hello@ikdu.build" dir="ltr">hello@ikdu.build</a></div></nav>`);
    const ov = document.querySelector(".menu-overlay");
    header.querySelector(".menu-btn").onclick = () => ov.classList.add("is-open");
    ov.querySelector(".close").onclick = () => ov.classList.remove("is-open");
  }

  // Footer. Social + email: text on laptops, icons on phones (Amr, 2026-09-29); plain line icons in the text colour
  const svg = d => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const SOCIAL = [
    ["https://www.instagram.com/ikdu.build/", T.ig, svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>')],
    ["https://www.linkedin.com/company/ikdu/", T.li, svg('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.3v.01M12 17v-6.5M12 13.2c0-1.6 1.1-2.7 2.5-2.7s2.5 1 2.5 2.7V17"/>')],
    ["https://www.facebook.com/ikdu.build/", T.fb, svg('<path d="M14.5 8H17V4.5h-2.5A4 4 0 0 0 10.5 8.5V11H8v3.5h2.5V21H14v-6.5h2.6l.4-3.5h-3V9a1 1 0 0 1 1-1z"/>')],
    ["mailto:hello@ikdu.build", "hello@ikdu.build", svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>'), true],
  ];
  document.body.insertAdjacentHTML("beforeend", `<footer class="site-footer">
    <img src="${A}/web/brand/bilingual-handdrawn.png" alt="IKDU إكدو">
    <div class="mid"><div class="links"><a href="hero.html">${T.projects}</a><a href="transformation.html">${T.cr}</a><a href="about.html">${T.about}</a><a href="connect.html">${T.connect}</a></div>
    <div class="social">${SOCIAL.map(([h, label, ico, ltr]) => `<a href="${h}" aria-label="${label}"${ltr ? ' dir="ltr"' : ""}>${ico}<span>${label}</span></a>`).join("")}</div></div>
    <small>${T.place}</small></footer>`);

})();
