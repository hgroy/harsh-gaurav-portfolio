import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Database,
  Cpu,
  Cloud,
  Code2,
  ArrowRight,
  ArrowUpRight,
  Search,
  ChevronRight,
  Mail,
  Phone,
  Sun,
  Moon,
  Layers,
  Award,
  CheckCircle2,
  FileText,
  Sparkles,
  Download,
  ExternalLink,
  Copy,
  Check,
  Send,
  GraduationCap,
  ArrowUp,
  Globe,
} from 'lucide-react';
import {
  PROFILE_DATA,
  HERO_KPI_METRICS,
  EXPERIENCE_TIMELINE,
  CASE_STUDIES,
  FLAGSHIP_PROJECTS,
  SKILL_CATEGORIES,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  CaseStudy,
  CertificationCredential,
} from './data/portfolioData';
import { ArchitectureSimulator } from './components/ArchitectureSimulator';
import { DocChatSimulator } from './components/DocChatSimulator';
import { MiniErpShowcase } from './components/MiniErpShowcase';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CertificateModal } from './components/CertificateModal';
import { ResumeAndRequirementsModal } from './components/ResumeAndRequirementsModal';
import { LandingCover } from './components/LandingCover';
import { CertificationsPage } from './components/CertificationsPage';
import { NestedCertificationsVault } from './components/NestedCertificationsVault';
import { ScrollReveal } from './components/ScrollReveal';
import { downloadAssetFile } from './utils/downloadHelper';
import {
  SNAPPY_SPRING,
  SNAPPY_TAB_SPRING,
  BUTTON_MOTION,
  CARD_MOTION,
} from './utils/motionConfig';

const CATEGORY_META: Record<
  string,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  all: { label: 'All Case Studies (12)', icon: Layers },
  performance: { label: 'Query & Speed', icon: Database },
  backend: { label: 'Backend & Distributed', icon: Cpu },
  'data-etl': { label: 'Data & Cloud DevOps', icon: Cloud },
  fullstack: { label: 'Full-Stack & AI', icon: Code2 },
};

const NAV_ITEMS = [
  { id: 'top', label: 'Services', isPageRedirect: false },
  { id: 'projects', label: 'Works', isPageRedirect: false },
  { id: 'systems', label: 'Case Studies', isPageRedirect: false },
  { id: 'certificates', label: 'Certifications', isPageRedirect: true },
  { id: 'experience', label: 'My Story', isPageRedirect: false },
];

type ActivePageRoute = 'home' | 'certifications' | 'cover';

function parsePageFromLocation(): { page: ActivePageRoute; certId: string | null } {
  if (typeof window === 'undefined') return { page: 'home', certId: null };
  const params = new URLSearchParams(window.location.search);
  const pageParam = params.get('page');
  const certParam = params.get('cert');
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (
    pageParam === 'certifications' ||
    path.includes('/certifications') ||
    hash.includes('certifications')
  ) {
    return { page: 'certifications', certId: certParam };
  }
  if (pageParam === 'cover' || path.includes('/cover')) {
    return { page: 'cover', certId: null };
  }
  return { page: 'home', certId: null };
}

export function App() {
  // Default to Editorial Periwinkle-Slate Light Mode matching the Dribbble reference,
  // with instant 1-click toggle to Midnight Royal Dark Mode.
  const initialRoute = parsePageFromLocation();
  const [isDark, setIsDark] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<ActivePageRoute>(initialRoute.page);
  const [selectedCertPageId, setSelectedCertPageId] = useState<string | null>(
    initialRoute.certId
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [activeCertificate, setActiveCertificate] =
    useState<CertificationCredential | null>(null);
  const [resumeModalTab, setResumeModalTab] = useState<'resume' | 'checklist' | null>(
    null
  );
  const [activeSimulatorTab, setActiveSimulatorTab] = useState<
    'erp' | 'docchat' | 'architecture'
  >('erp');
  const [activeSection, setActiveSection] = useState<string>('top');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [showScrollTopBtn, setShowScrollTopBtn] = useState<boolean>(false);
  const [isNearFooter, setIsNearFooter] = useState<boolean>(false);

  // Direct Quick-Message Composer State
  const [senderName, setSenderName] = useState<string>('');
  const [senderRole, setSenderRole] = useState<string>(
    'Full-Stack / Backend Engineering Role'
  );
  const [senderNote, setSenderNote] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Listen to browser Back / Forward buttons for multi-page navigation
  useEffect(() => {
    const handlePopState = () => {
      const route = parsePageFromLocation();
      setActivePage(route.page);
      setSelectedCertPageId(route.certId);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Lightweight scroll check for the floating dock & footer proximity
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      setShowScrollTopBtn(scrollTop > 380);
      setIsNearFooter(scrollTop + winHeight >= docHeight - 180);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCertificationsPage = (certId?: string) => {
    const targetCertId = certId || null;
    setSelectedCertPageId(targetCertId);
    setActivePage('certifications');
    const url = targetCertId
      ? `?page=certifications&cert=${encodeURIComponent(targetCertId)}`
      : `?page=certifications`;
    try {
      window.history.pushState(
        { page: 'certifications', certId: targetCertId },
        '',
        url
      );
    } catch {
      // Ignore history errors in restricted sandboxed environments
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const openCoverPage = () => {
    setActivePage('cover');
    try {
      window.history.pushState({ page: 'cover' }, '', '?page=cover');
    } catch {
      // Ignore
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (activePage !== 'home') {
      setActivePage('home');
      try {
        window.history.pushState({ page: 'home' }, '', window.location.pathname);
      } catch {
        // Ignore
      }
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEnterPortfolio = (targetSection?: string) => {
    setActivePage('home');
    try {
      window.history.pushState({ page: 'home' }, '', window.location.pathname);
    } catch {
      // Ignore
    }
    if (targetSection) {
      setActiveSection(targetSection);
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    } else {
      setActiveSection('top');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  const filteredCaseStudies = useMemo(() => {
    return CASE_STUDIES.filter((study) => {
      const matchesCategory =
        selectedCategory === 'all' || study.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        study.title.toLowerCase().includes(q) ||
        study.summary.toLowerCase().includes(q) ||
        study.stack.some((t) => t.toLowerCase().includes(q)) ||
        study.problem.toLowerCase().includes(q) ||
        study.rootCause.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSendDirectMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[Portfolio Inquiry] ${senderRole} — ${senderName || 'Hiring Team'}`
    );
    const bodyText = `Hi Harsh,\n\nI reviewed your engineering portfolio and would love to connect regarding: ${senderRole}.\n\n${
      senderNote ? `Message:\n${senderNote}\n\n` : ''
    }Best regards,\n${senderName || 'Hiring Manager'}`;

    navigator.clipboard.writeText(
      `To: ${PROFILE_DATA.email}\nSubject: [Portfolio Inquiry] ${senderRole}\n\n${bodyText}`
    );
    setMessageStatus('copied');
    setTimeout(() => setMessageStatus('idle'), 3500);

    window.location.href = `mailto:${PROFILE_DATA.email}?subject=${subject}&body=${encodeURIComponent(
      bodyText
    )}`;
  };

  return (
    <div className="min-h-screen flex flex-col studio-canvas text-[#0F172A] dark:text-slate-100 selection:bg-[#0B42D4] selection:text-white transition-colors duration-200">
      {/* Floating Bottom-Right Quick Theme & Scroll-to-Top Dock (Auto-hides near Footer so it never overlaps footer links) */}
      <div
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 p-1.5 rounded-2xl studio-card shadow-xl transition-all duration-200 ${
          isNearFooter
            ? 'opacity-0 pointer-events-none translate-y-3'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <motion.button
          {...BUTTON_MOTION}
          type="button"
          onClick={() => setIsDark((prev) => !prev)}
          aria-label="Switch between Editorial Slate and Midnight Dark Theme"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold studio-inset text-[#0F172A] dark:text-slate-100 hover:border-[#0B42D4]/50 transition-colors cursor-pointer whitespace-nowrap"
        >
          {isDark ? (
            <>
              <Moon className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>Midnight Slate</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">
                → Periwinkle
              </span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-[#0B42D4]" />
              <span>Periwinkle Slate</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/70 text-[#0B42D4]">
                → Dark
              </span>
            </>
          )}
        </motion.button>

        {showScrollTopBtn && (
          <motion.button
            {...BUTTON_MOTION}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="p-2 rounded-xl bg-[#0B42D4] hover:bg-[#0935AC] text-white shadow-sm cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activePage === 'certifications' ? (
          <motion.div
            key="certifications-page-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={SNAPPY_SPRING}
          >
            <CertificationsPage
              isDark={isDark}
              onToggleTheme={() => setIsDark(!isDark)}
              initialCertId={selectedCertPageId}
              onBackToPortfolio={handleEnterPortfolio}
              onOpenZoomModal={(cert) => setActiveCertificate(cert)}
              onOpenResume={() => setResumeModalTab('resume')}
            />
          </motion.div>
        ) : activePage === 'cover' ? (
          <motion.div
            key="cover-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={SNAPPY_SPRING}
          >
            <LandingCover
              isDark={isDark}
              onToggleTheme={() => setIsDark(!isDark)}
              onEnterPortfolio={handleEnterPortfolio}
              onOpenCertificationsPage={() => openCertificationsPage()}
              onOpenResume={() => setResumeModalTab('resume')}
            />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={SNAPPY_SPRING}
          >
            <main id="top" className="relative z-10 flex-1">
              {/* =====================================================================
                  DRIBBBLE-INSPIRED 3-COLUMN ASYMMETRICAL EDITORIAL HERO STAGE
              ===================================================================== */}
              <section className="relative w-full studio-canvas overflow-hidden border-b border-white/35 dark:border-slate-800/80">
                {/* Soft Studio Backlight Behind Portrait */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[660px] h-[660px] rounded-full bg-white/22 dark:bg-[#2563EB]/15 blur-[120px]" />
                </div>

                {/* 3-Zone Top Bar Contract */}
                <header className="relative z-20 w-full flex items-center justify-between gap-8 px-6 sm:px-10 lg:px-16 xl:px-20 pt-7 pb-4">
                  {/* Zone 1: Interlocking Geometric Monogram + Single-Line Brand Wordmark */}
                  <a
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('top');
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
                    <span className="text-lg font-display font-bold tracking-tight text-white whitespace-nowrap shrink-0">
                      Harsh Gaurav
                    </span>
                  </a>

                  {/* Zone 2: Clean Typographic Nav Links with Signature Royal Blue Dot Under Active Link */}
                  <nav
                    aria-label="Primary Portfolio Navigation"
                    className="hidden md:flex items-center gap-8 lg:gap-10 text-sm sm:text-base font-display font-semibold"
                  >
                    {NAV_ITEMS.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isActive
                              ? 'text-white'
                              : 'text-slate-700/75 dark:text-slate-400 hover:text-white'
                          }`}
                        >
                          <span>{item.label}</span>
                          {isActive && (
                            <motion.span
                              layoutId="dribbbleNavActiveDot"
                              transition={SNAPPY_TAB_SPRING}
                              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0B42D4] dark:bg-[#3B82F6]"
                            />
                          )}
                        </button>
                      );
                    })}
                  </nav>

                  {/* Zone 3: 1 Primary Action Button */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => scrollToSection('contact')}
                      className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-display font-semibold text-white bg-[#0B42D4] hover:bg-[#0935AC] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-md shadow-[#0B42D4]/25"
                    >
                      Get in touch
                    </button>
                  </div>
                </header>

                {/* Mobile Quick Navigation Bar */}
                <div className="flex md:hidden items-center gap-5 overflow-x-auto px-6 py-2.5 border-t border-white/25 dark:border-slate-800/60 no-scrollbar">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={`relative py-1.5 text-xs font-display font-semibold whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'text-white'
                            : 'text-slate-700/80 dark:text-slate-400'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0B42D4] dark:bg-[#3B82F6]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 3-Column Editorial Hero Stage */}
                <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-20 pt-4 lg:pt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
                    {/* LEFT COLUMN (4 Cols): Oversized Display Name + Royal Cobalt Bar + Minimal Social Icons */}
                    <div className="lg:col-span-4 flex flex-col justify-center py-6 lg:py-16 z-20">
                      <h1
                        className="font-display font-extrabold text-white tracking-tight leading-[1.02]"
                        style={{
                          fontSize: 'clamp(3.25rem, 5.6vw, 5.5rem)',
                          textWrap: 'balance',
                        }}
                      >
                        Harsh
                        <br />
                        Gaurav.
                      </h1>

                      {/* Signature Royal Blue Accent Bar */}
                      <div className="w-16 sm:w-20 h-2 bg-[#0B42D4] dark:bg-[#3B82F6] mt-6 sm:mt-7" />

                      {/* Minimal White Social & Portfolio Icons Row */}
                      <div className="flex items-center gap-6 mt-12 sm:mt-16 text-white">
                        <button
                          type="button"
                          onClick={openCoverPage}
                          aria-label="Open Live Telemetry Cover"
                          title="Interactive Telemetry Board"
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
                        <button
                          type="button"
                          onClick={() => copyToClipboard(PROFILE_DATA.email, 'email')}
                          aria-label="Copy Email Address"
                          title={`Copy ${PROFILE_DATA.email}`}
                          className="p-2 text-white/90 hover:text-[#0B42D4] dark:hover:text-[#3B82F6] transition-colors cursor-pointer"
                        >
                          {copiedEmail ? (
                            <Check className="w-5 h-5 text-emerald-300" />
                          ) : (
                            <Mail className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* CENTER COLUMN (4 Cols): Harsh's Real Cutout Portrait Anchored Flush to Bottom */}
                    <div className="lg:col-span-4 flex items-end justify-center self-end pt-2">
                      <div className="relative flex items-end justify-center w-full">
                        <img
                          src="/assets/profile/harsh-hero-cutout.png"
                          alt="Harsh Gaurav — Software Engineer"
                          referrerPolicy="no-referrer"
                          className="h-[390px] sm:h-[470px] lg:h-[550px] xl:h-[590px] w-auto object-contain object-bottom select-none drop-shadow-[0_26px_46px_rgba(15,23,42,0.34)]"
                        />
                      </div>
                    </div>

                    {/* RIGHT COLUMN (4 Cols): - Introducing / Role Headline / Bio / My Story -> */}
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
                        I&apos;m the most passionate Full-Stack &amp; Data Systems Engineer you will ever get to work with. At{' '}
                        <strong className="font-semibold text-white">
                          Code Garage Tech
                        </strong>{' '}
                        (and previously{' '}
                        <strong className="font-semibold text-white">
                          GeeksforGeeks
                        </strong>
                        ), if you have a great project that needs sub-2-second speed and clean architecture, I&apos;m your guy.
                      </p>

                      {/* Signature Royal Blue Underlined CTA + Quick Actions */}
                      <div className="mt-8 flex flex-wrap items-center gap-6">
                        <button
                          type="button"
                          onClick={() => scrollToSection('experience')}
                          className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-display font-bold text-[#0B42D4] dark:text-[#3B82F6] cursor-pointer whitespace-nowrap"
                        >
                          <span className="underline underline-offset-8 decoration-2 decoration-[#0B42D4] dark:decoration-[#3B82F6]">
                            My story
                          </span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
                        </button>

                        <button
                          type="button"
                          onClick={() => openCertificationsPage()}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-semibold text-white/95 hover:text-[#0B42D4] dark:hover:text-[#3B82F6] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Award className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6]" />
                          <span>6 Certifications ↗</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setResumeModalTab('resume')}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-semibold text-white/95 hover:text-[#0B42D4] dark:hover:text-[#3B82F6] transition-colors cursor-pointer whitespace-nowrap"
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
                  FULL-WIDTH PROOF METRICS STRIP (TONAL PERIWINKLE-SLATE STUDIO CARDS)
              ===================================================================== */}
              <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 py-10 sm:py-12 border-b border-white/35 dark:border-slate-800/80 studio-section-alt">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                  {HERO_KPI_METRICS.map((metric, idx) => (
                    <ScrollReveal
                      key={idx}
                      delay={idx * 0.06}
                      yOffset={24}
                      hoverLift
                      onClick={() => scrollToSection('systems')}
                      className="group rounded-3xl studio-card p-6 flex flex-col justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-700 dark:text-slate-400">
                          <span>- 0{idx + 1} / Verified Impact</span>
                          <span className="font-semibold text-[#0B42D4] dark:text-[#3B82F6]">
                            {metric.previous}
                          </span>
                        </div>
                        <div className="mt-3 text-3xl sm:text-4xl font-bold font-mono tabular-nums tracking-tight text-white drop-shadow-[0_1px_8px_rgba(15,23,42,0.14)] group-hover:text-[#0B42D4] dark:group-hover:text-[#3B82F6] transition-colors">
                          {metric.value}
                        </div>
                        <div className="w-10 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-3" />
                        <h2 className="text-sm font-bold text-[#0F172A] dark:text-slate-100 mt-3">
                          {metric.label}
                        </h2>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                        {metric.context}
                      </p>
                    </ScrollReveal>
                  ))}
                </div>
              </section>

              {/* =====================================================================
                  SECTION 01: FEATURED WORKS & INTERACTIVE ENGINEERING LAB
              ===================================================================== */}
              <section
                id="projects"
                className="w-full py-16 sm:py-24 border-b border-white/35 dark:border-slate-800/80 studio-canvas"
              >
                <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 space-y-12">
                  {/* Editorial Section Header Matching Hero */}
                  <ScrollReveal
                    yOffset={22}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-slate-700/85 dark:text-slate-400 tracking-wide">
                        - 01 / Selected Works &amp; Interactive Sandboxes
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mt-2">
                        Shipped Applications &amp; Live Lab.
                      </h2>
                      <div className="w-16 h-1.5 bg-[#0B42D4] dark:bg-[#3B82F6] mt-4" />
                    </div>
                    <p className="text-sm text-white/90 dark:text-slate-300 max-w-md leading-relaxed">
                      Every flagship project pairs a real GitHub repository with an interactive browser sandbox below so you can test the architecture firsthand.
                    </p>
                  </ScrollReveal>

                  {/* 3 Flagship Project Tonal Studio Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {FLAGSHIP_PROJECTS.map((proj, idx) => (
                      <ScrollReveal
                        as="article"
                        key={proj.id}
                        delay={idx * 0.08}
                        yOffset={30}
                        hoverLift
                        className="rounded-3xl studio-card flex flex-col justify-between overflow-hidden transition-colors"
                      >
                        <div>
                          {/* Top Header */}
                          <div className="px-6 pt-6 pb-4 border-b border-white/40 dark:border-slate-800/80">
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-400">
                              <span className="font-bold text-[#0B42D4] dark:text-[#3B82F6]">
                                {proj.index}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{proj.category}</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white mt-2">
                              {proj.name}
                            </h3>
                            <div className="w-10 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2.5" />
                            <p className="text-xs font-mono font-semibold text-[#0B42D4] dark:text-[#3B82F6] mt-2.5">
                              {proj.tagline}
                            </p>

                            {/* Unboxed Metadata Stack Line */}
                            <p className="text-xs font-mono text-slate-700 dark:text-slate-400 mt-3 leading-relaxed">
                              {proj.stack.join(' · ')}
                            </p>
                          </div>

                          {/* Project Body */}
                          <div className="p-6 space-y-4">
                            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                              {proj.description}
                            </p>

                            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                              {proj.architectureHighlights.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 leading-relaxed">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6] shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="px-6 py-4 border-t border-white/40 dark:border-slate-800/80 studio-inset flex flex-wrap items-center justify-between gap-2.5">
                          <div className="flex flex-wrap items-center gap-2">
                            {proj.liveUrl && (
                              <motion.a
                                {...BUTTON_MOTION}
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B42D4] text-white hover:bg-[#0935AC] transition-colors whitespace-nowrap"
                              >
                                <span>Live App</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </motion.a>
                            )}
                            {proj.repoUrl && (
                              <motion.a
                                {...BUTTON_MOTION}
                                href={proj.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold studio-card text-[#0F172A] dark:text-slate-100 hover:border-[#0B42D4]/50 transition-colors whitespace-nowrap"
                              >
                                <span>GitHub Repo</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </motion.a>
                            )}
                          </div>

                          {(proj.id === 'mini-erp-crm' || proj.id === 'docchat-rag') && (
                            <motion.button
                              {...BUTTON_MOTION}
                              type="button"
                              onClick={() => {
                                setActiveSimulatorTab(
                                  proj.id === 'mini-erp-crm' ? 'erp' : 'docchat'
                                );
                                const labEl = document.getElementById(
                                  'interactive-lab-window'
                                );
                                labEl?.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'center',
                                });
                              }}
                              className="inline-flex items-center justify-center gap-1 min-h-[40px] px-2.5 py-2 text-xs font-mono font-bold text-[#0B42D4] dark:text-[#3B82F6] underline underline-offset-4 cursor-pointer whitespace-nowrap"
                            >
                              <span>Try in Lab ↓</span>
                            </motion.button>
                          )}
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>

                  {/* Interactive Engineering Sandbox (Tonal Studio Frame) */}
                  <ScrollReveal
                    delay={0.08}
                    yOffset={28}
                    className="rounded-3xl studio-card overflow-hidden"
                  >
                    <div
                      id="interactive-lab-window"
                      className="px-6 py-4 border-b border-white/40 dark:border-slate-800 studio-inset flex flex-col lg:flex-row lg:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-semibold text-[#0F172A] dark:text-slate-200 truncate">
                          Interactive Engineering Sandbox — Test Real Project Logic in Your Browser
                        </span>
                      </div>

                      {/* 3-Tab Segmented Switcher */}
                      <div
                        role="tablist"
                        aria-label="Interactive Project Simulators"
                        className="flex sm:inline-flex items-center gap-1 p-1 rounded-xl studio-card overflow-x-auto max-w-full no-scrollbar"
                      >
                        <motion.button
                          {...BUTTON_MOTION}
                          role="tab"
                          aria-selected={activeSimulatorTab === 'erp'}
                          type="button"
                          onClick={() => setActiveSimulatorTab('erp')}
                          className={`relative min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            activeSimulatorTab === 'erp'
                              ? 'text-white'
                              : 'text-slate-700 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                          }`}
                        >
                          {activeSimulatorTab === 'erp' && (
                            <motion.span
                              layoutId="activeLabTabPill"
                              transition={SNAPPY_TAB_SPRING}
                              className="absolute inset-0 rounded-lg bg-[#0B42D4] shadow-xs"
                            />
                          )}
                          <span className="relative z-10 inline-flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            <span>01. Mini ERP + CRM</span>
                          </span>
                        </motion.button>

                        <motion.button
                          {...BUTTON_MOTION}
                          role="tab"
                          aria-selected={activeSimulatorTab === 'docchat'}
                          type="button"
                          onClick={() => setActiveSimulatorTab('docchat')}
                          className={`relative min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            activeSimulatorTab === 'docchat'
                              ? 'text-white'
                              : 'text-slate-700 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                          }`}
                        >
                          {activeSimulatorTab === 'docchat' && (
                            <motion.span
                              layoutId="activeLabTabPill"
                              transition={SNAPPY_TAB_SPRING}
                              className="absolute inset-0 rounded-lg bg-[#0B42D4] shadow-xs"
                            />
                          )}
                          <span className="relative z-10 inline-flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>02. DocChat Cited RAG</span>
                          </span>
                        </motion.button>

                        <motion.button
                          {...BUTTON_MOTION}
                          role="tab"
                          aria-selected={activeSimulatorTab === 'architecture'}
                          type="button"
                          onClick={() => setActiveSimulatorTab('architecture')}
                          className={`relative min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            activeSimulatorTab === 'architecture'
                              ? 'text-white'
                              : 'text-slate-700 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                          }`}
                        >
                          {activeSimulatorTab === 'architecture' && (
                            <motion.span
                              layoutId="activeLabTabPill"
                              transition={SNAPPY_TAB_SPRING}
                              className="absolute inset-0 rounded-lg bg-[#0B42D4] shadow-xs"
                            />
                          )}
                          <span className="relative z-10 inline-flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5" />
                            <span>03. 1.8s Query &amp; Redis Sim</span>
                          </span>
                        </motion.button>
                      </div>
                    </div>

                    <div className="p-5 sm:p-8">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeSimulatorTab}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={SNAPPY_SPRING}
                        >
                          {activeSimulatorTab === 'erp' && <MiniErpShowcase />}
                          {activeSimulatorTab === 'docchat' && <DocChatSimulator />}
                          {activeSimulatorTab === 'architecture' && (
                            <ArchitectureSimulator />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                </div>
              </section>

              {/* =====================================================================
                  SECTION 02: 12 PRODUCTION ENGINEERING CASE STUDIES
              ===================================================================== */}
              <section
                id="systems"
                className="w-full py-16 sm:py-24 border-b border-white/35 dark:border-slate-800/80 studio-section-alt"
              >
                <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 space-y-10">
                  <ScrollReveal
                    yOffset={22}
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-slate-700/85 dark:text-slate-400 tracking-wide">
                        - 02 / Production Engineering Case Studies
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mt-2">
                        12 Deep-Dive Systems &amp; Benchmarks.
                      </h2>
                      <div className="w-16 h-1.5 bg-[#0B42D4] dark:bg-[#3B82F6] mt-4" />
                      <p className="text-sm text-white/90 dark:text-slate-300 mt-4 max-w-2xl leading-relaxed">
                        Click any architectural card to inspect the root cause, system topology diagram, production SQL/Python/TypeScript implementation, and verified before/after telemetry.
                      </p>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full lg:w-80">
                      <Search className="w-4 h-4 text-slate-700 dark:text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter by Redis, BigQuery, Docker..."
                        aria-label="Filter engineering case studies"
                        className="w-full min-h-[44px] pl-10 pr-4 py-2.5 text-xs font-mono rounded-xl studio-card text-[#0F172A] dark:text-white placeholder:text-slate-600 dark:placeholder:text-slate-400 focus:outline-none focus:border-[#0B42D4] transition-colors"
                      />
                    </div>
                  </ScrollReveal>

                  {/* Interactive Filter Buttons */}
                  <ScrollReveal delay={0.05} yOffset={16}>
                    <div
                      role="tablist"
                      aria-label="Case study categories"
                      className="flex items-center gap-2.5 overflow-x-auto pb-1.5 no-scrollbar"
                    >
                      {Object.entries(CATEGORY_META).map(([key, meta]) => {
                        const Icon = meta.icon;
                        const active = selectedCategory === key;
                        return (
                          <motion.button
                            key={key}
                            {...BUTTON_MOTION}
                            role="tab"
                            aria-selected={active}
                            type="button"
                            onClick={() => setSelectedCategory(key)}
                            className={`relative inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              active
                                ? 'text-white'
                                : 'studio-card text-[#0F172A] dark:text-slate-300 hover:text-[#0B42D4] dark:hover:text-white'
                            }`}
                          >
                            {active && (
                              <motion.span
                                layoutId="caseStudyCategoryPill"
                                transition={SNAPPY_TAB_SPRING}
                                className="absolute inset-0 rounded-xl bg-[#0B42D4] shadow-sm shadow-[#0B42D4]/25"
                              />
                            )}
                            <Icon className="relative z-10 w-3.5 h-3.5" />
                            <span className="relative z-10">{meta.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </ScrollReveal>

                  {/* Case Studies Bento Grid */}
                  {filteredCaseStudies.length === 0 ? (
                    <div className="rounded-3xl studio-card p-10 text-center">
                      <p className="text-base font-medium text-[#0F172A] dark:text-slate-200">
                        No case studies matched &ldquo;{searchQuery}&rdquo;.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory('all');
                          setSearchQuery('');
                        }}
                        className="mt-4 min-h-[42px] px-5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-[#0B42D4] text-white hover:bg-[#0935AC] transition-colors cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCaseStudies.map((study, idx) => (
                        <ScrollReveal
                          as="article"
                          key={study.id}
                          delay={(idx % 6) * 0.055}
                          yOffset={28}
                          hoverLift
                          onClick={() => setActiveCaseStudy(study)}
                          className="group rounded-3xl studio-card p-6 flex flex-col justify-between transition-colors cursor-pointer"
                        >
                          <div>
                            {/* Unboxed Metadata Row */}
                            <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-700 dark:text-slate-400">
                              <span>
                                {study.index} · {study.companyOrType}
                              </span>
                              <span className="font-bold text-[#0B42D4] dark:text-[#3B82F6] tabular-nums">
                                {study.headlineMetric}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold font-display text-[#0F172A] dark:text-white mt-3 group-hover:text-[#0B42D4] dark:group-hover:text-[#3B82F6] transition-colors leading-snug">
                              {study.title}
                            </h3>
                            <div className="w-8 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2.5" />

                            {/* Before -> After Benchmark Strip */}
                            <div className="mt-4 rounded-2xl studio-inset p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono tabular-nums">
                              <div className="min-w-0">
                                <span className="text-[11px] text-slate-600 dark:text-slate-400 block">
                                  Before
                                </span>
                                <span className="font-semibold text-rose-700 dark:text-rose-400 truncate block mt-0.5">
                                  {study.beforeValue}
                                </span>
                              </div>
                              <div className="min-w-0 border-t sm:border-t-0 sm:border-l border-white/40 dark:border-slate-800 pt-2 sm:pt-0 sm:pl-2.5">
                                <span className="text-[11px] text-slate-600 dark:text-slate-400 block">
                                  After Architecture
                                </span>
                                <span className="font-bold text-[#0B42D4] dark:text-emerald-400 truncate block mt-0.5">
                                  {study.afterValue}
                                </span>
                              </div>
                            </div>

                            <p className="text-xs text-slate-700 dark:text-slate-300 mt-4 line-clamp-3 leading-relaxed">
                              {study.summary}
                            </p>
                          </div>

                          <div className="mt-5 pt-4 border-t border-white/40 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs font-mono">
                            <span className="text-slate-700 dark:text-slate-400 truncate">
                              {study.stack.slice(0, 3).join(' · ')}
                            </span>
                            <span className="inline-flex items-center gap-1 font-bold text-[#0B42D4] dark:text-[#3B82F6] underline underline-offset-4 group-hover:translate-x-0.5 transition-transform shrink-0">
                              <span>Inspect</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* =====================================================================
                  SECTION 03: MY STORY, CAREER TRAJECTORY & EDUCATION
              ===================================================================== */}
              <section
                id="experience"
                className="w-full py-16 sm:py-24 border-b border-white/35 dark:border-slate-800/80 studio-canvas"
              >
                <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Sticky Summary Column (4 Cols) */}
                    <ScrollReveal
                      yOffset={24}
                      className="lg:col-span-4 lg:sticky lg:top-10 space-y-6"
                    >
                      <div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700/85 dark:text-slate-400 tracking-wide">
                          - 03 / My Story &amp; Career Trajectory
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mt-2">
                          Experience &amp; Education.
                        </h2>
                        <div className="w-16 h-1.5 bg-[#0B42D4] dark:bg-[#3B82F6] mt-4" />
                        <p className="text-sm text-white/90 dark:text-slate-300 mt-4 leading-relaxed">
                          From full-stack engineering at GeeksforGeeks to owning distributed data pipelines, Celery workers, and Next.js 15 platforms at Code Garage Tech.
                        </p>
                      </div>

                      {/* Education Highlight Card */}
                      <div className="rounded-3xl studio-card p-6 space-y-3">
                        <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-700 dark:text-slate-400">
                          <span className="inline-flex items-center gap-1.5 font-bold text-[#0B42D4] dark:text-[#3B82F6]">
                            <GraduationCap className="w-4 h-4" />
                            <span>{EDUCATION_DATA.period}</span>
                          </span>
                          <span className="font-bold text-[#0F172A] dark:text-white tabular-nums">
                            {EDUCATION_DATA.score}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-[#0F172A] dark:text-white">
                          {EDUCATION_DATA.degree}
                        </h3>
                        <p className="text-xs text-slate-700 dark:text-slate-300">
                          {EDUCATION_DATA.institution}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <motion.button
                          {...BUTTON_MOTION}
                          type="button"
                          onClick={() => setResumeModalTab('resume')}
                          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#0B42D4] text-white hover:bg-[#0935AC] transition-colors cursor-pointer whitespace-nowrap shadow-sm shadow-[#0B42D4]/25"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Interactive CV</span>
                        </motion.button>
                        <motion.button
                          {...BUTTON_MOTION}
                          type="button"
                          onClick={() =>
                            downloadAssetFile(
                              PROFILE_DATA.resumePdfPath,
                              'Harsh_Gaurav_Software_Engineer_Resume.pdf'
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-mono font-semibold studio-card text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Download className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
                          <span>Download PDF</span>
                        </motion.button>
                      </div>
                    </ScrollReveal>

                    {/* Right Vertical Timeline Column (8 Cols) */}
                    <div className="lg:col-span-8 space-y-6">
                      {EXPERIENCE_TIMELINE.map((exp, idx) => (
                        <ScrollReveal
                          key={exp.id}
                          delay={idx * 0.08}
                          yOffset={28}
                          className="rounded-3xl studio-card p-6 sm:p-8"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/40 dark:border-slate-800/80">
                            <div>
                              <span className="text-xs font-mono font-bold text-[#0B42D4] dark:text-[#3B82F6]">
                                0{idx + 1}. {exp.company} · {exp.projectNote}
                              </span>
                              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0F172A] dark:text-white mt-1">
                                {exp.role}
                              </h3>
                              <div className="w-10 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2.5" />
                            </div>
                            <div className="sm:text-right font-mono text-xs text-slate-700 dark:text-slate-400 tabular-nums">
                              <div className="font-bold text-[#0F172A] dark:text-slate-200">
                                {exp.period}
                              </div>
                              <div>{exp.location}</div>
                            </div>
                          </div>

                          <div className="mt-4 text-xs font-mono text-slate-700 dark:text-slate-400">
                            {exp.stack}
                          </div>

                          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {exp.highlights.map((item, i) => (
                              <div
                                key={i}
                                className="rounded-2xl studio-inset p-3.5 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 leading-relaxed"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* =====================================================================
                  SECTION 04: OFFICIAL VERIFIED CERTIFICATIONS VAULT (NESTED UI)
              ===================================================================== */}
              <section
                id="certificates"
                className="w-full py-16 sm:py-24 border-b border-white/35 dark:border-slate-800/80 studio-section-alt"
              >
                <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 space-y-8">
                  <ScrollReveal
                    yOffset={22}
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-slate-700/85 dark:text-slate-400 tracking-wide">
                        - 04 / Official Verified Credentials Vault (6)
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mt-2">
                        Certifications &amp; Credentials.
                      </h2>
                      <div className="w-16 h-1.5 bg-[#0B42D4] dark:bg-[#3B82F6] mt-4" />
                      <p className="text-xs sm:text-sm text-white/90 dark:text-slate-300 mt-4 max-w-2xl leading-relaxed">
                        Click on any certification below to reveal its{' '}
                        <strong className="font-semibold text-white">
                          official certificate preview, credential ID, and PDF download
                        </strong>{' '}
                        nested directly inside it.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <motion.button
                        {...BUTTON_MOTION}
                        type="button"
                        onClick={() => openCertificationsPage()}
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0B42D4] hover:bg-[#0935AC] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shadow-md shadow-[#0B42D4]/25"
                      >
                        <Award className="w-4 h-4" />
                        <span>Open Dedicated Vault Page (6)</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.button>

                      <a
                        href="?page=certifications"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl studio-card text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 text-xs font-mono font-semibold transition-colors whitespace-nowrap"
                      >
                        <span>Open in New Tab</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
                      </a>
                    </div>
                  </ScrollReveal>

                  {/* Interactive Multi-Level Nested Certifications Vault */}
                  <NestedCertificationsVault
                    onOpenDedicatedPage={(certId) =>
                      openCertificationsPage(certId)
                    }
                    onOpenZoomModal={(cert) => setActiveCertificate(cert)}
                  />
                </div>
              </section>

              {/* =====================================================================
                  SECTION 05: TECHNICAL ARSENAL & CAPABILITIES
              ===================================================================== */}
              <section
                id="skills"
                className="w-full py-16 sm:py-24 border-b border-white/35 dark:border-slate-800/80 studio-canvas"
              >
                <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 space-y-10">
                  <ScrollReveal
                    yOffset={22}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-4"
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-medium text-slate-700/85 dark:text-slate-400 tracking-wide">
                        - 05 / Technical Arsenal &amp; Services
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mt-2">
                        Production Stack &amp; Capabilities.
                      </h2>
                      <div className="w-16 h-1.5 bg-[#0B42D4] dark:bg-[#3B82F6] mt-4" />
                    </div>
                    <p className="text-xs sm:text-sm text-white/90 dark:text-slate-300 max-w-md leading-relaxed">
                      Categorized across backend workers, data engineering, cloud DevOps, and modern frontend architecture.
                    </p>
                  </ScrollReveal>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SKILL_CATEGORIES.map((group, idx) => (
                      <ScrollReveal
                        key={group.title}
                        delay={idx * 0.06}
                        yOffset={26}
                        hoverLift
                        className="rounded-3xl studio-card p-6 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/40 dark:border-slate-800 text-xs font-mono">
                            <span className="font-bold text-[#0B42D4] dark:text-[#3B82F6]">
                              {group.index}
                            </span>
                            <span className="text-slate-700 dark:text-slate-400 tabular-nums">
                              {group.skills.length} Technologies
                            </span>
                          </div>
                          <h3 className="text-lg font-bold font-display text-[#0F172A] dark:text-white mt-3">
                            {group.title}
                          </h3>
                          <div className="w-8 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2" />

                          <p className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-300 mt-4 leading-relaxed">
                            {group.skills.join(' · ')}
                          </p>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </section>

              {/* =====================================================================
                  SECTION 06: DIRECT CONTACT & HIRING STUDIO
              ===================================================================== */}
              <section
                id="contact"
                className="w-full py-16 sm:py-24 studio-section-alt"
              >
                <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left Column (5 Cols): Direct Contact Channels */}
                    <ScrollReveal
                      delay={0}
                      yOffset={26}
                      className="lg:col-span-5 rounded-3xl studio-card p-6 sm:p-8 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700/85 dark:text-slate-400 tracking-wide">
                          - 06 / Direct Contact
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white mt-2">
                          Let&apos;s build together.
                        </h2>
                        <div className="w-14 h-1.5 bg-[#0B42D4] dark:bg-[#3B82F6] mt-3" />
                        <p className="text-sm text-slate-800 dark:text-slate-300 mt-4 leading-relaxed">
                          Available for Full-Stack, Backend, and Data Engineering roles. Copy my direct contact details below or send an inquiry from the composer.
                        </p>

                        <div className="mt-6 space-y-3">
                          <div className="p-4 rounded-2xl studio-inset flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <Mail className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6] shrink-0" />
                              <div className="min-w-0">
                                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                                  Email
                                </div>
                                <div className="text-xs sm:text-sm font-mono font-bold text-[#0F172A] dark:text-white truncate">
                                  {PROFILE_DATA.email}
                                </div>
                              </div>
                            </div>
                            <motion.button
                              {...BUTTON_MOTION}
                              type="button"
                              onClick={() =>
                                copyToClipboard(PROFILE_DATA.email, 'email')
                              }
                              className="min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold studio-card text-[#0F172A] dark:text-slate-200 cursor-pointer shrink-0 inline-flex items-center justify-center"
                            >
                              {copiedEmail ? (
                                <span className="inline-flex items-center gap-1 text-[#0B42D4] dark:text-emerald-400">
                                  <Check className="w-3.5 h-3.5" /> Copied
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1">
                                  <Copy className="w-3.5 h-3.5" /> Copy
                                </span>
                              )}
                            </motion.button>
                          </div>

                          <div className="p-4 rounded-2xl studio-inset flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <Phone className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6] shrink-0" />
                              <div className="min-w-0">
                                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                                  Phone
                                </div>
                                <div className="text-xs sm:text-sm font-mono font-bold text-[#0F172A] dark:text-white tabular-nums truncate">
                                  {PROFILE_DATA.phone}
                                </div>
                              </div>
                            </div>
                            <motion.button
                              {...BUTTON_MOTION}
                              type="button"
                              onClick={() =>
                                copyToClipboard(PROFILE_DATA.phone, 'phone')
                              }
                              className="min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold studio-card text-[#0F172A] dark:text-slate-200 cursor-pointer shrink-0 inline-flex items-center justify-center"
                            >
                              {copiedPhone ? (
                                <span className="inline-flex items-center gap-1 text-[#0B42D4] dark:text-emerald-400">
                                  <Check className="w-3.5 h-3.5" /> Copied
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1">
                                  <Copy className="w-3.5 h-3.5" /> Copy
                                </span>
                              )}
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/40 dark:border-slate-800 flex flex-wrap items-center gap-3">
                        <a
                          href={PROFILE_DATA.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-[#0B42D4] text-white hover:bg-[#0935AC] transition-colors whitespace-nowrap"
                        >
                          <span>GitHub (@hgroy)</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={PROFILE_DATA.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4 py-2.5 rounded-xl text-xs font-mono font-semibold studio-inset text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 transition-colors whitespace-nowrap"
                        >
                          <span>LinkedIn</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </ScrollReveal>

                    {/* Right Column (7 Cols): Quick Message Composer */}
                    <ScrollReveal
                      delay={0.08}
                      yOffset={26}
                      className="lg:col-span-7 rounded-3xl studio-card p-6 sm:p-8"
                    >
                      <h3 className="text-xl font-bold font-display text-[#0F172A] dark:text-white">
                        Send a Direct Engineering Inquiry
                      </h3>
                      <div className="w-10 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2" />
                      <p className="text-xs text-slate-700 dark:text-slate-400 mt-2">
                        Opens your default mail client pre-filled and copies the formatted note to your clipboard.
                      </p>

                      <form
                        onSubmit={handleSendDirectMessage}
                        className="mt-5 space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                              Your Name / Team
                            </label>
                            <input
                              type="text"
                              value={senderName}
                              onChange={(e) => setSenderName(e.target.value)}
                              placeholder="e.g., Priya Sharma (Engineering Manager)"
                              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl studio-inset text-[#0F172A] dark:text-white placeholder:text-slate-600 dark:placeholder:text-slate-400 focus:outline-none focus:border-[#0B42D4]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                              Opportunity / Topic
                            </label>
                            <input
                              type="text"
                              value={senderRole}
                              onChange={(e) => setSenderRole(e.target.value)}
                              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl studio-inset text-[#0F172A] dark:text-white focus:outline-none focus:border-[#0B42D4]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            Message or Role Details
                          </label>
                          <textarea
                            rows={4}
                            value={senderNote}
                            onChange={(e) => setSenderNote(e.target.value)}
                            placeholder="Hi Harsh, we loved your hybrid BigQuery + Postgres work and Mini ERP architecture..."
                            className="w-full px-3.5 py-2.5 text-sm rounded-xl studio-inset text-[#0F172A] dark:text-white placeholder:text-slate-600 dark:placeholder:text-slate-400 focus:outline-none focus:border-[#0B42D4]"
                          />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <motion.button
                            {...BUTTON_MOTION}
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 rounded-xl text-sm font-semibold bg-[#0B42D4] hover:bg-[#0935AC] text-white transition-colors cursor-pointer shadow-md shadow-[#0B42D4]/25 whitespace-nowrap"
                          >
                            <Send className="w-4 h-4" />
                            <span>Compose &amp; Copy Inquiry</span>
                          </motion.button>

                          {messageStatus === 'copied' && (
                            <span className="text-xs font-mono font-bold text-[#0B42D4] dark:text-emerald-400">
                              Copied to clipboard &amp; opening email client!
                            </span>
                          )}
                        </div>
                      </form>
                    </ScrollReveal>
                  </div>
                </div>
              </section>
            </main>

            {/* Architectural Portfolio Footer Matching Hero & Studio Cards */}
            <footer className="relative z-10 w-full border-t border-white/40 dark:border-slate-800/80 studio-canvas py-12 sm:py-16">
              <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 space-y-8">
                {/* Main Footer Studio Card */}
                <div className="rounded-3xl studio-card p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-between">
                    {/* Left 5 Cols: Interlocking HG Monogram, Name & Royal Cobalt Accent Bar */}
                    <div className="lg:col-span-5 space-y-4">
                      <a
                        href="#top"
                        onClick={(e) => {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-3 group"
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
                        <span className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                          Harsh Gaurav.
                        </span>
                      </a>

                      <div className="w-14 h-1.5 bg-[#0B42D4] dark:bg-[#3B82F6]" />

                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 max-w-md leading-relaxed">
                        Software Engineer at{' '}
                        <strong className="font-semibold text-[#0F172A] dark:text-white">
                          Code Garage Tech
                        </strong>{' '}
                        (Ex-GeeksforGeeks) specializing in sub-2-second BigQuery/PostgreSQL data systems, Redis-locked Celery workers, and Next.js 15 platforms.
                      </p>
                    </div>

                    {/* Center 3 Cols: Quick Section Navigation */}
                    <div className="lg:col-span-3 space-y-3">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B42D4] dark:text-[#3B82F6]">
                        Portfolio Sections
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-display font-semibold text-[#0F172A] dark:text-slate-200">
                        {NAV_ITEMS.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => scrollToSection(item.id)}
                            className="text-left hover:text-[#0B42D4] dark:hover:text-[#3B82F6] transition-colors cursor-pointer py-0.5"
                          >
                            {item.label}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => scrollToSection('contact')}
                          className="text-left hover:text-[#0B42D4] dark:hover:text-[#3B82F6] transition-colors cursor-pointer py-0.5"
                        >
                          Direct Contact
                        </button>
                      </div>
                    </div>

                    {/* Right 4 Cols: Direct Vault, Resume, Theme & Back-to-Top Controls */}
                    <div className="lg:col-span-4 space-y-3">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B42D4] dark:text-[#3B82F6]">
                        Credentials &amp; Workspace Controls
                      </div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <motion.button
                          {...BUTTON_MOTION}
                          type="button"
                          onClick={() => openCertificationsPage()}
                          className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-xl bg-[#0B42D4] hover:bg-[#0935AC] text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm whitespace-nowrap"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Certifications Page (6)</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </motion.button>

                        <motion.button
                          {...BUTTON_MOTION}
                          type="button"
                          onClick={() => setResumeModalTab('resume')}
                          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl studio-inset text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 text-xs font-mono font-semibold transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
                          <span>Interactive Resume</span>
                        </motion.button>

                        <button
                          type="button"
                          onClick={openCoverPage}
                          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl studio-inset text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 text-xs font-mono font-semibold transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <span>Telemetry Cover</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsDark((prev) => !prev)}
                          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl studio-inset text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
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
                          onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }
                          aria-label="Scroll to top"
                          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl bg-[#0B42D4] hover:bg-[#0935AC] text-white text-xs font-semibold shadow-sm cursor-pointer whitespace-nowrap"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                          <span>Top</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar Inside Studio Footer Card */}
                  <div className="mt-8 pt-6 border-t border-white/40 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-800 dark:text-slate-400">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="font-bold text-[#0F172A] dark:text-white">
                        © {new Date().getFullYear()} Harsh Gaurav
                      </span>
                      <span>·</span>
                      <span>Mohali, Punjab, India</span>
                      <span>·</span>
                      <span>All 6 Credentials &amp; 12 Case Studies Verified</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-5">
                      <a
                        href={PROFILE_DATA.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#0F172A] dark:text-slate-200 hover:text-[#0B42D4] dark:hover:text-[#3B82F6] transition-colors"
                      >
                        GitHub (@hgroy)
                      </a>
                      <a
                        href={PROFILE_DATA.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#0F172A] dark:text-slate-200 hover:text-[#0B42D4] dark:hover:text-[#3B82F6] transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a
                        href={`mailto:${PROFILE_DATA.email}`}
                        className="font-semibold text-[#0B42D4] dark:text-[#3B82F6] hover:underline"
                      >
                        {PROFILE_DATA.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <CaseStudyModal
        study={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
      <CertificateModal
        certificate={activeCertificate}
        onClose={() => setActiveCertificate(null)}
        onSelectCertificate={(cert) => setActiveCertificate(cert)}
      />
      <ResumeAndRequirementsModal
        isOpen={resumeModalTab !== null}
        onClose={() => setResumeModalTab(null)}
      />
    </div>
  );
}

export default App;
