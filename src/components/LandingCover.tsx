import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Mail,
  FileText,
  Award,
  Sun,
  Moon,
  TrendingDown,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import {
  PROFILE_DATA,
  HERO_KPI_METRICS,
} from '../data/portfolioData';
import {
  SNAPPY_SPRING,
  SNAPPY_TAB_SPRING,
  BUTTON_MOTION,
  CARD_MOTION,
} from '../utils/motionConfig';

interface AnalyticsPlatformView {
  id: string;
  tabLabel: string;
  title: string;
  kicker: string;
  primaryMetric: string;
  primaryLabel: string;
  secondaryMetric: string;
  secondaryLabel: string;
  deltaBadge: string;
  beforeDisplay: string;
  afterDisplay: string;
  chartTitle: string;
  summary: string;
  targetSection: string;
  series: { label: string; before: number; after: number; note: string }[];
  pipelineSteps: { step: string; name: string; stat: string }[];
}

const ANALYTICS_PLATFORM_VIEWS: AnalyticsPlatformView[] = [
  {
    id: 'hybrid-query',
    tabLabel: '01. Hybrid Read (1.8s)',
    title: '60+ sec → 1.8 sec Hybrid Analytics Read Engine',
    kicker: 'Query & CDN Optimization · Code Garage Tech',
    primaryMetric: '1.8s',
    primaryLabel: 'Dashboard Refresh Latency',
    secondaryMetric: '0ms',
    secondaryLabel: 'Empty-Filter Short-Circuit',
    deltaBadge: '-97.0% Query Latency',
    beforeDisplay: '60.4s',
    afterDisplay: '1.8s',
    chartTitle: 'P95 Dashboard Refresh Latency Across Production Releases (Seconds)',
    summary:
      'Replaced 14-table BigQuery cache-warming scans with a hybrid PostgreSQL historical rollup + 2-day live BigQuery gap architecture and client-side Vercel Edge CDN short-circuit guards.',
    targetSection: 'systems',
    series: [
      { label: 'W1 (Legacy)', before: 60.4, after: 60.4, note: '14-table full scan on every page load' },
      { label: 'W2 (Audit)', before: 58.0, after: 34.2, note: 'Eliminated redundant unindexed joins' },
      { label: 'W3 (CDN Fix)', before: 54.0, after: 11.4, note: 'Fixed Set-Cookie header bypassing Vercel Edge CDN' },
      { label: 'W4 (Hybrid)', before: 52.0, after: 2.6, note: 'PostgreSQL historical rollup + 2-day live BigQuery gap' },
      { label: 'W5 (Cache)', before: 50.0, after: 1.9, note: 'React.cache() deduplication & single-query enrichment' },
      { label: 'Prod Now', before: 60.4, after: 1.8, note: 'Verified 1.8s P95 latency & 0ms empty-filter guard' },
    ],
    pipelineSteps: [
      { step: '01', name: 'Client Filter Guard', stat: '0ms Short-Circuit' },
      { step: '02', name: 'PostgreSQL Rollups', stat: 'Historical Cache' },
      { step: '03', name: 'BigQuery 2-Day Gap', stat: 'Live Delta Only' },
      { step: '04', name: 'React.cache() Enrich', stat: '1.8s Total P95' },
    ],
  },
  {
    id: 'distributed-locks',
    tabLabel: '02. Redis Locks (14k+)',
    title: 'Redis-Locked Celery Workers & 3-Repo Pub/Sub',
    kicker: 'Distributed Backend · Code Garage Tech',
    primaryMetric: '14,000+',
    primaryLabel: 'Concepts Backfilled Safely',
    secondaryMetric: '0%',
    secondaryLabel: 'Duplicate Worker Collisions',
    deltaBadge: '100% Idempotent Locks',
    beforeDisplay: '38% Collisions',
    afterDisplay: '0% Collisions',
    chartTitle: 'Concurrent Worker Collision Rate vs. Throughput Scaling (%)',
    summary:
      'Engineered atomic Redis mutex locks with dead-holder TTL recovery, exponential backoff retries, and a 5-stage database trigger state machine across 3 microservices.',
    targetSection: 'systems',
    series: [
      { label: 'Batch 1', before: 38, after: 12, note: 'Initial Celery worker pool without distributed lock' },
      { label: 'Batch 2', before: 42, after: 4, note: 'Added Redis SET NX lock per concept batch' },
      { label: 'Batch 3', before: 45, after: 1, note: 'Dead-holder heartbeat recovery & TTL lease extension' },
      { label: 'Batch 4', before: 49, after: 0.2, note: '5-stage DB trigger state machine (PENDING -> DONE)' },
      { label: 'Batch 5', before: 52, after: 0.1, note: 'GCP Pub/Sub fan-out across 3 production repositories' },
      { label: 'Prod Now', before: 55, after: 0.1, note: '14,000+ concepts processed with zero race collisions' },
    ],
    pipelineSteps: [
      { step: '01', name: 'GCP Pub/Sub Ingest', stat: '3-Repo Fan-Out' },
      { step: '02', name: 'Redis SET NX Mutex', stat: 'Atomic Lock + TTL' },
      { step: '03', name: 'Celery Worker Pool', stat: '14k+ Concepts' },
      { step: '04', name: '5-Stage DB Trigger', stat: 'Zero Collisions' },
    ],
  },
  {
    id: 'docker-etl',
    tabLabel: '03. Docker (<4m) & ETL',
    title: 'Shared Docker CI/CD (<4m) & Stripe/PayPal FinOps ETL',
    kicker: 'Cloud DevOps & Data Lake · Code Garage Tech',
    primaryMetric: '<4 min',
    primaryLabel: 'Cloud Build Pipeline Time',
    secondaryMetric: '0',
    secondaryLabel: 'Duplicate Financial Rows',
    deltaBadge: '-91% Build Time',
    beforeDisplay: '43.0 min',
    afterDisplay: '3.8 min',
    chartTitle: 'CI/CD Image Build Duration Across Pipeline Stages (Minutes)',
    summary:
      'Diagnosed a 2.34GB Python .venv context leak inflating Docker images to 4.19GB; built a shared base image + Cloud Build KANIKO cache and idempotent BigQuery SQL MERGE financial lake.',
    targetSection: 'systems',
    series: [
      { label: 'Legacy', before: 43.0, after: 43.0, note: '4.19GB bloated image with 2.34GB local .venv leak' },
      { label: '.dockerignore', before: 43.0, after: 21.5, note: 'Stripped 2.34GB .venv & build artifacts from context' },
      { label: 'Multi-Stage', before: 43.0, after: 12.0, note: 'Separated wheel builder from slim runtime layer' },
      { label: 'Shared Base', before: 43.0, after: 6.2, note: 'Pre-built shared base image in Artifact Registry' },
      { label: 'Layer Cache', before: 43.0, after: 4.1, note: 'Cloud Build Kaniko layer caching enabled' },
      { label: 'Prod Now', before: 43.0, after: 3.8, note: '<4m deploys + idempotent Stripe/PayPal SQL MERGE' },
    ],
    pipelineSteps: [
      { step: '01', name: 'Context Sanitizer', stat: '-2.34GB .venv Leak' },
      { step: '02', name: 'Shared Base Image', stat: 'Artifact Registry' },
      { step: '03', name: 'Cloud Build Cache', stat: '43m → 3.8m Build' },
      { step: '04', name: 'BigQuery SQL MERGE', stat: 'Stripe & PayPal Lake' },
    ],
  },
  {
    id: 'erp-rag',
    tabLabel: '04. Mini ERP & RAG',
    title: 'Mini ERP + CRM Portal & DocChat Cited RAG Engine',
    kicker: 'Full-Stack & Applied AI · Open-Source Flagships',
    primaryMetric: '4-Role',
    primaryLabel: 'RBAC & Atomic Stock Ledger',
    secondaryMetric: '100%',
    secondaryLabel: 'Page-Cited RAG Responses',
    deltaBadge: 'Zero Negative Stock',
    beforeDisplay: 'Uncited LLM',
    afterDisplay: 'pgvector Cited',
    chartTitle: 'Transactional Integrity & Citation Precision Across Modules (%)',
    summary:
      'Full-stack Next.js 15 + TypeScript + PostgreSQL ERP with atomic stock deduction ledger and DocChat RAG engine with hybrid pgvector cosine similarity and verifiable page citations.',
    targetSection: 'projects',
    series: [
      { label: 'RBAC Auth', before: 40, after: 100, note: '4-role JWT middleware (Admin, Manager, Sales, Warehouse)' },
      { label: 'Stock Ledger', before: 35, after: 100, note: 'Row-level locking prevents negative inventory under load' },
      { label: 'Audit Trail', before: 25, after: 100, note: 'Immutable double-entry stock movement ledger' },
      { label: 'PDF Chunker', before: 45, after: 96, note: 'Semantic token chunking with page-boundary metadata' },
      { label: 'pgvector', before: 50, after: 98, note: 'Hybrid HNSW cosine similarity + keyword rank' },
      { label: 'Cited Stream', before: 30, after: 100, note: 'Real-time SSE streaming with clickable page badges' },
    ],
    pipelineSteps: [
      { step: '01', name: '4-Role RBAC Guard', stat: 'JWT + Policy Check' },
      { step: '02', name: 'Atomic Stock Ledger', stat: '0 Negative Stock' },
      { step: '03', name: 'pgvector HNSW Index', stat: 'Top-K Cosine Match' },
      { step: '04', name: 'SSE Cited Stream', stat: 'Exact Page Proofs' },
    ],
  },
];

interface LandingCoverProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onEnterPortfolio: (targetSection?: string) => void;
  onOpenCertificationsPage: () => void;
  onOpenResume: () => void;
}

export const LandingCover: React.FC<LandingCoverProps> = ({
  isDark,
  onToggleTheme,
  onEnterPortfolio,
  onOpenCertificationsPage,
  onOpenResume,
}) => {
  const [selectedViewId, setSelectedViewId] = useState<string>(
    ANALYTICS_PLATFORM_VIEWS[0].id
  );
  const [hoveredBarIdx, setHoveredBarIdx] = useState<number | null>(null);

  const activeView =
    ANALYTICS_PLATFORM_VIEWS.find((v) => v.id === selectedViewId) ||
    ANALYTICS_PLATFORM_VIEWS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#CBD2DF] dark:bg-[#090D16] text-slate-900 dark:text-slate-100 selection:bg-[#0B42D4] selection:text-white">
      {/* =====================================================================
          DRIBBBLE-INSPIRED EDITORIAL HERO STAGE (3-COLUMN ASYMMETRIC SPLIT)
      ===================================================================== */}
      <section className="relative w-full bg-gradient-to-br from-[#BCC5D6] via-[#B4BED0] to-[#A8B4CA] dark:from-[#0E1526] dark:via-[#111A2E] dark:to-[#0A0F1D] overflow-hidden border-b border-white/25 dark:border-slate-800/80">
        {/* Subtle Radial Studio Lighting Behind Center Cutout Portrait */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full bg-white/18 dark:bg-[#1D4ED8]/15 blur-[110px]" />
        </div>

        {/* 3-Zone Top Bar Contract */}
        <header className="relative z-20 w-full flex items-center justify-between gap-8 px-6 sm:px-10 lg:px-16 xl:px-20 pt-7 pb-4">
          {/* Zone 1: Interlocking Geometric Monogram + Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onEnterPortfolio();
            }}
            className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 group"
          >
            <svg
              viewBox="0 0 44 44"
              className="w-10 h-10 text-[#0B42D4] dark:text-[#3B82F6] shrink-0 transition-transform duration-150 group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 8V28C10 32.4183 13.5817 36 18 36H20"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M22 8V36"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M10 21H22"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M34 14C34 10.6863 31.3137 8 28 8C24.6863 8 22 10.6863 22 14V28C22 32.4183 25.5817 36 30 36C33.3137 36 36 33.3137 36 30V23H29"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="8" r="2.5" fill="currentColor" />
              <circle cx="34" cy="14" r="2.5" fill="currentColor" />
            </svg>
            <span className="text-lg font-display font-bold tracking-tight text-white">
              Harsh Gaurav
            </span>
          </a>

          {/* Zone 2: Clean Single-Line Typographic Nav Links with Royal Blue Active Dot */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10 text-sm sm:text-base font-display font-semibold"
          >
            <button
              type="button"
              onClick={() => onEnterPortfolio()}
              className="relative py-1 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Services</span>
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0B42D4] dark:bg-[#3B82F6]" />
            </button>
            <button
              type="button"
              onClick={() => onEnterPortfolio('projects')}
              className="py-1 text-slate-700/75 dark:text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Works
            </button>
            <button
              type="button"
              onClick={() => onEnterPortfolio('systems')}
              className="py-1 text-slate-700/75 dark:text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Case Studies
            </button>
            <button
              type="button"
              onClick={onOpenCertificationsPage}
              className="py-1 text-slate-700/75 dark:text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Certifications
            </button>
            <button
              type="button"
              onClick={onOpenResume}
              className="py-1 text-slate-700/75 dark:text-slate-400 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Resume
            </button>
          </nav>

          {/* Zone 3: Primary CTA Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onEnterPortfolio('contact')}
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-display font-semibold text-white bg-[#0B42D4] hover:bg-[#0935AC] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-md shadow-[#0B42D4]/25"
            >
              Get in touch
            </button>
          </div>
        </header>

        {/* 3-Column Editorial Hero Grid */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-20 pt-4 lg:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* LEFT COLUMN: Stacked Display Name + Royal Blue Accent Bar + Minimal Social Row */}
            <div className="lg:col-span-4 flex flex-col justify-center py-6 lg:py-16 z-20">
              <h1
                className="font-display font-extrabold text-white tracking-tight leading-[1.03]"
                style={{ fontSize: 'clamp(3.1rem, 5.5vw, 5.4rem)' }}
              >
                Harsh
                <br />
                Gaurav.
              </h1>

              {/* Signature Royal Blue Horizontal Bar */}
              <div className="w-16 sm:w-20 h-2 bg-[#0B42D4] dark:bg-[#3B82F6] mt-6 sm:mt-7" />

              {/* Minimal Vector Social & Portfolio Icons */}
              <div className="flex items-center gap-6 mt-12 sm:mt-16 text-white">
                <button
                  type="button"
                  onClick={() => onEnterPortfolio()}
                  aria-label="Open Full Portfolio"
                  title="Full Portfolio Workspace"
                  className="p-2 -ml-2 text-white/90 hover:text-[#0B42D4] dark:hover:text-[#3B82F6] transition-colors cursor-pointer"
                >
                  <Globe className="w-5 h-5" />
                </button>
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  title="GitHub (@hgroy)"
                  className="p-2 text-white/90 hover:text-[#0B42D4] dark:hover:text-[#3B82F6] transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn (in/harshgaurav-dev)"
                  className="p-2 text-white/90 hover:text-[#0B42D4] dark:hover:text-[#3B82F6] transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  aria-label="Send Email"
                  title={PROFILE_DATA.email}
                  className="p-2 text-white/90 hover:text-[#0B42D4] dark:hover:text-[#3B82F6] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* CENTER COLUMN: Harsh Gaurav Real Cutout Portrait Anchored to Bottom */}
            <div className="lg:col-span-4 flex items-end justify-center self-end pt-2">
              <div className="relative flex items-end justify-center w-full">
                <img
                  src="/assets/profile/harsh-hero-cutout.png"
                  alt="Harsh Gaurav — Software Engineer"
                  referrerPolicy="no-referrer"
                  className="h-[380px] sm:h-[460px] lg:h-[540px] xl:h-[580px] w-auto object-contain object-bottom select-none drop-shadow-[0_24px_42px_rgba(15,23,42,0.32)]"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: - Introducing / Bio / My Story -> */}
            <div className="lg:col-span-4 flex flex-col justify-center py-6 lg:py-16 lg:pl-6 z-20">
              <span className="text-xs sm:text-sm font-medium text-slate-700/80 dark:text-slate-400 tracking-wide">
                - Introducing
              </span>

              <h2
                className="mt-2.5 text-2xl sm:text-3xl lg:text-[2.15rem] font-display font-bold text-white leading-[1.18]"
                style={{ textWrap: 'balance' }}
              >
                Software Engineer, based in Mohali, India.
              </h2>

              <p className="mt-4 text-sm sm:text-base text-white/90 dark:text-slate-300 leading-relaxed max-w-md">
                I&apos;m a passionate Full-Stack &amp; Data Systems Engineer at{' '}
                <strong className="font-semibold text-white">Code Garage Tech</strong>{' '}
                (Ex-GeeksforGeeks). If you have a great project that needs sub-2-second query speed and production-grade architecture, I&apos;m your guy.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={() => onEnterPortfolio()}
                  className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-display font-bold text-[#0B42D4] dark:text-[#3B82F6] cursor-pointer"
                >
                  <span className="underline underline-offset-8 decoration-2 decoration-[#0B42D4] dark:decoration-[#3B82F6]">
                    Enter Portfolio
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={onOpenCertificationsPage}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-semibold text-white/90 hover:text-white cursor-pointer"
                >
                  <Award className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6]" />
                  <span>6 Certifications Page ↗</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-semibold text-white/90 hover:text-white cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6]" />
                  <span>Interactive CV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BELOW HERO: INTERACTIVE PRODUCTION TELEMETRY & KPI PROOF STRIP
      ===================================================================== */}
      <main className="flex-1 w-full px-6 sm:px-10 lg:px-16 xl:px-20 py-10 sm:py-14 space-y-10 studio-section-alt">
        {/* 4-Column Full-Width KPI Proof Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HERO_KPI_METRICS.map((metric, idx) => (
            <motion.div
              key={idx}
              {...CARD_MOTION}
              onClick={() => onEnterPortfolio('systems')}
              className="group rounded-3xl studio-card p-6 flex flex-col justify-between transition-all cursor-pointer"
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-white drop-shadow-[0_1px_8px_rgba(15,23,42,0.14)] group-hover:text-[#0B42D4] dark:group-hover:text-[#3B82F6] transition-colors">
                    {metric.value}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#0B42D4] dark:text-[#3B82F6]">
                    {metric.previous}
                  </span>
                </div>
                <div className="w-10 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2.5" />
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-100 mt-2.5">
                  {metric.label}
                </h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                {metric.context}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Production Telemetry Board */}
        <div className="rounded-3xl studio-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/40 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono text-[#0B42D4] dark:text-[#3B82F6] font-bold">
                - 01 / Interactive Production Telemetry &amp; Architecture Benchmarks
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white mt-1">
                {activeView.title}
              </h2>
              <div className="w-12 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2.5" />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onToggleTheme}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl studio-inset text-xs font-semibold text-[#0F172A] dark:text-slate-200 cursor-pointer"
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Periwinkle Slate</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#0B42D4]" />
                    <span>Midnight Dark</span>
                  </>
                )}
              </button>

              <motion.button
                {...BUTTON_MOTION}
                type="button"
                onClick={() => onEnterPortfolio(activeView.targetSection)}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-xl bg-[#0B42D4] text-xs font-semibold text-white hover:bg-[#0935AC] transition-colors shrink-0 cursor-pointer"
              >
                <span>Inspect in Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

          {/* 4-Tab Bar */}
          <div
            role="tablist"
            aria-label="Select production analytics system"
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 mt-5 rounded-2xl studio-inset"
          >
            {ANALYTICS_PLATFORM_VIEWS.map((view) => {
              const active = view.id === selectedViewId;
              return (
                <button
                  key={view.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => {
                    setSelectedViewId(view.id);
                    setHoveredBarIdx(null);
                  }}
                  className={`relative min-h-[40px] px-3 py-2 text-xs font-mono font-medium rounded-xl transition-colors text-center cursor-pointer whitespace-nowrap ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-slate-700 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="landingAnalyticsTabPill"
                      transition={SNAPPY_TAB_SPRING}
                      className="absolute inset-0 rounded-xl bg-[#0B42D4] shadow-2xs"
                    />
                  )}
                  <span className="relative z-10 block">{view.tabLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 5 Cols: KPI Metrics & Pipeline Steps */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl studio-inset p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-slate-700 dark:text-slate-400">
                      {activeView.primaryLabel}
                    </span>
                    <TrendingDown className="w-4 h-4 text-[#0B42D4] dark:text-emerald-400" />
                  </div>
                  <div className="mt-2 flex items-baseline justify-between gap-2">
                    <span className="text-2xl font-bold font-mono tabular-nums text-[#0F172A] dark:text-white">
                      {activeView.primaryMetric}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0B42D4] dark:text-emerald-400">
                      {activeView.deltaBadge}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl studio-inset p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-slate-700 dark:text-slate-400">
                      {activeView.secondaryLabel}
                    </span>
                    <Zap className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6]" />
                  </div>
                  <div className="mt-2 flex items-baseline justify-between gap-2">
                    <span className="text-2xl font-bold font-mono tabular-nums text-[#0B42D4] dark:text-[#3B82F6]">
                      {activeView.secondaryMetric}
                    </span>
                    <span className="text-xs font-mono text-slate-700 dark:text-slate-400">
                      Verified Prod
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {activeView.pipelineSteps.map((step) => (
                  <div
                    key={step.step}
                    onClick={() => onEnterPortfolio(activeView.targetSection)}
                    className="rounded-xl studio-inset p-3.5 cursor-pointer hover:border-[#0B42D4]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#0B42D4] dark:text-[#3B82F6]">
                      <span className="font-bold">Step {step.step}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#0B42D4] dark:text-[#3B82F6]" />
                    </div>
                    <p className="text-xs font-bold text-[#0F172A] dark:text-white mt-1">
                      {step.name}
                    </p>
                    <p className="text-[11px] font-mono text-slate-700 dark:text-slate-400 mt-0.5">
                      {step.stat}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 7 Cols: Interactive Bar Chart */}
            <div className="lg:col-span-7 rounded-2xl studio-inset p-5 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold text-[#0F172A] dark:text-slate-200">
                    {activeView.chartTitle}
                  </span>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-400">
                      <span className="w-2.5 h-2.5 rounded-xs bg-slate-400 dark:bg-slate-700" />
                      Before Fix
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#0B42D4] dark:text-[#3B82F6] font-semibold">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#0B42D4] dark:bg-[#3B82F6]" />
                      After Architecture
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 items-end h-36 pt-4 px-2 border-b border-white/40 dark:border-slate-800">
                  {activeView.series.map((point, idx) => {
                    const maxVal = Math.max(
                      ...activeView.series.map((s) => Math.max(s.before, s.after)),
                      1
                    );
                    const beforeHeightPct = Math.max(
                      Math.round((point.before / maxVal) * 100),
                      12
                    );
                    const afterHeightPct = Math.max(
                      Math.round((point.after / maxVal) * 100),
                      8
                    );
                    const isHovered = hoveredBarIdx === idx;

                    return (
                      <div
                        key={point.label}
                        onMouseEnter={() => setHoveredBarIdx(idx)}
                        onMouseLeave={() => setHoveredBarIdx(null)}
                        onClick={() => onEnterPortfolio(activeView.targetSection)}
                        className="group flex flex-col items-center h-full justify-end cursor-pointer"
                      >
                        <div className="w-full flex items-end justify-center gap-1.5 h-24">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${beforeHeightPct}%` }}
                            transition={SNAPPY_SPRING}
                            className="w-3.5 sm:w-4 rounded-t-md bg-slate-400/70 dark:bg-slate-700"
                          />
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${afterHeightPct}%` }}
                            transition={SNAPPY_SPRING}
                            className={`w-3.5 sm:w-4 rounded-t-md bg-[#0B42D4] dark:bg-[#3B82F6] transition-opacity duration-150 ${
                              isHovered ? 'opacity-100 ring-2 ring-[#0B42D4]/40' : 'opacity-90'
                            }`}
                          />
                        </div>
                        <span className="mt-2 text-[11px] font-mono tabular-nums text-slate-700 dark:text-slate-400 truncate max-w-full">
                          {point.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="mt-3 text-xs font-mono text-slate-800 dark:text-slate-300 leading-relaxed">
                {hoveredBarIdx !== null
                  ? `${activeView.series[hoveredBarIdx].label}: ${activeView.series[hoveredBarIdx].note}`
                  : activeView.summary}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
