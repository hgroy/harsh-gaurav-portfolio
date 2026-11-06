import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Award,
  ShieldCheck,
  Download,
  ExternalLink,
  Copy,
  Check,
  Search,
  Eye,
  ZoomIn,
  FileText,
  Sun,
  Moon,
  CheckCircle2,
  Calendar,
  Hash,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Layers,
  Terminal,
  Database,
  Code2,
} from 'lucide-react';
import {
  PROFILE_DATA,
  CERTIFICATIONS_DATA,
  EDUCATION_DATA,
  CertificationCredential,
} from '../data/portfolioData';
import { downloadAssetFile } from '../utils/downloadHelper';
import {
  SNAPPY_SPRING,
  SNAPPY_TAB_SPRING,
  BUTTON_MOTION,
  CARD_MOTION,
} from '../utils/motionConfig';

interface CertificationsPageProps {
  isDark: boolean;
  onToggleTheme: () => void;
  initialCertId?: string | null;
  onBackToPortfolio: (targetSection?: string) => void;
  onOpenZoomModal: (cert: CertificationCredential) => void;
  onOpenResume: () => void;
}

type DomainFilter = 'all' | 'linux' | 'data' | 'backend' | 'frontend';

const DOMAIN_FILTERS: {
  id: DomainFilter;
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'all', label: 'All Credentials', count: 6, icon: Layers },
  { id: 'linux', label: 'Linux & Cloud', count: 1, icon: Terminal },
  { id: 'data', label: 'Data & Databases', count: 3, icon: Database },
  { id: 'backend', label: 'Core Java & OOP', count: 1, icon: Code2 },
  { id: 'frontend', label: 'Frontend & UI', count: 1, icon: Award },
];

function getCertDomain(certId: string): DomainFilter {
  if (certId === 'rhcsa-red-hat') return 'linux';
  if (
    certId === 'celebal-data-engineering-coe' ||
    certId === 'mongodb-indexes' ||
    certId === 'hackerrank-sql-basic'
  ) {
    return 'data';
  }
  if (certId === 'udemy-java-for-beginners') return 'backend';
  return 'frontend';
}

export const CertificationsPage: React.FC<CertificationsPageProps> = ({
  isDark,
  onToggleTheme,
  initialCertId,
  onBackToPortfolio,
  onOpenZoomModal,
  onOpenResume,
}) => {
  const [selectedCertId, setSelectedCertId] = useState<string>(
    initialCertId && CERTIFICATIONS_DATA.some((c) => c.id === initialCertId)
      ? initialCertId
      : CERTIFICATIONS_DATA[0].id
  );
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingKey, setDownloadingKey] = useState<string | null>(null);

  const selectedCert = useMemo(() => {
    return (
      CERTIFICATIONS_DATA.find((c) => c.id === selectedCertId) ||
      CERTIFICATIONS_DATA[0]
    );
  }, [selectedCertId]);

  const currentIndex = useMemo(() => {
    return CERTIFICATIONS_DATA.findIndex((c) => c.id === selectedCert.id);
  }, [selectedCert]);

  const filteredCerts = useMemo(() => {
    return CERTIFICATIONS_DATA.filter((cert) => {
      const matchesDomain =
        domainFilter === 'all' || getCertDomain(cert.id) === domainFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.credentialId.toLowerCase().includes(q) ||
        cert.category.toLowerCase().includes(q) ||
        cert.validatedSkills.some((s) => s.toLowerCase().includes(q));
      return matchesDomain && matchesSearch;
    });
  }, [domainFilter, searchQuery]);

  const handleCopyCredentialId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = async (url: string, filename: string, key: string) => {
    setDownloadingKey(key);
    await downloadAssetFile(url, filename);
    setTimeout(() => setDownloadingKey(null), 1200);
  };

  const handleSelectAndFocus = (cert: CertificationCredential) => {
    setSelectedCertId(cert.id);
    const inspectorEl = document.getElementById('credential-spotlight-inspector');
    if (inspectorEl) {
      inspectorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepCert = (direction: -1 | 1) => {
    const nextIdx =
      (currentIndex + direction + CERTIFICATIONS_DATA.length) %
      CERTIFICATIONS_DATA.length;
    setSelectedCertId(CERTIFICATIONS_DATA[nextIdx].id);
  };

  return (
    <div className="min-h-screen flex flex-col studio-canvas text-[#0F172A] dark:text-slate-100">
      {/* =====================================================================
          STICKY DEDICATED PAGE TOP NAVIGATION BAR (PERIWINKLE-SLATE STUDIO)
      ===================================================================== */}
      <header className="sticky top-0 z-30 w-full border-b border-white/40 dark:border-slate-800/80 bg-[#B4BED0]/85 dark:bg-[#0E1526]/85 backdrop-blur-xl">
        <div className="w-full flex items-center justify-between gap-4 px-6 sm:px-10 lg:px-16 xl:px-20 py-4">
          {/* Left: Back to Portfolio Home + Breadcrumb */}
          <div className="flex items-center gap-4 min-w-0">
            <motion.button
              {...BUTTON_MOTION}
              type="button"
              onClick={() => onBackToPortfolio()}
              className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-full bg-[#0B42D4] hover:bg-[#0935AC] text-white text-xs font-display font-semibold transition-colors cursor-pointer shadow-sm shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </motion.button>

            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-800 dark:text-slate-300 truncate">
              <span>/</span>
              <span className="font-bold text-white">Harsh Gaurav.</span>
              <span>/</span>
              <span className="text-[#0B42D4] dark:text-[#3B82F6] font-bold">
                Official Certifications &amp; Credentials Vault (6)
              </span>
            </div>
          </div>

          {/* Right: Theme Switcher + Interactive Resume */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl studio-card text-xs font-semibold text-[#0F172A] dark:text-slate-200 cursor-pointer whitespace-nowrap"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Periwinkle Slate</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#0B42D4]" />
                  <span className="hidden sm:inline">Midnight Dark</span>
                </>
              )}
            </button>

            <motion.button
              {...BUTTON_MOTION}
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 text-xs font-semibold rounded-xl studio-card text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
              <span className="hidden sm:inline">Interactive CV</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          MAIN DEDICATED CERTIFICATIONS PAGE CONTENT
      ===================================================================== */}
      <main className="relative z-10 flex-1 w-full px-6 sm:px-10 lg:px-16 xl:px-20 py-10 sm:py-12 space-y-12 sm:space-y-16">
        {/* -------------------------------------------------------------------
            ZONE 01: EXECUTIVE CREDENTIAL SUMMARY & ARCHITECTURAL HEADER
        ------------------------------------------------------------------- */}
        <section className="space-y-6">
          <div className="rounded-3xl studio-card p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <span className="text-xs sm:text-sm font-medium text-slate-700/85 dark:text-slate-400 tracking-wide">
                  - Verified Credentials Vault (6 Official Documents)
                </span>

                <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mt-2 leading-[1.06]">
                  Official Certifications &amp; Proof of Completion.
                </h1>

                <div className="w-16 h-2 bg-[#0B42D4] dark:bg-[#3B82F6] mt-4" />

                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 mt-4 leading-relaxed">
                  A structured directory of{' '}
                  <strong className="font-bold text-[#0F172A] dark:text-white">
                    Harsh Gaurav&rsquo;s
                  </strong>{' '}
                  6 official industry certifications across Enterprise Linux administration, Cloud &amp; Data Engineering, Database Indexing, Core Java OOP, and Frontend Engineering. Select any credential below to inspect the high-resolution document, copy its verification ID, or download the original PDF.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <motion.button
                  {...BUTTON_MOTION}
                  type="button"
                  onClick={() =>
                    downloadAssetFile(
                      PROFILE_DATA.resumePdfPath,
                      'Harsh_Gaurav_Software_Engineer_Resume.pdf'
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#0B42D4] hover:bg-[#0935AC] text-white text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-[#0B42D4]/25 cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full CV (.PDF)</span>
                </motion.button>
              </div>
            </div>

            {/* 4 Executive Summary Bento Tiles */}
            <div className="mt-8 pt-7 border-t border-white/40 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl studio-inset p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-700 dark:text-slate-400">
                  <span>01 · Total Verified</span>
                  <ShieldCheck className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6]" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#0F172A] dark:text-white mt-1.5">
                  06 Credentials
                </div>
                <div className="w-8 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2" />
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-2">
                  Official PDFs, PNGs &amp; Credential IDs included
                </p>
              </div>

              <div
                onClick={() => handleSelectAndFocus(CERTIFICATIONS_DATA[0])}
                className="rounded-2xl studio-inset p-4 hover:border-[#0B42D4]/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-700 dark:text-slate-400">
                  <span>02 · Systems &amp; Cloud</span>
                  <Terminal className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6]" />
                </div>
                <div className="text-lg sm:text-xl font-bold font-display text-[#0F172A] dark:text-white mt-1.5 truncate">
                  Red Hat RHCSA (RHEL 9.3)
                </div>
                <div className="w-8 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2" />
                <p className="text-xs text-[#0B42D4] dark:text-[#3B82F6] font-mono font-semibold mt-2">
                  Cert ID: 240-195-897 · Credly Verified
                </p>
              </div>

              <div
                onClick={() => handleSelectAndFocus(CERTIFICATIONS_DATA[1])}
                className="rounded-2xl studio-inset p-4 hover:border-[#0B42D4]/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-700 dark:text-slate-400">
                  <span>03 · Data &amp; Databases</span>
                  <Database className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6]" />
                </div>
                <div className="text-lg sm:text-xl font-bold font-display text-[#0F172A] dark:text-white mt-1.5 truncate">
                  Celebal COE · MongoDB · SQL
                </div>
                <div className="w-8 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2" />
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-2">
                  Data Pipelines, B-Tree Indexing &amp; SQL Joins
                </p>
              </div>

              <div
                onClick={() => handleSelectAndFocus(CERTIFICATIONS_DATA[4])}
                className="rounded-2xl studio-inset p-4 hover:border-[#0B42D4]/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-mono text-slate-700 dark:text-slate-400">
                  <span>04 · Backend &amp; Frontend</span>
                  <Code2 className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6]" />
                </div>
                <div className="text-lg sm:text-xl font-bold font-display text-[#0F172A] dark:text-white mt-1.5 truncate">
                  Udemy Java · HackerRank CSS
                </div>
                <div className="w-8 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2" />
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-2">
                  14.5h Core Java (Navin Reddy) &amp; Responsive UI
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            ZONE 02: INTERACTIVE MASTER-DETAIL CREDENTIAL SPOTLIGHT INSPECTOR
        ------------------------------------------------------------------- */}
        <section id="credential-spotlight-inspector" className="scroll-mt-24 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs sm:text-sm font-medium text-slate-700/85 dark:text-slate-400 tracking-wide">
                - Interactive Document Spotlight · Credential {selectedCert.index} of 06
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white mt-1">
                Active Certificate Inspector.
              </h2>
              <div className="w-14 h-1.5 bg-[#0B42D4] dark:bg-[#3B82F6] mt-3" />
            </div>

            {/* Prev / Next Selector Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStepCert(-1)}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl studio-card text-xs font-mono font-semibold text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={() => handleStepCert(1)}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl studio-card text-xs font-mono font-semibold text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 transition-colors cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick 6-Tab Switcher Bar */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl studio-card overflow-x-auto no-scrollbar">
            {CERTIFICATIONS_DATA.map((cert) => {
              const isSelected = cert.id === selectedCert.id;
              return (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => setSelectedCertId(cert.id)}
                  className={`relative min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-700 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="certPageSpotlightTab"
                      transition={SNAPPY_TAB_SPRING}
                      className="absolute inset-0 rounded-xl bg-[#0B42D4] shadow-xs"
                    />
                  )}
                  <span className="relative z-10">
                    {cert.index}. {cert.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 12-Column Master-Detail Split View */}
          <motion.div
            key={selectedCert.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SNAPPY_SPRING}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* Left 7 Columns: High-Resolution Rendered Certificate Stage */}
            <div className="lg:col-span-7 rounded-3xl studio-card p-5 sm:p-6 flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-white/40 dark:border-slate-800 text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 text-[#0B42D4] dark:text-[#3B82F6] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Official Rendered Document · {selectedCert.issuer}</span>
                </span>
                <button
                  type="button"
                  onClick={() => onOpenZoomModal(selectedCert)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B42D4] text-white hover:bg-[#0935AC] font-semibold transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Full-Screen Zoom</span>
                </button>
              </div>

              <div
                onClick={() => onOpenZoomModal(selectedCert)}
                className="relative flex-1 min-h-[280px] sm:min-h-[380px] rounded-2xl studio-inset p-3 sm:p-5 flex items-center justify-center overflow-hidden cursor-zoom-in group"
              >
                <img
                  src={selectedCert.imagePath}
                  alt={`${selectedCert.title} — Awarded to Harsh Gaurav`}
                  referrerPolicy="no-referrer"
                  className="max-h-[420px] w-auto max-w-full object-contain rounded-lg shadow-lg bg-white transition-transform duration-200 group-hover:scale-[1.015]"
                />
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B42D4] text-white text-xs font-mono shadow-md">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Click to Zoom High-Res</span>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/40 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-700 dark:text-slate-400">
                <span>Recipient: Harsh Gaurav</span>
                <span>Issued: {selectedCert.issueDate}</span>
                <span>Credential ID: {selectedCert.credentialId}</span>
              </div>
            </div>

            {/* Right 5 Columns: Structured Audit & Verification Dossier */}
            <div className="lg:col-span-5 rounded-3xl studio-card p-5 sm:p-7 flex flex-col justify-between">
              <div className="space-y-5">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-700 dark:text-slate-400">
                    <span className="font-bold text-[#0B42D4] dark:text-[#3B82F6]">
                      Credential #{selectedCert.index} · {selectedCert.category}
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#0B42D4] dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white mt-3 leading-snug">
                    {selectedCert.title}
                  </h3>
                  <div className="w-12 h-1.5 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2.5" />

                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-3 leading-relaxed">
                    {selectedCert.summary}
                  </p>
                </div>

                {/* Structured Verification Metadata Table */}
                <div className="rounded-2xl studio-inset p-4 space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/40 dark:border-slate-800">
                    <span className="text-slate-700 dark:text-slate-400">
                      Issuing Organization
                    </span>
                    <span className="font-bold text-[#0F172A] dark:text-white text-right">
                      {selectedCert.issuer}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/40 dark:border-slate-800">
                    <span className="text-slate-700 dark:text-slate-400 inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
                      <span>Issue Date</span>
                    </span>
                    <span className="font-semibold text-[#0F172A] dark:text-white">
                      {selectedCert.issueDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-700 dark:text-slate-400 inline-flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
                      <span>Credential ID</span>
                    </span>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-bold text-[#0F172A] dark:text-white truncate max-w-[150px] sm:max-w-[200px]">
                        {selectedCert.credentialId}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCredentialId(selectedCert.credentialId)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md studio-card text-[11px] font-bold text-[#0B42D4] dark:text-[#3B82F6] cursor-pointer shrink-0"
                      >
                        {copiedId === selectedCert.credentialId ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Validated Competencies */}
                <div>
                  <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-400 mb-2">
                    Validated Technical Competencies
                  </div>
                  <p className="text-xs font-mono text-[#0F172A] dark:text-slate-200 leading-relaxed">
                    {selectedCert.validatedSkills.join(' · ')}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-white/40 dark:border-slate-800 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <motion.button
                    {...BUTTON_MOTION}
                    type="button"
                    onClick={() =>
                      handleDownload(
                        selectedCert.pdfPath,
                        selectedCert.downloadFilename,
                        `${selectedCert.id}-pdf`
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#0B42D4] hover:bg-[#0935AC] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>
                      {downloadingKey === `${selectedCert.id}-pdf`
                        ? 'Downloading PDF...'
                        : 'Download Official PDF'}
                    </span>
                  </motion.button>

                  <motion.button
                    {...BUTTON_MOTION}
                    type="button"
                    onClick={() =>
                      handleDownload(
                        selectedCert.imagePath,
                        selectedCert.downloadFilename.replace('.pdf', '.png'),
                        `${selectedCert.id}-png`
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl studio-inset text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 text-xs font-mono font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
                    <span>
                      {downloadingKey === `${selectedCert.id}-png`
                        ? 'Saving PNG...'
                        : 'Save High-Res PNG'}
                    </span>
                  </motion.button>
                </div>

                {selectedCert.verifyUrl && (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 rounded-xl studio-inset text-[#0B42D4] dark:text-[#3B82F6] hover:underline text-xs font-mono font-bold transition-colors"
                  >
                    <span>Verify Credential Online at Issuing Authority</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* -------------------------------------------------------------------
            ZONE 03: STRUCTURED 6-CARD CERTIFICATIONS DIRECTORY
        ------------------------------------------------------------------- */}
        <section className="space-y-6 pt-6 border-t border-white/40 dark:border-slate-800/80">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <span className="text-xs sm:text-sm font-medium text-slate-700/85 dark:text-slate-400 tracking-wide">
                - Complete Credential Archive · 6 Official Certificates
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white mt-1">
                All 6 Verified Certifications.
              </h2>
              <div className="w-14 h-1.5 bg-[#0B42D4] dark:bg-[#3B82F6] mt-3" />
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-700 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, issuer, or ID..."
                className="w-full min-h-[42px] pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl studio-card text-[#0F172A] dark:text-white placeholder:text-slate-600 dark:placeholder:text-slate-400 focus:outline-none focus:border-[#0B42D4]"
              />
            </div>
          </div>

          {/* 6-Card Structured Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => {
              const isFocused = cert.id === selectedCert.id;
              return (
                <motion.article
                  key={cert.id}
                  {...CARD_MOTION}
                  onClick={() => handleSelectAndFocus(cert)}
                  className={`group rounded-3xl studio-card overflow-hidden flex flex-col justify-between transition-all cursor-pointer ${
                    isFocused ? 'ring-2 ring-[#0B42D4]' : ''
                  }`}
                >
                  <div>
                    {/* Certificate Visual Frame */}
                    <div className="relative h-52 w-full studio-inset border-b border-white/40 dark:border-slate-800 p-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={cert.imagePath}
                        alt={cert.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain rounded-lg shadow-md group-hover:scale-[1.03] transition-transform duration-200 bg-white"
                      />
                      {isFocused && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#0B42D4] text-white text-[10px] font-mono font-bold shadow-xs">
                          Active in Spotlight
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-700 dark:text-slate-400">
                        <span className="font-bold text-[#0B42D4] dark:text-[#3B82F6] truncate">
                          {cert.index} · {cert.issuer}
                        </span>
                        <span className="shrink-0">{cert.issueDate}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-display text-[#0F172A] dark:text-white mt-2 group-hover:text-[#0B42D4] dark:group-hover:text-[#3B82F6] transition-colors leading-snug">
                        {cert.title}
                      </h3>
                      <div className="w-8 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2" />

                      <div className="mt-3 text-[11px] font-mono text-slate-700 dark:text-slate-300 truncate">
                        ID: {cert.credentialId}
                      </div>

                      <p className="text-xs text-slate-800 dark:text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                        {cert.summary}
                      </p>

                      <p className="text-[11px] font-mono text-slate-700 dark:text-slate-400 mt-3 leading-relaxed">
                        {cert.validatedSkills.slice(0, 4).join(' · ')}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div
                    className="px-5 py-3.5 border-t border-white/40 dark:border-slate-800/80 studio-inset flex items-center justify-between gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenZoomModal(cert)}
                        className="inline-flex items-center gap-1.5 min-h-[36px] px-3.5 py-1.5 rounded-xl bg-[#0B42D4] hover:bg-[#0935AC] text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Zoom</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDownload(
                            cert.pdfPath,
                            cert.downloadFilename,
                            `${cert.id}-card-pdf`
                          )
                        }
                        className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-xl studio-card text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 text-xs font-mono font-semibold transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
                        <span>PDF</span>
                      </button>
                    </div>

                    {cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#0B42D4] dark:text-[#3B82F6] underline underline-offset-4"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSelectAndFocus(cert)}
                        className="text-xs font-mono font-bold text-[#0B42D4] dark:text-[#3B82F6] underline underline-offset-4 cursor-pointer"
                      >
                        Inspect ↑
                      </button>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* -------------------------------------------------------------------
            ZONE 04: ACADEMIC FOUNDATION & RETURN TO PORTFOLIO WORKSPACE
        ------------------------------------------------------------------- */}
        <section className="rounded-3xl studio-card p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0B42D4] dark:text-[#3B82F6]">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Foundation &amp; Production Application</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-[#0F172A] dark:text-white">
              {EDUCATION_DATA.degree} — {EDUCATION_DATA.institution} ({EDUCATION_DATA.score})
            </h3>
            <div className="w-12 h-1 bg-[#0B42D4] dark:bg-[#3B82F6]" />
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed pt-1">
              Every certification above is backed by production engineering delivery at{' '}
              <strong className="font-bold text-[#0F172A] dark:text-white">
                Code Garage Tech
              </strong>{' '}
              and{' '}
              <strong className="font-bold text-[#0F172A] dark:text-white">
                GeeksforGeeks
              </strong>
              . Return to the main portfolio to explore the 12 production case studies and interactive sandboxes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <motion.button
              {...BUTTON_MOTION}
              type="button"
              onClick={() => onBackToPortfolio()}
              className="inline-flex items-center gap-2 min-h-[46px] px-5 py-3 rounded-full bg-[#0B42D4] hover:bg-[#0935AC] text-white text-xs sm:text-sm font-semibold transition-colors shadow-md shadow-[#0B42D4]/25 cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Main Portfolio</span>
            </motion.button>

            <motion.button
              {...BUTTON_MOTION}
              type="button"
              onClick={() => onBackToPortfolio('systems')}
              className="inline-flex items-center gap-2 min-h-[46px] px-5 py-3 rounded-full studio-inset text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Terminal className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6]" />
              <span>Explore 12 Case Studies</span>
            </motion.button>
          </div>
        </section>
      </main>
    </div>
  );
};
