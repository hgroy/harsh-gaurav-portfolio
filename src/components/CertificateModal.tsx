import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Calendar,
  Hash,
  ZoomIn,
  ZoomOut,
  FileCheck,
} from 'lucide-react';
import {
  CERTIFICATIONS_DATA,
  CertificationCredential,
} from '../data/portfolioData';
import {
  SNAPPY_MODAL_SPRING,
  SNAPPY_TAB_SPRING,
  BUTTON_MOTION,
  CARD_MOTION,
} from '../utils/motionConfig';
import { downloadAssetFile } from '../utils/downloadHelper';

interface CertificateModalProps {
  certificate: CertificationCredential | null;
  onClose: () => void;
  onSelectCertificate: (cert: CertificationCredential) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
  onSelectCertificate,
}) => {
  const [copiedId, setCopiedId] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [downloadingType, setDownloadingType] = useState<'pdf' | 'png' | null>(null);

  useEffect(() => {
    if (!certificate) return;
    setIsZoomed(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certificate, onClose]);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleDownload = async (url: string, filename: string, type: 'pdf' | 'png') => {
    setDownloadingType(type);
    await downloadAssetFile(url, filename);
    setTimeout(() => setDownloadingType(null), 1200);
  };

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          key="certificate-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={SNAPPY_MODAL_SPRING}
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-zinc-950/85 backdrop-blur-xs overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            key="certificate-modal-dialog"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={SNAPPY_MODAL_SPRING}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-[#FAF9F6] dark:bg-[#0E0E12] p-4 sm:p-7 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Engineering Credential {certificate.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{certificate.category}</span>
                </div>
                <h2
                  id="certificate-modal-title"
                  className="text-lg sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1"
                >
                  {certificate.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <motion.button
                  {...BUTTON_MOTION}
                  type="button"
                  onClick={() => setIsZoomed((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141419] text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Fit to Window</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Zoom Document</span>
                    </>
                  )}
                </motion.button>

                <motion.button
                  {...BUTTON_MOTION}
                  type="button"
                  onClick={() =>
                    handleDownload(certificate.pdfPath, certificate.downloadFilename, 'pdf')
                  }
                  className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>
                    {downloadingType === 'pdf' ? 'Saving PDF...' : 'Download PDF'}
                  </span>
                </motion.button>

                <motion.button
                  {...BUTTON_MOTION}
                  type="button"
                  onClick={onClose}
                  aria-label="Close certificate preview"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141419] text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Quick Switcher Across All 4 Certificates */}
            <div className="mt-3.5 flex items-center gap-1.5 p-1.5 rounded-xl bg-zinc-100 dark:bg-[#141419] border border-zinc-200/80 dark:border-zinc-800 overflow-x-auto no-scrollbar shrink-0">
              {CERTIFICATIONS_DATA.map((item) => {
                const isActive = item.id === certificate.id;
                return (
                  <motion.button
                    key={item.id}
                    {...BUTTON_MOTION}
                    type="button"
                    onClick={() => onSelectCertificate(item)}
                    className={`relative min-h-[34px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'text-zinc-950 dark:text-white font-semibold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="modalCertificateTabPill"
                        transition={SNAPPY_TAB_SPRING}
                        className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-800 shadow-2xs"
                      />
                    )}
                    <span className="relative z-10">
                      {item.index}. {item.shortTitle}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Scrollable Body */}
            <div className="mt-4 overflow-y-auto space-y-5 pr-1 max-h-[74vh]">
              {/* Official Original Certificate Document Image */}
              <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-100/80 dark:bg-[#09090B] p-3 sm:p-5 shadow-inner overflow-x-auto">
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-200/80 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <FileCheck className="w-3.5 h-3.5" />
                    Official Certificate Document ({certificate.issuer})
                  </span>
                  <span>ID: {certificate.credentialId} · {certificate.issueDate}</span>
                </div>

                <div
                  onClick={() => setIsZoomed((prev) => !prev)}
                  className={`mx-auto transition-all cursor-zoom-in ${
                    isZoomed ? 'max-w-none w-[1200px]' : 'max-w-3xl w-full'
                  }`}
                >
                  <img
                    src={certificate.imagePath}
                    alt={`${certificate.title} — Official Certificate awarded to Harsh Gaurav`}
                    className="w-full h-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg bg-white"
                  />
                </div>
              </div>

              {/* Validated Competencies & Direct Verification Links */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141419] p-5">
                  <h4 className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                    Validated Technical Competencies
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1.5 leading-relaxed">
                    {certificate.summary}
                  </p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {certificate.validatedSkills.map((skill, idx) => (
                      <motion.div
                        key={idx}
                        {...CARD_MOTION}
                        className="flex items-center gap-2 rounded-lg border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090B] px-3 py-2 text-xs text-zinc-800 dark:text-zinc-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141419] p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                      Official Verification &amp; Document Access
                    </h4>
                    <div className="mt-3 space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-[#09090B] border border-zinc-200/70 dark:border-zinc-800">
                        <span className="text-zinc-500 dark:text-zinc-400 inline-flex items-center gap-1">
                          <Hash className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          Credential ID
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-950 dark:text-white">
                            {certificate.credentialId}
                          </span>
                          <motion.button
                            {...BUTTON_MOTION}
                            type="button"
                            onClick={() => handleCopyId(certificate.credentialId)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 hover:bg-zinc-100 cursor-pointer"
                          >
                            {copiedId ? (
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
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-[#09090B] border border-zinc-200/70 dark:border-zinc-800">
                        <span className="text-zinc-500 dark:text-zinc-400 inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          Issued By
                        </span>
                        <span className="font-semibold text-zinc-950 dark:text-white">
                          {certificate.issuer} ({certificate.issueDate})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800 flex flex-col gap-2.5">
                    {certificate.verifyUrl && (
                      <motion.a
                        {...BUTTON_MOTION}
                        href={certificate.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 min-h-[38px] px-4 py-2 text-xs font-semibold rounded-xl border border-indigo-500/40 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 hover:bg-indigo-100 transition-colors"
                      >
                        <span>Verify Credential Online</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        {...BUTTON_MOTION}
                        type="button"
                        onClick={() =>
                          handleDownload(
                            certificate.imagePath,
                            certificate.downloadFilename.replace('.pdf', '.png'),
                            'png'
                          )
                        }
                        className="inline-flex items-center justify-center gap-1.5 min-h-[38px] px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090B] text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>{downloadingType === 'png' ? 'Saving...' : 'Save Image'}</span>
                      </motion.button>

                      <motion.button
                        {...BUTTON_MOTION}
                        type="button"
                        onClick={() =>
                          handleDownload(certificate.pdfPath, certificate.downloadFilename, 'pdf')
                        }
                        className="inline-flex items-center justify-center gap-1.5 min-h-[38px] px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-xs cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{downloadingType === 'pdf' ? 'Saving...' : 'Save PDF'}</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
