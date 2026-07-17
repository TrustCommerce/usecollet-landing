import { DEMO_VIDEO_EMBED, WAITLIST_API } from "@/config";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Wires up the static landing markup exactly as the original inline <script> did:
 * the sticky-nav scroll state, the scroll-reveal IntersectionObserver, and the two
 * forms — except the waitlist form now POSTs to the real WaitlistApi instead of a
 * no-op stub. `collectMetadata` reads the page-specific extra fields (location,
 * units, …) into the API's free-form metadata map. Returns a cleanup function.
 */
export function wireColletPage(
  root: HTMLElement,
  collectMetadata: (root: HTMLElement) => Record<string, string>,
): () => void {
  root.classList.add("js");

  // Sticky nav: toggle .scrolled past a small threshold.
  const nav = root.querySelector<HTMLElement>("#nav");
  const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Scroll-reveal.
  const reveals = root.querySelectorAll<HTMLElement>(".r");
  let io: IntersectionObserver | null = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io!.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    reveals.forEach((el) => io!.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  // Hero mini-form: carry the email down into the full waitlist form and scroll to it.
  const heroForm = root.querySelector<HTMLFormElement>("#heroForm");
  const onHeroSubmit = (e: Event) => {
    e.preventDefault();
    const val = (root.querySelector<HTMLInputElement>("#heroEmail")?.value ?? "").trim();
    const target = root.querySelector<HTMLInputElement>("#wEmail");
    if (target && isEmail(val)) target.value = val;
    root.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => target?.focus({ preventScroll: true }), 600);
  };
  heroForm?.addEventListener("submit", onHeroSubmit);

  // Full waitlist form → WaitlistApi.
  const waitForm = root.querySelector<HTMLFormElement>("#waitForm");
  const waitWrap = root.querySelector<HTMLElement>("#waitWrap");
  const waitDone = root.querySelector<HTMLElement>("#waitDone");
  let submitting = false;
  const onWaitSubmit = async (e: Event) => {
    e.preventDefault();
    const emailInput = root.querySelector<HTMLInputElement>("#wEmail");
    if (!emailInput) return;
    const email = emailInput.value.trim();
    if (!isEmail(email)) {
      emailInput.focus();
      emailInput.style.borderColor = "#C49B58";
      return;
    }
    if (submitting) return;
    submitting = true;

    const metadata = collectMetadata(root);

    try {
      const res = await fetch(WAITLIST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, metadata }),
      });
      if (!res.ok) throw new Error(String(res.status));
      waitWrap?.classList.add("is-sent");
      waitDone?.classList.add("show");
      mountDemoVideo(root);
      // Hiding the form drops keyboard focus to <body>; move it to the success
      // card so the confirmation is announced and the video is one Tab away.
      waitDone?.focus({ preventScroll: true });
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      waitDone?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "nearest" });
    } catch {
      submitting = false;
      window.alert("Something went wrong. Please try again.");
    }
  };
  waitForm?.addEventListener("submit", onWaitSubmit);

  return () => {
    window.removeEventListener("scroll", onScroll);
    io?.disconnect();
    heroForm?.removeEventListener("submit", onHeroSubmit);
    waitForm?.removeEventListener("submit", onWaitSubmit);
  };
}

/** Trim values and drop empty ones — the API metadata map only carries answered fields. */
export function nonEmpty(entries: Record<string, string | undefined>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(entries)) {
    const t = (v ?? "").trim();
    if (t) out[k] = t;
  }
  return out;
}

export function fieldValue(root: HTMLElement, selector: string): string {
  return root.querySelector<HTMLInputElement | HTMLSelectElement>(selector)?.value ?? "";
}

/**
 * Drop the Vimeo demo player into the post-signup card. The iframe is created
 * only here — after a successful submit — so visitors who never sign up never
 * load the Vimeo player at all.
 */
function mountDemoVideo(root: HTMLElement): void {
  const host = root.querySelector<HTMLElement>("#doneVideo");
  if (!host || host.querySelector("iframe")) return;
  const iframe = document.createElement("iframe");
  iframe.src = DEMO_VIDEO_EMBED;
  iframe.title = "Collet product demo";
  iframe.allow = "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  host.appendChild(iframe);
}
