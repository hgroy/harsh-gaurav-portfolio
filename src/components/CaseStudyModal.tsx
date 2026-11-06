import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Code2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CaseStudy } from '../data/portfolioData';
import {
  SNAPPY_MODAL_SPRING,
  BUTTON_MOTION,
  CARD_MOTION,
} from '../utils/motionConfig';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, onClose }) => {
  useEffect(() => {
    if (!study) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [study, onClose]);

  return (
    <AnimatePresence>
      {study && (
        <motion.div
          key="case-study-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={SNAPPY_MODAL_SPRING}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/80 backdrop-blur-xs overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={SNAPPY_MODAL_SPRING}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-[#FAF9F6] dark:bg-[#0E0E12] p-5 sm:p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean Single-Row Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    Case Study {study.index}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{study.companyOrType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{study.timeframe}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{study.categoryLabel}</span>
                </div>
                <h2
                  id="case-study-modal-title"
                  className="text-lg sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white mt-1.5"
                >
                  {study.title}
                </h2>
              </div>

              <motion.button
                {...BUTTON_MOTION}
                type="button"
                onClick={onClose}
                aria-label="Close case study modal"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141419] text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Before / After Impact Strip */}
            <div className="mt-5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#141419] p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4">
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  Quantified Outcome
                </p>
                <p className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {study.headlineMetric}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  {study.headlineMetricContext}
                </p>
              </div>

              <div className="md:col-span-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800 md:pl-5 text-xs">
                <div className="space-y-1">
                  <span className="font-mono text-zinc-500 dark:text-zinc-400">
                    Before Architecture
                  </span>
                  <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                    {study.beforeValue}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 hidden sm:block shrink-0" />
                <div className="space-y-1">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    After Architecture
                  </span>
                  <p className="text-zinc-950 dark:text-white font-semibold">{study.afterValue}</p>
                </div>
              </div>
            </div>

            {/* Problem & Root Cause */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-5">
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141419] p-4 sm:p-5">
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                  01. Production Bottleneck
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-2">
                  {study.problem}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141419] p-4 sm:p-5">
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                  02. Root-Cause Diagnosis
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-2">
                  {study.rootCause}
                </p>
              </div>
            </div>

            {/* Architectural Implementation */}
            <div className="mt-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141419] p-4 sm:p-5">
              <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                03. Engineering Implementation &amp; System Design
              </h3>
              <ul className="mt-3 space-y-2.5">
                {study.architectureSolution.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {study.filesTouched && study.filesTouched.length > 0 && (
                <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-950 dark:text-white mr-2">
                    Key Modules:
                  </span>
                  {study.filesTouched.join(' · ')}
                </div>
              )}
            </div>

            {/* Code / SQL Snippet if present */}
            {study.codeSnippet && (
              <div className="mt-5 rounded-2xl border border-zinc-800 bg-[#09090B] text-zinc-100 p-4 sm:p-5 overflow-x-auto">
                <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-zinc-800 text-xs font-mono text-indigo-400">
                  <span>04. Applied Code / Query Implementation — {study.codeSnippet.filename}</span>
                  <span>{study.codeSnippet.language}</span>
                </div>
                <pre className="text-xs font-mono leading-relaxed overflow-x-auto">
                  <code>{study.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Execution Topology Steps */}
            <div className="mt-5">
              <h3 className="text-sm font-bold text-zinc-950 dark:text-white mb-3">
                Data &amp; Execution Flow
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {study.diagramNodes.map((node) => (
                  <motion.div
                    key={node.step}
                    {...CARD_MOTION}
                    className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141419] p-3.5"
                  >
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                      Step {node.step}
                    </span>
                    <h4 className="text-xs font-bold text-zinc-950 dark:text-white mt-1">
                      {node.label}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                      {node.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer Stack & Links */}
            <div className="mt-6 pt-5 border-t border-zinc-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                <span className="text-zinc-950 dark:text-zinc-200 font-semibold mr-2">
                  Tech Stack:
                </span>
                {study.stack.join(' · ')}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {study.liveUrl && (
                  <motion.a
                    {...BUTTON_MOTION}
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[38px] px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Live Deployment</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                )}
                {study.repoUrl && (
                  <motion.a
                    {...BUTTON_MOTION}
                    href={study.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[38px] px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141419] text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                  </motion.a>
                )}
                <motion.button
                  {...BUTTON_MOTION}
                  type="button"
                  onClick={onClose}
                  className="min-h-[38px] px-4 py-2 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141419] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
