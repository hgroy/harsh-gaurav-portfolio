import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  ChevronDown,
  ShieldCheck,
  Download,
  ExternalLink,
  ArrowUpRight,
  Copy,
  Check,
  ZoomIn,
  Layers,
  Eye,
} from 'lucide-react';
import {
  CERTIFICATIONS_DATA,
  CertificationCredential,
} from '../data/portfolioData';
import { downloadAssetFile } from '../utils/downloadHelper';
import { SNAPPY_SPRING, BUTTON_MOTION } from '../utils/motionConfig';
import { ScrollReveal } from './ScrollReveal';

interface NestedCertificationsVaultProps {
  onOpenDedicatedPage: (certId?: string) => void;
  onOpenZoomModal: (cert: CertificationCredential) => void;
}

export const NestedCertificationsVault: React.FC<
  NestedCertificationsVaultProps
> = ({ onOpenDedicatedPage, onOpenZoomModal }) => {
  // Track which certification IDs are expanded inline when clicked
  // Starts empty (all collapsed) so clicking any certification reveals it on demand
  const [expandedCertIds, setExpandedCertIds] = useState<
    Record<string, boolean>
  >({});

  const [copiedCredId, setCopiedCredId] = useState<string | null>(null);

  const toggleCertInline = (certId: string) => {
    setExpandedCertIds((prev) => ({
      ...prev,
      [certId]: !prev[certId],
    }));
  };

  const openCertCount = Object.values(expandedCertIds).filter(Boolean).length;

  const expandAllCerts = () => {
    const allCerts: Record<string, boolean> = {};
    CERTIFICATIONS_DATA.forEach((c) => {
      allCerts[c.id] = true;
    });
    setExpandedCertIds(allCerts);
  };

  const collapseAllCerts = () => {
    setExpandedCertIds({});
  };

  const handleCopyId = (e: React.MouseEvent, credId: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(credId);
    setCopiedCredId(credId);
    setTimeout(() => setCopiedCredId(null), 1800);
  };

  return (
    <div className="space-y-4">
      {/* Subtle Top Utility Strip: Status & Expand/Collapse All */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-800 dark:text-slate-300">
          <Award className="w-4 h-4 text-[#0B42D4] dark:text-[#3B82F6]" />
          <span>
            Click any certification below to reveal its official certificate &amp; verification details
          </span>
        </div>

        <button
          type="button"
          onClick={
            openCertCount === CERTIFICATIONS_DATA.length
              ? collapseAllCerts
              : expandAllCerts
          }
          className="inline-flex items-center gap-1.5 min-h-[36px] px-3.5 py-1.5 rounded-xl studio-card hover:border-[#0B42D4]/50 text-xs font-mono font-semibold text-[#0F172A] dark:text-slate-200 transition-colors cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
          <span>
            {openCertCount === CERTIFICATIONS_DATA.length
              ? 'Collapse All (6)'
              : openCertCount > 0
              ? `Expand All (${openCertCount}/6 Open)`
              : 'Expand All (6)'}
          </span>
        </button>
      </div>

      {/* Direct List of 6 Certifications (No Category Grouping) */}
      <div className="space-y-3.5">
        {CERTIFICATIONS_DATA.map((cert, index) => {
          const isCertOpen = !!expandedCertIds[cert.id];
          const formattedIdx = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

          return (
            <ScrollReveal
              key={cert.id}
              delay={index * 0.055}
              yOffset={22}
              className={`rounded-3xl transition-colors overflow-hidden ${
                isCertOpen
                  ? 'studio-card ring-2 ring-[#0B42D4] dark:ring-[#3B82F6] shadow-xl'
                  : 'studio-card hover:border-[#0B42D4]/50'
              }`}
            >
              {/* CLICKABLE CERTIFICATION ROW */}
              <button
                type="button"
                onClick={() => toggleCertInline(cert.id)}
                className="w-full px-5 sm:px-7 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer group"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <span
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl font-mono text-sm font-bold shrink-0 transition-colors ${
                      isCertOpen
                        ? 'bg-[#0B42D4] text-white shadow-md shadow-[#0B42D4]/25'
                        : 'studio-inset text-[#0B42D4] dark:text-[#3B82F6] group-hover:bg-[#0B42D4] group-hover:text-white'
                    }`}
                  >
                    {formattedIdx}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="font-bold text-[#0B42D4] dark:text-[#3B82F6]">
                        {cert.issuer}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-700 dark:text-slate-400">
                        {cert.issueDate}
                      </span>
                      <span className="hidden md:inline text-slate-500">·</span>
                      <span className="hidden md:inline text-slate-700 dark:text-slate-400">
                        ID: {cert.credentialId}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-xl font-extrabold font-display text-[#0F172A] dark:text-white group-hover:text-[#0B42D4] dark:group-hover:text-[#3B82F6] transition-colors mt-1 leading-snug">
                      {cert.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/35 dark:border-slate-800">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isCertOpen
                        ? 'bg-[#0B42D4] text-white shadow-sm'
                        : 'studio-inset text-[#0F172A] dark:text-slate-200 group-hover:bg-[#0B42D4] group-hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>
                      {isCertOpen ? 'Hide Certificate' : 'Show Certificate'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isCertOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </div>
              </button>

              {/* NESTED CERTIFICATE PREVIEW PANEL (REVEALED INSIDE ON CLICK) */}
              <AnimatePresence initial={false}>
                {isCertOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={SNAPPY_SPRING}
                    className="border-t border-white/50 dark:border-slate-800 overflow-hidden"
                  >
                    <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-white/15 dark:bg-slate-950/30">
                      {/* Left 7 Cols: Official Certificate Image Preview */}
                      <div className="lg:col-span-7">
                        <div
                          onClick={() => onOpenZoomModal(cert)}
                          className="group/img relative rounded-2xl studio-inset p-3 sm:p-5 flex items-center justify-center overflow-hidden cursor-pointer border border-white/50 dark:border-slate-800"
                        >
                          <img
                            src={cert.imagePath}
                            alt={`${cert.title} Official Certificate`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full max-h-[400px] object-contain rounded-xl shadow-md bg-white group-hover/img:scale-[1.01] transition-transform duration-200"
                          />
                          <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0B42D4] text-white text-xs font-semibold shadow-lg">
                            <ZoomIn className="w-3.5 h-3.5" />
                            <span>Click to Zoom Fullscreen</span>
                          </div>
                        </div>
                      </div>

                      {/* Right 5 Cols: Verification Details, Skills & Actions */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                        <div className="space-y-4">
                          <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0B42D4] dark:text-[#3B82F6]">
                              <ShieldCheck className="w-4 h-4" />
                              <span>OFFICIAL VERIFIED CREDENTIAL</span>
                            </div>
                            <h4 className="text-lg sm:text-xl font-extrabold font-display text-[#0F172A] dark:text-white mt-1 leading-snug">
                              {cert.title}
                            </h4>
                            <div className="w-10 h-1 bg-[#0B42D4] dark:bg-[#3B82F6] mt-2" />
                            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 mt-3 leading-relaxed">
                              {cert.summary}
                            </p>
                          </div>

                          {/* Credential ID Copy Box */}
                          <div className="p-3.5 rounded-2xl studio-inset flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                                Credential ID / Verification Ref
                              </div>
                              <div className="text-xs sm:text-sm font-mono font-bold text-[#0F172A] dark:text-white truncate mt-0.5">
                                {cert.credentialId}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) =>
                                handleCopyId(e, cert.credentialId)
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl studio-card text-xs font-mono font-semibold text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 transition-colors cursor-pointer shrink-0"
                            >
                              {copiedCredId === cert.credentialId ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
                                  <span>Copy ID</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Validated Competencies */}
                          <div>
                            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-2">
                              Validated Competencies ({cert.validatedSkills.length})
                            </div>
                            <p className="text-xs font-mono text-[#0F172A] dark:text-slate-200 leading-relaxed">
                              {cert.validatedSkills.join(' · ')}
                            </p>
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="pt-3 border-t border-white/40 dark:border-slate-800 flex flex-wrap items-center gap-2.5">
                          <motion.button
                            {...BUTTON_MOTION}
                            type="button"
                            onClick={() => onOpenZoomModal(cert)}
                            className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 rounded-xl bg-[#0B42D4] hover:bg-[#0935AC] text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                            <span>Zoom Certificate</span>
                          </motion.button>

                          <motion.button
                            {...BUTTON_MOTION}
                            type="button"
                            onClick={() =>
                              downloadAssetFile(
                                cert.pdfPath,
                                cert.downloadFilename
                              )
                            }
                            className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl studio-card text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/50 text-xs font-mono font-semibold transition-colors cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
                            <span>Download PDF</span>
                          </motion.button>

                          <button
                            type="button"
                            onClick={() => onOpenDedicatedPage(cert.id)}
                            className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl studio-inset text-[#0B42D4] dark:text-[#3B82F6] text-xs font-mono font-bold hover:underline cursor-pointer"
                          >
                            <span>Dedicated Page</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={`?page=certifications&cert=${encodeURIComponent(
                              cert.id
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1 min-h-[40px] px-3 py-2 rounded-xl text-[#0B42D4] dark:text-[#3B82F6] text-xs font-mono font-bold hover:underline"
                          >
                            <span>New Tab</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};
