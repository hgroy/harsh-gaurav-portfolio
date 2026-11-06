import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, ArrowRight, CheckCircle2, Activity } from 'lucide-react';
import { ARCHITECTURE_BLUEPRINTS, ArchitectureBlueprint } from '../data/portfolioData';
import {
  SNAPPY_SPRING,
  SNAPPY_TAB_SPRING,
  BUTTON_MOTION,
  CARD_MOTION,
} from '../utils/motionConfig';

export const ArchitectureSimulator: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(ARCHITECTURE_BLUEPRINTS[0].id);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(-1);
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [traceComplete, setTraceComplete] = useState<boolean>(false);

  const blueprint: ArchitectureBlueprint =
    ARCHITECTURE_BLUEPRINTS.find((b) => b.id === selectedId) || ARCHITECTURE_BLUEPRINTS[0];

  useEffect(() => {
    if (!isTracing) return;

    const timer = setInterval(() => {
      setActiveStageIndex((prev) => {
        if (prev >= blueprint.stages.length - 1) {
          clearInterval(timer);
          setIsTracing(false);
          setTraceComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [isTracing, blueprint.stages.length]);

  const handleSelectBlueprint = (id: string) => {
    if (id === selectedId) return;
    setSelectedId(id);
    setIsTracing(false);
    setTraceComplete(false);
    setActiveStageIndex(-1);
  };

  const handleRunTrace = () => {
    setTraceComplete(false);
    setActiveStageIndex(0);
    setIsTracing(true);
  };

  const handleReset = () => {
    setIsTracing(false);
    setTraceComplete(false);
    setActiveStageIndex(-1);
  };

  const afterWidthPct =
    blueprint.index === '01' ? 6 : blueprint.index === '02' ? 8 : 10;

  return (
    <div className="h-full flex flex-col justify-between rounded-3xl studio-inset p-4 sm:p-6 lg:p-7">
      {/* Top Blueprint Header & Controls */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/40 dark:border-slate-800">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#0B42D4] dark:text-[#3B82F6]">
              <Activity className="w-3.5 h-3.5 text-[#0B42D4] dark:text-[#3B82F6] shrink-0" />
              <span>Interactive Production System Simulator</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white mt-0.5 truncate">
              {blueprint.index}. {blueprint.name}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {(traceComplete || activeStageIndex >= 0) && (
              <motion.button
                {...BUTTON_MOTION}
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-xl studio-card text-[#0F172A] dark:text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </motion.button>
            )}

            <motion.button
              {...BUTTON_MOTION}
              type="button"
              onClick={handleRunTrace}
              disabled={isTracing}
              className="inline-flex items-center justify-center gap-1.5 min-h-[38px] px-4 py-1.5 text-xs font-semibold rounded-xl bg-[#0B42D4] text-white hover:bg-[#0935AC] disabled:opacity-60 transition-opacity whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isTracing ? 'Tracing Pipeline...' : 'Simulate Pipeline'}</span>
            </motion.button>
          </div>
        </div>

        {/* Segmented Architecture Switcher with Snappy Shared Layout Pill */}
        <div
          role="tablist"
          aria-label="Production architecture blueprints"
          className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1.5 mt-4 rounded-2xl bg-zinc-100 dark:bg-[#09090B] border border-zinc-200/80 dark:border-zinc-800"
        >
          {ARCHITECTURE_BLUEPRINTS.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <motion.button
                key={item.id}
                {...BUTTON_MOTION}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => handleSelectBlueprint(item.id)}
                className={`relative min-h-[38px] px-3 py-2 text-xs font-medium rounded-xl transition-colors text-left flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="archBlueprintActiveTab"
                    transition={SNAPPY_TAB_SPRING}
                    className="absolute inset-0 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xs"
                  />
                )}
                <span className="relative z-10 font-mono font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
                  {item.index}.
                </span>
                <span className="relative z-10 truncate">
                  {item.index === '01'
                    ? 'Hybrid Analytics (1.8s)'
                    : item.index === '02'
                    ? 'CM Recompute & Locks'
                    : 'Stripe + PayPal ETL'}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Snappy Spring Blueprint Content Area */}
        <motion.div
          key={blueprint.id}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SNAPPY_SPRING}
        >
          <p className="mt-3.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {blueprint.description}
          </p>

          {/* Pipeline Stage Flow */}
          <div className="mt-4 space-y-2.5">
            {blueprint.stages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              const isPassed = idx < activeStageIndex || traceComplete;

              return (
                <motion.div
                  key={stage.id}
                  {...CARD_MOTION}
                  onClick={() => {
                    setIsTracing(false);
                    setActiveStageIndex(idx);
                  }}
                  className={`group relative rounded-xl border p-3.5 transition-colors cursor-pointer ${
                    isActive
                      ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/30 shadow-xs'
                      : isPassed
                      ? 'border-emerald-500/50 dark:border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/15'
                      : 'border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/70 dark:bg-[#09090B] hover:border-indigo-400 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`text-xs font-mono tabular-nums font-bold ${
                          isActive
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : isPassed
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-zinc-400 dark:text-zinc-500'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <h3 className="text-xs sm:text-sm font-semibold text-zinc-950 dark:text-zinc-100 truncate">
                        {stage.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 text-xs font-mono tabular-nums">
                      <span className="text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                        {stage.tech}
                      </span>
                      <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">·</span>
                      <span
                        className={`font-semibold ${
                          isActive || isPassed
                            ? 'text-indigo-600 dark:text-indigo-300'
                            : 'text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {stage.latency}
                      </span>
                      {isPassed && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </div>
                  </div>

                  <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 sm:pl-6 leading-relaxed">
                    {stage.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom Before / After Benchmark Telemetry Bar */}
      <div className="mt-5 pt-4 border-t border-zinc-200/80 dark:border-zinc-800 space-y-2 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums">
            <span className="text-zinc-500 dark:text-zinc-400 line-through">
              {blueprint.beforeMetric}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="font-semibold text-zinc-950 dark:text-white">
              {blueprint.afterMetric}
            </span>
          </div>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            {blueprint.improvementLabel}
          </span>
        </div>

        <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-900 overflow-hidden">
          <motion.div
            key={`bar-${blueprint.id}`}
            initial={{ width: '100%' }}
            animate={{ width: `${afterWidthPct}%` }}
            transition={SNAPPY_SPRING}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};
