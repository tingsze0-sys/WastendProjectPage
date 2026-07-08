import { SectionHeading } from "../components/section-heading";
import { FeatureBlock } from "../components/feature-block";
import { ReferenceList, type ReferenceGroup } from "../components/reference-list";
import { MockupFrame } from "../components/mockup-frame";
import {
  FadeUp,
  ScaleIn,
  Stagger,
  StaggerItem,
  Parallax,
  Float,
} from "../components/motion-primitives";

const REFERENCES: ReferenceGroup[] = [
  {
    region: "Hong Kong",
    items: [
      { title: "Cap. 603 — Product Eco-responsibility Ordinance", href: "https://www.elegislation.gov.hk/hk/cap603" },
      { title: "Cap. 354 — Waste Disposal Ordinance", href: "https://www.elegislation.gov.hk/hk/cap354" },
      { title: "Plastic Shopping Bag Charging", href: "https://www.epd.gov.hk/epd/english/environmentinhk/waste/pro_responsibility/psb_the_charge.html" },
    ],
  },
  {
    region: "Japan",
    items: [
      { title: "Act No. 137 of 1970 (Waste Management)", href: "https://www.japaneselawtranslation.go.jp/en/laws/download/4529/09/s45Aa001370204en16.0_r4A68.pdf" },
      { title: "Act No. 112 of 1995 (Containers & Packaging)", href: "https://www.japaneselawtranslation.go.jp/en/laws/download/3828/09/h07Aa001120201en14.0_h18A76.pdf" },
      { title: "Act No. 110 of 2000 (Resource Recycling)", href: "https://www.japaneselawtranslation.go.jp/en/laws/download/3799/09/h12Aa001100501en14.0.pdf" },
      { title: "Resource Circulation for Plastics", href: "https://plastic-circulation.env.go.jp/" },
    ],
  },
  {
    region: "Republic of Korea",
    items: [
      { title: "Wastes Control Act", href: "https://elaw.klri.re.kr/eng_service/lawViewContent.do?hseq=46237" },
      { title: "Saving & Recycling of Resources", href: "https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=62551&type=part&key=39" },
      { title: "VBWF System (Seoul)", href: "https://www.urbansdgplatform.org/profile/profile_caseView_detail.msc?from=list&no_case=669" },
    ],
  },
  {
    region: "Denmark",
    items: [
      { title: "Extended Producer Responsibility", href: "https://eng.mst.dk/industry/waste/extended-producer-responsibility" },
      { title: "Packaging (producer responsibility)", href: "https://producentansvar.dk/en/products-and-responsibility/packaging/" },
      { title: "Vejle sorting instructions", href: "https://www.vejle.dk/en/welcome-to-vejle/getting-started-in-vejle/waste-sorting/sorting-instructions-en/" },
      { title: "Recycling in Copenhagen", href: "https://international.kk.dk/live/housing/recycling-in-copenhagen" },
      { title: "Chambers Environmental Law 2025", href: "https://practiceguides.chambers.com/practice-guides/environmental-law-2025/denmark/trends-and-developments/O23197" },
    ],
  },
  {
    region: "Sweden",
    items: [
      { title: "Producer responsibility for packaging", href: "https://www.naturvardsverket.se/en/guidance/extended-producer-responsibility-epr/producer-responsibility-for-packaging/" },
      { title: "Swedish Environmental Code (Ds 2000:61)", href: "https://www.government.se/legal-documents/2000/08/ds-200061/" },
    ],
  },
];

const FEATURES = [
  {
    index: "01",
    name: "Search",
    caption:
      "Find an item and view how it is disposed of for a selected location. Search begins with everyday language rather than policy terms.",
  },
  {
    index: "02",
    name: "Guide",
    caption:
      "Converts local rules into step-by-step guidance — what to do, what to avoid, and how to clean, separate, or drop off.",
  },
  {
    index: "03",
    name: "Compare",
    caption:
      "Shows how one item is classified across different jurisdictions, side by side.",
  },
  {
    index: "04",
    name: "Saved",
    caption:
      "Stores frequently checked items, locations, and guidance for quick return.",
  },
];

const STAGES = [
  { label: "Municipal sites", note: "scattered official pages" },
  { label: "PDFs & schemes", note: "dense, hard to parse" },
  { label: "Facility pages", note: "location-specific" },
  { label: "Structured guidance", note: "one clear answer" },
];

const IDENTITY = [
  { label: "Logo", color: "var(--green-soft)" },
  { label: "Colour", color: "var(--blue-soft)" },
  { label: "Category coding", color: "var(--green-soft)" },
  { label: "Type", color: "var(--paper-soft)" },
  { label: "Icon language", color: "var(--blue-soft)" },
  { label: "Components", color: "var(--green-soft)" },
];

export function WastendPage() {
  return (
    <>
      {/* ── Hero: layered parallax composition ───────────── */}
      <section className="relative overflow-hidden">
        {/* Abstract colour blocks — slow parallax, soft organic shapes */}
        <div className="pointer-events-none absolute -left-24 top-10 -z-10">
          <Parallax speed={70}>
            <div className="h-[420px] w-[420px] rounded-[45%] bg-[var(--green-soft)] blur-2xl opacity-70" />
          </Parallax>
        </div>
        <div className="pointer-events-none absolute right-[-6rem] top-40 -z-10">
          <Parallax speed={110}>
            <div className="h-[360px] w-[360px] rounded-[42%] bg-[var(--blue-soft)] blur-2xl opacity-70" />
          </Parallax>
        </div>

        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <div className="grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-2 md:py-28">
            {/* Left — intro copy, line-by-line fade up */}
            <div>
              <FadeUp delay={0.08} y={24}>
                <h1 className="mt-5 text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.98] tracking-[-0.03em] text-[var(--ink)]">
                  Wastend
                </h1>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="mt-6 max-w-[24ch] text-[clamp(1.4rem,3vw,2.1rem)] leading-tight text-[var(--ink)]">
                  Navigate local recycling rules with confidence.
                </p>
              </FadeUp>
              <FadeUp delay={0.24}>
                <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-[var(--ink-soft)]">
                  A recycling companion for residents, newcomers, and travellers
                  to check how items are sorted, prepared, and disposed of by
                  local rules.
                </p>
              </FadeUp>
            </div>

            {/* Right — layered phone + translucent info card, different speeds */}
            <div className="relative flex justify-center">
              <Parallax speed={-40} className="relative z-10">
                <MockupFrame
                  alt="Wastend app home screen"
                  label="App home screen"
                  phone
                />
              </Parallax>
              <div className="absolute -bottom-6 -left-2 z-20 w-[190px] sm:-left-6">
                <Parallax speed={30}>
                  <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4 shadow-[0_16px_40px_-24px_rgba(43,47,44,0.4)] backdrop-blur-md">
                    <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--green)]">
                      Result
                    </span>
                    <p className="mt-1 text-[14px] leading-snug text-[var(--ink)]">
                      Rinse, then place in the recycling bin.
                    </p>
                  </div>
                </Parallax>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width hero composition */}
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <ScaleIn>
            <MockupFrame
              alt="Wastend hero composition"
              label="Hero image — Wastend app composition"
              className="aspect-[16/9]"
            />
          </ScaleIn>

        </div>
      </section>

      {/* ── Why the problem exists ───────────────────────── */}
      <section className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-24">
        <SectionHeading eyebrow="Why the problem exists" title="The same item. Different rules." />
        <FadeUp delay={0.1}>
          <p className="max-w-[60ch] text-[18px] leading-relaxed text-[var(--ink-soft)]">
            Recycling rules are local, but everyday items are not. The same
            bottle, carton, or wrapper can be sorted, prepared, and collected in
            completely different ways depending on where you are. Wastend offers
            location-specific guidance so people can act on the rules that
            actually apply to them.
          </p>
        </FadeUp>

        {/* Reference block */}
        <div className="mt-14 md:mt-20">
          <FadeUp>
            <span className="mb-6 block text-[12px] uppercase tracking-[0.24em] text-[var(--ink-soft)]">
              Reference
            </span>
          </FadeUp>
          <ReferenceList groups={REFERENCES} />
        </div>
      </section>

      {/* ── How Wastend works ────────────────────────────── */}
      <section className="border-t border-[var(--line)] bg-[var(--paper-soft)]">
        <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-28">
          <SectionHeading
            eyebrow="How Wastend works"
            title="From scattered sources to structured guidance."
          />
          <FadeUp delay={0.1}>
            <p className="max-w-[60ch] text-[18px] leading-relaxed text-[var(--ink-soft)]">
              Guidance is spread across municipal sites, downloadable PDFs,
              collection schemes, and individual facility pages. Wastend gathers
              these fragmented sources and restructures them into one consistent
              place — turning raw policy into an answer you can act on.
            </p>
          </FadeUp>

          {/* Stage-based flow diagram — cards stagger in sequence */}
          <Stagger className="mt-14 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
            {STAGES.map((stage, i) => (
              <StaggerItem key={stage.label} className="flex flex-1 items-center gap-4">
                <div
                  className={`flex-1 rounded-2xl border border-[var(--line)] p-6 ${
                    i === STAGES.length - 1
                      ? "bg-[var(--green-soft)]"
                      : "bg-white/60"
                  }`}
                >
                  <span className="text-[12px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                    Stage {i + 1}
                  </span>
                  <p className="mt-2 text-[16px] font-medium text-[var(--ink)]">
                    {stage.label}
                  </p>
                  <p className="mt-1 text-[13px] text-[var(--ink-soft)]">
                    {stage.note}
                  </p>
                </div>
                {i < STAGES.length - 1 && (
                  <span className="hidden text-[var(--ink-soft)] md:block">→</span>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── What users get ───────────────────────────────── */}
      <section className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-28">
        <SectionHeading eyebrow="What users get" title="From uncertainty to action." />
        <FadeUp delay={0.1}>
          <p className="mb-16 max-w-[60ch] text-[18px] leading-relaxed text-[var(--ink-soft)]">
            Wastend surfaces the guidance people actually need in the moment,
            rather than handing them raw policy documents to interpret
            themselves.
          </p>
        </FadeUp>

        <div className="space-y-20 md:space-y-28">
          {FEATURES.map((f, i) => (
            <FeatureBlock
              key={f.name}
              index={f.index}
              name={f.name}
              caption={f.caption}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* ── Visual identity ──────────────────────────────── */}
      <section className="border-t border-[var(--line)] bg-[var(--paper-soft)]">
        <div className="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-28">
          <SectionHeading
            eyebrow="Visual identity"
            title="The system that holds it together."
          />
          <FadeUp delay={0.1}>
            <p className="mb-14 max-w-[60ch] text-[18px] leading-relaxed text-[var(--ink-soft)]">
              A brand and interface system documented end to end — logo, colour,
              category coding, type, and icon language — so every screen reads as
              one coherent product.
            </p>
          </FadeUp>

          {/* Visual-rule cards stagger in; colour icons float gently */}
          <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-3">
            {IDENTITY.map((item, i) => (
              <StaggerItem key={item.label}>
                <div className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl border border-[var(--line)] bg-white/50 p-6">
                  <Float
                    amplitude={i % 2 === 0 ? 12 : 9}
                    duration={5 + i * 0.4}
                    delay={i * 0.2}
                    axis={i % 3 === 0 ? "y" : "x"}
                    className="absolute -right-6 -top-6"
                  >
                    <div
                      className="h-28 w-28 rounded-[42%] blur-md opacity-80"
                      style={{ background: item.color }}
                    />
                  </Float>
                  <span className="relative text-[12px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="relative text-[16px] font-medium text-[var(--ink)]">
                    {item.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

    </>
  );
}
