import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Briefcase,
  GraduationCap,
  Award,
  Camera,
  Code2,
  UserCheck,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  FileText,
  Download,
  Sliders,
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { downloadAssetFile } from '../utils/downloadHelper';
import { SNAPPY_SPRING, SNAPPY_TAB_SPRING, BUTTON_MOTION } from '../utils/motionConfig';

interface DeveloperProfileCardProps {
  onOpenResume: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenCertificationsPage: () => void;
}

const PORTRAIT_PRESETS = [
  {
    id: 'editorial' as const,
    tabLabel: 'Portrait HD',
    caption: 'HD River Portrait · Real Untouched Photo',
    src: '/assets/profile/harsh-editorial-portrait.png',
    filename: 'Harsh_Gaurav_Editorial_Portrait_HD.png',
  },
  {
    id: 'outdoor-wide' as const,
    tabLabel: 'Wide Frame',
    caption: 'River & Bridge Editorial · Real Untouched Photo',
    src: '/assets/profile/harsh-outdoor-wide.png',
    filename: 'Harsh_Gaurav_River_Bridge_Wide_HD.png',
  },
];

export const DeveloperProfileCard: React.FC<DeveloperProfileCardProps> = ({
  onOpenResume,
  onScrollToSection,
  onOpenCertificationsPage,
}) => {
  const [activeTab, setActiveTab] = useState<'editorial' | 'outdoor-wide' | 'code'>('editorial');
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomPhoto(reader.result);
        setActiveTab('editorial');
      }
    };
    reader.readAsDataURL(file);
  };

  const activePreset =
    PORTRAIT_PRESETS.find((p) => p.id === activeTab) || PORTRAIT_PRESETS[0];

  const currentPortraitSrc =
    customPhoto && activeTab === 'editorial' ? customPhoto : activePreset.src;

  const currentPortraitCaption =
    customPhoto && activeTab === 'editorial'
      ? 'Custom Uploaded Portrait'
      : activePreset.caption;

  return (
    <div className="relative rounded-2xl sm:rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#111115] shadow-xl shadow-zinc-950/5 dark:shadow-black/40 overflow-hidden flex flex-col justify-between h-full">
      {/* Top Window Chrome & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 sm:px-5 py-3.5 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/90 dark:bg-zinc-900/70">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-1.5 text-[11px] font-mono font-medium text-zinc-500 dark:text-zinc-400">
            harsh-gaurav.profile
          </span>
        </div>

        {/* Segmented Portrait / Code Switcher */}
        <div className="inline-flex flex-wrap items-center p-1 rounded-xl bg-zinc-200/75 dark:bg-zinc-950 border border-zinc-300/60 dark:border-zinc-800">
          {[
            { id: 'editorial' as const, label: 'Portrait HD', icon: UserCheck },
            { id: 'outdoor-wide' as const, label: 'Wide Frame', icon: Sparkles },
            { id: 'code' as const, label: 'harsh.ts', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative inline-flex items-center justify-center gap-1 min-h-[38px] sm:min-h-[30px] px-2.5 py-1.5 sm:py-1 rounded-lg text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-zinc-900 dark:text-white'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="profileIdentityTabPill"
                    transition={SNAPPY_TAB_SPRING}
                    className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-800 shadow-xs border border-zinc-200/80 dark:border-zinc-700"
                  />
                )}
                <Icon className="relative z-10 w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hidden File Input for Optional Custom Photo Test */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* Card Body */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab !== 'code' ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={SNAPPY_SPRING}
              className="space-y-4 flex-1 flex flex-col justify-between"
            >
              {/* Framed HD Outdoor Portrait Stage */}
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800 bg-zinc-950 aspect-[4/4.3] w-full group shadow-inner">
                <img
                  src={currentPortraitSrc}
                  alt={`${PROFILE_DATA.name} — ${currentPortraitCaption}`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Subtle Optical Rim Light & Editorial Bottom Gradient */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {/* Top-Left Live Status Pill */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 border border-white/15 text-white text-[11px] font-mono backdrop-blur-md max-w-[60%] sm:max-w-none truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="truncate">Open to Work · Full-Stack</span>
                </div>

                {/* Top-Right Quick Actions (Download Edited HD Photo / Upload Custom) */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      downloadAssetFile(currentPortraitSrc, activePreset.filename)
                    }
                    title="Save Enhanced HD Portrait (.PNG)"
                    className="inline-flex items-center justify-center gap-1 min-h-[38px] sm:min-h-[30px] px-3 sm:px-2.5 py-1.5 sm:py-1 rounded-full bg-zinc-950/85 hover:bg-indigo-600 text-white border border-white/15 text-[10px] font-mono backdrop-blur-md transition-colors cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Save HD Pic</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload custom photo"
                    className="min-w-[38px] min-h-[38px] sm:min-w-[30px] sm:min-h-[30px] p-2 sm:p-1.5 inline-flex items-center justify-center rounded-full bg-zinc-950/85 hover:bg-indigo-600 text-white border border-white/15 backdrop-blur-md transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                  </button>
                </div>

                {/* Bottom Overlay Identity & Framing Switcher Thumbnails */}
                <div className="absolute inset-x-3.5 bottom-3.5 flex items-end justify-between gap-2.5">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-indigo-300 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{currentPortraitCaption}</span>
                    </div>
                    <h2 className="text-lg sm:text-2xl font-bold font-display text-white tracking-tight leading-tight mt-0.5 truncate">
                      {PROFILE_DATA.name}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-zinc-300 font-mono truncate">
                      Software Engineer @ Code Garage Tech · Ex-GeeksforGeeks
                    </p>
                  </div>

                  {/* Quick 2-Thumbnail Switcher between Close-Up Portrait & Wide River Frame */}
                  <div className="flex items-center gap-1.5 bg-zinc-950/85 p-1 rounded-xl border border-white/15 backdrop-blur-md shrink-0">
                    {PORTRAIT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setActiveTab(preset.id)}
                        title={preset.caption}
                        className={`w-9 h-11 sm:w-8 sm:h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          activeTab === preset.id
                            ? 'border-indigo-400 scale-105 shadow-sm'
                            : 'border-transparent opacity-65 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={preset.src}
                          alt={preset.tabLabel}
                          className="w-full h-full object-cover object-top"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compact Credential Bento Strip Below Portrait (stacks on narrow mobile, 2-col on sm+) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onScrollToSection('experience')}
                  className="text-left min-h-[68px] p-3.5 sm:p-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/50 hover:border-indigo-500/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      Current Role
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                  </div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white mt-1 truncate">
                    Code Garage Tech
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                    Software Engineer · Nov 2025–Now
                  </p>
                </button>

                <button
                  type="button"
                  onClick={onOpenCertificationsPage}
                  className="text-left min-h-[68px] p-3.5 sm:p-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/50 hover:border-indigo-500/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      6 Certifications Page
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity text-indigo-500" />
                  </div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white mt-1 truncate">
                    Red Hat RHCSA
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                    + Celebal · MongoDB · SQL · Java · CSS
                  </p>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code-tab"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={SNAPPY_SPRING}
              className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed flex-1 flex flex-col justify-between"
            >
              <pre className="text-[11px] sm:text-xs leading-relaxed">
                <code>
                  <span className="text-violet-400">export const</span>{' '}
                  <span className="text-indigo-300">harshGaurav</span> = {'{\n'}
                  {'  '}name: <span className="text-emerald-400">'Harsh Gaurav'</span>,{'\n'}
                  {'  '}role: <span className="text-emerald-400">'Software Engineer'</span>,{'\n'}
                  {'  '}company: <span className="text-emerald-400">'Code Garage Tech'</span>,{'\n'}
                  {'  '}previous: <span className="text-emerald-400">'GeeksforGeeks (Intern)'</span>,{'\n'}
                  {'  '}btechCgpa: <span className="text-amber-300">8.9</span>,{'\n'}
                  {'  '}stack: [{'\n'}
                  {'    '}<span className="text-emerald-400">'Next.js 15'</span>, <span className="text-emerald-400">'TypeScript'</span>,{'\n'}
                  {'    '}<span className="text-emerald-400">'Node.js'</span>, <span className="text-emerald-400">'Python/Celery'</span>,{'\n'}
                  {'    '}<span className="text-emerald-400">'PostgreSQL'</span>, <span className="text-emerald-400">'BigQuery'</span>,{'\n'}
                  {'    '}<span className="text-emerald-400">'Redis'</span>, <span className="text-emerald-400">'Docker & GCP'</span>{'\n'}
                  {'  '}],{'\n'}
                  {'  '}verifiedWins: {'{\n'}
                  {'    '}queryLatency: <span className="text-amber-300">'60s → 1.8s (-97%)'</span>,{'\n'}
                  {'    '}dockerDeploy: <span className="text-amber-300">'43m → &lt;4m (-90%+)'</span>,{'\n'}
                  {'    '}workflowMigration: <span className="text-amber-300">'14,000+ concepts'</span>,{'\n'}
                  {'  '}{'}'},{'\n'}
                  {'}'};
                </code>
              </pre>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>B.Tech IT · 8.9/10 CGPA</span>
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('editorial')}
                  className="min-h-[38px] sm:min-h-0 inline-flex items-center text-indigo-400 hover:underline cursor-pointer"
                >
                  ← Back to Portrait
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Card Footer: Direct Resume & Case Studies Actions */}
        <div className="mt-4 pt-3.5 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-2 sm:flex items-center justify-between gap-2.5">
          <motion.button
            {...BUTTON_MOTION}
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-[38px] px-3.5 py-2.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-xs shadow-indigo-600/20 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span>Interactive Resume</span>
          </motion.button>

          <motion.button
            {...BUTTON_MOTION}
            type="button"
            onClick={() => onScrollToSection('systems')}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-[38px] px-3.5 py-2.5 sm:py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-indigo-500/40 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>12 Case Studies</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
