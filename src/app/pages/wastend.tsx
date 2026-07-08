import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

import { SectionHeading } from "../components/section-heading";
import { ReferenceList, type ReferenceGroup } from "../components/reference-list";
import { FadeUp, ScaleIn, Stagger, StaggerItem } from "../components/motion-primitives";
import { PixelCard } from "../components/pixel-card";

import floorPlan from "../../assets/curatorial-plan/floor-plan.png";
import jccacImage from "../../assets/curatorial-plan/jccac-exterior.webp";
import krugerImage from "../../assets/curatorial-plan/kruger-untitled.webp";
import casaGrandeImage from "../../assets/curatorial-plan/casa-grande.webp";
import washedUpImage from "../../assets/curatorial-plan/washed-up.webp";
import qualityOfMercyImage from "../../assets/curatorial-plan/quality-of-mercy.webp";
import wasteLandImage from "../../assets/curatorial-plan/waste-land.webp";
import plasticBagStoreImage from "../../assets/curatorial-plan/plastic-bag-store.webp";

type MetaItem = {
  label: string;
  value: string;
};

type Presumption = {
  label: string;
  title: string;
  copy: string;
};

type ObjectIconName = "pizzaBox" | "milkCarton" | "plasticBag" | "beverageCup";

type ComparisonRow = {
  icon: ObjectIconName;
  item: string;
  classifications: string[];
  note: string;
};

type ParticipationStep = {
  step: string;
  title: string;
  detail: string;
  prompts: string[];
};

type ExhibitionSection = {
  title: string;
  anchor: string;
  copy: string;
};

type Artwork = {
  id: keyof typeof ARTWORK_IMAGES;
  artist: string;
  title: string;
  section: string;
  alt: string;
  role: string;
  details: string[];
  source: string;
};

type ResourceNote = {
  label: string;
  value: string;
};

const JURISDICTIONS = [
  { code: "HK", flag: "🇭🇰" },
  { code: "JP", flag: "🇯🇵" },
  { code: "KR", flag: "🇰🇷" },
  { code: "DK", flag: "🇩🇰" },
  { code: "SE", flag: "🇸🇪" },
];

const PIXEL_VARIANTS = ["green", "blue", "warm"] as const;

const ARTWORK_IMAGES = {
  kruger: krugerImage,
  casaGrande: casaGrandeImage,
  washedUp: washedUpImage,
  qualityOfMercy: qualityOfMercyImage,
  wasteLand: wasteLandImage,
  plasticBagStore: plasticBagStoreImage,
};

const REFERENCE_LINKS = [
  {
    code: "HK",
    items: [
      { title: "Cap. 603 - Product Eco-responsibility Ordinance", href: "https://www.elegislation.gov.hk/hk/cap603" },
      { title: "Cap. 354 - Waste Disposal Ordinance", href: "https://www.elegislation.gov.hk/hk/cap354" },
      { title: "Enhanced Plastic Shopping Bag Charging Scheme", href: "https://www.epd.gov.hk/epd/english/environmentinhk/waste/pro_responsibility/psb_the_charge.html" },
    ],
  },
  {
    code: "JP",
    items: [
      { title: "Act No. 137 of 1970 - Waste Management", href: "https://www.japaneselawtranslation.go.jp/en/laws/download/4529/09/s45Aa001370204en16.0_r4A68.pdf" },
      { title: "Act No. 112 of 1995 - Containers and Packaging", href: "https://www.japaneselawtranslation.go.jp/en/laws/download/3828/09/h07Aa001120201en14.0_h18A76.pdf" },
      { title: "Act on Promoting Resource Circulation for Plastics", href: "https://plastic-circulation.env.go.jp/" },
    ],
  },
  {
    code: "KR",
    items: [
      { title: "Wastes Control Act", href: "https://elaw.klri.re.kr/eng_service/lawViewContent.do?hseq=46237" },
      { title: "Saving and Recycling of Resources", href: "https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=62551&type=part&key=39" },
      { title: "Volume Based Waste Fee System", href: "https://www.urbansdgplatform.org/profile/profile_caseView_detail.msc?from=list&no_case=669" },
    ],
  },
  {
    code: "DK",
    items: [
      { title: "Extended Producer Responsibility", href: "https://eng.mst.dk/industry/waste/extended-producer-responsibility" },
      { title: "Packaging producer responsibility", href: "https://producentansvar.dk/en/products-and-responsibility/packaging/" },
      { title: "Recycling in Copenhagen", href: "https://international.kk.dk/live/housing/recycling-in-copenhagen" },
    ],
  },
  {
    code: "SE",
    items: [
      { title: "Producer responsibility for packaging", href: "https://www.naturvardsverket.se/en/guidance/extended-producer-responsibility-epr/producer-responsibility-for-packaging/" },
      { title: "Swedish Environmental Code", href: "https://www.government.se/legal-documents/2000/08/ds-200061/" },
    ],
  },
];

const THEORY = [
  "Ahmed, S. Strange Encounters: Embodied Others in Post-Coloniality.",
  "Beck, U. Risk Society: Towards a New Modernity.",
  "Bowker, G. C., & Star, S. L. Sorting Things Out: Classification and Its Consequences.",
  "Douglas, M. Purity and Danger: An Analysis of Concepts of Pollution and Taboo.",
  "Foucault, M. Security, Territory, Population.",
  "Hawkins, G. The Ethics of Waste: How We Relate to Rubbish.",
  "Liboiron, M. Pollution is Colonialism.",
  "MacBride, S. Recycling Reconsidered.",
  "Rose, N. Powers of Freedom.",
  "Shklovsky, V. Art as Technique.",
];

function ObjectIcon({ type }: { type: ObjectIconName }) {
  const common = "h-16 w-16 drop-shadow-[0_14px_24px_rgba(43,47,44,0.14)]";

  if (type === "pizzaBox") {
    return (
      <svg className={common} viewBox="0 0 80 80" aria-hidden="true">
        <path d="M12 28 44 15l25 14-32 15L12 28Z" fill="#b68462" />
        <path d="M12 28v23l25 14V44L12 28Z" fill="#d7b08f" />
        <path d="M37 44v21l32-15V29L37 44Z" fill="#c49570" />
        <path d="M22 31 45 22l14 8-23 10-14-9Z" fill="#f4e2c4" />
        <circle cx="38" cy="31" r="2.2" fill="#d1533a" />
        <circle cx="46" cy="29" r="1.8" fill="#e09c33" />
        <circle cx="32" cy="35" r="1.8" fill="#7f9b4b" />
      </svg>
    );
  }

  if (type === "milkCarton") {
    return (
      <svg className={common} viewBox="0 0 80 80" aria-hidden="true">
        <path d="M24 19h27l9 13v37H24V19Z" fill="#f8fbff" />
        <path d="m24 19 9-8h20l-2 8H24Z" fill="#d8e5f3" />
        <path d="M33 11v21h27l-9-13 2-8H33Z" fill="#eef4fb" />
        <path d="M24 45h36v24H24V45Z" fill="#2a87c9" />
        <path d="M32 50c6 0 7 6 13 6 5 0 7-5 15-5v18H24V57c3-4 5-7 8-7Z" fill="#dff1ff" />
        <circle cx="43" cy="35" r="5" fill="#2a87c9" />
        <path d="M30 26h15" stroke="#2a87c9" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "plasticBag") {
    return (
      <svg className={common} viewBox="0 0 80 80" aria-hidden="true">
        <path d="M23 24h34l5 45H18l5-45Z" fill="#bfe7cb" />
        <path d="M31 24c0-8 5-12 9-12s9 4 9 12" fill="none" stroke="#8fcaa1" strokeWidth="6" strokeLinecap="round" />
        <path d="M29 39h22M31 49h18" stroke="#6f9f7e" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 24h28l-3 9H29l-3-9Z" fill="#e1f4e7" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 80 80" aria-hidden="true">
      <path d="M27 26h28l-4 43H31L27 26Z" fill="#f2f6f7" />
      <path d="M24 21h34v8H24v-8Z" fill="#ccd8de" />
      <path d="M31 35h20l-2 26H33l-2-26Z" fill="#d5edf3" />
      <path d="m42 21 9-12" stroke="#5a6e78" strokeWidth="4" strokeLinecap="round" />
      <path d="M33 45c5-4 11 4 17 0" stroke="#8abac5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function FlagBadge({ flag, code, label }: { flag: string; code: string; label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/75 px-2.5 py-1 text-[11px] font-semibold text-[var(--ink)]">
      <span aria-hidden="true">{flag}</span>
      <span>{code}</span>
      {label ? <span className="hidden font-normal text-[var(--ink-soft)] lg:inline">{label}</span> : null}
    </span>
  );
}

function ArtworkDialog({
  work,
  onClose,
}: {
  work: Artwork | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();

  if (!work) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end bg-[rgba(20,24,21,0.58)] p-3 backdrop-blur-sm sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${work.artist}: ${work.title}`}
        className="max-h-[92vh] w-full overflow-y-auto rounded-[1.5rem] border border-[var(--line)] bg-[var(--paper)] shadow-[0_28px_90px_-32px_rgba(0,0,0,0.5)] sm:mx-auto sm:max-w-[980px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
          <img
            src={ARTWORK_IMAGES[work.id]}
            alt={work.alt}
            className="h-full max-h-[52vh] w-full object-cover lg:max-h-none"
          />
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--blue)]">
                {work.section}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-white/70 text-[var(--ink)] transition-colors hover:bg-white"
                aria-label={t("artworks.dialog.close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-4 text-[clamp(1.7rem,4vw,2.8rem)] font-semibold leading-tight tracking-[-0.02em] text-[var(--ink)]">
              {work.artist}
            </h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-[var(--ink)]">{work.title}</p>
            <div className="mt-8 border-t border-[var(--line)] pt-6">
              <h4 className="text-[12px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
                {t("artworks.dialog.details")}
              </h4>
              <p className="mt-4 text-[16px] leading-relaxed text-[var(--ink)]">{work.role}</p>
              <ul className="mt-5 space-y-3">
                {work.details.map((detail) => (
                  <li key={detail} className="rounded-2xl bg-white/55 p-4 text-[14px] leading-relaxed text-[var(--ink-soft)]">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            {work.source ? (
              <p className="mt-6 text-[12px] leading-relaxed text-[var(--ink-soft)]">
                {t("artworks.dialog.source")}: {work.source}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WastendPage() {
  const { t } = useTranslation();
  const [selectedWork, setSelectedWork] = useState<Artwork | null>(null);

  const meta = t("hero.meta", { returnObjects: true }) as MetaItem[];
  const presumptions = t("premise.cards", { returnObjects: true }) as Presumption[];
  const comparisonRows = t("comparison.rows", { returnObjects: true }) as ComparisonRow[];
  const participationSteps = t("participation.steps", { returnObjects: true }) as ParticipationStep[];
  const exhibitionSections = t("floorPlan.sections", { returnObjects: true }) as ExhibitionSection[];
  const artworks = t("artworks.items", { returnObjects: true }) as Artwork[];
  const outcomes = t("outcomes.items", { returnObjects: true }) as string[];
  const supports = t("resources.supports", { returnObjects: true }) as string[];
  const resourceNotes = t("resources.notes", { returnObjects: true }) as ResourceNote[];
  const venueFacts = t("venue.facts", { returnObjects: true }) as string[];
  const referenceGroups: ReferenceGroup[] = REFERENCE_LINKS.map((group) => ({
    region: t(`comparison.jurisdictions.${group.code}`),
    items: group.items,
  }));

  return (
    <>
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.08fr_0.92fr] md:px-10 md:py-24">
          <div className="min-w-0">
            <FadeUp>
              <span className="block text-[12px] uppercase tracking-[0.24em] text-[var(--green)]">
                {t("hero.eyebrow")}
              </span>
            </FadeUp>
            <FadeUp delay={0.08} y={28}>
              <h1 className="mt-5 max-w-[11ch] text-[clamp(3rem,8vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-[var(--ink)]">
                {t("hero.title")}
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-7 max-w-[26ch] text-[clamp(1.35rem,3vw,2.35rem)] leading-tight text-[var(--ink)]">
                {t("hero.subtitle")}
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-[var(--ink-soft)]">
                {t("hero.body")}
              </p>
            </FadeUp>
          </div>

          <ScaleIn className="min-w-0">
            <div className="w-full min-w-0 overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-white/55 p-3 shadow-[0_24px_80px_-56px_rgba(0,0,0,0.45)] sm:p-5">
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {meta.map((item) => (
                  <div key={item.label} className="min-w-0 rounded-2xl bg-[var(--paper)] p-3 sm:p-4">
                    <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--ink-soft)] sm:text-[11px]">
                      {item.label}
                    </span>
                    <p className="mt-2 break-words text-[12px] font-medium leading-snug text-[var(--ink)] sm:text-[14px]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 rounded-2xl bg-white/60 p-3 text-[11px] leading-relaxed text-[var(--ink-soft)] sm:text-[12px]">
                {t("hero.team")}
              </p>
            </div>
          </ScaleIn>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper-soft)]">
        <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-6 md:px-10 md:py-24">
          <SectionHeading eyebrow={t("premise.eyebrow")} title={t("premise.title")} />
          <FadeUp delay={0.08}>
            <p className="max-w-[68ch] text-[18px] leading-relaxed text-[var(--ink-soft)]">
              {t("premise.body")}
            </p>
          </FadeUp>

          <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {presumptions.map((item, index) => (
              <StaggerItem key={item.title}>
                <PixelCard
                  variant={PIXEL_VARIANTS[index % PIXEL_VARIANTS.length]}
                  noFocus
                  className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-white/55 p-6"
                >
                  <article className="pixel-card-content flex h-full flex-col">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--green)]">
                      {item.label}
                    </span>
                    <h3 className="mt-4 text-[1.35rem] font-semibold leading-tight text-[var(--ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {item.copy}
                    </p>
                  </article>
                </PixelCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-14 sm:px-6 md:px-10 md:py-24">
        <SectionHeading eyebrow={t("comparison.eyebrow")} title={t("comparison.title")} />
        <FadeUp delay={0.08}>
          <p className="max-w-[68ch] text-[18px] leading-relaxed text-[var(--ink-soft)]">
            {t("comparison.body")}
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-4 md:hidden">
          {comparisonRows.map((row) => (
            <article key={row.item} className="rounded-2xl border border-[var(--line)] bg-white/55 p-4">
              <div className="flex items-center gap-4">
                <ObjectIcon type={row.icon} />
                <h3 className="text-[1.25rem] font-semibold leading-tight text-[var(--ink)]">
                  {row.item}
                </h3>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {row.classifications.map((classification, index) => (
                  <div
                    key={`${row.item}-mobile-${JURISDICTIONS[index].code}`}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-3"
                  >
                    <FlagBadge
                      flag={JURISDICTIONS[index].flag}
                      code={JURISDICTIONS[index].code}
                    />
                    <p className="mt-3 text-[13px] leading-snug text-[var(--ink)]">{classification}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-2xl bg-white/65 p-4 text-[13px] leading-relaxed text-[var(--ink-soft)]">
                {row.note}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 hidden overflow-x-auto rounded-2xl border border-[var(--line)] bg-white/55 md:block">
          <div className="min-w-[920px]">
            <div className="grid grid-cols-[220px_repeat(5,minmax(130px,1fr))] border-b border-[var(--line)] bg-white/75 text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              <div className="p-4">{t("comparison.objectHeader")}</div>
              {JURISDICTIONS.map((jurisdiction) => (
                <div key={jurisdiction.code} className="border-l border-[var(--line)] p-4">
                  <FlagBadge
                    flag={jurisdiction.flag}
                    code={jurisdiction.code}
                    label={t(`comparison.jurisdictions.${jurisdiction.code}`)}
                  />
                </div>
              ))}
            </div>

            {comparisonRows.map((row) => (
              <article key={row.item} className="border-b border-[var(--line)] last:border-b-0">
                <div className="grid grid-cols-[220px_repeat(5,minmax(130px,1fr))]">
                  <div className="flex items-center gap-4 bg-[var(--paper)] p-4">
                    <ObjectIcon type={row.icon} />
                    <h3 className="text-[16px] font-semibold leading-tight text-[var(--ink)]">{row.item}</h3>
                  </div>
                  {row.classifications.map((classification, index) => (
                    <div
                      key={`${row.item}-${JURISDICTIONS[index].code}`}
                      className="border-l border-[var(--line)] p-4"
                    >
                      <div className="mb-3 lg:hidden">
                        <FlagBadge
                          flag={JURISDICTIONS[index].flag}
                          code={JURISDICTIONS[index].code}
                        />
                      </div>
                      <p className="text-[14px] leading-snug text-[var(--ink)]">{classification}</p>
                    </div>
                  ))}
                </div>
                <p className="border-t border-[var(--line)] py-3 pl-[236px] pr-4 text-[13px] leading-relaxed text-[var(--ink-soft)]">
                  {row.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper-soft)]">
        <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-6 md:px-10 md:py-24">
          <SectionHeading eyebrow={t("participation.eyebrow")} title={t("participation.title")} />
          <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {participationSteps.map((step, index) => (
              <StaggerItem key={step.step}>
                <PixelCard
                  variant={PIXEL_VARIANTS[(index + 1) % PIXEL_VARIANTS.length]}
                  noFocus
                  className="h-full rounded-2xl border border-[var(--line)] bg-white/55 p-6"
                >
                  <article className="pixel-card-content h-full">
                    <span className="text-[12px] uppercase tracking-[0.24em] text-[var(--blue)]">
                      {t("participation.stepLabel")} {step.step}
                    </span>
                    <h3 className="mt-4 text-[1.4rem] font-semibold leading-tight text-[var(--ink)]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {step.detail}
                    </p>
                    <ul className="mt-6 space-y-2">
                      {step.prompts.map((prompt) => (
                        <li
                          key={prompt}
                          className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-4 py-2 text-[13px] text-[var(--ink)]"
                        >
                          {prompt}
                        </li>
                      ))}
                    </ul>
                  </article>
                </PixelCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-14 sm:px-6 md:px-10 md:py-24">
        <SectionHeading eyebrow={t("floorPlan.eyebrow")} title={t("floorPlan.title")} />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.95fr]">
          <ScaleIn>
            <figure className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white/70 p-3">
              <img
                src={floorPlan}
                alt={t("floorPlan.imageAlt")}
                className="w-full rounded-xl"
              />
              <figcaption className="px-2 py-3 text-[12px] leading-relaxed text-[var(--ink-soft)]">
                {t("floorPlan.caption")}
                {t("floorPlan.source") ? (
                  <>
                    <br />
                    {t("floorPlan.source")}
                  </>
                ) : null}
              </figcaption>
            </figure>
          </ScaleIn>
          <div className="space-y-4">
            {exhibitionSections.map((section) => (
              <FadeUp key={section.title}>
                <article className="rounded-2xl border border-[var(--line)] bg-white/55 p-6">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--green)]">
                    {section.anchor}
                  </span>
                  <h3 className="mt-3 text-[1.25rem] font-semibold leading-tight text-[var(--ink)]">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                    {section.copy}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper-soft)]">
        <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-6 md:px-10 md:py-24">
          <SectionHeading eyebrow={t("artworks.eyebrow")} title={t("artworks.title")} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {artworks.map((work) => (
              <FadeUp key={work.id}>
                <article className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white/55">
                  <button
                    type="button"
                    onClick={() => setSelectedWork(work)}
                    className="group block w-full text-left"
                  >
                    <img
                      src={ARTWORK_IMAGES[work.id]}
                      alt={work.alt}
                      className="aspect-[16/7] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                    <div className="p-6">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--blue)]">
                        {work.section}
                      </span>
                      <h3 className="mt-3 text-[1.3rem] font-semibold leading-tight text-[var(--ink)]">
                        {work.artist}
                      </h3>
                      <p className="mt-1 text-[14px] leading-snug text-[var(--ink)]">{work.title}</p>
                      <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">{work.role}</p>
                      <span className="mt-5 inline-flex rounded-full border border-[var(--line)] bg-[var(--paper)] px-4 py-2 text-[13px] text-[var(--ink)] transition-colors group-hover:bg-white">
                        {t("artworks.open")}
                      </span>
                    </div>
                  </button>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-14 sm:px-6 md:px-10 md:py-24">
        <SectionHeading eyebrow={t("outcomes.eyebrow")} title={t("outcomes.title")} />
        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {outcomes.map((outcome, index) => (
            <StaggerItem key={outcome}>
              <div className="flex h-full gap-4 rounded-2xl border border-[var(--line)] bg-white/55 p-5">
                <span className="text-[12px] uppercase tracking-[0.18em] text-[var(--green)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[16px] leading-relaxed text-[var(--ink)]">{outcome}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-14 sm:px-6 md:px-10 md:py-24">
        <SectionHeading eyebrow={t("venue.eyebrow")} title={t("venue.title")} />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <FadeUp>
            <div>
              <p className="text-[18px] leading-relaxed text-[var(--ink-soft)]">{t("venue.body")}</p>
              <ul className="mt-6 space-y-3">
                {venueFacts.map((fact) => (
                  <li key={fact} className="rounded-2xl border border-[var(--line)] bg-white/55 p-4 text-[15px] text-[var(--ink)]">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
          <ScaleIn>
            <figure className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white/70 p-3">
              <img
                src={jccacImage}
                alt={t("venue.imageAlt")}
                className="aspect-[16/9] w-full rounded-xl object-cover"
              />
              <figcaption className="px-2 py-3 text-[12px] leading-relaxed text-[var(--ink-soft)]">
                {t("venue.caption")}
                <br />
                {t("venue.source")}
              </figcaption>
            </figure>
          </ScaleIn>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper-soft)]">
        <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-6 md:px-10 md:py-24">
          <SectionHeading eyebrow={t("resources.eyebrow")} title={t("resources.title")} />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.9fr]">
            <FadeUp>
              <div>
                <h3 className="text-[1.25rem] font-semibold text-[var(--ink)]">{t("resources.heading")}</h3>
                <ul className="mt-5 space-y-3">
                  {supports.map((support) => (
                    <li key={support} className="rounded-2xl border border-[var(--line)] bg-white/55 p-4 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {support}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
            <FadeUp delay={0.08}>
              <div className="grid gap-4">
                {resourceNotes.map((note) => (
                  <div key={note.label} className="rounded-2xl border border-[var(--line)] bg-white/55 p-5">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
                      {note.label}
                    </span>
                    <p className="mt-3 text-[1.35rem] font-normal leading-tight text-[var(--ink)]">
                      {note.value}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--paper)]">
        <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-6 md:px-10 md:py-24">
          <SectionHeading eyebrow={t("references.eyebrow")} title={t("references.title")} />
          <ReferenceList groups={referenceGroups} />
          <div className="mt-12 border-t border-[var(--line)] pt-8">
            <h3 className="text-[12px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
              {t("references.theory")}
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
              {THEORY.map((item) => (
                <li key={item} className="text-[13px] leading-relaxed text-[var(--ink-soft)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ArtworkDialog work={selectedWork} onClose={() => setSelectedWork(null)} />
    </>
  );
}
