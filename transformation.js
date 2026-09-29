// Concept -> Reality, phones (Amr, 2026-09-29): tap a pair to open it full screen, swipe between the 3D concept and the
// delivered photo, then "Next" goes straight to the next comparison. Closes with the Close button, the phone's back
// gesture/button (history entry) or Escape. Pre-render safe: the viewer is only built when a pair is tapped.
(function () {
  const AR = document.documentElement.lang === "ar";
  const T = AR ? { open: "اضغط للعرض بملء الشاشة", close: "إغلاق", next: "التالي", prev: "السابق", done: "إنهاء", hint: "اسحب للمقارنة", render: "تصميم ثلاثي الأبعاد", delivered: "تم التنفيذ" }
               : { open: "Tap to view full screen", close: "Close", next: "Next", prev: "Previous", done: "Done", hint: "Swipe to compare", render: "3D concept", delivered: "Delivered" };
  const phone = matchMedia("(max-width:760px), (hover:none) and (pointer:coarse)");
  const pairs = [...document.querySelectorAll(".cr-pair")];
  document.querySelectorAll(".cr-expand, .crv").forEach(e => e.remove());   // pre-rendered copies
  pairs.forEach((p, i) => {
    p.insertAdjacentHTML("beforeend", `<button class="cr-expand" type="button" aria-label="${T.open}">${T.open}</button>`);
    p.addEventListener("click", e => { if (phone.matches) open(i); });
  });

  let v = null, idx = 0, hinted = false;
  function build() {
    document.body.insertAdjacentHTML("beforeend", `<div class="crv" role="dialog" aria-modal="true">
      <div class="crv-top"><span class="crv-count"></span><button class="crv-close" type="button">${T.close}</button></div>
      <div class="crv-track"></div>
      <div class="crv-tabs"><button type="button" data-k="0">${T.render}</button><button type="button" data-k="1">${T.delivered}</button></div>
      <p class="crv-cap serif"></p>
      <div class="crv-hint" aria-hidden="true">‹ ${T.hint} ›</div>
      <div class="crv-nav"><button class="crv-prev" type="button">${AR ? "→" : "←"} ${T.prev}</button><button class="crv-next" type="button">${T.next} ${AR ? "←" : "→"}</button></div>
    </div>`);
    v = document.querySelector(".crv");
    const track = v.querySelector(".crv-track"), tabs = v.querySelectorAll(".crv-tabs button");
    const slideAt = () => Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
    track.addEventListener("scroll", () => {
      const k = slideAt();
      tabs.forEach((t, n) => t.classList.toggle("on", n === k));
      v.classList.toggle("seen", k === 1);             // after seeing the delivered photo, "Next" is highlighted
    }, { passive: true });
    tabs.forEach(t => t.onclick = () => go(+t.dataset.k));
    v.querySelector(".crv-close").onclick = () => history.back();
    v.querySelector(".crv-next").onclick = () => idx < pairs.length - 1 ? show(idx + 1) : history.back();
    v.querySelector(".crv-prev").onclick = () => idx > 0 && show(idx - 1);
    addEventListener("keydown", e => { if (v.classList.contains("is-open") && e.key === "Escape") history.back(); });
    addEventListener("popstate", () => { if (v.classList.contains("is-open")) close(); });
  }
  const go = k => { const track = v.querySelector(".crv-track");
    v.querySelectorAll(".crv-tabs button").forEach((t, n) => t.classList.toggle("on", n === k)); v.classList.toggle("seen", k === 1);
    track.scrollTo({ left: (AR ? -1 : 1) * k * track.clientWidth, behavior: "smooth" }); };

  function show(i) {
    idx = i;
    const items = pairs[i].querySelectorAll(".cr-item picture");
    const track = v.querySelector(".crv-track");
    track.innerHTML = [...items].map((pic, k) => {
      const c = pic.cloneNode(true);
      c.querySelectorAll("source").forEach(s => s.sizes = "100vw");
      const img = c.querySelector("img"); img.loading = "eager";
      return `<div class="crv-slide">${c.outerHTML}<span class="cr-tag">${k ? T.delivered : T.render}</span></div>`;
    }).join("");
    track.scrollLeft = 0;
    v.querySelectorAll(".crv-tabs button").forEach((t, n) => t.classList.toggle("on", n === 0));
    v.classList.remove("seen");
    v.querySelector(".crv-count").textContent = `${i + 1} / ${pairs.length}`;
    v.querySelector(".crv-cap").textContent = pairs[i].querySelector("figcaption")?.textContent || "";
    v.querySelector(".crv-prev").disabled = i === 0;
    v.querySelector(".crv-next").innerHTML = i === pairs.length - 1 ? T.done : `${T.next} ${AR ? "←" : "→"}`;
  }

  function open(i) {
    if (!v) build();
    show(i);
    v.classList.add("is-open"); document.documentElement.classList.add("crv-lock");
    history.pushState({ crv: 1 }, "");
    if (!hinted) {                                      // first time: show the hint and nudge the photo so the swipe is obvious
      hinted = true; v.classList.add("hinting");
      const track = v.querySelector(".crv-track");
      setTimeout(() => track.scrollTo({ left: (AR ? -1 : 1) * track.clientWidth * .18, behavior: "smooth" }), 600);
      setTimeout(() => track.scrollTo({ left: 0, behavior: "smooth" }), 1100);
      setTimeout(() => v.classList.remove("hinting"), 3200);
    }
  }
  function close() { v.classList.remove("is-open", "hinting"); document.documentElement.classList.remove("crv-lock"); }
})();
