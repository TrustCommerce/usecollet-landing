"use client";

import { useEffect, useRef } from "react";
import "./owner.css";
import { wireColletPage, nonEmpty, fieldValue } from "./colletRuntime";

// Byte-faithful markup from the original index.html (body), rendered server-side
// for SEO and hydrated with the original behavior via wireColletPage.
const HTML = `<header class="nav" id="nav">
  <div class="wrap nav-in">
    <a class="brand" href="#top" aria-label="Collet home">
      <svg width="28" height="28" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="30" stroke="var(--ink)" stroke-width="8" stroke-dasharray="49.8 13" stroke-linecap="round" transform="rotate(-90 50 50)"/>
        <polygon points="50,40 58.66,45 58.66,55 50,60 41.34,55 41.34,45" fill="var(--brass)"/>
      </svg>
      Collet
    </a>
    <a class="btn btn-brass" href="#waitlist">Join the waitlist</a>
  </div>
</header>

<main id="top">

  <section class="section hero" id="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <span class="eyebrow r">For landlords · Nigeria first</span>
        <h1 class="r">You own the house. Why does it feel like your agent owns your <em>money?</em></h1>
        <p class="lead r">Collet is where your property manager collects the rent, sends you your share, and gives you a record you can open from anywhere in the world.</p>
        <a class="btn btn-brass btn-hero r" href="#waitlist">Join the waitlist</a>
      </div>

      <div class="hero-art r">
        <span class="glow" aria-hidden="true"></span>
        <svg class="collet-hero" viewBox="0 0 100 100" fill="none" role="img" aria-label="The Collet mark: a precision collet gripping a part dead-centre">
          <g class="collet-reticle">
            <circle cx="50" cy="50" r="47" stroke="var(--brass)" stroke-width="1.4" stroke-dasharray="1.4 10.9" stroke-linecap="round" opacity="0.55"/>
            <circle cx="50" cy="50" r="43.5" stroke="var(--stone)" stroke-width="0.8" opacity="0.32"/>
            <line x1="50" y1="6" x2="50" y2="16" stroke="var(--stone)" stroke-width="0.8" opacity="0.3"/>
            <line x1="50" y1="84" x2="50" y2="94" stroke="var(--stone)" stroke-width="0.8" opacity="0.3"/>
            <line x1="6" y1="50" x2="16" y2="50" stroke="var(--stone)" stroke-width="0.8" opacity="0.3"/>
            <line x1="84" y1="50" x2="94" y2="50" stroke="var(--stone)" stroke-width="0.8" opacity="0.3"/>
          </g>
          <g class="collet-ring-grp">
            <circle cx="50" cy="50" r="33" stroke="var(--pine)" stroke-width="9" stroke-dasharray="55.1 14" stroke-linecap="round" transform="rotate(-90 50 50)"/>
          </g>
          <g class="collet-core">
            <polygon points="50,37 61.26,43.5 61.26,56.5 50,63 38.74,56.5 38.74,43.5" fill="var(--brass)"/>
            <polygon points="50,37 61.26,43.5 61.26,56.5 50,63 38.74,56.5 38.74,43.5" fill="none" stroke="#1c160a" stroke-width="0.6" opacity="0.25"/>
          </g>
        </svg>
      </div>
    </div>
  </section>

  <section class="section dark pain" id="pain">
    <div class="wrap">
      <span class="eyebrow r">You already know this feeling</span>
      <h2 class="r">The rental market runs on trust you were never given a way to check.</h2>
      <div class="pain-grid r">
        <div class="pain-cell">
          <span class="tag">The agent who went quiet</span>
          <h3>“He collected a full year’s rent.”</h3>
          <p>Then the calls stopped, and so did the money. There was nowhere to trace it.</p>
        </div>
        <div class="pain-cell">
          <span class="tag">The flat with many tenants</span>
          <h3>“My unit was let to five people.”</h3>
          <p>All at once, for the same rooms. You weren’t told about a single one of them.</p>
        </div>
        <div class="pain-cell">
          <span class="tag">The rent that came up short</span>
          <h3>“He said the tenant hadn’t paid.”</h3>
          <p>You had no way to know whether that was true, or where your money actually went.</p>
        </div>
        <div class="pain-cell">
          <span class="tag">The house you cannot see</span>
          <h3>“I own a flat in Abuja.”</h3>
          <p>From abroad, you haven’t seen a naira, or a single number, in months.</p>
        </div>
      </div>
      <p class="pain-foot r">None of this is bad luck. It’s a market with <b>no proof.</b></p>
    </div>
  </section>

  <section class="section flip" id="flip">
    <div class="wrap">
      <span class="eyebrow r">What changes</span>
      <h2 class="r">Collet doesn’t ask you to trust your manager. It shows you, <em>to the naira,</em> that you can.</h2>
      <div class="flip-list">
        <div class="flip-row r">
          <span class="mk" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="34" stroke="var(--brass)" stroke-width="9" stroke-dasharray="56 14" stroke-linecap="round" transform="rotate(-90 50 50)"/><polygon points="50,40 58.66,45 58.66,55 50,60 41.34,55 41.34,45" fill="var(--ink)"/></svg></span>
          <p>Money moves through a traceable, audited rail, never an agent’s pocket.</p>
        </div>
        <div class="flip-row r">
          <span class="mk" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="34" stroke="var(--brass)" stroke-width="9" stroke-dasharray="56 14" stroke-linecap="round" transform="rotate(-90 50 50)"/><polygon points="50,40 58.66,45 58.66,55 50,60 41.34,55 41.34,45" fill="var(--ink)"/></svg></span>
          <p>A property locks the moment it’s paid for. It can’t be let twice.</p>
        </div>
        <div class="flip-row r">
          <span class="mk" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="34" stroke="var(--brass)" stroke-width="9" stroke-dasharray="56 14" stroke-linecap="round" transform="rotate(-90 50 50)"/><polygon points="50,40 58.66,45 58.66,55 50,60 41.34,55 41.34,45" fill="var(--ink)"/></svg></span>
          <p>Every cycle, a statement: rent in, costs out, your net, all itemised.</p>
        </div>
        <div class="flip-row r">
          <span class="mk" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="34" stroke="var(--brass)" stroke-width="9" stroke-dasharray="56 14" stroke-linecap="round" transform="rotate(-90 50 50)"/><polygon points="50,40 58.66,45 58.66,55 50,60 41.34,55 41.34,45" fill="var(--ink)"/></svg></span>
          <p>Open your phone and see occupancy, collection, and payouts in real time.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section dark" id="how">
    <div class="wrap">
      <span class="eyebrow r">How it works</span>
      <h2 class="r">You don’t operate anything. You’re simply shown everything.</h2>
      <div class="steps-grid">
        <div class="step r">
          <span class="num">01</span>
          <h3>Your manager runs it on Collet</h3>
          <p class="muted">Listings, tenants, agreements and rent, handled in one place, on your behalf.</p>
        </div>
        <div class="step r">
          <span class="num">02</span>
          <h3>You’re invited in</h3>
          <p class="muted">Sign once, set how you want to be paid, then simply watch. You don’t operate anything.</p>
        </div>
        <div class="step r">
          <span class="num">03</span>
          <h3>Your money arrives, with proof</h3>
          <p class="muted">Rent is collected and your share reaches your account, beside a statement that accounts for every naira.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section feat" id="features">
    <div class="wrap">
      <span class="eyebrow r">What you get</span>
      <h2 class="r">Everything that was opaque, made plain.</h2>
      <div class="feat-grid">
        <div class="feat-item r"><span class="mk" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="var(--brass)" stroke-width="11" stroke-dasharray="58 16" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg></span><div><h3>Verified, locked properties</h3><p>Real, landlord-confirmed units that lock once taken. No flat let twice.</p></div></div>
        <div class="feat-item r"><span class="mk" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="var(--brass)" stroke-width="11" stroke-dasharray="58 16" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg></span><div><h3>Money you can trace</h3><p>Rent moves through a traceable, audited channel, never into anyone’s pocket.</p></div></div>
        <div class="feat-item r"><span class="mk" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="var(--brass)" stroke-width="11" stroke-dasharray="58 16" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg></span><div><h3>Statements to the naira</h3><p>Gross rent, every deduction, your net. Itemised, every cycle.</p></div></div>
        <div class="feat-item r"><span class="mk" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="var(--brass)" stroke-width="11" stroke-dasharray="58 16" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg></span><div><h3>A live portal</h3><p>Occupancy, collection and payouts, visible the moment they happen.</p></div></div>
        <div class="feat-item r"><span class="mk" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="var(--brass)" stroke-width="11" stroke-dasharray="58 16" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg></span><div><h3>A permanent record</h3><p>Every action timestamped and kept. Never your word against theirs.</p></div></div>
        <div class="feat-item r"><span class="mk" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="var(--brass)" stroke-width="11" stroke-dasharray="58 16" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg></span><div><h3>Signed agreements</h3><p>Real, e-signed tenancy agreements and receipts. Nothing verbal, nothing deniable.</p></div></div>
        <div class="feat-item r"><span class="mk" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="var(--brass)" stroke-width="11" stroke-dasharray="58 16" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg></span><div><h3>Owner-approved repairs</h3><p>Nothing above your limit is spent without your yes. No ghost expenses.</p></div></div>
        <div class="feat-item r"><span class="mk" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="var(--brass)" stroke-width="11" stroke-dasharray="58 16" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg></span><div><h3>Deposit records</h3><p>Caution money recorded and reconciled at move-out, so it’s never quietly lost.</p></div></div>
        <div class="feat-item r"><span class="mk" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="var(--brass)" stroke-width="11" stroke-dasharray="58 16" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg></span><div><h3>Shares for co-owners</h3><p>Family property? Each owner sees their share, paid to their own account.</p></div></div>
        <div class="feat-item r"><span class="mk" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 100 100"><circle cx="50" cy="50" r="36" fill="none" stroke="var(--brass)" stroke-width="11" stroke-dasharray="58 16" stroke-linecap="round" transform="rotate(-90 50 50)"/></svg></span><div><h3>Verified managers only</h3><p>The person handling your property is on the record, and accountable.</p></div></div>
      </div>
    </div>
  </section>

  <section class="section dia" id="diaspora">
    <div class="wrap dia-in">
      <div class="dia-copy">
        <span class="eyebrow r">For owners abroad</span>
        <h2 class="r">Own in Abuja.<br>Live anywhere.</h2>
        <p class="r">Trade sporadic WhatsApp updates and unexplained transfers for a live view of your property, and reliable payouts that reach you wherever you are.</p>
      </div>
      <div class="dia-art r" aria-hidden="true">
        <svg width="220" height="220" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="46" stroke="var(--brass)" stroke-width="1.2" stroke-dasharray="1.3 9.6" stroke-linecap="round" opacity="0.5"/>
          <circle cx="50" cy="50" r="33" stroke="var(--bone)" stroke-width="8" stroke-dasharray="55.1 14" stroke-linecap="round" transform="rotate(-90 50 50)"/>
          <polygon points="50,38 60.39,44 60.39,56 50,62 39.61,56 39.61,44" fill="var(--brass)"/>
        </svg>
      </div>
    </div>
  </section>

  <section class="section trust" id="trust">
    <div class="wrap">
      <span class="eyebrow r">Why it holds</span>
      <h2 class="r">Trust built into the mechanism, not promised in a brochure.</h2>
      <div class="trust-grid">
        <div class="pillar r">
          <span class="mk" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="none" stroke="var(--brass)" stroke-width="9" stroke-dasharray="57 15" stroke-linecap="round" transform="rotate(-90 50 50)"/><polygon points="50,41 58,45.5 58,54.5 50,59 42,54.5 42,45.5" fill="var(--ink)"/></svg></span>
          <h3>Traceable money</h3>
          <p>Every naira moves through a recorded channel, never an untracked pocket.</p>
        </div>
        <div class="pillar r">
          <span class="mk" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="none" stroke="var(--brass)" stroke-width="9" stroke-dasharray="57 15" stroke-linecap="round" transform="rotate(-90 50 50)"/><polygon points="50,41 58,45.5 58,54.5 50,59 42,54.5 42,45.5" fill="var(--ink)"/></svg></span>
          <h3>A full audit trail</h3>
          <p>Every naira and every action, permanently and verifiably logged.</p>
        </div>
        <div class="pillar r">
          <span class="mk" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="none" stroke="var(--brass)" stroke-width="9" stroke-dasharray="57 15" stroke-linecap="round" transform="rotate(-90 50 50)"/><polygon points="50,41 58,45.5 58,54.5 50,59 42,54.5 42,45.5" fill="var(--ink)"/></svg></span>
          <h3>Verified managers</h3>
          <p>Accountable and on the record, not roadside agents you can’t trace.</p>
        </div>
        <div class="pillar r">
          <span class="mk" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="none" stroke="var(--brass)" stroke-width="9" stroke-dasharray="57 15" stroke-linecap="round" transform="rotate(-90 50 50)"/><polygon points="50,41 58,45.5 58,54.5 50,59 42,54.5 42,45.5" fill="var(--ink)"/></svg></span>
          <h3>Built by payments people</h3>
          <p>By engineers who’ve built card and banking systems, not a wallet bolted onto a website.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section cta" id="waitlist">
    <div class="wrap">
      <div class="cta-card r">
        <div class="cta-intro">
          <span class="eyebrow">Founding landlords</span>
          <h2>Be first when the Abuja pilot opens.</h2>
          <p class="lead">Join the waitlist. Founding landlords get priority onboarding with a verified manager, and a front-row seat as we build.</p>
          <p class="pm-bridge">Manage properties for landlords? Collet is built for you. <a href="/" id="pmLink">Book a demo&nbsp;→</a></p>
        </div>

        <div class="cta-form" id="waitWrap">
          <form id="waitForm" novalidate>
            <div class="field">
              <label for="wEmail">Email</label>
              <input type="email" id="wEmail" name="email" placeholder="you@email.com" required autocomplete="email" />
            </div>
            <div class="field">
              <label for="wLocation">Where is your property?</label>
              <input type="text" id="wLocation" name="location" placeholder="e.g. Maitama, Abuja" autocomplete="off" />
            </div>
            <div class="field">
              <label for="wUnits">How many units do you own?</label>
              <select id="wUnits" name="units"><option value="">Select…</option><option>1</option><option>2 to 5</option><option>6 to 20</option><option>More than 20</option></select>
            </div>
            <div class="field">
              <label for="wBase">Do you live in Nigeria or abroad?</label>
              <select id="wBase" name="based"><option value="">Select…</option><option>In Nigeria</option><option>Abroad (diaspora)</option></select>
            </div>
            <div class="field">
              <label for="wPM">Do you currently use an agent or manager?</label>
              <select id="wPM" name="uses_pm"><option value="">Select…</option><option>Yes</option><option>No</option><option>I am a property manager</option></select>
            </div>
            <button class="btn btn-brass" type="submit">Join the waitlist</button>
            <p class="form-note">We’ll only use this to reach you about the pilot.</p>
          </form>

          <div class="form-done" id="waitDone" role="status" tabindex="-1">
            <span class="mk" aria-hidden="true"><svg width="44" height="44" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="33" stroke="var(--brass)" stroke-width="8" stroke-dasharray="55.1 14" stroke-linecap="round" transform="rotate(-90 50 50)"/><polygon points="50,38 60.39,44 60.39,56 50,62 39.61,56 39.61,44" fill="var(--brass)"/></svg></span>
            <h3>You’re on the list.</h3>
            <p>We’ll reach out before the Abuja pilot opens.</p>
            <p class="done-cue">While you’re here · watch Collet in action</p>
            <div class="done-video" id="doneVideo"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="wrap">
    <div class="foot-top">
      <div>
        <span class="foot-brand">
          <svg width="26" height="26" viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="30" stroke="var(--bone)" stroke-width="8" stroke-dasharray="49.8 13" stroke-linecap="round" transform="rotate(-90 50 50)"/><polygon points="50,40 58.66,45 58.66,55 50,60 41.34,55 41.34,45" fill="var(--brass)"/></svg>
          Collet
        </span>
        <p class="foot-def">col·let &nbsp;·&nbsp; the precision grip that holds a part dead-centre, so it never slips. Your money, accounted for the same way.</p>
      </div>
      <p class="foot-mission">Bringing proof to Nigerian rent.</p>
    </div>
    <div class="foot-bottom">
      <span>Abuja, Nigeria · © 2026 Collet</span>
      <span><a href="#">Privacy</a> &nbsp;·&nbsp; <a href="#">Contact</a></span>
    </div>
  </div>
</footer>`;

export default function LandlordsPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    return wireColletPage(root, (r) =>
      nonEmpty({
        location: fieldValue(r, "#wLocation"),
        units: fieldValue(r, "#wUnits"),
        based: fieldValue(r, "#wBase"),
        uses_pm: fieldValue(r, "#wPM"),
        source: "landlords",
      }),
    );
  }, []);

  return (
    <div className="owner" ref={ref} dangerouslySetInnerHTML={{ __html: HTML }} />
  );
}
