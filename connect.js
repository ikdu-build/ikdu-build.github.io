// Connect page script, shared by connect.html and ar/connect.html
(() => {
  // (Photo + brand-panel band and the privacy/location lines removed 2026-09-27 at Amr's request.)

  // ---- Contact form -> Web3Forms (free static-form service) -> hello@ikdu.build. No DNS changes needed.
  // Amr creates the access key at web3forms.com with hello@ikdu.build (one confirmation email), then pastes it here:
  const WEB3FORMS_KEY = "222c75bb-c265-4bc7-a6d7-c636fb0e3390";   // form "ikdu.build website", account hello@ikdu.build (2026-09-28). Public by design: it only lets people send to hello@.
  const AR = window.IKDU_AR;
  const MSG = AR
    ? { sending: "بنبعت…", ok: "وصلتنا رسالتك، وهنرد عليك في أقرب وقت.", missing: "من فضلك اكتب اسمك، ووسيلة نتواصل بيها معاك، ورسالتك.",
        fail: "الرسالة موصلتش. جرّب تاني، أو كلّمنا على واتساب أو hello@ikdu.build.", notSet: "الفورم لسه مش متوصّل. كلّمنا على واتساب أو hello@ikdu.build." }
    : { sending: "Sending…", ok: "Thanks — we'll reply soon.", missing: "Please add your name, an email or phone number, and a message.",
        fail: "That didn't go through. Please try again, or reach us on WhatsApp or hello@ikdu.build.", notSet: "The form isn't connected yet. Please reach us on WhatsApp or hello@ikdu.build." };
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = form.querySelector(".status"), btn = form.querySelector("button[type=submit]");
  const say = (t, kind) => { status.textContent = t; status.dataset.kind = kind || ""; };
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const d = new FormData(form);
    if (d.get("botcheck")) { form.reset(); say(MSG.ok, "ok"); return; }        // honeypot ticked: a bot. Pretend it worked, send nothing.
    const name = (d.get("name") || "").trim(), contact = (d.get("contact") || "").trim(), message = (d.get("message") || "").trim();
    if (!name || !contact || !message) { say(MSG.missing, "error"); return; }
    if (!WEB3FORMS_KEY) { say(MSG.notSet, "error"); return; }
    btn.disabled = true; say(MSG.sending);
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `New message from ikdu.build${AR ? " (Arabic page)" : ""}`,
                               from_name: "ikdu.build website", name, "email or phone": contact, message, botcheck: "",
                               ...(/@/.test(contact) ? { email: contact } : {}) })   // an email address becomes the reply-to, so "Reply" in Gmail answers the visitor
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.success !== false) { form.reset(); say(MSG.ok, "ok"); } else say(MSG.fail, "error");
    } catch { say(MSG.fail, "error"); }
    btn.disabled = false;
  });
})();
