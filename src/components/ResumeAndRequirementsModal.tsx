import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import {
  PROFILE_DATA,
  EXPERIENCE_TIMELINE,
  FLAGSHIP_PROJECTS,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  SKILL_CATEGORIES,
} from '../data/portfolioData';
import {
  SNAPPY_MODAL_SPRING,
  SNAPPY_TAB_SPRING,
  BUTTON_MOTION,
} from '../utils/motionConfig';
import { downloadAssetFile } from '../utils/downloadHelper';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeAndRequirementsModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'document'>('interactive');
  const [downloadingResume, setDownloadingResume] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDownloadResume = async () => {
    setDownloadingResume(true);
    await downloadAssetFile(PROFILE_DATA.resumePdfPath, 'Harsh_Gaurav_Resume.pdf');
    setTimeout(() => setDownloadingResume(false), 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="resume-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={SNAPPY_MODAL_SPRING}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/85 backdrop-blur-xs overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            key="resume-modal-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={SNAPPY_MODAL_SPRING}
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-[#FAF9F6] dark:bg-[#0E0E12] p-5 sm:p-7 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean Single-Row Top Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="min-w-0">
                <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  Curriculum Vitae · Web &amp; Original Document View
                </p>
                <h2
                  id="resume-modal-title"
                  className="text-base sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white truncate"
                >
                  Harsh Gaurav — Software Engineer Resume
                </h2>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-[#141419] border border-zinc-200/80 dark:border-zinc-800">
                  {[
                    { id: 'interactive', label: 'Interactive View' },
                    { id: 'document', label: 'Original Page' },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <motion.button
                        key={tab.id}
                        {...BUTTON_MOTION}
                        type="button"
                        onClick={() => setActiveTab(tab.id as 'interactive' | 'document')}
                        className={`relative min-h-[32px] px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                          isActive
                            ? 'text-zinc-950 dark:text-white font-semibold'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="resumeModalTabPill"
                            transition={SNAPPY_TAB_SPRING}
                            className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-800 shadow-2xs"
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <motion.button
                  {...BUTTON_MOTION}
                  type="button"
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadingResume ? 'Saving PDF...' : 'Download PDF'}</span>
                </motion.button>

                <motion.button
                  {...BUTTON_MOTION}
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume modal"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141419] text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {activeTab === 'document' ? (
              <div className="mt-4 overflow-y-auto pr-1 max-h-[75vh] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-[#09090B] p-3 sm:p-5">
                <img
                  src={PROFILE_DATA.resumeImagePath}
                  alt="Harsh Gaurav — Official 1-Page Software Engineer Resume"
                  className="w-full h-auto rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-lg bg-white mx-auto"
                />
              </div>
            ) : (
              <div className="mt-4 overflow-y-auto space-y-6 pr-1 max-h-[75vh] text-zinc-800 dark:text-zinc-200">
                {/* Resume Header Card */}
                <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141419] p-5 sm:p-6">
                  <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">
                    {PROFILE_DATA.name}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                    Software Engineer | Next.js, React, TypeScript, Node.js, Python, PostgreSQL
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 mt-3 font-mono">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      {PROFILE_DATA.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      {PROFILE_DATA.phone}
                    </span>
                    <span aria-hidden="true">·</span>
                    <a
                      href={`mailto:${PROFILE_DATA.email}`}
                      className="inline-flex items-center gap-1 hover:text-indigo-600"
                    >
                      <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      {PROFILE_DATA.email}
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href={PROFILE_DATA.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      github.com/hgroy
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href={PROFILE_DATA.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      linkedin.com/in/harshgaurav-dev
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-4 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-3">
                    {PROFILE_DATA.summary}
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141419] p-5 sm:p-6">
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    Technical Skills
                  </h4>
                  <div className="mt-3 space-y-2 text-xs sm:text-sm">
                    {SKILL_CATEGORIES.map((cat) => (
                      <div key={cat.index} className="leading-relaxed">
                        <strong className="text-zinc-950 dark:text-white mr-2">
                          {cat.title}:
                        </strong>
                        <span className="text-zinc-600 dark:text-zinc-300">
                          {cat.skills.join(' · ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141419] p-5 sm:p-6 space-y-5">
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    Work Experience
                  </h4>
                  {EXPERIENCE_TIMELINE.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h5 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                          {exp.role} | {exp.company}
                        </h5>
                        <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        {exp.projectNote} · {exp.stack}
                      </p>
                      <ul className="space-y-1.5 pt-1 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="leading-relaxed">
                            • {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Projects */}
                <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141419] p-5 sm:p-6 space-y-4">
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    Featured Engineering Projects
                  </h4>
                  {FLAGSHIP_PROJECTS.map((proj) => (
                    <div key={proj.id} className="space-y-1.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h5 className="text-sm font-bold text-zinc-950 dark:text-white">
                          {proj.name}
                        </h5>
                        <div className="flex items-center gap-3 text-xs font-mono">
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              Live App ↗
                            </a>
                          )}
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            GitHub Code ↗
                          </a>
                        </div>
                      </div>
                      <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        {proj.stack.join(' · ')}
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Certifications & Credentials */}
                <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141419] p-5 sm:p-6 space-y-3">
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    Verified Certifications &amp; Credentials
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CERTIFICATIONS_DATA.map((cert) => (
                      <div
                        key={cert.id}
                        className="rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090B] p-3.5 flex flex-col justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-zinc-950 dark:text-white">
                            {cert.title}
                          </p>
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
                            {cert.issuer} · {cert.issueDate}
                          </p>
                        </div>
                        <div className="mt-2 pt-2 border-t border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                          <span>ID: {cert.credentialId}</span>
                          <button
                            type="button"
                            onClick={() => downloadAssetFile(cert.pdfPath, cert.downloadFilename)}
                            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                          >
                            Save PDF ↓
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141419] p-5 sm:p-6 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                      {EDUCATION_DATA.degree} | {EDUCATION_DATA.institution}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {EDUCATION_DATA.period}
                    </p>
                  </div>
                  <span className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {EDUCATION_DATA.score}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
