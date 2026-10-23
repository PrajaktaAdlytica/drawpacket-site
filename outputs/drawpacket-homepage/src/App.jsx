import { useEffect, useRef, useState } from "react";
import { chapters, offers, sources, faqs } from "./data";
import {
  Button,
  Icon,
  Kicker,
  DemoLabel,
  ChapterTop,
  Dialog,
} from "./components/UI";
import Demo from "./components/Demo";
import PilotForm from "./components/PilotForm";
import { track } from "./lib/analytics";
import { SiteNav, SiteFooter } from "./pages/SiteChrome";
const brand = "/brand/";
function Calendar({ onSource }) {
  return (
    <div
      className="calendar-workbench"
      aria-label="Synthetic October review calendar"
    >
      <div className="calendar-top">
        <span>October 2026 · illustrative review</span>
        <span>Reference · 05 Oct</span>
      </div>
      <div className="calendar-grid">
        {[
          ["Mon", "05"],
          ["Tue", "06"],
          ["Wed", "07"],
          ["Thu", "08"],
          ["Sat", "10"],
        ].map(([d, n]) => (
          <div className="calendar-day" key={n}>
            <span>{d}</span>
            <strong>{n}</strong>
          </div>
        ))}
        <button className="draw-ribbon" onClick={() => onSource(sources[0])}>
          <span>Stoneway Mechanical / PA-07</span>
          <DemoLabel />
        </button>
        <button className="calendar-hold" onClick={() => onSource(sources[3])}>
          <small>Hold</small>
          <span>Waiver missing</span>
        </button>
        <div className="calendar-event event-open">
          <i />
          <span>
            05 Oct ·<br />
            Review opened
          </span>
        </div>
        <div className="calendar-event event-expiry">
          <i />
          <span>
            08 Oct ·<br />
            COI expires
          </span>
        </div>
        <div className="calendar-event event-review">
          <i />
          <span>
            10 Oct ·<br />
            Intended review
          </span>
        </div>
        <div className="calendar-amounts">
          <div>
            <strong>$84,000</strong>
            <small>requested</small>
          </div>
          <div>
            <strong>$78,000</strong>
            <small>supported</small>
          </div>
          <div>
            <strong>$6,000</strong>
            <small>variance</small>
          </div>
        </div>
      </div>
      <div className="calendar-bottom">
        <div>
          <small>Current reviewer</small>
          <span>Mara Ellis</span>
        </div>
        <div>
          <small>GC approval</small>
          <span>Pending</span>
        </div>
        <div>
          <small>Status</small>
          <strong>In review</strong>
        </div>
      </div>
      <p className="calendar-note">
        <DemoLabel />
        <span>No signing or payment execution.</span>
      </p>
    </div>
  );
}
import IntroFilm from './components/IntroFilm';

export default function App() {
  const root = useRef(null),
    lenis = useRef(null),
    [active, setActive] = useState(0),
    [reduced, setReduced] = useState(false),
    [introVisible, setIntroVisible] = useState(true),
    [menu, setMenu] = useState(false),
    [selected, setSelected] = useState(0),
    [modal, setModal] = useState(null),
    [openFAQ, setOpenFAQ] = useState(0),
    [workflowStep, setWorkflowStep] = useState(0);
  const offer = offers[selected];
  useEffect(() => {
    let query = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const change = (e) => setReduced(e.matches);
    query.addEventListener("change", change);
    track("landing_view", { page_version: "cycle-study-1" });
    return () => query.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    let disposed = false,
      clean = () => {};
    document.documentElement.classList.toggle("reduced-motion", reduced);
    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      let smooth, tick, frame;
      const updateChapter = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const middle = innerHeight * 0.5;
          const index = Array.from(root.current.querySelectorAll(".chapter"))
            .reverse()
            .findIndex((el) => {
              const r = el.getBoundingClientRect();
              return r.top <= middle && r.bottom > middle;
            });
          if (index >= 0) setActive(chapters.length - 1 - index);
        });
      };
      window.addEventListener("scroll", updateChapter, { passive: true });
      window.addEventListener("resize", updateChapter);
      const ctx = gsap.context(() => {
        const nodes = gsap.utils.toArray(".chapter");
        if (!reduced) {
          if (matchMedia("(pointer:fine)").matches) {
            smooth = new Lenis({
              autoRaf: false,
              smoothWheel: true,
              syncTouch: false,
              duration: 1.05,
              anchors: false,
              prevent: (node) => !!node.closest("[data-lenis-prevent]"),
            });
            lenis.current = smooth;
            smooth.on("scroll", ScrollTrigger.update);
            tick = (t) => smooth.raf(t * 1000);
            gsap.ticker.add(tick);
            gsap.ticker.lagSmoothing(0);
          }
          gsap.from(".hero-copy > *", {
            scrollTrigger: {trigger: '#opening', start: 'top 70%', once: true},
            y: 24,
            opacity: 0,
            stagger: 0.1,
            duration: 0.85,
            ease: "power3.out",
            clearProps: "all",
          });
          gsap.from(".calendar-day", {
            scrollTrigger: {trigger: '#opening', start: 'top 70%', once: true},
            y: 18,
            opacity: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "all",
          });
          gsap.from(".draw-ribbon,.calendar-hold,.calendar-event", {
            scrollTrigger: {trigger: '#opening', start: 'top 70%', once: true},
            x: -20,
            opacity: 0,
            stagger: 0.14,
            duration: 0.8,
            delay: 0.25,
            clearProps: "all",
          });
          // Reserve a reading beat between handoffs. The outgoing pin covers
          // this space, so the next chapter cannot peek in immediately.
          // Set all gaps before measuring any triggers; svh tracks resizing.
          gsap.set(nodes.slice(0, -1), { marginBottom: "40svh" });
          gsap.set("#offerings", { marginBottom: "240svh" });
          // Tall chapters scroll naturally before their final viewport holds.
          nodes.forEach((el, i) => {
            gsap.set(el, { zIndex: i + 1 });
            if (i < nodes.length - 1) {
              const next = nodes[i + 1];
              ScrollTrigger.create({
                trigger: el,
                start: () =>
                  el.offsetHeight > innerHeight + 2
                    ? "bottom bottom"
                    : "top top",
                endTrigger: next,
                end: "top top",
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              });
              const surface =
                el.querySelector(".chapter-inner") ||
                el.querySelector(".hero-layout");
              gsap.fromTo(
                surface,
                { scale: 1, opacity: 1 },
                {
                  scale: 0.93,
                  opacity: 0.28,
                  transformOrigin: "50% 65%",
                  ease: "none",
                  scrollTrigger: {
                    trigger: next,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                },
              );
            }
            if (i > 0) {
              // Each chapter has its own editorial entrance, reversible on scroll.
              const entrances = {
                evidence: { clip: "inset(0% 100% 0% 0%)", x: -100, rotate: 0 },
                variance: { clip: "inset(0% 0% 0% 100%)", x: 100, rotate: 0 },
                offerings: { clip: "inset(0% 50% 0% 50%)", x: 0, rotate: 0 },
                workflow: { clip: "inset(50% 0% 50% 0%)", x: -60, rotate: 0 },
                demo: { clip: "circle(0% at 72% 45%)", x: 70, rotate: 2 },
                controls: { clip: "inset(100% 0% 0% 0%)", x: 0, rotate: 0 },
                pilot: { clip: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", x: -90, rotate: -2 },
                questions: { clip: "inset(0% 0% 100% 0%)", x: 60, rotate: 0 },
                close: { clip: "circle(0% at 50% 50%)", x: 0, rotate: 0 },
              };
              const entry = entrances[el.id];
              const fullClip = el.id === "demo" || el.id === "close"
                ? "circle(150% at " + (el.id === "demo" ? "72% 45%" : "50% 50%") + ")"
                : el.id === "pilot"
                  ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                  : "inset(0% 0% 0% 0%)";
              gsap.fromTo(root.current, { ["--entry-" + el.id]: entry.clip }, {
                ["--entry-" + el.id]: fullClip, ease: "none",
                scrollTrigger: { trigger: el.parentElement.classList.contains("pin-spacer") ? el.parentElement : el, start: "top bottom", end: "top 5%", scrub: true, invalidateOnRefresh: true },
              });
              gsap.fromTo(el.querySelectorAll(".chapter-top, .reveal"),
                { x: entry.x, rotation: entry.rotate, opacity: 0.3 },
                { x: 0, rotation: 0, opacity: 1, stagger: 0.06, ease: "none",
                  scrollTrigger: { trigger: el.parentElement.classList.contains("pin-spacer") ? el.parentElement : el, start: "top 95%", end: "top 15%", scrub: true, invalidateOnRefresh: true },
                });
            }
          });
          // The five offers occupy the reading interval before the next chapter.
          // Native scrolling drives the selection in both directions; tabs remain usable.
          ScrollTrigger.create({
            trigger: "#offerings",
            start: "bottom bottom",
            end: () => "+=" + innerHeight * 2,
            invalidateOnRefresh: true,
            onUpdate: (self) => setSelected(Math.min(4, Math.floor(self.progress * 5))),
          });
          gsap.fromTo(
            ".evidence-row",
            { x: 80 },
            {
              x: 0,
              stagger: 0.15,
              ease: "none",
              scrollTrigger: {
                trigger: ".evidence-register",
                start: "top 90%",
                end: "bottom 80%",
                scrub: 0.45,
              },
            },
          );
          gsap.fromTo(
            ".reconcile-component",
            { x: -65 },
            {
              x: 0,
              stagger: 0.3,
              ease: "none",
              scrollTrigger: {
                trigger: ".reconcile-ledger",
                start: "top 85%",
                end: "bottom 80%",
                scrub: 0.45,
              },
            },
          );
          gsap.fromTo(
            ".variance-callout",
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "none",
              scrollTrigger: {
                trigger: ".variance-callout",
                start: "top 95%",
                end: "top 65%",
                scrub: 0.4,
              },
            },
          );
          gsap.fromTo(
            ".draw-ribbon",
            { width: "60%" },
            {
              width: "42%",
              ease: "none",
              scrollTrigger: {
                trigger: "#evidence",
                start: "top bottom",
                end: "top 15%",
                scrub: true,
              },
            },
          );
          ScrollTrigger.create({
            trigger: ".workflow-steps",
            start: "top 85%",
            end: "bottom 25%",
            scrub: true,
            onUpdate: (s) =>
              setWorkflowStep(Math.min(2, Math.floor(s.progress * 3))),
          });
          gsap.fromTo(
            ".close-visual img",
            { scale: 1.14, yPercent: 5 },
            {
              scale: 1,
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: "#close",
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            },
          );
        }
        ScrollTrigger.create({
          trigger: "#pilot",
          start: "top 60%",
          once: true,
          onEnter: () =>
            track("price_view", { price_variant_id: "hypothesis-v1" }),
        });
      }, root);
      document.fonts.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
      clean = () => {
        window.removeEventListener("scroll", updateChapter);
        window.removeEventListener("resize", updateChapter);
        cancelAnimationFrame(frame);
        ctx.revert();
        // Pin teardown can restore its captured inline margin after GSAP
        // reverts the spacing tween. Never leave gaps in reduced-motion mode.
        root.current?.querySelectorAll(".chapter").forEach((el) => {
          el.style.removeProperty("margin-bottom");
        });
        if (tick) gsap.ticker.remove(tick);
        smooth?.destroy();
        lenis.current = null;
      };
    })();
    return () => {
      disposed = true;
      clean();
    };
  }, [reduced]);
  useEffect(() => {
    if (modal) {
      lenis.current?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.current?.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      lenis.current?.start();
    };
  }, [modal]);
  function go(e, id) {
    e?.preventDefault();
    setMenu(false);
    const target = document.getElementById(id);
    if (target) {
      history.replaceState(null, "", "#" + id);
      if (lenis.current)
        lenis.current.scrollTo(
          target.parentElement.classList.contains("pin-spacer")
            ? target.parentElement
            : target,
          { offset: -1, duration: 1.1 },
        );
      else
        (target.parentElement.classList.contains("pin-spacer")
          ? target.parentElement
          : target
        ).scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
    }
  }
  function openDemo() {
    track("demo_open", { scenario_version: "BP04-v1" });
    setModal({ type: "demo" });
  }
  function openPilot(id = offer.id) {
    setModal({ type: "pilot", selected: id });
  }
  function openSource(s) {
    track("evidence_view", {
      evidence_type: s.icon,
      synthetic_source_key: s.id,
    });
    setModal({ type: "source", source: s });
  }
  function selectOffer(i) {
    setSelected(i);
    track("offer_19_selected", {
      selected_offer_id: offers[i].id,
      placement: "homepage-index",
    });
  }
  return (
    <div ref={root} className={`site ${reduced ? "is-reduced" : ""} ${introVisible ? "intro-visible" : ""}`}>
      <a
        className="skip-link"
        href="#offerings"
        onClick={(e) => go(e, "offerings")}
      >
        Skip to offers
      </a>
      <SiteNav />
      <aside className="chapter-nav" aria-label="Story chapters">
        <span className="current-chapter">
          {String(active + 1).padStart(2, "0")}
        </span>
        {chapters.map(([id, label], i) => (
          <a
            className={active === i ? "active" : ""}
            key={id}
            href={"#" + id}
            onClick={(e) => go(e, id)}
            aria-label={`Chapter ${i + 1}: ${label}`}
            aria-current={active === i ? "step" : undefined}
          >
            <span>{label}</span>
          </a>
        ))}
        <button
          onClick={() => setReduced((v) => !v)}
          className="motion-toggle"
          aria-pressed={reduced}
          aria-label={reduced ? "Enable motion" : "Reduce motion"}
        >
          <Icon name={reduced ? "player-play" : "player-pause"} />
        </button>
      </aside>
      <main>
        <IntroFilm reduced={reduced} onContinue={go} onVisibilityChange={setIntroVisible} />
        <section
          className="chapter hero"
          id="opening"
          aria-labelledby="hero-title"
        >
          <div className="hero-layout">
            <div className="hero-copy">
              <aside className="funding-announcement" aria-label="Funding announcement">
                <strong>Funding announcement</strong>
                <span>DrawPacket has secured venture capital funding.</span>
                <small>Investor and amount to be announced.</small>
              </aside>
              <Kicker>
                Bridgepine Builders / BP-04
                <br />
                September 2026 cycle
              </Kicker>
              <h1 id="hero-title" tabIndex={-1}>
                Bring the month
                <br />
                into focus.
              </h1>
              <p className="hero-description">
                A concept for reviewing one construction draw, its evidence and
                the decisions still open.
              </p>
              <div className="button-row">
                <Button onClick={openDemo}>Explore synthetic demo</Button>
                <Button secondary onClick={() => openPilot()}>
                  Discuss a pilot
                </Button>
              </div>
              <p className="scope-note">
                <span />
                One project. One monthly cycle.
              </p>
            </div>
            <Calendar onSource={openSource} />
          </div>
          <div className="hero-footer">
            <div>
              <span className="small-label">For the GC project accountant</span>
              <p>Which missing document sends your draw back?</p>
            </div>
            <a
              href="#evidence"
              onClick={(e) => go(e, "evidence")}
              className="scroll-cue"
            >
              Follow one draw <Icon name="arrow-down" />
            </a>
            <div className="hero-chapter">
              <span>01</span>
              <small>The month opens</small>
            </div>
          </div>
        </section>
        <section
          className="chapter evidence"
          id="evidence"
          aria-labelledby="evidence-title"
        >
          <div className="chapter-inner">
            <ChapterTop number="02" title="Evidence and next steps" />
            <div className="split-layout">
              <div className="section-copy reveal">
                <Kicker>The accountant knows this part</Kicker>
                <h2 id="evidence-title">
                  A date is not
                  <br />a decision.
                </h2>
                <p className="lead">
                  Documents arrive at different times. Accountability and a
                  dated next action keep the month moving.
                </p>
                <p>
                  Pay apps. Approved changes. Stored-material proof. Waivers
                  from another tier. A certificate nearing expiry. All part of
                  the same draw.
                </p>
                <button
                  className="text-button"
                  onClick={() => setModal({ type: "returns" })}
                >
                  Where applications come back <Icon name="arrow-up-right" />
                </button>
              </div>
              <div className="evidence-register reveal">
                <div className="register-header">
                  <span>Key evidence for PA-07</span>
                  <span>Active review</span>
                </div>
                {sources.map((s, i) => (
                  <button
                    key={s.id}
                    className={`evidence-row ${s.state !== "Received" ? "attention" : ""}`}
                    onClick={() => openSource(s)}
                  >
                    <span className="document-icon">
                      <Icon name={s.icon} />
                      <span>{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <span className="evidence-info">
                      <strong>{s.label}</strong>
                      <span>
                        {s.id} /{" "}
                        {s.state === "Missing"
                          ? "Not received"
                          : s.date + " 2026"}
                      </span>
                      <DemoLabel />
                    </span>
                    <span className="evidence-state">
                      <small>{s.state}</small>
                      <span>
                        {s.state === "Missing"
                          ? "Needed for review"
                          : s.state === "Expiring"
                            ? "Before 10 Oct"
                            : s.date + " 2026"}
                      </span>
                    </span>
                    <Icon name="arrow-up-right" />
                  </button>
                ))}
              </div>
            </div>
            <div className="chapter-bottom">
              <span>One record. Five kinds of evidence.</span>
              <a href="#variance" onClick={(e) => go(e, "variance")}>
                Now compare the amounts <Icon name="arrow-down" />
              </a>
            </div>
          </div>
        </section>
        <section
          className="chapter reconciliation"
          id="variance"
          aria-labelledby="variance-title"
        >
          <div className="chapter-inner">
            <ChapterTop number="03" title="The difference is in the detail" />
            <div className="reconcile-layout">
              <div className="section-copy reveal">
                <Kicker>Current-period gross / USD</Kicker>
                <h2 id="variance-title">
                  Every dollar
                  <br />
                  needs a source.
                </h2>
                <p className="lead">
                  The request says $84,000.
                  <br />
                  The evidence supports $78,000.
                </p>
                <p>
                  The $6,000 difference stays visible until a reviewer can
                  explain it.
                </p>
                <Button secondary onClick={() => openSource(sources[0])}>
                  Inspect source evidence
                </Button>
                <p className="fine">
                  Illustrative amounts, not savings or a payment instruction.
                  Prior payments, tax and retainage are excluded from this
                  comparison.
                </p>
              </div>
              <div className="reconcile-ledger reveal">
                <div className="ledger-title">
                  <DemoLabel />
                  <span className="mono">PA-07-v1</span>
                </div>
                <div className="requested-total">
                  <span>Requested</span>
                  <strong>$84,000</strong>
                </div>
                <div className="component-stack">
                  {[
                    {
                      s: sources[0],
                      label: "Current installed work",
                      amount: "$65,000",
                    },
                    {
                      s: sources[2],
                      label: "Stored materials",
                      amount: "$5,000",
                    },
                    {
                      s: sources[1],
                      label: "Approved change CO-03",
                      amount: "$8,000",
                    },
                  ].map((v, i) => (
                    <button
                      className="reconcile-component"
                      key={v.label}
                      onClick={() => openSource(v.s)}
                    >
                      <span className="component-no">0{i + 1}</span>
                      <span>{v.label}</span>
                      <strong>{v.amount}</strong>
                      <Icon name="arrow-up-right" />
                    </button>
                  ))}
                </div>
                <div className="supported-total">
                  <span>Supported current gross</span>
                  <strong>$78,000</strong>
                </div>
                <div className="variance-callout">
                  <span>
                    <Icon name="alert-triangle" /> Review required
                  </span>
                  <strong>$6,000</strong>
                  <p>Unexplained variance. No approved source yet.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="chapter offerings"
          id="offerings"
          aria-labelledby="offers-title"
        >
          <div className="chapter-inner">
            <ChapterTop number="04" title="Five ways to inspect the draw" />
            <div className="offers-heading reveal">
              <h2 id="offers-title">
                Start where
                <br />
                the work repeats.
              </h2>
              <p className="lead">
                Five distinct proposed modules.
                <br />
                Choose one for the first pilot.
              </p>
            </div>
            <div className="offers-layout">
              <div
                className="offer-tabs"
                role="tablist"
                aria-orientation="vertical"
                aria-label="Proposed DrawPacket modules"
              >
                {offers.map((o, i) => (
                  <button
                    key={o.id}
                    id={"offer-tab-" + o.id}
                    role="tab"
                    aria-selected={selected === i}
                    aria-controls="offer-panel"
                    tabIndex={selected === i ? 0 : -1}
                    onClick={() => selectOffer(i)}
                    onKeyDown={(e) => {
                      if (
                        ["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)
                      ) {
                        e.preventDefault();
                        const next =
                          e.key === "Home"
                            ? 0
                            : e.key === "End"
                              ? 4
                              : (selected + (e.key === "ArrowDown" ? 1 : 4)) %
                                5;
                        selectOffer(next);
                        document
                          .getElementById("offer-tab-" + (next + 1))
                          .focus();
                      }
                    }}
                    className={selected === i ? "selected" : ""}
                  >
                    <span className="offer-number">0{o.id}</span>
                    <span>
                      <strong>{o.name}</strong>
                      <small>{o.description}</small>
                    </span>
                    <Icon name={selected === i ? "arrow-up-right" : "plus"} />
                  </button>
                ))}
              </div>
              <article
                className="offer-panel"
                id="offer-panel"
                role="tabpanel"
                aria-labelledby={"offer-tab-" + offer.id}
                tabIndex="0"
              >
                <div className="offer-panel-top">
                  <DemoLabel />
                  <span className="mono">Proposed module / 0{offer.id}</span>
                </div>
                <div key={offer.id} className="offer-visual">
                  <img
                    src={brand + "illustrations/" + offer.asset}
                    width="640"
                    height="450"
                    alt={`${offer.name}: synthetic review illustration`}
                    loading="lazy"
                  />
                </div>
                <div className="offer-panel-copy">
                  <h3>{offer.short}</h3>
                  <p>{offer.body}</p>
                  <div className="offer-actions">
                    <button
                      className="text-button"
                      onClick={() => { location.href = "/offerings/" + ["pay-app-check", "change-evidence", "waiver-tracking", "compliance-holds", "owner-packet"][selected]; }}
                    >
                      Inspect this module <Icon name="arrow-up-right" />
                    </button>
                    <button
                      className="text-button"
                      onClick={() => openPilot(offer.id)}
                    >
                      Discuss this pilot <Icon name="arrow-right" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section
          className="chapter workflow dark-chapter"
          id="workflow"
          aria-labelledby="workflow-title"
        >
          <div className="chapter-inner">
            <ChapterTop number="05" title="A rhythm with a reviewer" dark />
            <div className="workflow-heading reveal">
              <Kicker>Gather → review → draft</Kicker>
              <h2 id="workflow-title">
                The evidence moves.
                <br />
                Authority stays human.
              </h2>
              <p>Three steps. A named owner at every handoff.</p>
            </div>
            <div className="workflow-steps">
              {[
                {
                  n: "01",
                  icon: "files",
                  title: "Gather the evidence.",
                  copy: "Bring permissioned, de-identified sources into one cycle. Preserve the version, date, and line.",
                },
                {
                  n: "02",
                  icon: "user-check",
                  title: "Review the exceptions.",
                  copy: "Keep the discrepancy beside its evidence. Assign an owner, record a rationale, and review changes.",
                },
                {
                  n: "03",
                  icon: "file-export",
                  title: "Draft the owner packet.",
                  copy: "Index the reviewed sources and open questions. A named GC approver retains the release decision.",
                },
              ].map((v, i) => (
                <article
                  className={`workflow-step ${workflowStep === i ? "is-current" : ""}`}
                  key={v.n}
                >
                  <span className="workflow-number">{v.n}</span>
                  <div className="workflow-icon">
                    <Icon name={v.icon} />
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.copy}</p>
                  <div className="workflow-track">
                    <span />
                  </div>
                </article>
              ))}
            </div>
            <div className="workflow-footer">
              <span className="kicker">
                Human review is a decision. Not an animation.
              </span>
              <Button secondary onClick={openDemo}>
                Take over the review
              </Button>
            </div>
          </div>
        </section>
        <section
          className="chapter demo-chapter"
          id="demo"
          aria-labelledby="demo-title"
        >
          <div className="chapter-inner">
            <ChapterTop number="06" title="Your turn at the workbench" />
            <div className="demo-layout">
              <div className="section-copy reveal">
                <Kicker>An isolated synthetic preview</Kicker>
                <h2 id="demo-title">
                  One draw.
                  <br />
                  Every open
                  <br />
                  question.
                </h2>
                <p className="lead">See what the reviewer sees.</p>
                <p>
                  Trace the amount. Inspect the hold. Review replacement
                  evidence. Leave a named decision in the ledger.
                </p>
                <Button onClick={openDemo}>Open the synthetic workspace</Button>
                <p className="fine">
                  Fictional records only. Reset at any time.
                  <br />
                  No real documents or external actions.
                </p>
              </div>
              <div className="demo-preview reveal">
                <div className="demo-preview-head">
                  <img
                    src={brand + "logos/cadence-symbol-oxblood.svg"}
                    width="24"
                    height="36"
                    alt=""
                  />
                  <span>Draw review / BP-04</span>
                  <DemoLabel />
                </div>
                <div className="preview-record">
                  <div>
                    <Kicker>Pay application / PA-07</Kicker>
                    <h3>Stoneway Mechanical</h3>
                  </div>
                  <span className="hold-badge">
                    <Icon name="alert-triangle" /> Held for review
                  </span>
                </div>
                <div className="preview-amounts">
                  <div>
                    <small>Requested</small>
                    <strong>$84,000</strong>
                  </div>
                  <div>
                    <small>Supported</small>
                    <strong>$78,000</strong>
                  </div>
                  <div>
                    <small>Variance</small>
                    <strong>$6,000</strong>
                  </div>
                </div>
                <div className="preview-hold-list">
                  <div>
                    <Icon name="file-search" />
                    <span>Unsupported variance</span>
                    <b>$6,000</b>
                  </div>
                  <div>
                    <Icon name="hierarchy" />
                    <span>Lower-tier conditional waiver</span>
                    <b>Missing</b>
                  </div>
                  <div>
                    <Icon name="calendar" />
                    <span>COI expires 08 Oct</span>
                    <b>Renewal needed</b>
                  </div>
                </div>
                <div className="reviewer-block">
                  <Icon name="user" />
                  <div>
                    <small>Current reviewer</small>
                    <strong>Mara Ellis</strong>
                  </div>
                  <div>
                    <small>GC approver / Owen Hale</small>
                    <strong>Pending</strong>
                  </div>
                </div>
                <button className="preview-open" onClick={openDemo}>
                  Open PA-07 <Icon name="arrow-up-right" />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section
          className="chapter controls"
          id="controls"
          aria-labelledby="controls-title"
        >
          <div className="chapter-inner">
            <ChapterTop number="07" title="Know who can approve" />
            <div className="controls-heading reveal">
              <h2 id="controls-title">
                A signature is not
                <br />
                payment evidence.
              </h2>
              <p className="lead">
                The distinctions matter.
                <br />
                So does the person making the decision.
              </p>
            </div>
            <div className="controls-grid">
              <article className="waiver-type reveal">
                <span className="kicker">01 / Conditional waiver</span>
                <Icon name="file-text" />
                <h3>
                  Subject to payment
                  <br />
                  conditions.
                </h3>
                <p>
                  A signed conditional form does not mean payment cleared.
                  Preserve its conditions and the evidence needed for review.
                </p>
                <span className="small-label">
                  Form placeholder — not legal wording
                </span>
              </article>
              <article className="waiver-type reveal">
                <span className="kicker">02 / Unconditional waiver</span>
                <Icon name="file-check" />
                <h3>
                  Receipt must not
                  <br />
                  be assumed.
                </h3>
                <p>
                  An unconditional form represents receipt in the California
                  example. Never convert a missing or unsigned source into
                  complete evidence.
                </p>
                <span className="small-label">
                  State and contract requirements vary
                </span>
              </article>
              <article className="authority-card reveal">
                <Kicker>03 / The decision owner</Kicker>
                <img
                  src={brand + "logos/cadence-symbol-white.svg"}
                  width="48"
                  height="69"
                  alt=""
                />
                <h3>
                  GC approval
                  <br />
                  stays with the GC.
                </h3>
                <div className="authority-person">
                  <span>Owen Hale</span>
                  <small>Named fictional approver · pending</small>
                </div>
                <p>
                  Waiver language and release remain lawyer/GC-approved. No
                  signing, sending, funds transfer, or ERP/bank writes.
                </p>
              </article>
            </div>
            <div className="controls-note">
              <Icon name="info-circle" />
              <p>
                California is an educational example, not a legal determination.
                DrawPacket does not replace statutory lien advice.{" "}
                <a
                  href="https://www.cslb.ca.gov/consumers/legal_issues_for_consumers/mechanics_lien/conditional_and_unconditional_waiver_release_form.aspx"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the official form distinctions{" "}
                  <Icon name="external-link" />
                </a>
              </p>
            </div>
          </div>
        </section>
        <section
          className="chapter pilot"
          id="pilot"
          aria-labelledby="pilot-title"
        >
          <div className="chapter-inner">
            <ChapterTop number="08" title="Test one cycle, deliberately" />
            <div className="pilot-layout">
              <div className="section-copy reveal">
                <Kicker>Learn from the actual work</Kicker>
                <h2 id="pilot-title">
                  One project.
                  <br />
                  One cycle.
                  <br />A clear test.
                </h2>
                <p className="lead">
                  Shadow a monthly draw. Find the avoidable returns. Agree on
                  one supervised pilot.
                </p>
                <div className="pilot-commitment">
                  <span>01</span>
                  <p>One selected module</p>
                  <span>02</span>
                  <p>Permissioned templates and samples</p>
                  <span>03</span>
                  <p>A named AP owner and paid scope</p>
                </div>
                <Button onClick={() => openPilot()}>
                  Discuss a one-cycle pilot
                </Button>
              </div>
              <div className="pilot-right reveal">
                <div className="pilot-price">
                  <Kicker>Hypothetical test pricing</Kicker>
                  <div>
                    <span>Fixed diagnostic</span>
                    <strong>$2,000</strong>
                  </div>
                  <span className="price-or">or</span>
                  <div>
                    <span>Per project / payment cycle</span>
                    <strong>$1,500–$4,000</strong>
                  </div>
                  <p>
                    Proposed prices for testing. Not current offers or accepted
                    market pricing. Scope and price would be agreed before a
                    pilot. No checkout.
                  </p>
                </div>
                <div className="pilot-scorecard">
                  <Kicker>Measure what matters</Kicker>
                  {[
                    "GC-validated avoidable returns",
                    "Review hours per draw",
                    "Wrongful holds + material omissions",
                    "Subcontractor response burden",
                    "Signed, funded pilot commitment",
                  ].map((s) => (
                    <div key={s}>
                      <span>{s}</span>
                      <span>Not measured</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="pilot-gate">
              Proceed only with fewer true returns without wrongful holds,
              approved templates, and a funded project owner. Stop if waiver
              complexity or incumbent coverage removes the gain.
            </p>
          </div>
        </section>
        <section
          className="chapter questions"
          id="questions"
          aria-labelledby="questions-title"
        >
          <div className="chapter-inner">
            <ChapterTop number="09" title="Before the next conversation" />
            <div className="faq-layout">
              <div className="section-copy reveal">
                <Kicker>A few things worth making clear</Kicker>
                <h2 id="questions-title">
                  Good questions.
                  <br />
                  Clear boundaries.
                </h2>
                <p>For the person who has to make the draw review work.</p>
                <Button secondary onClick={() => openPilot()}>
                  Discuss your workflow
                </Button>
                <div className="faq-note">
                  <Icon name="lock" />
                  <p>
                    Only a permissioned, de-identified sample belongs in a
                    supervised pilot. No project uploads here.
                  </p>
                </div>
              </div>
              <div className="faq-list">
                {faqs.map(([q, a], i) => (
                  <div
                    className={`faq-item ${openFAQ === i ? "expanded" : ""}`}
                    key={q}
                  >
                    <h3>
                      <button
                        aria-expanded={openFAQ === i}
                        aria-controls={"answer-" + i}
                        onClick={() => setOpenFAQ(openFAQ === i ? -1 : i)}
                      >
                        {q}
                        <Icon name={openFAQ === i ? "minus" : "plus"} />
                      </button>
                    </h3>
                    <div id={"answer-" + i} hidden={openFAQ !== i}>
                      <p>{a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          className="chapter close-chapter"
          id="close"
          aria-labelledby="close-title"
        >
          <div className="close-visual">
            <img
              src={brand + "backgrounds/chalk-architecture.webp"}
              alt=""
              width="1536"
              height="1024"
              loading="lazy"
            />
          </div>
          <div className="chapter-inner">
            <ChapterTop number="10" title="A considered next step" />
            <div className="close-copy reveal">
              <Kicker>Make one GC draw ready</Kicker>
              <h2 id="close-title">
                The month moves.
                <br />
                Keep the evidence
                <br />
                with it.
              </h2>
              <p className="lead">
                Visible holds. Waiver evidence.
                <br />A reviewable decision.
              </p>
              <div className="button-row">
                <Button onClick={() => openPilot()}>Discuss a pilot</Button>
                <Button secondary onClick={openDemo}>
                  Explore synthetic demo
                </Button>
              </div>
            </div>
            <div className="closing-record">
              <span className="kicker">Owner packet / BP-04</span>
              <span>Draft · approval pending</span>
              <DemoLabel />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter reduced={reduced} onMotion={() => setReduced(v => !v)} />
      {modal && (
        <Dialog
          title={
            modal.type === "demo"
              ? "Synthetic draw review"
              : modal.type === "pilot"
                ? "Pilot request preview"
                : "DrawPacket information"
          }
          onClose={() => setModal(null)}
          wide={modal.type === "demo"}
        >
          {modal.type === "demo" ? (
            <Demo />
          ) : modal.type === "pilot" ? (
            <PilotForm selected={modal.selected} />
          ) : modal.type === "source" ? (
            <div className="source-dialog">
              <DemoLabel />
              <Kicker>Source / provenance</Kicker>
              <h2>{modal.source.label}</h2>
              <div className="source-id">
                {modal.source.id} <span>{modal.source.state}</span>
              </div>
              <p className="lead">{modal.source.detail}</p>
              <dl>
                <div>
                  <dt>Project / record</dt>
                  <dd>BP-04 / PA-07</dd>
                </div>
                <div>
                  <dt>Review reference</dt>
                  <dd>05 Oct 2026</dd>
                </div>
                <div>
                  <dt>Reviewer</dt>
                  <dd>Mara Ellis</dd>
                </div>
                <div>
                  <dt>GC approval</dt>
                  <dd>Owen Hale · pending</dd>
                </div>
              </dl>
              <p className="fine">
                Source bodies are synthetic. Versions, dates and line references
                are preserved. No legal determination, signing, sending, or
                payment execution.
              </p>
              <Button onClick={openDemo}>Continue into the demo</Button>
            </div>
          ) : modal.type === "module" ? (
            <div className="info-dialog">
              <Kicker>Proposed module / 0{modal.offer.id}</Kicker>
              <h2>{modal.offer.name}</h2>
              <p className="lead">{modal.offer.description}</p>
              <p>{modal.offer.body}</p>
              <div className="info-inset">
                <strong>Proposed output</strong>
                <p>{modal.offer.output}</p>
              </div>
              <Button onClick={() => openPilot(modal.offer.id)}>
                Discuss this pilot
              </Button>
            </div>
          ) : (
            <div className="info-dialog">
              <Kicker>Research-stage DrawPacket</Kicker>
              <h2>
                {modal.type === "returns"
                  ? "The work arrives out of sync."
                  : modal.type === "about"
                    ? "A narrower place to start."
                    : modal.type === "privacy"
                      ? "A clear purpose for every field."
                      : modal.type === "terms"
                        ? "A preview with clear limits."
                        : `${modal.name}, when it’s verified.`}
              </h2>
              <p className="lead">
                {modal.type === "returns"
                  ? "A missing line, unsupported change, absent lower-tier waiver, or expired document can return a pay application to review."
                  : modal.type === "about"
                    ? "DrawPacket explores a reviewable evidence and approval loop for one GC project and one monthly draw."
                    : modal.type === "privacy"
                      ? "This local homepage does not submit contact information or project records to a server."
                      : modal.type === "terms"
                        ? "This website and its demo are research-stage concept previews, using fictional records only."
                        : `No verified DrawPacket ${modal.name} profile has been supplied. We will link the actual company profile when it exists.`}
              </p>
              <p>
                {modal.type === "privacy"
                  ? "Form values exist only in the open dialog and clear when it closes. No marketing subscription, tracking cookie, or analytics service is connected. Before live collection, the legal entity, contact address, processors, retention period, and deletion route must be established."
                  : modal.type === "terms"
                    ? "No real signing, sending, filing, payment release, or bank/ERP writes are supported. Do not rely on the preview as statutory lien advice or a coverage determination. Hypothetical pilot prices are not a current offer or contract."
                    : modal.type === "about"
                      ? "Our starting hypothesis is that sources, exceptions, a named owner, and a dated next action should stay together. A supervised pilot must establish incremental value against the GC’s existing tools before expansion."
                      : modal.type === "returns"
                        ? "A shadow review of an actual, permissioned cycle would classify avoidable returns against GC and contract rules. The point is to find true gaps without creating wrongful holds. No per-draw savings have been measured."
                        : "The footer retains the official social artwork without implying a live profile, partnership, endorsement, or operating company listing."}
              </p>
              <Button secondary onClick={() => setModal(null)}>
                Back to the story
              </Button>
            </div>
          )}
        </Dialog>
      )}
    </div>
  );
}
