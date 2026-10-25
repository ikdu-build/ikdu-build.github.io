// Home page script, shared by hero.html (English) and ar/hero.html (Arabic). Text comes from H below.
const H = window.IKDU_AR ? {
  info: { "polysh": ["Polysh", "سبا أظافر · تشطيب وتجهيز كامل · أركان، الجيزة"], "s-roof": ["S-Roof", "سطح · تصميم وتنفيذ · سوديك كورتيارد، الجيزة"],
          "m-villa": ["M-Villa", "فيلا · تصميم وتنفيذ · ماونتن فيو، القاهرة"], "l-villa": ["L-Villa", "فيلا · تصميم وتنفيذ · ليجندا، الجيزة"], "l-villa-2": ["L-Villa II", "فيلا · تصميم وتنفيذ · ليجندا، الجيزة"], "sane": ["Sane", "مساحة فنية للأطفال · مصياف وألماظة، الساحل الشمالي"] },
  by: " من إكدو", jump: "روح لقسم", all: "جميع المشاريع", jumpNav: "فئات المشاريع", count: n => n === 1 ? "مشروع واحد" : `${n} مشاريع`,
  nextQ: "مشروعك التالي؟", talk: "تحدّث معنا &larr;", ours: "مشاريعنا", oursSub: "اضغط على أي مشروع لمشاهدته.", what: "ما نقدّمه", svc: [["تصميم وتنفيذ", "services"], ["أنت تصمّم، ونحن ننفّذ", "services"], ["أثاث", "services"]], more: "من نحن وخدماتنا &larr;", down: "مشاريعنا",
  view: "شاهد المشروع &larr;", cr: { h: "من التصميم إلى التنفيذ", p: "تصميماتنا الثلاثية الأبعاد بجانب الأماكن التي سلّمناها.", btn: "شاهدها جنبًا إلى جنب &larr;", r: "تصميم ثلاثي الأبعاد", d: "تم التنفيذ" }, tagline: "مقاولات وتشطيبات في مناطق مختلفة من مصر، من الأرض حتى تسليم المكان جاهزًا."
} : {
  info: { "polysh": ["Polysh", "Nail spa · Full fit-out · Arkan, Giza"], "s-roof": ["S-Roof", "Rooftop · Design + build · Sodic Courtyard, Giza"],
          "m-villa": ["M-Villa", "Villa · Design + build · Mountain View, Cairo"], "l-villa": ["L-Villa", "Villa · Design + build · Legenda, Giza"], "l-villa-2": ["L-Villa II", "Villa · Design + build · Legenda, Giza"], "sane": ["Sane", "Kids' art space · Masyaf & Almaza, North Coast"] },
  by: " by IKDU", jump: "go to", all: "All projects", jumpNav: "Project categories", count: n => n === 1 ? "1 project" : `${n} projects`,
  nextQ: "Your project next?", talk: "Talk to us &rarr;", ours: "Our projects", oursSub: "Tap any project to see it.", what: "What we do", svc: [["Design + Build", "services"], ["You design, we build", "services"], ["Furniture", "services"]], more: "About &amp; Services &rarr;", down: "Our projects",
  view: "View project &rarr;", cr: { h: "From 3D concept to reality", p: "Our 3D designs next to the finished spaces we delivered.", btn: "See them side by side &rarr;", r: "3D concept", d: "Delivered" }, tagline: "Contracting & fit-out across Egypt, from the ground up to finished space."
};
  // Home layout (Amr, 2026-10-19, option A): visitors got stuck on the full-screen first project, "Projects" showed the same
  // page again and most missed Concept -> Reality. Now: 1) a shorter opening slideshow cycling through every project (caption +
  // "View project" follow the photo; the next section peeks in), 2) "Our projects" card grid with category filters (the target of
  // the Projects menu item), 3) Concept -> Reality, 4) "What we do" (the intro text + links to the services), 5) contact.
  (() => {
    const picks = window.IKDU_PICKS;
    if (!picks) return;
    const INFO = H.info;
    const main = document.querySelector("main"); main.innerHTML = "";
    const GROUPS = ["commercial", "villa", "apartments"];   // commercial first: IKDU's main target (Amr, 2026-09-29)
    const shown = picks.order.filter(p => picks.home[p]?.length);
    window.IKDU_ORDER = { seq: shown, groups: GROUPS };
    // 1) opening slideshow: the first picked photo of each project, newest first
    main.insertAdjacentHTML("beforeend", `<section class="project showreel" id="top">
      <a class="hit" href="${shown[0]}.html" tabindex="-1" aria-hidden="true"></a>
      ${shown.map((p, pi) => `<div class="slide" data-p="${p}">${ikduPic(p + "/" + picks.home[p][0], { alt: ikduAlt(p + "/" + picks.home[p][0], (INFO[p] || [p])[0] + H.by), eager: pi === 0 })}</div>`).join("")}
      <div class="caption"><div class="name"><a class="cat" href="#projects"><span class="chip"><img src="" alt=""></span></a><h2></h2></div><p></p><a class="view" href="#">${H.view}</a></div>
      <div class="dots" aria-hidden="true"></div>
      <p class="tagline">${H.tagline}</p>
      <a class="down" href="#projects" aria-label="${H.down}"><span></span></a></section>`);
    main.querySelectorAll(".showreel img").forEach(im => { if (im.loading === "lazy") im.loading = "eager"; });   // first screen: all six photos start downloading now (small, ~90 KB each)
    // 2) project cards (second picked photo, so the grid doesn't repeat the slideshow)
    const CARD = { "sane": "new.jpg" };   // card photo overrides: Sane = shelving wall, no children's faces
    main.insertAdjacentHTML("beforeend", `<section class="pgrid" id="projects">
      <div class="pg-head"><h2>${H.ours}</h2><p>${H.oursSub}</p></div>
      <nav class="filters" aria-label="${H.jumpNav}"><a href="#projects" data-all class="all on">${H.all}</a>${
        GROUPS.filter(k => window.IKDU_CATS[k] && shown.some(p => window.IKDU_PROJECT_CAT[p] === k)).map(k => { const c = window.IKDU_CATS[k];
          return `<a href="#cat-${k}" data-cat="${k}"><span class="chip"><img src="${c.icon}" alt=""></span>${c.label}</a>`; }).join("")}</nav>
      <div class="cards">${shown.map(p => { const [name, sub] = INFO[p] || [p, ""], cat = window.IKDU_PROJECT_CAT[p], c = window.IKDU_CATS[cat], f = CARD[p] || picks.home[p][1] || picks.home[p][0];
        return `<a class="pcard" href="${p}.html" data-cat="${cat || ""}"><span class="pc-img">${ikduPic(p + "/" + f, { alt: ikduAlt(p + "/" + f, name + H.by), sizes: "(max-width:760px) 50vw, 33vw" })}${c ? `<span class="chip"><img src="${c.icon}" alt="${c.label}"></span>` : ""}</span><h3>${name}</h3><span class="pc-sub">${sub}</span></a>`; }).join("")}<a class="pcard pcta" href="connect.html" data-cat="cta"><span class="pc-img pc-cta"><span><b>${H.nextQ}</b><em>${H.talk}</em></span></span></a></div></section>`);   // fills the empty grid space (Amr, 2026-10-25); hidden when a filter is on
    // 3) Concept -> Reality
    main.insertAdjacentHTML("beforeend", `<section class="cr-teaser" id="cr-teaser"><a href="transformation.html" class="crt-pair">
        <span class="crt-img">${ikduPic("polysh/render-p08.jpg", { alt: H.cr.r, sizes: "(max-width:760px) 50vw, 40vw" })}<em>${H.cr.r}</em></span>
        <span class="crt-img">${ikduPic("polysh/DSC02600.jpg", { alt: H.cr.d, sizes: "(max-width:760px) 50vw, 40vw" })}<em>${H.cr.d}</em></span></a>
      <div class="crt-text"><h2>${H.cr.h}</h2><p>${H.cr.p}</p><a class="crt-btn" href="transformation.html">${H.cr.btn}</a></div></section>`);
    // 4) "What we do": the existing intro text gets a heading and the three services
    const intro = document.querySelector(".intro");
    if (intro) {
      intro.querySelectorAll(".what, .svc-links, .more").forEach(e => e.remove());   // pre-rendered copies
      intro.insertAdjacentHTML("afterbegin", `<p class="what label">${H.what}</p>`);
      intro.insertAdjacentHTML("beforeend", `<div class="svc-links">${H.svc.map(([t, a]) => `<a href="about.html#${a}">${t}</a>`).join("")}</div><a class="more" href="about.html">${H.more}</a>`);
    }
  })();

  // Set zoom per photo based on how much of it the frame already cuts off.
  // Photos listed here always fill the frame (cropped, never blurred sides) — e.g. close-ups.
  const ALWAYS_FILL = ["m-villa/DSC09755-1.jpg"];
  // Which part of a photo to keep when it's cropped: "left-right% top-bottom%" (50% 50% = centre)
  const FOCUS = { "l-villa/DSC01968.jpg": "74% 50%", "m-villa/DSC09366.jpg": "22% 50%" };   // m-villa: keep the staircase in the phone crop
  // Zoom out that ENDS on a chosen frame: show the photo from `from` to `to` (0 = left edge, 1 = right edge).
  // L-Villa garden: ends with the building's left end just visible and the palm tree in the middle.
  const END_FRAME = { "l-villa/DSC02021.jpg": { from: .10, to: .78 } };
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
        // on phones AND upright tablets (frame taller than wide) photos fill the screen (cropped) instead of sitting small on a
        // blurred copy: on an upright iPad the blur filled most of the screen and looked like a photo that never finished loading (2026-09-30)
        const phone = innerWidth <= 760 || frame < 1;
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
    // Slowed down (Amr, 2026-09-29): first switch after 2 s, then every 3 s.
    const FIRST_MS = 2000, NEXT_MS = 3000;
    // iPad fix (2026-09-29): photos start downloading one screen BEFORE the project comes into view, and the loop never
    // switches to a photo that hasn't arrived yet (it used to switch to a blank / half-loaded photo on slow connections).
    const imgs = slides.map(s => s.querySelector("picture img, img:not(.bg)"));
    const warm = () => imgs.forEach(im => { if (im && im.loading === "lazy") im.loading = "eager"; });
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { warm(); o.disconnect(); } }, { rootMargin: "100% 0px" }).observe(sec);
    const ready = n => { const im = imgs[n]; return !im || (im.complete && im.naturalWidth > 0); };
    // One small line per photo (shows how many photos there are); the current one fills up. Back by Amr's request 2026-09-27, a bit bigger.
    bar.innerHTML = slides.map(() => "<span></span>").join("");
    const dots = [...bar.children];
    let i = -1, timer = null;
    const restartBar = ms => { bar.style.setProperty('--dur', ms + 'ms'); dots.forEach((d, n) => d.classList.toggle('on', n === i)); bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run'); };
    const cap = sec.classList.contains("showreel") && sec.querySelector(".caption"), hit = sec.querySelector(".hit");
    const sync = () => {                               // showreel: caption, category icon and links follow the current project
      if (!cap) return;
      const p = slides[i].dataset.p, [name, sub] = H.info[p] || [p, ""], c = window.IKDU_CATS[window.IKDU_PROJECT_CAT[p]];
      cap.querySelector("h2").textContent = name; cap.querySelector("p").textContent = sub;
      cap.querySelector(".view").href = hit.href = p + ".html"; hit.setAttribute("aria-label", name);
      const ic = cap.querySelector(".cat img"); if (c) { ic.src = c.icon; ic.alt = c.label; cap.querySelector(".cat").hidden = false; } else cap.querySelector(".cat").hidden = true;
    };
    const show = ms => {
      i = (i + 1) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('on', n === i));
      sync(); restartBar(ms);
    };
    const next = ms => { timer = setTimeout(function tick() {                                  // chain: each photo waits its own time
      if (!ready((i + 1) % slides.length)) { timer = setTimeout(tick, 250); return; }         // next photo not loaded yet: keep this one a bit longer
      show(NEXT_MS); next(NEXT_MS);
    }, ms); };
    show(FIRST_MS);
    if (slides.length < 2) bar.hidden = true;
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer && slides.length > 1) { restartBar(FIRST_MS); next(FIRST_MS); }
      if (!e.isIntersecting && timer) { clearTimeout(timer); timer = null; bar.classList.remove('run'); }
    }, { threshold: .5 }).observe(sec);
  });

  const hdr = document.getElementById('hdr');
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Category filters on the project grid (also opened by #cat-villa links from the menu / About page)
  const grid = document.getElementById("projects");
  function filter(cat, scroll) {
    document.querySelectorAll(".pcard").forEach(c => c.hidden = !!cat && c.dataset.cat !== cat);
    document.querySelectorAll(".filters a").forEach(a => a.classList.toggle("on", cat ? a.dataset.cat === cat : a.hasAttribute("data-all")));
    history.replaceState(null, "", location.pathname + (cat ? "#cat-" + cat : ""));
    if (scroll && grid) grid.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }
  document.addEventListener("click", e => {
    const a = e.target.closest('.filters a, a[href*="#cat-"]');
    if (!a) return;
    if (a.hasAttribute("data-all")) { e.preventDefault(); filter(null, false); return; }
    const m = a.getAttribute("href").match(/#cat-([a-z-]+)/);
    if (!m) return;
    e.preventDefault(); filter(m[1], !a.closest(".filters"));
  });
  const startCat = new URLSearchParams(location.search).get("cat") || (location.hash.match(/^#cat-([a-z-]+)/) || [])[1];
  if (startCat) setTimeout(() => filter(startCat, true), 200);
  addEventListener('scroll', () => hdr.classList.toggle('small', scrollY > 60), { passive: true });
  const h = location.hash.slice(1); if (h && !h.startsWith('cat-')) setTimeout(() => { document.getElementById(h)?.scrollIntoView(); hdr.classList.toggle('small', scrollY > 60); }, 300);
