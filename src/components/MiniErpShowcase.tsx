import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, ShieldCheck, PackageCheck, RotateCcw, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import {
  SNAPPY_SPRING,
  SNAPPY_TAB_SPRING,
  BUTTON_MOTION,
} from '../utils/motionConfig';

type ErpRole = 'Admin' | 'Sales' | 'Warehouse' | 'Accounts';

const ROLE_CONFIG: Record<
  ErpRole,
  {
    email: string;
    scope: string;
    permissions: string[];
    endpointExample: string;
  }
> = {
  Admin: {
    email: 'admin@minierp.com',
    scope: 'Full Enterprise Access · Challan Cancellation & Reversal',
    permissions: [
      'Full CRUD across CRM Leads, Inventory Catalog & Sales Challans',
      'Cancel confirmed challans -> triggers automatic IN stock reversal',
      'Audit all stock_movements (IN / OUT) & system settings',
    ],
    endpointExample: 'PATCH /api/challans/:id/cancel -> movement_type: "IN"',
  },
  Sales: {
    email: 'sales@minierp.com',
    scope: 'CRM Pipeline & Sales Challan Generation',
    permissions: [
      'Manage CRM leads, active accounts, and customer follow-up logs',
      'Generate Sales Challans (CH-YYYYMMDD-XXXX) with snapshotted SKU prices',
      'Confirm customer orders with pre-validated stock reservation',
    ],
    endpointExample: 'POST /api/challans -> snapshots sales_challan_items',
  },
  Warehouse: {
    email: 'warehouse@minierp.com',
    scope: 'Inventory Catalog & Immutable Stock Audit Trail',
    permissions: [
      'Multi-category product catalog CRUD & low-stock threshold alerts',
      'Execute manual stock adjustments with mandatory audit reason',
      'Inspect immutable stock_movements ledger by SKU and warehouse location',
    ],
    endpointExample: 'POST /api/inventory/adjust -> movement_type: "IN" | "OUT"',
  },
  Accounts: {
    email: 'accounts@minierp.com',
    scope: 'Order Verification & Printable Tax Invoicing',
    permissions: [
      'Read-only access to customer accounts and warehouse stock levels',
      'Confirm pending Sales Challans for billing dispatch',
      'Generate & print historical Tax Invoices from snapshotted unit prices',
    ],
    endpointExample: 'GET /api/challans/:id/invoice -> historical price snapshot',
  },
};

export const MiniErpShowcase: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<ErpRole>('Admin');
  const [challanStatus, setChallanStatus] = useState<'DRAFT' | 'CONFIRMED' | 'CANCELLED_REVERSED'>('CONFIRMED');
  const [availableStock, setAvailableStock] = useState<number>(115);

  const activeRole = ROLE_CONFIG[selectedRole];

  const handleConfirmChallan = () => {
    if (challanStatus === 'CONFIRMED') return;
    setChallanStatus('CONFIRMED');
    setAvailableStock(115);
  };

  const handleCancelReverse = () => {
    if (challanStatus === 'CANCELLED_REVERSED') return;
    setChallanStatus('CANCELLED_REVERSED');
    setAvailableStock(140);
  };

  const handleResetDraft = () => {
    setChallanStatus('DRAFT');
    setAvailableStock(140);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SNAPPY_SPRING}
      className="rounded-3xl studio-inset p-5 sm:p-7 lg:p-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/40 dark:border-slate-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#0B42D4] dark:text-[#3B82F6]">
            <span>Enterprise Full-Stack System</span>
            <span aria-hidden="true">·</span>
            <span>Node.js · TypeScript · Express · React 18 · Vite · Supabase PostgreSQL · JWT RBAC</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white mt-1.5">
            Mini ERP + CRM Operations Portal
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 max-w-3xl">
            Wholesale &amp; distribution operations management portal engineered with 4-role RBAC, atomic stock deduction transactions (zero-negative inventory guarantee), and historical invoice price snapshots.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <motion.a
            {...BUTTON_MOTION}
            href="https://github.com/hgroy/mini-erp-crm"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] sm:min-h-[40px] px-4 py-2.5 sm:py-2 text-xs font-semibold rounded-xl bg-[#0B42D4] text-white hover:bg-[#0935AC] transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <Code2 className="w-4 h-4" />
            <span>View Repository on GitHub</span>
          </motion.a>
        </div>
      </div>

      {/* Interactive 2-Column ERP Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mt-6 items-stretch">
        {/* Left: 4-Role RBAC Matrix */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/80 dark:bg-[#09090B] p-4 sm:p-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>01. Role-Based Access Control (RBAC) Matrix</span>
              </div>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                JWT 24h + Express Guard
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/60 dark:border-zinc-800">
              {(['Admin', 'Sales', 'Warehouse', 'Accounts'] as ErpRole[]).map((role) => {
                const active = selectedRole === role;
                return (
                  <motion.button
                    key={role}
                    {...BUTTON_MOTION}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`relative min-h-[42px] sm:min-h-[36px] px-3 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      active
                        ? 'text-white'
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="erpRoleActiveTab"
                        transition={SNAPPY_TAB_SPRING}
                        className="absolute inset-0 rounded-lg bg-indigo-600 shadow-2xs"
                      />
                    )}
                    <span className="relative z-10">{role}</span>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              key={selectedRole}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={SNAPPY_SPRING}
              className="mt-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111115] p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 pb-2.5 border-b border-zinc-100 dark:border-zinc-800">
                <span>
                  Role: <strong className="text-zinc-950 dark:text-white">{selectedRole}</strong>
                </span>
                <span>{activeRole.email}</span>
              </div>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-2.5">
                {activeRole.scope}
              </p>
              <ul className="mt-2.5 space-y-2">
                {activeRole.permissions.map((perm, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{perm}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-200/70 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 truncate">
            Route Guard: <span className="text-indigo-600 dark:text-indigo-400">{activeRole.endpointExample}</span>
          </div>
        </div>

        {/* Right: Atomic Stock Deduction & Challan Snapshot Simulator */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/80 dark:bg-[#09090B] p-4 sm:p-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                <PackageCheck className="w-4 h-4 shrink-0" />
                <span>02. Atomic Stock Deduction &amp; Snapshot Ledger</span>
              </div>
              <span className="text-xs font-mono tabular-nums font-semibold text-zinc-700 dark:text-zinc-300">
                Challan: CH-20260902-0041
              </span>
            </div>

            <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#111115] p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-zinc-100 dark:border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400 font-mono block">
                    SKU-IND-402 · Industrial Copper Coil
                  </span>
                  <span className="font-semibold text-zinc-950 dark:text-white">
                    Order Qty: 25 Units · Snapshotted Price: ₹4,200/unit
                  </span>
                </div>
                <div className="sm:text-right font-mono tabular-nums">
                  <span className="text-zinc-500 dark:text-zinc-400 block">Warehouse Stock</span>
                  <motion.span
                    key={`${challanStatus}-${availableStock}`}
                    initial={{ opacity: 0.35, y: -3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={SNAPPY_SPRING}
                    className="inline-block text-base font-bold text-emerald-600 dark:text-emerald-400"
                  >
                    {availableStock} Units
                  </motion.span>
                </div>
              </div>

              <div className="text-xs font-mono space-y-1.5 text-zinc-600 dark:text-zinc-300">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span>Transaction State:</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {challanStatus === 'CONFIRMED'
                      ? 'CONFIRMED (Deducted -25 Units)'
                      : challanStatus === 'CANCELLED_REVERSED'
                      ? 'CANCELLED (Credited +25 Units Back)'
                      : 'DRAFT (Pre-Validation Ready)'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span>Audit Log (stock_movements):</span>
                  <span className="tabular-nums">
                    {challanStatus === 'CONFIRMED'
                      ? 'movement_type: "OUT" · 25 units'
                      : challanStatus === 'CANCELLED_REVERSED'
                      ? 'movement_type: "IN" (Reversal) · 25 units'
                      : 'Pending confirmation'}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Simulation Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <motion.button
                {...BUTTON_MOTION}
                type="button"
                onClick={handleConfirmChallan}
                className={`relative min-h-[42px] sm:min-h-[36px] px-3.5 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  challanStatus === 'CONFIRMED'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#111115] border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-indigo-500'
                }`}
              >
                Confirm Challan (-25 OUT)
              </motion.button>
              <motion.button
                {...BUTTON_MOTION}
                type="button"
                onClick={handleCancelReverse}
                className={`relative min-h-[42px] sm:min-h-[36px] px-3.5 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  challanStatus === 'CANCELLED_REVERSED'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#111115] border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-indigo-500'
                }`}
              >
                Admin Cancel (+25 IN Reversal)
              </motion.button>
              <motion.button
                {...BUTTON_MOTION}
                type="button"
                onClick={handleResetDraft}
                className="inline-flex items-center gap-1 min-h-[42px] sm:min-h-[36px] px-3.5 py-2 sm:py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </motion.button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-200/70 dark:border-zinc-800 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>
              Historical Snapshot: Unit price is locked inside <code className="font-mono">sales_challan_items</code> so catalog edits never alter past Tax Invoices.
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
