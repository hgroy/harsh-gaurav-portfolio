import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, FileText, Sparkles, RotateCcw, Code2 } from 'lucide-react';
import { DOCCHAT_DEMO_QUERIES } from '../data/portfolioData';
import {
  SNAPPY_SPRING,
  SNAPPY_TAB_SPRING,
  BUTTON_MOTION,
  CARD_MOTION,
} from '../utils/motionConfig';

export const DocChatSimulator: React.FC = () => {
  const [selectedQueryId, setSelectedQueryId] = useState<string>(DOCCHAT_DEMO_QUERIES[0].id);
  const [streamedWords, setStreamedWords] = useState<number>(100);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [highlightedCitation, setHighlightedCitation] = useState<string>(
    DOCCHAT_DEMO_QUERIES[0].citationPages[0]
  );

  const activeQuery =
    DOCCHAT_DEMO_QUERIES.find((q) => q.id === selectedQueryId) || DOCCHAT_DEMO_QUERIES[0];
  const words = activeQuery.answer.split(' ');

  useEffect(() => {
    if (!isStreaming) return;

    const timer = setInterval(() => {
      setStreamedWords((prev) => {
        if (prev >= words.length) {
          clearInterval(timer);
          setIsStreaming(false);
          return words.length;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [isStreaming, words.length]);

  const handleSelectQuestion = (id: string) => {
    const target = DOCCHAT_DEMO_QUERIES.find((q) => q.id === id) || DOCCHAT_DEMO_QUERIES[0];
    setSelectedQueryId(id);
    setHighlightedCitation(target.citationPages[0]);
    setStreamedWords(1);
    setIsStreaming(true);
  };

  const handleReplayStream = () => {
    setStreamedWords(1);
    setIsStreaming(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SNAPPY_SPRING}
      className="rounded-3xl studio-inset p-4 sm:p-6 lg:p-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/40 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#0B42D4] dark:text-[#3B82F6] font-mono">
            <span>Interactive Flagship Project Preview</span>
            <span aria-hidden="true">·</span>
            <span>Next.js · TypeScript · PostgreSQL + pgvector · Drizzle ORM · Gemini</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white mt-1.5">
            DocChat: Document Q&amp;A with Cited Answers (RAG)
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <motion.a
            {...BUTTON_MOTION}
            href="https://docchat-kohl.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 text-xs font-semibold rounded-xl bg-[#0B42D4] text-white hover:bg-[#0935AC] transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>Open Live App (Vercel)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
          <motion.a
            {...BUTTON_MOTION}
            href="https://github.com/hgroy/docchat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 text-xs font-medium rounded-xl studio-card text-[#0F172A] dark:text-slate-200 hover:border-[#0B42D4]/60 transition-colors whitespace-nowrap shrink-0"
          >
            <Code2 className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6]" />
            <span>View Source on GitHub</span>
          </motion.a>
        </div>
      </div>

      {/* Interactive RAG Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-stretch">
        {/* Left: Query Selector */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-3">
              Tap a sample query grounded in real engineering specifications to test NDJSON token streaming &amp; pgvector page citations:
            </p>
            <div className="space-y-2.5">
              {DOCCHAT_DEMO_QUERIES.map((q, index) => {
                const isSelected = q.id === selectedQueryId;
                return (
                  <motion.button
                    key={q.id}
                    {...CARD_MOTION}
                    type="button"
                    onClick={() => handleSelectQuestion(q.id)}
                    className={`relative w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/30 text-zinc-950 dark:text-white shadow-2xs'
                        : 'border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 dark:bg-[#09090B] text-zinc-700 dark:text-zinc-300 hover:border-indigo-400 dark:hover:border-indigo-500/60'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 mb-1">
                      <span>Query 0{index + 1}</span>
                      <span className="truncate max-w-[200px]">{q.sourceDoc}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium leading-snug">{q.question}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 font-mono">
            <div>Vector Engine: Neon Serverless PostgreSQL + pgvector</div>
            <div>Stream Protocol: NDJSON Token-by-Token · Per-User Auth Scope</div>
          </div>
        </div>

        {/* Right: Simulated NDJSON Stream & Citation Verification */}
        <div className="lg:col-span-7 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/80 dark:bg-[#09090B] p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="truncate max-w-[180px] sm:max-w-none">{activeQuery.sourceDoc}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums text-emerald-600 dark:text-emerald-400 font-semibold">
                  {activeQuery.similarityScore}
                </span>
              </div>

              <motion.button
                {...BUTTON_MOTION}
                type="button"
                onClick={handleReplayStream}
                className="inline-flex items-center gap-1.5 min-h-[34px] px-2.5 py-1 rounded-md text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-zinc-200/60 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Stream</span>
              </motion.button>
            </div>

            {/* Streamed Answer Output */}
            <div className="mt-4">
              <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-600 dark:text-indigo-400 mb-2">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Synthesized Answer (Grounded in Retrieved Page Chunks)</span>
              </div>
              <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed min-h-[5.5rem]">
                {words.slice(0, streamedWords).join(' ')}
                {isStreaming && (
                  <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                )}
              </p>
            </div>

            {/* Interactive Citation Selector */}
            <div className="mt-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  Cited Document Chunks (Tap page to inspect retrieved chunk):
                </span>
                <div className="flex items-center gap-1.5">
                  {activeQuery.citationPages.map((page) => {
                    const active = highlightedCitation === page;
                    return (
                      <motion.button
                        key={page}
                        {...BUTTON_MOTION}
                        type="button"
                        onClick={() => setHighlightedCitation(page)}
                        className={`relative min-h-[32px] px-3 py-1 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer ${
                          active
                            ? 'text-white'
                            : 'bg-zinc-200/70 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 hover:bg-zinc-300/70 dark:hover:bg-zinc-800'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="docchatCitationActivePill"
                            transition={SNAPPY_TAB_SPRING}
                            className="absolute inset-0 rounded-md bg-indigo-600"
                          />
                        )}
                        <span className="relative z-10">{page}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <motion.div
                key={`${activeQuery.id}-${highlightedCitation}`}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={SNAPPY_SPRING}
                className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111115] p-3.5 text-xs text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed"
              >
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold mr-2">
                  [{activeQuery.sourceDoc} · {highlightedCitation}]
                </span>
                {activeQuery.excerpt}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
