// Shared script for the 5 project pages. The project comes from <body data-project="…">.
  // Project info. [Brackets] = still to confirm with Amr.
  const PROJECTS = {
    "polysh":  { name:"Polysh", sub:"Nail salon · Arkan, Giza",
                 facts:{ Location:"Arkan, Giza", Type:"Commercial · Salon", Scope:"Full fit-out + furniture", Year:"2025" },
                 intro:"Built from bare concrete to opening day, and everything inside except the chairs: the terracotta walls and arched niches, the vaulted massage room, the chain curtains, the sphere, the custom light fixtures, the reception desk and every manicure table.",
                 // gallery in this exact order (Amr, 2026-09-28): lounge, [massage room alcove | vault | vault in the mirror] full width (storefront is now the "after" of the shopfront sequence) (IMG_1862 removed)
                 gallery:["DSC02645.jpg", "DSC02619.jpg", "DSC02600.jpg", ["20260510_215911-alcove.jpg", "20260510_215836.jpg", "20260510_215941.jpg"]] },
    "s-roof":  { name:"Sodic Rooftop", sub:"Rooftop · Sodic Courtyard, Giza",
                 facts:{ Location:"Sodic Courtyard, Giza", Type:"Residential · Rooftop", Scope:"Design + build", Year:"2026" },
                 intro:"Taken from bare concrete to a finished outdoor living room: a pitch pine pergola, and a couch, bar, counter, built-in sink and rotating table, all in terrazzo poured on site.",
                 ba:[["IMG-20251218-WA0024.jpg","IMG-20251230-WA0007.jpg","IMG_1016.jpg"]],
                 detail:[["DSC09938.jpg","DSC09947.jpg","Rotating table · tucks into the counter"]],
                 // gallery in this exact order (Amr, 2026-09-28): the whole-roof overview first, then the close-ups
                 gallery:["DSC09787.jpg", "DSC00057.jpg", "DSC09885.jpg", "DSC00011.jpg"] },
    "m-villa": { name:"M-Villa", sub:"Villa interior · Mountain View, Tagamoa, Cairo", cover:"DSC09366.jpg",   // cover (Amr, 2026-09-28): the old first photo is also the "after" in before/after
                 facts:{ Location:"Mountain View, Tagamoa, Cairo", Type:"Residential · Villa", Scope:"Design + build", Year:"2026" },
                 intro:"A raw concrete shell turned into a warm, calm home, designed and built by us. Open-book Italian marble runs across the floors, and the centrepiece is the staircase: marble treads, a full-height timber slat screen and hidden step lighting.",
                 ba:[["20230917_135241.jpg","DSC09375.jpg"]],
                 detail:[["DSC09518.jpg","DSC09527.jpg","Hidden door · flush with the timber slat wall"],
                         ["DSC09530-HDR-2.jpg","DSC09538-HDR-1.jpg","Hidden bathroom storage · behind the mirror"]],
                 // gallery in this exact order (Amr, 2026-09-28): tall photos pair up two by two
                 gallery:["DSC09599.jpg", "DSC09722.jpg", "DSC09712.jpg", "DSC09737.jpg", "DSC09755-1.jpg", "DSC09717.jpg", "DSC09617.jpg"] },
    "twin-villas":    { name:"Twin Villas", sub:"Twin villas · full finishing · Legenda, Giza",
                 facts:{ Location:"Legenda, Giza", Type:"Residential · Twin villas", Scope:"Full finishing, inside + out", Year:"2023 (first villa) · 2024 (twin)" },
                 intro:"Full finishing of twin family villas in Legenda (the first shown here, the twin coming soon): herringbone parquet, a classic timber kitchen, a walk-in dressing room, stone bathrooms and a new stone entrance.",
                 ba:[["20230329_110331.jpg","DSC01968.jpg"]] },
    "sane":    { name:"Sane", sub:"Kids' art space · Masyaf & Almaza, North Coast", cover:"8379CE78-E7CE-4747-A89E-ADBB7ABB8C41_1_201_a.jpg",
                 facts:{ Location:"Masyaf & Almaza, North Coast", Type:"Education · Kids' space", Scope:"Landscape · Interiors · Furniture", Year:"2025" },
                 intro:"A garden classroom for a kids' art space: a circular path poured on site, turf, timber fencing and custom children's furniture.",
                 ba:[["20250712_013724.jpg","20250712_200146.jpg","C361BE98-8ECD-4E9E-B90A-B857DB3771C2_1_201_a.jpg"]],
                 // gallery in this exact order (Amr, 2026-09-28): [new-4 tall | new-5 wide] side by side at the end
                 gallery:["20250823-DSC04416-Edit.jpg", "new-2.jpg", "new.jpg", ["new-4.jpg", "new-5.jpg"]] }
  };

  const key = document.body.dataset.project;   // each project page says which project it is: <body data-project="twin-villas">

  // Arabic text for ar/<project>.html (DRAFT for Amr's approval, Egyptian register, written in Arabic).
  // Photos, before/after and details still come from PROJECTS above; only the words change.
  const PROJECTS_AR = {
    "polysh":      { name:"Polysh", sub:"صالون أظافر · أركان، الجيزة",
                     facts:{ "المكان":"أركان، الجيزة", "النوع":"تجاري · صالون", "الشغل":"تشطيب وتجهيز كامل + الفرش", "السنة":"2025" },
                     intro:"اتبنى من الخرسانة لحد يوم الافتتاح، وكل حاجة جوه ما عدا الكراسي: حيطان التيراكوتا والنيشات المقوّسة، أوضة المساج المقبّبة، ستاير السلاسل، المجسّم الكروي، وحدات الإضاءة المعمولة مخصوص، مكتب الاستقبال، وكل ترابيزات المانيكير." },
    "s-roof":      { name:"روف سوديك", sub:"روف · سوديك كورتيارد، الجيزة",
                     facts:{ "المكان":"سوديك كورتيارد، الجيزة", "النوع":"سكني · روف", "الشغل":"تصميم وتنفيذ", "السنة":"2026" },
                     intro:"من الخرسانة لحد قعدة برّه كاملة: برجولة خشب بيتش باين، وكنبة وبار وكاونتر وحوض بيلت إن وترابيزة دوّارة، كلهم تيرازو اتصبّ في الموقع." },
    "m-villa":     { name:"M-Villa", sub:"تشطيب داخلي لفيلا · ماونتن فيو، التجمع، القاهرة",
                     facts:{ "المكان":"ماونتن فيو، التجمع، القاهرة", "النوع":"سكني · فيلا", "الشغل":"تصميم وتنفيذ", "السنة":"2026" },
                     intro:"هيكل خرسانة اتحوّل لبيت دافي وهادي، من تصميمنا وتنفيذنا. أرضيات رخام إيطالي أوبن بوك، وقلب الفيلا هو السلم: درجات رخام، ساتر شرائح خشب بطول الدور، وإضاءة مخفية في الدرج." },
    "twin-villas": { name:"الفيلتين التوأم", sub:"فيلتين · تشطيب كامل · ليجندا، الجيزة",
                     facts:{ "المكان":"ليجندا، الجيزة", "النوع":"سكني · فيلتين توأم", "الشغل":"تشطيب كامل، جوّه وبرّه", "السنة":"2023 (الفيلا الأولى) · 2024 (التوأم)" },
                     intro:"تشطيب كامل لفيلتين عائليتين في ليجندا (الأولى هنا، والتانية قريب): باركيه هيرينجبون، مطبخ خشب كلاسيك، دريسنج روم، حمامات حجر، ومدخل حجر جديد." },
    "sane":        { name:"Sane", sub:"مساحة فنية للأطفال · مصياف وألماظة، الساحل الشمالي",
                     facts:{ "المكان":"مصياف وألماظة، الساحل الشمالي", "النوع":"تعليمي · مساحة للأطفال", "الشغل":"لاندسكيب · تشطيب داخلي · فرش", "السنة":"2025" },
                     intro:"فصل في الجنينة لمساحة فنية للأطفال: ممشى دائري اتصبّ في الموقع، نجيلة، سور خشب، وفرش أطفال معمول مخصوص." }
  };
  // Detail-slider captions in Arabic, by the first ("closed") photo
  const DETAIL_AR = { "DSC09938.jpg": "ترابيزة بتلف · بتتخبى جوّه كاونتر التيرازو", "DSC09530-HDR-2.jpg": "تخزين مخفي في الحمام · ورا المراية", "DSC09518.jpg": "باب مخفي · على نفس مستوى حيطة الشرائح الخشب" };
  const U = window.IKDU_AR
    ? { ba:"قبل / بعد", drag:"اسحب الخط وقارن.", story:"من أرض فاضية لمكان جاهز.", steps:["قبل", "أثناء الشغل", "بعد"],
        before:"قبل", after:"بعد", detail:"تفاصيل", dragMove:"اسحب الخط وشوفها بتتحرك.", by:" من إكدو", knob:"اسحب", slider:"مقارنة قبل وبعد" }
    : { ba:"Before / after", drag:"Drag the line to compare.", story:"From bare site to finished space.", steps:["Before", "Building", "After"],
        altSteps:["Before", "During", "After"], before:"Before", after:"After", detail:"In detail", dragMove:"Drag the line to see it move.", by:" by IKDU", knob:"Drag", slider:"Before and after comparison" };
  U.altSteps ??= U.steps;
  const P = window.IKDU_AR ? { ...PROJECTS[key], ...PROJECTS_AR[key] } : PROJECTS[key];
  const NAME = k => (window.IKDU_AR ? PROJECTS_AR[k] : PROJECTS[k]).name;
  // The saved snapshot (data.js, written by the picker via serve.py) wins, so every browser shows the same picks.
  // This browser's own picker copy (localStorage) is only a fallback. (2026-09-28: an old local copy was hiding new picks.)
  let picks = window.IKDU_PICKS;
  if (!picks) try { picks = JSON.parse(localStorage.getItem("ikdu-picks")); } catch {}
  const order = picks?.order || Object.keys(PROJECTS);

  // photos list via site.js's asset path, so it also works on /ar/ pages and on the live site
  fetch(window.IKDU_ASSETS + "/photos.json").then(r => r.json()).catch(() => window.IKDU_PHOTOS).then(all => {
    // Before/after: saved in the picker wins; otherwise use the defaults above
    // Sliders (2 photos) always come before 3-step stories; otherwise keep the saved order
    const comps = [...(picks?.ba?.[key]?.length ? picks.ba[key] : (P.ba || []))].sort((a, b) => a.length - b.length);
    // Photos: home-loop picks first, then project-page picks; if nothing picked yet, use everything
    const beforeFiles = comps.flatMap(c => c.slice(0, -1));
    let photos = picks ? [...(picks.home[key] || []), ...(picks.gallery[key] || [])] : [];
    if (!photos.length) photos = all[key].map(x => x.f);
    photos = photos.filter(f => !beforeFiles.includes(f));  // before/building shots live in the comparison, not the gallery

    document.title = `${P.name} | ${window.IKDU_AR ? "إكدو" : "IKDU"}`;
    // Cover: project setting if given, else the first photo. Gallery skips the cover and every photo already in a comparison.
    const cover = P.cover || photos[0];
    const details = picks?.detail?.[key]?.length ? picks.detail[key] : (P.detail || []);
    const compFiles = [...comps.flat(), ...details.flatMap(d => d.slice(0, 2))];
    const alt = f => ikduAlt(key + "/" + f, P.name + U.by);
    const pic = (f, o = {}) => ikduPic(key + "/" + f, { alt: alt(f), ...o });
    document.getElementById("coverImg").outerHTML = pic(cover, { id: "coverImg", eager: true });
    document.getElementById("name").textContent = P.name;
    document.getElementById("sub").textContent = P.sub;
    // Facts not filled in yet (written as "[...]") are left out, so no placeholders show
    const facts = Object.entries(P.facts).filter(([, v]) => v && !v.startsWith("["));
    const factsEl = document.getElementById("facts");
    factsEl.style.setProperty("--n", facts.length);
    factsEl.innerHTML = facts.map(([k, v]) => `<div><span class="label">${k}</span><b>${v}</b></div>`).join("");
    document.getElementById("intro").textContent = P.intro;

    if (comps.length) {
      const hasSlider = comps.some(c => c.length === 2);
      document.getElementById("ba").innerHTML = `<h2 class="serif">${U.ba}</h2><p>${hasSlider ? U.drag : U.story}</p>` +
        comps.map(c => c.length === 3
          ? `<div class="steps"><div class="frame">${c.map((f, i) => pic(f, { alt: `${U.altSteps[i]}: ${alt(f)}`, cls: i ? "" : "on", sizes: "(max-width:760px) 100vw, 1120px" })).join("")}<div class="dots" aria-hidden="true"><span></span><span></span><span></span></div></div>
              <div class="tabs">${U.steps.map((t, i) => `<button class="${i ? "" : "on"}">${t}</button>`).join("")}</div></div>`
          : `<div class="ba compare">${pic(c[1], { alt: `${U.after}: ${alt(c[1])}`, sizes: "(max-width:760px) 100vw, 1120px" })}${pic(c[0], { alt: `${U.before}: ${alt(c[0])}`, cls: "before", sizes: "(max-width:760px) 100vw, 1120px" })}
              <span class="line"></span><span class="knob" aria-hidden="true">${U.knob}</span><span class="tag b label">${U.before}</span><span class="tag a label">${U.after}</span></div>`).join("");

      document.querySelectorAll(".steps").forEach(el => {
        const imgs = el.querySelectorAll("img"), tabs = el.querySelectorAll("button"), dots = el.querySelectorAll(".dots span");
        // a very wide finished (last) photo widens the frame, so shots like the Polysh shopfront aren't cut at the sides
        const last = imgs[imgs.length - 1], frame = el.querySelector(".frame");
        const shapeFrame = () => { const r = last.naturalWidth / last.naturalHeight; if (r > 1.5) frame.style.aspectRatio = r; };   // only wider than the usual 3:2
        last.complete ? shapeFrame() : last.addEventListener("load", shapeFrame, { once: true });
        let i = 0, timer = null;
        const go = n => {
          i = n % 3;
          imgs.forEach((im, k) => im.classList.toggle("on", k === i));
          tabs.forEach((t, k) => t.classList.toggle("on", k === i));
          // timer like the home page: one small white line per photo on the picture, the current one fills
          dots.forEach((d, k) => { d.classList.remove("on"); if (k === i) { void d.offsetWidth; d.classList.add("on"); } });
        };
        const STEP_MS = 2500;   // 2.5 s per photo (was 3.5 s, Amr: "very slow"); the current line fills over the same time
        const play = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), STEP_MS); };
        tabs.forEach((t, k) => t.onclick = () => { go(k); play(); });
        new IntersectionObserver(([e]) => { if (e.isIntersecting) { go(0); play(); } else clearInterval(timer); }, { threshold: .5 }).observe(el);
      });
    }

    // Details: same drag slider, no Before/After labels (rotating table, hidden door...)
    if (details.length) {
      // two details sit side by side (phones: stacked); being in the same row, their automatic wipes run together
      const two = details.length === 2, size = two ? "(max-width:760px) 100vw, 560px" : "(max-width:760px) 100vw, 1120px";
      document.getElementById("detail").innerHTML = `<h2 class="serif">${U.detail}</h2><p>${U.dragMove}</p><div class="detail-row${two ? " two" : ""}">` +
        details.map(([a, b, cap]) => `<div class="detail-item"><div class="ba">${pic(b, { sizes: size })}${pic(a, { cls: "before", sizes: size })}
          <span class="line"></span><span class="knob" aria-hidden="true">${U.knob}</span></div>${(window.IKDU_AR ? DETAIL_AR[a] : cap) ? `<p class="ba-cap">${window.IKDU_AR ? DETAIL_AR[a] : cap}</p>` : ""}</div>`).join("") + `</div>`;
    }

    document.querySelectorAll(".ba").forEach(el => {
      const first = el.querySelector("img");
      const shape = () => { const r = first.naturalWidth / first.naturalHeight; el.style.setProperty("--ar", r); el.style.setProperty("--arn", r); };
      first.complete && first.naturalWidth ? shape() : first.addEventListener("load", shape, { once: true });
      // --x = where the line is, 0-100 (% from the left).
      // EN: finished photo on the LEFT of the line, before on the right. The intro sweeps the line left -> right and the
      //     handle stays on the right at the end (Amr, 2026-09-27). AR: mirrored (line right -> left, handle stays on the left).
      const rtl = document.dir === "rtl", FROM = rtl ? 100 : 0, TO = rtl ? 0 : 100;   // FROM = all before, TO = all after
      const set = x => { x = Math.min(100, Math.max(0, x)); el.style.setProperty("--x", x + "%"); el.setAttribute("aria-valuenow", Math.round(rtl ? 100 - x : x)); el._x = x; };
      el.tabIndex = 0; el.setAttribute("role", "slider"); el.setAttribute("aria-valuemin", 0); el.setAttribute("aria-valuemax", 100);
      if (el.classList.contains("compare")) el.setAttribute("aria-label", U.slider);
      let anim = null, used = false;
      const stopAnim = () => { if (anim) cancelAnimationFrame(anim); anim = null; };
      const firstUse = () => { if (!used) { used = true; el.classList.add("used"); } stopAnim(); };
      const move = e => { const r = el.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
      el.addEventListener("pointerdown", e => { firstUse(); el.setPointerCapture(e.pointerId); move(e); });
      el.addEventListener("pointermove", e => { if (el.hasPointerCapture(e.pointerId)) move(e); });
      el.addEventListener("keydown", e => {            // keyboard: arrows move the line 5% at a time
        const d = e.key === "ArrowLeft" ? -5 : e.key === "ArrowRight" ? 5 : 0;
        if (d) { e.preventDefault(); firstUse(); set((el._x ?? 50) + d); }
      });
      // Before/after AND "In detail" sliders: open on the first photo, then wipe to the second ONCE when in view, then stop.
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) set(50);
      else {
        set(FROM);
        const io = new IntersectionObserver(([en]) => {
          if (!en.isIntersecting || en.intersectionRatio < .5) return;   // wait until at least half the slider is on screen
          io.disconnect();
          if (used) return;
          const t0 = performance.now(), D = 3000;   // 3 s wipe, after a 400 ms pause
          const step = now => {
            const k = Math.min(1, (now - t0) / D), ease = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
            set(FROM + (TO - FROM) * ease);
            anim = k < 1 ? requestAnimationFrame(step) : null;
          };
          setTimeout(() => { if (!used) anim = requestAnimationFrame(step); }, 400);
        }, { threshold: .6 });
        io.observe(el);
      }
    });

    // Gallery: wide photos full width and uncropped; tall photos side by side in pairs (a lone one sits centred)
    const g = document.getElementById("gallery");
    const orient = Object.fromEntries(all[key].map(x => [x.f, x.o]));
    const list = P.gallery || photos.filter(f => f !== cover && !compFiles.includes(f));   // a project can fix its own gallery order
    const tall = list.filter(f => typeof f === "string" && orient[f] === "P");
    list.forEach(f => {
      if (Array.isArray(f)) {   // ["a.jpg", "b.jpg"] = side by side at the same height, neither cropped (any shapes, e.g. wide + tall)
        g.insertAdjacentHTML("beforeend", `<div class="duo">${f.map(x => `<figure class="duo-item">${pic(x, { sizes: "(max-width:760px) 100vw, 60vw" })}</figure>`).join("")}</div>`);
        return;
      }
      let cls = "wide";
      if (orient[f] === "P") cls = tall.length % 2 && f === tall[tall.length - 1] ? "solo" : "";
      g.insertAdjacentHTML("beforeend", `<figure class="${cls}">${pic(f, { sizes: cls === "wide" ? "100vw" : "(max-width:760px) 100vw, 50vw" })}</figure>`);
    });
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add("in")), { threshold: .15 });
    g.querySelectorAll("figure").forEach(f => io.observe(f));
    // Two tall photos side by side end at the same line (Amr, 2026-09-28): both get the shorter photo's shape,
    // the taller one is cropped from the bottom. One column (phones): photos keep their own shape.
    const evenPairs = () => {
      const figs = [...g.querySelectorAll("figure:not(.wide):not(.solo):not(.duo-item)")];
      figs.forEach(f => { f.style.aspectRatio = ""; f.classList.remove("crop"); });
      const rows = {};
      figs.forEach(f => (rows[f.offsetTop] ??= []).push(f));
      Object.values(rows).filter(r => r.length === 2).forEach(r => {
        const ratios = r.map(f => { const im = f.querySelector("img"); return im.naturalWidth / im.naturalHeight; });
        if (ratios.some(x => !x)) return;                 // not loaded yet: the load handler runs this again
        const ar = Math.max(...ratios);                   // wider shape = shorter photo
        r.forEach(f => { f.style.aspectRatio = ar; f.classList.add("crop"); });
      });
    };
    // duo: each photo's width follows its shape (width ÷ height), so both end up exactly the same height
    const duoFit = im => {
      const f = im.closest(".duo-item"); if (!f || !im.naturalWidth) return;
      f.style.flexGrow = im.naturalWidth / im.naturalHeight;
      // (no height cap: the row's edges line up with the full-width photos above and below)
    };
    g.querySelectorAll(".duo-item img").forEach(im => im.complete ? duoFit(im) : im.addEventListener("load", () => duoFit(im), { once: true }));
    g.querySelectorAll("img").forEach(im => im.complete || im.addEventListener("load", evenPairs, { once: true }));
    evenPairs(); addEventListener("resize", evenPairs);

    // Next project, in the same order as the home page
    const nk = order[(order.indexOf(key) + 1) % order.length];
    const nFirst = picks?.home[nk]?.[0] || all[nk][all[nk].length - 1].f;
    const next = document.getElementById("next");
    next.href = `${nk}.html`;
    next.querySelector("img").outerHTML = ikduPic(nk + "/" + nFirst, { alt: "" });
    next.querySelector("h3").textContent = NAME(nk);
    // Jump to a section if the link asks for one (e.g. twin-villas.html#ba)
    const h = location.hash.slice(1); if (h) setTimeout(() => document.getElementById(h)?.scrollIntoView(), 300);
  // Screenshot helper: ?shot=<section id> hides everything above that section (no scrolling needed)
  const shot = new URLSearchParams(location.search).get("shot");
  if (shot) { const t = document.getElementById(shot); let el = t;
    while (el && el.parentElement !== document.body) el = el.parentElement;
    for (let x = el?.previousElementSibling; x; x = x.previousElementSibling) if (x.tagName !== "HEADER" && x.tagName !== "SCRIPT") x.style.display = "none";
    for (let x = t?.previousElementSibling; x && t.parentElement !== document.body; x = x.previousElementSibling) x.style.display = "none";
    if (el && el.tagName !== "MAIN") el.style.marginTop = "64px"; document.getElementById("hdr")?.classList.add("small");
    document.querySelectorAll(".gallery figure").forEach(f => f.classList.add("in")); }
  });
