// Home page script, shared by hero.html (English) and ar/hero.html (Arabic). Text comes from H below.
const H = window.IKDU_AR ? {
  info: { "polysh": ["Polysh", "صالون أظافر · أركان، الجيزة"], "s-roof": ["روف سوديك", "روف · سوديك كورتيارد، الجيزة"],
          "m-villa": ["M-Villa", "تشطيب داخلي لفيلا · ماونتن فيو، التجمع، القاهرة"], "twin-villas": ["الفيلتين التوأم", "فيلتين · تشطيب كامل · ليجندا، الجيزة"], "sane": ["Sane", "مساحة فنية للأطفال · مصياف وألماظة، الساحل الشمالي"] },
  by: " من إكدو", jump: "روح لقسم", all: "كل المشاريع", jumpNav: "أقسام المشاريع", count: n => n === 1 ? "مشروع واحد" : `${n} مشاريع`,
  view: "شوف المشروع &larr;", tagline: "مقاولات وتشطيبات في مصر كلها… من على المحارة لحد ما تستلم مكانك جاهز."
} : {
  info: { "polysh": ["Polysh", "Nail salon · Arkan, Giza"], "s-roof": ["Sodic Rooftop", "Rooftop · Sodic Courtyard, Giza"],
          "m-villa": ["M-Villa", "Villa interior · Mountain View, Tagamoa, Cairo"], "twin-villas": ["Twin Villas", "Twin villas · full finishing · Legenda, Giza"], "sane": ["Sane", "Kids' art space · Masyaf & Almaza, North Coast"] },
  by: " by IKDU", jump: "go to", all: "All projects", jumpNav: "Project categories", count: n => n === 1 ? "1 project" : `${n} projects`,
  view: "View project &rarr;", tagline: "Contracting &amp; fit-out across Egypt — from bare concrete to finished space."
};
  // If photos were chosen in picker.html, rebuild the project sections from those picks
  (() => {
    // Picks come from the saved snapshot (data.js, written by the picker via serve.py), so every browser shows the same.
    let picks = window.IKDU_PICKS;
    if (!picks) return;
    const INFO = H.info;
    const main = document.querySelector("main"); main.innerHTML = "";
    // Default: Amr's own sequence (from the picker), no headlines.
    // After someone picks a category, the same sections are regrouped under headlines (Villas, Commercial, Apartments).
    const GROUPS = ["villa", "commercial", "apartments"];
    const shown = picks.order.filter(p => picks.home[p]?.length);
    const ordered = GROUPS.flatMap(g => shown.filter(p => window.IKDU_PROJECT_CAT[p] === g)).concat(shown.filter(p => !GROUPS.includes(window.IKDU_PROJECT_CAT[p])));
    window.IKDU_ORDER = { seq: shown, grouped: ordered, groups: GROUPS };
    shown.forEach((p, pi) => {
      const [name, sub] = INFO[p] || [p, ""];
      const cat = window.IKDU_PROJECT_CAT[p], c = window.IKDU_CATS[cat];
      main.insertAdjacentHTML("beforeend", `<section class="project" id="${p}" data-cat="${cat || ""}">
        ${picks.home[p].map((f, fi) => `<div class="slide">${ikduPic(p + "/" + f, { alt: ikduAlt(p + "/" + f, name + H.by), eager: pi === 0 && fi === 0 })}</div>`).join("")}
        <div class="caption"><div class="name">${c ? `<a class="cat" href="#cat-${cat}" title="${c.label}"><span class="chip"><img src="${c.icon}" alt="${c.label} — ${H.jump}"></span></a>` : ""}<h2>${name}</h2></div><p>${sub}</p><a href="${p}.html">${H.view}</a></div><div class="dots" aria-hidden="true"></div></section>`);
    });
    main.querySelector(".project")?.insertAdjacentHTML("beforeend", `<p class="tagline">${H.tagline}</p>`);
    // Category chips (touch devices always; desktop once a category is picked). "All projects" goes back to the sequence.
    main.insertAdjacentHTML("afterbegin", `<nav class="filters" aria-label="${H.jumpNav}"><a href="hero.html" data-all class="all">${H.all}</a>${
      GROUPS.filter(k => window.IKDU_CATS[k] && shown.some(p => window.IKDU_PROJECT_CAT[p] === k)).map(k => { const c = window.IKDU_CATS[k];
        return `<a href="#cat-${k}" data-cat="${k}"><span class="chip"><img src="${c.icon}" alt=""></span>${c.label}</a>`; }).join("")}</nav>`);
  })();

  // Set zoom per photo based on how much of it the frame already cuts off.
  // Photos listed here always fill the frame (cropped, never blurred sides) — e.g. close-ups.
  const ALWAYS_FILL = ["m-villa/DSC09755-1.jpg"];
  // Which part of a photo to keep when it's cropped: "left-right% top-bottom%" (50% 50% = centre)
  const FOCUS = { "twin-villas/DSC01968.jpg": "74% 50%", "m-villa/DSC09366.jpg": "22% 50%" };   // m-villa: keep the staircase in the phone crop
  // Zoom out that ENDS on a chosen frame: show the photo from `from` to `to` (0 = left edge, 1 = right edge).
  // Twin Villas garden: ends with the building's left end just visible and the palm tree in the middle.
  const END_FRAME = { "twin-villas/DSC02021.jpg": { from: .10, to: .78 } };
  // Photos always shown whole (nothing cropped); leftover space gets a blurred copy of the photo
  const ALWAYS_WHOLE = [];

  function endFrame(s, img, span) {
    const F = s.clientWidth, H = s.clientHeight, photo = img.naturalWidth / img.naturalHeight;
    const Wr = Math.max(F, H * photo);                        // width of the photo as drawn
    const w = span.to - span.from, uc = span.from + w / 2;    // wanted width + centre (0..1)
    // Draw the whole photo (centred, covering the frame) so moving it never shows an empty edge
    Object.assign(img.style, { width: Wr + 'px', height: Wr / photo + 'px', left: (F - Wr) / 2 + 'px', top: (H - Wr / photo) / 2 + 'px', right: 'auto', bottom: 'auto' });
    const clampT = (t, sc) => Math.min(sc * Wr / 2 - F / 2, Math.max(F / 2 - sc * Wr / 2, t));
    const s1 = Math.max(1, F / (w * Wr)), s0 = s1 * 1.08;
    s.style.setProperty('--s1', s1); s.style.setProperty('--t1', clampT(-s1 * (uc - .5) * Wr, s1) + 'px');
    s.style.setProperty('--s0', s0); s.style.setProperty('--t0', clampT(-s0 * (uc - .5) * Wr, s0) + 'px');
  }
  function fitSlides() {
    document.querySelectorAll('.slide').forEach(s => {
      let img = s.querySelector('img.main');
      if (!img) { img = s.querySelector('img'); img.classList.add('main');
        (img.closest('picture') || img).insertAdjacentHTML('beforebegin', `<img class="bg" src="${img.dataset.pic ? ikduThumb(img.dataset.pic) : img.src}" alt="" loading="lazy">`); }
      const pic = img.dataset.pic || img.src;
      const set = () => {
        if (!img.naturalWidth) return;
        const frame = s.clientWidth / s.clientHeight, photo = img.naturalWidth / img.naturalHeight;
        const crop = Math.max(frame / photo, photo / frame);  // 1 = perfect fit, 2 = half the photo hidden
        const fill = ALWAYS_FILL.some(p => pic.endsWith(p));
        const focus = Object.keys(FOCUS).find(p => pic.endsWith(p));
        img.style.objectPosition = focus ? FOCUS[focus] : '';
        const ef = Object.keys(END_FRAME).find(p => pic.endsWith(p));
        s.classList.toggle('custom', !!ef);
        if (ef) { s.classList.remove('fit'); endFrame(s, img, END_FRAME[ef]); return; }
        const whole = ALWAYS_WHOLE.some(p => pic.endsWith(p));
        const phone = innerWidth <= 760;  // on phones photos fill the screen (cropped) instead of blurred bands
        s.classList.toggle('fit', (crop > 1.7 && !fill && !phone) || whole);
        const zoom = crop > 1.35 ? .03 : crop > 1.15 ? .05 : .08;
        s.style.setProperty('--zoom', zoom);
        s.style.setProperty('--pan', crop > 1.15 ? '0%' : '1.2%');
      };
      img.complete ? set() : img.addEventListener('load', set, { once: true });
    });
  }
  fitSlides();
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fitSlides, 200); });

  // Each project section cycles its own photos while it is on screen
  document.querySelectorAll('.project').forEach(sec => {
    const slides = [...sec.querySelectorAll('.slide')], bar = sec.querySelector('.dots');
    // Timing (Amr, 2026-09-27): the FIRST switch comes after 1.5 s (to hook people scrolling), then every 2 s.
    // Starts again from 1.5 s each time the project comes back into view. The current photo's line fills over the same time.
    const FIRST_MS = 1500, NEXT_MS = 2000;
    // One small line per photo (shows how many photos there are); the current one fills up. Back by Amr's request 2026-09-27, a bit bigger.
    bar.innerHTML = slides.map(() => "<span></span>").join("");
    const dots = [...bar.children];
    let i = -1, timer = null;
    const restartBar = ms => { bar.style.setProperty('--dur', ms + 'ms'); dots.forEach((d, n) => d.classList.toggle('on', n === i)); bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run'); };
    const show = ms => {
      i = (i + 1) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('on', n === i));
      restartBar(ms);
    };
    const next = ms => { timer = setTimeout(() => { show(NEXT_MS); next(NEXT_MS); }, ms); };   // chain: each photo waits its own time
    show(FIRST_MS);
    if (slides.length < 2) bar.hidden = true;
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer && slides.length > 1) { restartBar(FIRST_MS); next(FIRST_MS); }
      if (!e.isIntersecting && timer) { clearTimeout(timer); timer = null; bar.classList.remove('run'); }
    }, { threshold: .5 }).observe(sec);
  });

  const hdr = document.getElementById('hdr');

  // Category pick: regroup the SAME sections (their loops keep running), picked category first, the others under it; the page goes to the top.
  // Compact view (Amr, 2026-09-27): small header (emblem) + the chip row only, no big category headlines. The chip of the category
  // you're looking at is highlighted (sage) and follows you as you scroll.
  // "All projects" (or the logo) puts Amr's sequence back. Old links with ?cat=villa or #cat-villa open the grouped view.
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mainEl = document.querySelector("main"), O = window.IKDU_ORDER || { seq: [], grouped: [], groups: [] };
  function layout(grouped, pick) {   // pick = the picked category: its group goes on top, the others follow
    document.body.classList.toggle("grouped", grouped);
    const groups = pick ? [pick, ...O.groups.filter(g => g !== pick)] : O.groups;
    const list = grouped ? groups.flatMap(g => O.seq.filter(p => window.IKDU_PROJECT_CAT[p] === g)).concat(O.seq.filter(p => !O.groups.includes(window.IKDU_PROJECT_CAT[p]))) : O.seq;
    list.forEach(p => {
      const sec = document.getElementById(p); if (!sec) return;
      mainEl.appendChild(sec);
    });
    const first = mainEl.querySelector(".project"), tag = document.querySelector(".tagline");   // tagline stays on the first project
    if (first && tag && tag.parentElement !== first) first.appendChild(tag);
    document.querySelectorAll(".filters a[data-cat]").forEach(a => a.classList.remove("on"));
    hdr.classList.toggle('small', grouped || scrollY > 60);
  }
  // highlight the chip of the category currently under the chip row
  const filtersEl = document.querySelector(".filters");
  function spy() {
    if (!document.body.classList.contains("grouped")) return;
    const y = filtersEl.getBoundingClientRect().bottom + 40;
    const sec = [...mainEl.querySelectorAll(".project")].find(s => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
    const cat = sec && window.IKDU_PROJECT_CAT[sec.id];
    if (cat) mark(cat);
  }
  // mark a chip and, on phones (chip row scrolls sideways), slide the row so the highlighted chip is fully visible
  let marked = null;
  function mark(cat) {
    document.querySelectorAll(".filters a[data-cat]").forEach(a => a.classList.toggle("on", a.dataset.cat === cat));
    if (cat === marked) return; marked = cat;
    const a = filtersEl.querySelector(`a[data-cat="${cat}"]`), max = filtersEl.scrollWidth - filtersEl.clientWidth;
    if (!a || max <= 0) return;
    const left = Math.min(max, Math.max(0, a.offsetLeft - (filtersEl.clientWidth - a.offsetWidth) / 2));
    filtersEl.scrollTo({ left: document.dir === "rtl" ? left - max : left, behavior: reduceMotion ? "auto" : "smooth" });
  }
  function goToCat(cat, smooth) {
    layout(true, cat);   // picked category first, the other categories under it
    marked = null; mark(cat);
    scrollTo({ top: 0, behavior: smooth && !reduceMotion ? "smooth" : "auto" });   // picked category is now first: show it from the top, chips above it
    history.replaceState(null, "", location.pathname + "#cat-" + cat);
  }
  function showAll() {
    layout(false);
    history.replaceState(null, "", location.pathname);
    scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }
  document.addEventListener("click", e => {
    if (e.target.closest(".filters a[data-all]")) { e.preventDefault(); showAll(); return; }
    const a = e.target.closest('.caption .cat, .filters a, a[href*="#cat-"]');
    if (!a) return;
    const m = a.getAttribute("href").match(/#cat-([a-z-]+)/);
    if (!m || !O.groups.includes(m[1])) return;   // not a category link: let it navigate
    e.preventDefault(); e.stopPropagation();       // icon click regroups + jumps; it never opens the project
    goToCat(m[1], true);
  });
  const startCat = new URLSearchParams(location.search).get("cat") || (location.hash.match(/^#cat-([a-z-]+)/) || [])[1];
  if (startCat) setTimeout(() => goToCat(startCat, false), 200);
  addEventListener('scroll', () => { hdr.classList.toggle('small', scrollY > 60 || document.body.classList.contains("grouped")); spy(); }, { passive: true });
  const h = location.hash.slice(1); if (h && !h.startsWith('cat-')) setTimeout(() => { document.getElementById(h)?.scrollIntoView(); hdr.classList.toggle('small', scrollY > 60); }, 300);
  // Screenshot helper: ?shot=<section id> hides everything above that section (no scrolling needed)
  const shot = new URLSearchParams(location.search).get("shot");
  if (shot) { const t = document.getElementById(shot); let el = t;
    while (el && el.parentElement !== document.body) el = el.parentElement;
    for (let x = el?.previousElementSibling; x; x = x.previousElementSibling) if (x.tagName !== "HEADER" && x.tagName !== "SCRIPT") x.style.display = "none";
    for (let x = t?.previousElementSibling; x && t.parentElement !== document.body; x = x.previousElementSibling) x.style.display = "none";
    if (el && el.tagName !== "MAIN") el.style.marginTop = "64px"; document.getElementById("hdr")?.classList.add("small");
    document.querySelectorAll(".gallery figure").forEach(f => f.classList.add("in")); }
