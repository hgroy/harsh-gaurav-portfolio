export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  category: 'backend' | 'performance' | 'data-etl' | 'fullstack';
  categoryLabel: string;
  companyOrType: string;
  timeframe: string;
  featuredSpan?: boolean;
  headlineMetric: string;
  headlineMetricContext: string;
  beforeValue: string;
  afterValue: string;
  summary: string;
  problem: string;
  rootCause: string;
  architectureSolution: string[];
  filesTouched?: string[];
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  diagramNodes: {
    step: string;
    label: string;
    detail: string;
  }[];
}

export interface FlagshipProject {
  id: string;
  index: string;
  name: string;
  tagline: string;
  category: string;
  liveUrl?: string;
  repoUrl: string;
  description: string;
  architectureHighlights: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
}

export interface ArchitectureBlueprint {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  beforeMetric: string;
  afterMetric: string;
  improvementLabel: string;
  description: string;
  stages: {
    id: string;
    title: string;
    tech: string;
    latency: string;
    detail: string;
  }[];
}

export const PROFILE_DATA = {
  name: 'Harsh Gaurav',
  initials: 'HG',
  role: 'Software Engineer',
  headline: 'Full-Stack & Backend Engineer',
  subheadline:
    'Building sub-2-second analytics engines, distributed background pipelines, and enterprise full-stack applications.',
  location: 'Mohali, Punjab, India · Open to Remote & Relocation',
  phone: '+91-7014145681',
  email: 'gharshry@gmail.com',
  github: 'https://github.com/hgroy',
  linkedin: 'https://www.linkedin.com/in/harshgaurav-dev/',
  resumePdfPath: '/assets/aistudio/Harsh_Gaurav_Resume_Clickable_b097138c.pdf',
  resumeImagePath: '/assets/certificates/resume.png',
  primaryPortraitPath: '/assets/profile/harsh-editorial-portrait.png',
  avatarPath: '/assets/profile/harsh-avatar.png',
  secondaryPortraitPath: '/assets/profile/harsh-outdoor-wide.png',
  portraits: [
    {
      id: 'editorial',
      label: 'Portrait Crop',
      caption: 'HD Editorial River Portrait · Real Untouched Face',
      src: '/assets/profile/harsh-editorial-portrait.png',
    },
    {
      id: 'outdoor-wide',
      label: 'Full Frame',
      caption: 'Wide River & Bridge Editorial · Real Untouched Face',
      src: '/assets/profile/harsh-outdoor-wide.png',
    },
  ],
  summary:
    'Software engineer with production experience on an enterprise ad-creative and performance reporting platform. Specialized in Next.js 15, React, TypeScript, Node.js, Python/Celery, PostgreSQL, Redis, and BigQuery across Vercel, AWS, and Google Cloud Platform.',
};

export const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 'docchat-rag',
    index: '01',
    name: 'DocChat: Document Q&A with Cited Answers (RAG)',
    tagline: 'Page-Chunked Gemini Embeddings · pgvector Cosine Search · NDJSON Streaming',
    category: 'AI & Full-Stack System',
    liveUrl: 'https://docchat-kohl.vercel.app',
    repoUrl: 'https://github.com/hgroy/docchat',
    description:
      'Production Retrieval-Augmented Generation platform that ingests PDF, TXT, and Markdown files, splits documents into page-indexed chunks, embeds with Google Gemini, and streams answers token-by-token with exact source page citations.',
    architectureHighlights: [
      'Page-aware document chunking preserving exact page numbers for deterministic citation grounding.',
      'Cosine similarity vector search in Neon Serverless PostgreSQL + pgvector with versioned Drizzle ORM SQL migrations.',
      'Real-time NDJSON token-by-token answer streaming strictly scoped per authenticated user session.',
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL + pgvector', 'Drizzle ORM', 'Google Gemini', 'NDJSON', 'Vercel'],
    metrics: [
      { label: 'Retrieval Engine', value: 'pgvector Cosine' },
      { label: 'Response Protocol', value: 'NDJSON Stream' },
      { label: 'Grounding', value: 'Exact Page Citations' },
    ],
  },
  {
    id: 'mini-erp-crm',
    index: '02',
    name: 'Mini ERP + CRM Operations Portal',
    tagline: '4-Role RBAC · Atomic Stock Deduction · Historical Pricing Snapshots · Tax Invoicing',
    category: 'Enterprise Full-Stack ERP',
    repoUrl: 'https://github.com/hgroy/mini-erp-crm',
    description:
      'Production-grade wholesale & distribution operations portal engineered with enterprise architectural patterns: modular domain separation, 4-role RBAC (Admin, Sales, Warehouse, Accounts), atomic inventory deduction transactions, and immutable stock audit logs.',
    architectureHighlights: [
      'Zero-Negative Inventory Guarantee (PATCH /api/challans/:id/confirm): Pre-validates all order items and executes an all-or-nothing deduction with automatic stock reversal (IN) on Admin cancellation.',
      'Historical Snapshot Preservation: Snapshots SKU, item name, and unit price into sales_challan_items (CH-YYYYMMDD-XXXX) so future catalog edits never alter past Tax Invoices.',
      '4-Role Corporate RBAC: Protected React Router v7 guards + Express JWT/RBAC middleware isolating Admin, Sales, Warehouse, and Accounts workflows.',
    ],
    stack: [
      'Node.js',
      'TypeScript',
      'Express.js',
      'React 18',
      'Vite',
      'Supabase PostgreSQL',
      'JWT + RBAC',
      'Axios Interceptors',
    ],
    metrics: [
      { label: 'Access Control', value: '4 Corporate Roles' },
      { label: 'Inventory Safety', value: 'Atomic IN/OUT Ledger' },
      { label: 'Billing Integrity', value: 'Price Snapshots' },
    ],
  },
  {
    id: 'blog-publishing-platform',
    index: '03',
    name: 'Full-Stack MVC Blog Publishing Platform',
    tagline: 'Protected Routes · Stateless JWT Auth · Normalized Relational Schema',
    category: 'Full-Stack Web Platform',
    repoUrl: 'https://github.com/hgroy',
    description:
      'Full-stack editorial publishing platform engineered with React, Node.js, Express, and PostgreSQL featuring MVC REST APIs, JWT authentication, and symmetric client/server payload validation.',
    architectureHighlights: [
      'Normalized PostgreSQL relational schema enforcing foreign-key integrity across authors, articles, and tags.',
      'Stateless JWT authentication with protected client route guards and Express auth middleware.',
      'Symmetric validation rules blocking malformed inputs on both the React frontend and Express API controllers.',
    ],
    stack: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'JWT Auth', 'MVC REST API'],
    metrics: [
      { label: 'Architecture', value: 'Layered MVC' },
      { label: 'Security', value: 'JWT + Dual Validation' },
      { label: 'Database', value: 'Normalized Postgres' },
    ],
  },
];

export const HERO_KPI_METRICS = [
  {
    value: '1.8s',
    previous: 'Down from 60+ sec',
    label: 'Dashboard Refresh Latency',
    context: 'Removed legacy 14-table BigQuery warming scans; hybrid Postgres history + 2-day BigQuery gap',
  },
  {
    value: '90%+',
    previous: '43 min → <4 min',
    label: 'Docker CI/CD Deploy Speedup',
    context: 'Excluded 2.34 GB venv (100k+ files chown) via .dockerignore & unified 4 service builds into 1 image',
  },
  {
    value: '14,000+',
    previous: 'Zero-downtime cutover',
    label: 'Creative Concepts Migrated',
    context: '5-stage video production workflow engine enforced by PostgreSQL triggers & outbox pattern',
  },
  {
    value: '100%',
    previous: '0ms client short-circuit',
    label: 'Edge CDN Empty-Filter Fix',
    context: 'Guarded useCachedData & useComparisonConcepts when Vercel CDN stripped &channels=',
  },
];

export const ARCHITECTURE_BLUEPRINTS: ArchitectureBlueprint[] = [
  {
    id: 'hybrid-analytics',
    index: '01',
    name: 'Hybrid Analytics Read Engine',
    subtitle: 'Browser LRU Cache · PostgreSQL History · 2-Day BigQuery Live Gap',
    beforeMetric: '60+ sec (3 parallel calls)',
    afterMetric: '1.8 sec refresh',
    improvementLabel: '97% faster · 14 BQ tables skipped',
    description:
      'Eliminated two legacy Promise.all cache-warming calls (/api/ad-performance?cache=refresh & /combinations?cache=refresh) and routed directly to /api/ad-performance/cached.',
    stages: [
      {
        id: 'client-hook',
        title: 'useCachedData Hook & Edge Guard',
        tech: 'Next.js 15 · Client LRU Cache',
        latency: '0–5ms',
        detail: 'Short-circuits empty channel selections (selectedChannels.length === 0) and busts local LRU map.',
      },
      {
        id: 'pg-history',
        title: 'Historical Pre-Processed Read',
        tech: 'PostgreSQL · /api/ad-performance/cached',
        latency: '140ms',
        detail: 'Reads aggregated daily performance up to 2 days ago directly from PostgreSQL.',
      },
      {
        id: 'bq-delta',
        title: 'Scoped 2-Day Live Gap Query',
        tech: 'BigQuery · /api/ad-performance/filtered',
        latency: '1,380ms',
        detail: 'Queries BigQuery strictly for yesterday & today with outbound_clicks_outbound_click CVR logic.',
      },
      {
        id: 'merge-stream',
        title: 'Weighted Concept Merge & Heatmap UI',
        tech: 'Click-Weighted CVR · React 19',
        latency: '180ms',
        detail: 'Computes Σ(Combo CVR × Clicks) / Total Clicks and renders 2-decimal heatmap cells.',
      },
    ],
  },
  {
    id: 'cm-recompute-engine',
    index: '02',
    name: 'Unit-Economics Lock & Recompute Engine',
    subtitle: 'Next.js Vercel Proxy · AWS Python/Celery · Redis Mutex · React cache()',
    beforeMetric: 'HTTP timeouts & 5m stale cache',
    afterMetric: 'Locked async worker + fresh reads',
    improvementLabel: 'P1/P2 safety guards verified',
    description:
      'Runs multi-minute PostgreSQL stored procedures in AWS Celery workers guarded by an atomic Redis lock, 5s status polling, and per-request React cache() memoization.',
    stages: [
      {
        id: 'save-guard',
        title: 'P1 Save Guard & Trigger Proxy',
        tech: 'cm-recompute-lock.ts · Next.js',
        latency: '12ms',
        detail: 'Fail-closed (503) if Python errors (maybe running); fail-open only when Python is unreachable.',
      },
      {
        id: 'redis-lock',
        title: 'Atomic Redis Lock & Dead-Holder Check',
        tech: 'cm_recompute.py · Redis',
        latency: '8ms',
        detail: 'Stores task_id inside lock atomically; _lock_holder_is_dead() clears crashed locks.',
      },
      {
        id: 'celery-proc',
        title: 'Celery Stored Procedure Execution',
        tech: 'cm_recompute_tasks.py · AWS',
        latency: 'Async Background',
        detail: 'Executes heavy PostgreSQL contribution-margin stored procedure and releases lock on completion.',
      },
      {
        id: 'poll-react-cache',
        title: '5s Polling & React cache() Fresh Read',
        tech: 'cm-enrichment.ts · page.tsx',
        latency: '1 DB read/req',
        detail: 'Polls /status every 5s with recomputeStatusUnknown guard; reads fresh config across Vercel copies.',
      },
    ],
  },
  {
    id: 'stripe-paypal-bq',
    index: '03',
    name: 'Stripe + PayPal to BigQuery Pipeline',
    subtitle: 'Cloud Scheduler · Cloud Run Job · Secret Manager · GCS · BigQuery MERGE',
    beforeMetric: 'Manual CSV downloads & duplicates',
    afterMetric: 'Automated 3rd-day idempotent ETL',
    improvementLabel: '15,970+ rows/mo merged cleanly',
    description:
      'Automated monthly extraction of Stripe charges/refunds and PayPal transactions into a partitioned GCS data lake and BigQuery raw, staging, and final fact tables.',
    stages: [
      {
        id: 'scheduler-secret',
        title: 'Cloud Scheduler & Secret Manager',
        tech: 'Cron 0 6 3 * * · Cloud Run Job',
        latency: 'Step 01',
        detail: 'Triggers on 3rd of month (06:17 UTC); loads rk_live_ Stripe key & PayPal OAuth credentials.',
      },
      {
        id: 'api-extract',
        title: 'Paginated Stripe & PayPal Extractors',
        tech: 'Stripe /v1/charges & PayPal OAuth2',
        latency: 'Step 02',
        detail: 'Paginates Stripe starting_after (100/page) & PayPal reporting/search/read (500/page).',
      },
      {
        id: 'gcs-raw',
        title: 'Partitioned GCS NDJSON Backup Lake',
        tech: 'gs://payment-raw/year=YYYY/month=MM',
        latency: 'Step 03',
        detail: 'Persists immutable raw NDJSON audit files with _run_id and _extract_month metadata.',
      },
      {
        id: 'bq-merge',
        title: 'BigQuery Staging & Idempotent MERGE',
        tech: 'finance_payments.fact_payment_transactions',
        latency: 'Step 04',
        detail: 'Normalizes minor-unit cents and executes SQL MERGE on source_unique_key + writes etl_run_log.',
      },
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cm-recompute-caching',
    index: '01',
    title: 'Unit-Economics Contribution Margin Recompute & Serverless Cache Fix',
    category: 'backend',
    categoryLabel: 'Backend & Distributed',
    companyOrType: 'Code Garage Tech',
    timeframe: 'Production Architecture',
    featuredSpan: true,
    headlineMetric: 'P1/P2 Safety Locks',
    headlineMetricContext: 'AWS Python/Celery + Redis mutex + React cache() memoization',
    beforeValue: 'HTTP timeouts, race conditions & 5-min stale Vercel memory cache',
    afterValue: 'Non-blocking Celery job, dead-lock recovery & always-fresh DB reads',
    summary:
      'Architected the background Contribution Margin (CM) recompute pipeline across Next.js 15 (Vercel) and Python/Celery (AWS) with Redis distributed locks, 3 P1/P2 safety fixes, and serverless cache removal.',
    problem:
      '1) The PostgreSQL contribution-margin stored procedure takes several minutes—far longer than an HTTP request can stay open. 2) Concurrent clicks or edits during calculation corrupted results. 3) After editing costs, users still saw old CM numbers for up to 5 minutes because configCache lived in Vercel serverless memory.',
    rootCause:
      'Vercel spins up multiple isolated serverless instances (Copy A, Copy B, Copy C); clearing an in-memory Map only cleared one instance, and clearConfigCache() was dead code. Meanwhile, Redis locks lacked atomic owner binding and connection-drop safeguards.',
    architectureSolution: [
      'Built "Recompute CM" async flow: Next.js proxy forwards to Python on AWS, which atomically acquires a Redis lock (storing task_id inside the lock) and queues a Celery task.',
      'Implemented _lock_holder_is_dead() to inspect Celery task states (PENDING/STARTED/RETRY vs SUCCESS/FAILURE/REVOKED) so a crashed worker never blocks users for 90 minutes.',
      'Added 3 P1/P2 safety fixes: (P1) Save guard returns 503 fail-closed when Python errors but fails open if unreachable; (P2-backend) Atomic task_id lock creation; (P2-frontend) recomputeStatusUnknown flag keeps editing locked after 3 failed 5-second status polls.',
      'Deleted the broken 5-minute in-memory configCache Map in cm-enrichment.ts and wrapped the DB read in React cache() so KPI cards, Table, and Totals share 1 query per request while every new request reads fresh.',
    ],
    filesTouched: [
      'cm_recompute_tasks.py',
      'cm_recompute.py',
      'recompute-cm/route.ts',
      'recompute-cm/status/route.ts',
      'cm-recompute-lock.ts',
      'page.tsx',
      'cm-enrichment.ts',
    ],
    codeSnippet: {
      filename: 'cm_recompute.py & cm-enrichment.ts',
      language: 'python',
      code: `# 1. Dead lock-holder recovery in Python (cm_recompute.py)
def _lock_holder_is_dead(lock_owner_task_id: str | None) -> bool:
    if not lock_owner_task_id:
        return True  # Stale/ownerless, safe to clear
    state = AsyncResult(lock_owner_task_id).state
    if state in ("SUCCESS", "FAILURE", "REVOKED"):
        return True  # Finished or dead, safe to clear
    return False     # PENDING / STARTED / RETRY -> still alive, block with 409

// 2. Per-request memoization in Next.js (cm-enrichment.ts)
export const getUnitEconomicsConfig = cache(async () => {
  return await fetchFreshConfigFromPostgres(); // 1 query per request, never stale across requests
});`,
    },
    stack: ['Next.js 15 (Vercel)', 'Python + Celery (AWS)', 'PostgreSQL', 'Redis Locks', 'React cache()'],
    diagramNodes: [
      {
        step: '01',
        label: 'Edit Costs & P1 Save Guard',
        detail: 'Checks cm-recompute-lock.ts; blocks edits if recompute is running or status unknown.',
      },
      {
        step: '02',
        label: 'Atomic Redis Lock & Celery Queue',
        detail: 'Acquires Redis lock with atomic task_id; clears stale locks via _lock_holder_is_dead().',
      },
      {
        step: '03',
        label: '5s Browser Polling (/status)',
        detail: 'Polls every 5s; sets recomputeStatusUnknown after 3 network failures to prevent corruption.',
      },
      {
        step: '04',
        label: 'React cache() Fresh Read',
        detail: 'Deduplicates DB config reads within a single request while guaranteeing fresh data across Vercel instances.',
      },
    ],
  },
  {
    id: 'vercel-edge-cdn-guard',
    index: '02',
    title: 'Vercel Edge CDN Query Parameter Normalization Short-Circuit',
    category: 'performance',
    categoryLabel: 'Performance & Cloud',
    companyOrType: 'Code Garage Tech',
    timeframe: 'Production Bug Fix',
    featuredSpan: false,
    headlineMetric: '100% Waste Cut',
    headlineMetricContext: '0ms client-side short-circuit in useCachedData & useComparisonConcepts',
    beforeValue: 'Production returned ALL channels when user deselected all ("None")',
    afterValue: 'Instant 0ms empty state + 100% reduction in wasted BigQuery/DB calls',
    summary:
      'Diagnosed why deselecting all acquisition channels (Meta, TikTok, YouTube) worked on localhost but returned all records in production on Vercel Edge CDN, deploying a client-side short-circuit fix.',
    problem:
      'On the Ad Genius Concepts V2 dashboard, clicking "Deselect All" (empty channel filter) showed 0 records on localhost, but on production (Vercel) it ignored the "None" state and displayed all records across all channels.',
    rootCause:
      'To prevent cache key pollution, Vercel Edge CDN performs URL Normalization and strips empty query parameters (&channels=). On localhost, url.searchParams.get("channels") returned "" (empty string -> []), whereas in production it returned null, which /api/ad-performance/cached/route.ts interpreted as "no filter applied".',
    architectureSolution: [
      'Evaluated 3 engineering strategies: Strategy A (Client-Side Short-Circuit in React hooks), Strategy B (Server-Side Contract Rewrite), and Strategy C (CDN Cache Key Reconfiguration).',
      'Selected and implemented Strategy A in useCachedData.ts and useComparisonConcepts.ts.',
      'Intercepted selectedChannels.length === 0 and debouncedChannels.length === 0 on the client prior to network fetch, resetting pagination, totals, and comparison maps in 0ms.',
      'Eliminated 100% of wasted serverless invocations and BigQuery scan costs for empty filter states.',
    ],
    filesTouched: [
      'src/hooks/ad-performance/useCachedData.ts',
      'src/hooks/ad-performance/useComparisonConcepts.ts',
      'src/app/api/ad-performance/cached/route.ts',
    ],
    codeSnippet: {
      filename: 'src/hooks/ad-performance/useCachedData.ts',
      language: 'typescript',
      code: `// Explicitly handle "deselect all channels" on the client so UI semantics are stable
// even if Vercel Edge CDN normalizes and strips \`&channels=\` as "no filter".
if (selectedChannels !== null && selectedChannels.length === 0) {
  dateRangeCache.delete(cacheKey);
  setCurrentDateRange({ fromDate, toDate });
  setCurrentSort({ sortBy, sortDirection });
  setCurrentFilters(filters);
  setCachedData([]);
  setPaginationInfo({
    currentPage: page, pageSize, totalRecords: 0, totalPages: 0,
    hasNextPage: false, hasPrevPage: false, startIndex: 0, endIndex: 0,
  });
  setOverallTotals(null);
  setChannelDistribution([]);
  setLoading(false);
  return [];
}`,
    },
    stack: ['React Hooks', 'Next.js 15', 'Vercel Edge CDN', 'BigQuery Cost Optimization', 'TypeScript'],
    diagramNodes: [
      {
        step: '01',
        label: 'User Deselects All Channels',
        detail: 'selectedChannels evaluates to [] on Concepts V2 dashboard.',
      },
      {
        step: '02',
        label: 'Edge CDN Strip Trap Bypassed',
        detail: 'Prevents sending &channels= which Vercel Edge CDN would strip to null.',
      },
      {
        step: '03',
        label: 'Hook Short-Circuit (0ms)',
        detail: 'useCachedData & useComparisonConcepts reset state and pagination immediately.',
      },
    ],
  },
  {
    id: 'docker-deploy-optimization',
    index: '03',
    title: '43-Minute Production Docker Deploy Root-Cause & 90%+ Speedup',
    category: 'performance',
    categoryLabel: 'Performance & Cloud',
    companyOrType: 'Code Garage Tech',
    timeframe: 'CI/CD Infrastructure',
    featuredSpan: false,
    headlineMetric: '43m → < 4m',
    headlineMetricContext: 'Eliminated 2.34 GB venv copy + 100k-file chown -R across 4 services',
    beforeValue: '~43 min deploy (2.34 GB context + 15m chown -R × 4 services)',
    afterValue: 'Seconds/minutes (>90% faster via .dockerignore + 1 shared image)',
    summary:
      'Diagnosed why production deployments took ~43 minutes: a missing .dockerignore copied a 2.34 GB venv into the image, chown -R crawled 100k+ files for 15 minutes, and 4 services rebuilt the same image 4× without cache.',
    problem:
      'Every production deploy took roughly 43 minutes to complete, severely bottlenecking releases and emergency fixes.',
    rootCause:
      '1) No .dockerignore meant a leftover venv/ on the server ballooned the Docker build context to 2.34 GB (transfer + COPY took ~11 min). 2) Running chown -R /app for the non-root container user crawled 100,000+ junk files inside venv/ (~15 min). 3) All 4 services rebuilt the exact same identical image 4× with --no-cache and prune.',
    architectureSolution: [
      'Added a strict .dockerignore to exclude venv/, .git, and local caches—dropping build context transfer and chown -R from ~26 minutes to seconds.',
      'Refactored the deployment pipeline to build 1 shared Docker image and reuse it across all 4 services instead of building 4 identical images.',
      'Retained the Docker layer build cache by removing aggressive prune and --no-cache flags.',
    ],
    filesTouched: ['.dockerignore', 'Dockerfile', '.github/workflows/deploy.yml'],
    codeSnippet: {
      filename: 'Root Cause Breakdown & .dockerignore Fix',
      language: 'bash',
      code: `# Before Fix (~43 min total across 4 services):
# 1. Build context transfer + COPY (2.34 GB leftover venv/)  ≈ 11 min
# 2. RUN chown -R appuser:appgroup /app (100k+ venv files)   ≈ 15 min
# 3. Repeated 4x across 4 identical services with --no-cache

# .dockerignore Fix:
venv/
.venv/
__pycache__/
.git/
.pytest_cache/
node_modules/`,
    },
    stack: ['Docker', 'Linux Permissions (chown)', 'CI/CD Pipelines', 'Python venv', 'Multi-Service Deploy'],
    diagramNodes: [
      {
        step: '01',
        label: '.dockerignore Gate',
        detail: 'Blocks 2.34 GB leftover venv/ (100k+ files) from entering build context.',
      },
      {
        step: '02',
        label: 'Instant Non-Root chown',
        detail: 'chown -R /app only touches application source files, dropping 15m step to seconds.',
      },
      {
        step: '03',
        label: '1 Shared Image for 4 Services',
        detail: 'Builds once with layer caching enabled and deploys across all 4 services.',
      },
    ],
  },
  {
    id: 'hybrid-bigquery-postgres',
    index: '04',
    title: 'Concepts-V2 Dashboard Refresh & Hybrid Cache Optimization',
    category: 'performance',
    categoryLabel: 'Performance & Cloud',
    companyOrType: 'Code Garage Tech',
    timeframe: 'Query & Cache Architecture',
    featuredSpan: true,
    headlineMetric: '60+ sec → 1.8 sec',
    headlineMetricContext: 'Removed 2 legacy cache-warming calls + hybrid Postgres/BigQuery read',
    beforeValue: '3 parallel requests scanning 14 BigQuery tables since Jan 2025 (60+ sec)',
    afterValue: '1–2s for past ranges (Postgres only) · ~10s for 2-day live BigQuery gap',
    summary:
      'Eliminated two legacy background cache-warming calls from the "Refresh Cache" button and implemented a two-tier browser LRU + hybrid PostgreSQL/BigQuery 2-day gap read engine.',
    problem:
      'Clicking "Refresh Cache" on /ad-performance/concepts-v2 forced media buyers to wait over 60 seconds because the frontend waited on a Promise.all of 3 parallel requests, two of which were left over from a deleted "Live Data" tab.',
    rootCause:
      'Legacy Call 1 (/api/ad-performance?cache=refresh) scanned 14 BigQuery tables back to Jan 1, 2025 (15–60+ sec). Legacy Call 2 (/api/ad-performance/combinations?cache=refresh) loaded 100,000 mapping rows from PostgreSQL into a cache the main page never read (1–5 sec).',
    architectureSolution: [
      'Removed the redundant Promise.all cache-warming calls from handleRefresh in src/app/ad-performance/concepts-v2/page.tsx (since cron jobs already refresh server caches hourly).',
      'Cleared the client-side Browser LRU cache (max 50 entries) and called /api/ad-performance/cached directly.',
      'Fetched pre-processed historical metrics up to 2 days ago from PostgreSQL (1–2s for historical ranges, skipping BigQuery completely).',
      'Queried BigQuery via /api/ad-performance/filtered strictly for the 2-day yesterday/today live gap when recent dates are selected.',
    ],
    filesTouched: [
      'src/app/ad-performance/concepts-v2/page.tsx',
      'src/app/api/ad-performance/cached/route.ts',
      'src/app/api/ad-performance/filtered/route.ts',
      'src/lib/services/adPerformanceService.ts',
    ],
    codeSnippet: {
      filename: 'src/app/ad-performance/concepts-v2/page.tsx',
      language: 'typescript',
      code: `// Removed legacy Promise.all warming calls (/api/ad-performance?cache=refresh
// scanning 14 BigQuery tables + /api/ad-performance/combinations?cache=refresh)
console.log('Refreshing cache (clearing browser cache and refetching data)...');
const { fromDate, toDate } = getDateRangeForAPI();
const sortBy = cachedCurrentSort?.sortBy || 'totalSpend';
// Directly invokes /api/ad-performance/cached (Postgres history + 2-day BigQuery gap)`,
    },
    stack: ['Next.js 15', 'PostgreSQL', 'Google BigQuery', 'Client LRU Cache', 'TypeScript'],
    diagramNodes: [
      {
        step: '01',
        label: 'UI Refresh & LRU Bust',
        detail: 'Blocks double-clicks and clears browser-level 50-entry LRU query cache.',
      },
      {
        step: '02',
        label: 'Bypass Legacy 14-Table Scan',
        detail: 'Skips unreferenced combinations & full-history BigQuery warming endpoints.',
      },
      {
        step: '03',
        label: 'Postgres History (Up to T-2d)',
        detail: 'Returns historical date ranges in 1–2 seconds directly from PostgreSQL.',
      },
      {
        step: '04',
        label: 'BigQuery 2-Day Gap Merge',
        detail: 'Fetches only yesterday & today from BigQuery and merges payload seamlessly.',
      },
    ],
  },
  {
    id: 'stripe-paypal-bigquery-etl',
    index: '05',
    title: 'Stripe + PayPal to BigQuery Automated Monthly Payment Pipeline',
    category: 'data-etl',
    categoryLabel: 'BigQuery & Data ETL',
    companyOrType: 'Cloud Data Engineering',
    timeframe: 'Automated Financial ETL',
    featuredSpan: true,
    headlineMetric: 'Idempotent MERGE',
    headlineMetricContext: 'Cloud Scheduler → Cloud Run Job → GCS NDJSON → BigQuery Fact Table',
    beforeValue: 'Manual monthly CSV exports & duplicate row risks on reruns',
    afterValue: 'Automated 3rd-of-month extraction with compound-key MERGE & audit logs',
    summary:
      'Designed the end-to-end automated monthly financial data pipeline extracting Stripe charges/refunds and PayPal transactions into Cloud Storage and BigQuery raw, staging, and final fact tables.',
    problem:
      'Finance teams relied on manual monthly downloads from Stripe and PayPal dashboards. Re-running an import risked duplicate rows, minor-unit (cents) vs decimal mismatches, and non-unique PayPal transaction IDs.',
    rootCause:
      'Stripe reports amounts in minor units (cents) while PayPal returns decimal strings, and PayPal transaction_id can appear multiple times across different event codes in the reporting system.',
    architectureSolution: [
      'Scheduled a monthly Cloud Run Job via Cloud Scheduler (0 6 3 * *, 3rd day of month buffer) authenticating via Google Secret Manager (read-only rk_live_ Stripe key & temporary PayPal OAuth2 token with reporting/search/read scope).',
      'Extracted paginated Stripe /v1/charges and /v1/refunds (with expand[]=data.balance_transaction and starting_after cursor) and PayPal /v1/reporting/transactions (page_size=500, balance_affecting_records_only=Y).',
      'Stored immutable raw NDJSON files in partitioned Google Cloud Storage (gs://payment-raw/{source}/year=YYYY/month=MM/run_id=.../data.ndjson) for audit and reprocessing.',
      'Modeled BigQuery dataset finance_payments (Raw → Staging → Final fact_payment_transactions) using idempotent SQL MERGE on deterministic source_unique_key (including MD5 compound key for PayPal) plus etl_run_log and automated alerts.',
    ],
    filesTouched: [
      'payment_pipeline/main.py',
      'extractors/stripe_extractor.py',
      'extractors/paypal_extractor.py',
      'storage/gcs_writer.py',
      'sql/merge_fact_payment_transactions.sql',
    ],
    codeSnippet: {
      filename: 'sql/merge_fact_payment_transactions.sql',
      language: 'sql',
      code: `-- Deterministic compound deduplication keys:
-- Stripe Charge: "stripe_charge:" || charge_id
-- Stripe Refund: "stripe_refund:" || refund_id
-- PayPal: MD5(transaction_id || event_code || updated_date || amount || currency)

MERGE finance_payments.fact_payment_transactions T
USING finance_payments.stg_combined_payment_transactions S
ON T.source_unique_key = S.source_unique_key
WHEN MATCHED THEN
  UPDATE SET status = S.status, gross_amount = S.gross_amount,
             fee_amount = S.fee_amount, net_amount = S.net_amount,
             loaded_at = CURRENT_TIMESTAMP()
WHEN NOT MATCHED THEN
  INSERT (payment_source, transaction_id, source_unique_key, gross_amount, fee_amount, net_amount, loaded_at)
  VALUES (S.payment_source, S.transaction_id, S.source_unique_key, S.gross_amount, S.fee_amount, S.net_amount, CURRENT_TIMESTAMP());`,
    },
    stack: [
      'Google BigQuery',
      'Cloud Run Jobs',
      'Cloud Scheduler',
      'Cloud Storage (GCS)',
      'Secret Manager',
      'Python',
      'Stripe & PayPal APIs',
    ],
    diagramNodes: [
      {
        step: '01',
        label: 'Cloud Scheduler + Secret Manager',
        detail: 'Runs 3rd of month; injects restricted Stripe key & PayPal OAuth credentials.',
      },
      {
        step: '02',
        label: 'Stripe & PayPal Paginated Pull',
        detail: 'Extracts charges, refunds (refunds.charge = charges.id), and PayPal events.',
      },
      {
        step: '03',
        label: 'GCS Raw NDJSON Lake',
        detail: 'Writes partitioned raw files before loading BigQuery raw tables.',
      },
      {
        step: '04',
        label: 'Staging & Idempotent SQL MERGE',
        detail: 'Converts cents to major units, deduplicates via MERGE, and logs to etl_run_log.',
      },
    ],
  },
  {
    id: 'cvr-attribution-debugging',
    index: '06',
    title: 'Multi-Channel CVR Attribution Audit & Meta Outbound Clicks Fix',
    category: 'data-etl',
    categoryLabel: 'BigQuery & Data ETL',
    companyOrType: 'Code Garage Tech',
    timeframe: 'Data Integrity Audit',
    featuredSpan: false,
    headlineMetric: '1.83% → 3.04% CVR',
    headlineMetricContext: 'Fixed FacebookTable_aa0_2 outbound clicks denominator & unmapped split',
    beforeValue: '1.83% CVR (used 305,406 total social clicks including likes/shares)',
    afterValue: '3.04% CVR matching Ads Manager (~261k outbound link clicks)',
    summary:
      'Investigated and resolved a production CVR discrepancy for Meta channel aa0 where the dashboard reported 1.83% CVR while Meta Ads Manager reported 3.04% CVR.',
    problem:
      'Client reported that conversion rate (CVR) for the aa0 acquisition channel over a 7-day window showed 1.83% on the internal platform vs 3.04% (7,933 orders) on Meta Ads Manager.',
    rootCause:
      '1) In src/app/api/ad-performance/filtered/route.ts (both GET line 247 and POST line 838), channel aa0 summed SUM(clicks)—which in Meta includes likes, comments, shares, video plays, and link clicks (305,406)—whereas channels aa1 and aa2 used SUM(CAST(outbound_clicks_outbound_click AS FLOAT64)). 2) Local PostgreSQL audits across CombinationDailyPerformance and UnmappedAdsDailyPerformance revealed 2,425 purchases were sitting in unmapped ads.',
    architectureSolution: [
      'Audited end-to-end CVR logic across frontend (metrics.ts, utils.ts) and backend (cached/route.ts, filtered/route.ts), including click-weighted concept aggregation Σ(Combo CVR × Clicks) / Total Clicks and TikTok GMV conditional purchase derivation.',
      'Wrote diagnostic PostgreSQL and BigQuery verification queries comparing CombinationDailyPerformance against UnmappedAdsDailyPerformance and windsor-storage.facebookads.FacebookTable_aa0_2.',
      'Updated both GET and POST BigQuery queries for channel aa0 in filtered/route.ts to use SUM(CAST(outbound_clicks_outbound_click AS FLOAT64)) AS clicks, aligning the denominator with Ads Manager.',
    ],
    filesTouched: [
      'src/app/api/ad-performance/filtered/route.ts',
      'src/app/api/ad-performance/cached/route.ts',
      'src/lib/ad-performance/metrics.ts',
      'src/components/ad-performance/concepts-v2/utils.ts',
    ],
    codeSnippet: {
      filename: 'src/app/api/ad-performance/filtered/route.ts',
      language: 'sql',
      code: `-- Fixed in both GET (Line 247) and POST (Line 838) for FacebookTable_aa0_2:
SELECT
  -- Before: SUM(clicks) AS clicks (305,406 all interactions -> 1.80% CVR)
  SUM(CAST(outbound_clicks_outbound_click AS FLOAT64)) AS clicks, -- ~261k link clicks -> 3.04% CVR
  SUM(actions_offsite_conversion_fb_pixel_purchase) AS purchases
FROM \`windsor-storage.facebookads.FacebookTable_aa0_2\`
WHERE date >= DATE('2026-04-27') AND date <= DATE('2026-05-03');`,
    },
    stack: ['BigQuery SQL', 'PostgreSQL (psql)', 'Next.js API Routes', 'Meta & TikTok GMV Attribution'],
    diagramNodes: [
      {
        step: '01',
        label: 'SQL & Schema Forensics',
        detail: 'Compared CombinationDailyPerformance (5,508 orders) vs UnmappedAdsDailyPerformance.',
      },
      {
        step: '02',
        label: 'Denominator Root Cause',
        detail: 'Identified SUM(clicks) vs outbound_clicks_outbound_click in filtered/route.ts.',
      },
      {
        step: '03',
        label: 'GET & POST Query Patch',
        detail: 'Standardized aa0 to outbound link clicks, matching client 3.04% benchmark.',
      },
    ],
  },
  {
    id: 'dropbox-to-gcs-migration',
    index: '07',
    title: 'Dropbox, Replay & Air to Google Cloud Storage (GCS) Migration Architecture',
    category: 'backend',
    categoryLabel: 'Backend & Distributed',
    companyOrType: 'Code Garage Tech',
    timeframe: 'Cloud Storage Migration',
    featuredSpan: false,
    headlineMetric: '5-Phase Cutover',
    headlineMetricContext: '15-area blast-radius map across Next.js, Python/Celery, Gemini & GCS',
    beforeValue: 'Manual Dropbox folder sync & load-bearing dropboxLink identity keys',
    afterValue: 'Direct signed GCS uploads, dual-source resolvers & native review layer',
    summary:
      'Engineered the 15-point blast-radius analysis and 5-phase migration architecture moving video assets from Dropbox, Dropbox Replay, and Air to Google Cloud Storage (GCS) without downtime.',
    problem:
      'Dropbox was load-bearing not only for file storage, but also as the canonical database identity key (Video.dropboxLink) joined across BigQuery performance mapping, AI compliance checks, winning-hooks ETL, and external reviewer workflows.',
    rootCause:
      'Switching carelessly to GCS would break unique constraints, orphan historical BigQuery attribution joins, hard-fail compliance auto-triggers expecting a Dropbox URL, and strip editors of Dropbox Replay frame comments and Air hover previews.',
    architectureSolution: [
      'Mapped 15 blast-radius areas across Next.js (Prisma) and Python/Celery (SQLAlchemy) with risk ratings and concrete migration steps.',
      'Designed an additive-first schema transition: introduced gcsKey, sourceProvider, and sourceUri while keeping dropboxLink optional for legacy assets.',
      'Unified media resolution via a dual-source helper ("has gcsKey → signed GCS URL, otherwise → legacy Dropbox") across compliance, OpenCV thumbnail generation, and playback.',
      'Sequenced 5 reversible phases covering direct signed browser-to-GCS uploads, Gemini + GCS hash compliance checks, timestamped video comments (replacing Replay), version history, and Pinecone AI asset search (replacing Air).',
    ],
    filesTouched: [
      'prisma/schema.prisma',
      'creative-video/storage.ts',
      'upload-url / finalize / play-url routes',
      'Python compliance worker & OpenCV thumbnail tasks',
    ],
    stack: ['Google Cloud Storage (GCS)', 'Signed URLs', 'Next.js 15', 'Python + Celery', 'Prisma & SQLAlchemy', 'Gemini + Pinecone'],
    diagramNodes: [
      {
        step: '01',
        label: 'Phase 1: Additive Schema & Signed GCS Upload',
        detail: 'Browser uploads directly to private GCS bucket via signed URL; writes gcsKey.',
      },
      {
        step: '02',
        label: 'Phase 2–3: Dual-Source Compliance & OpenCV Thumbnails',
        detail: 'Python/Gemini compliance & thumbnail workers accept both gcsKey and legacy dropboxLink.',
      },
      {
        step: '03',
        label: 'Phase 4–5: Native Replay Comments & AI DAM',
        detail: 'Rebuilds timestamped comments, version restore, tokenized share links & vector search.',
      },
    ],
  },
  {
    id: 'mini-erp-crm-case',
    index: '08',
    title: 'Mini ERP + CRM Operations Portal (Atomic Inventory & 4-Role RBAC)',
    category: 'fullstack',
    categoryLabel: 'Full-Stack & AI Apps',
    companyOrType: 'Enterprise Operations Project',
    timeframe: 'Node.js · React · Supabase',
    featuredSpan: false,
    headlineMetric: 'Zero-Negative Stock',
    headlineMetricContext: 'Atomic challan deduction + historical pricing snapshots + 4-role RBAC',
    beforeValue: 'Race-condition stock deductions & mutable invoice pricing',
    afterValue: 'All-or-nothing stock transactions + immutable IN/OUT audit trail',
    summary:
      'Built a production-grade wholesale and distribution ERP + CRM portal with Node.js, TypeScript, Express, React 18, Vite, and Supabase PostgreSQL featuring 4 corporate roles and atomic inventory control.',
    problem:
      'Distribution portals often suffer from negative inventory when concurrent orders confirm simultaneously, or historical tax invoices change when catalog SKU prices are updated later.',
    rootCause:
      'Non-transactional stock updates and foreign-key live price lookups corrupt historical accounting records.',
    architectureSolution: [
      'Implemented Atomic Stock Deduction (PATCH /api/challans/:id/confirm): pre-validates all items in the order, fails immediately with HTTP 400 if any SKU has insufficient stock, and logs an immutable OUT entry in stock_movements.',
      'Added automatic Reversal Protection: if an Admin cancels a confirmed challan, stock is automatically credited back with movement_type: IN.',
      'Engineered Historical Snapshot Preservation: snapshots item name, SKU, and unit_price into sales_challan_items at challan generation (CH-YYYYMMDD-XXXX) for accurate printable Tax Invoices.',
      'Enforced 4-role RBAC (Admin, Sales, Warehouse, Accounts) across Express middleware and React Router v7 guards.',
    ],
    repoUrl: 'https://github.com/hgroy/mini-erp-crm',
    codeSnippet: {
      filename: 'server/src/controllers/challanController.ts',
      language: 'typescript',
      code: `// Atomic Stock Deduction (PATCH /api/challans/:id/confirm)
for (const item of challanItems) {
  if (item.availableStock < item.requestedQty) {
    return res.status(400).json({
      error: \`Insufficient stock for \${item.productName}. Available: \${item.availableStock}, Requested: \${item.requestedQty}\`
    });
  }
}
// All-or-nothing deduction + immutable stock_movements ('OUT') audit log`,
    },
    stack: ['Node.js', 'TypeScript', 'Express.js', 'React 18', 'Vite', 'Supabase PostgreSQL', 'JWT + RBAC'],
    diagramNodes: [
      {
        step: '01',
        label: '4-Role RBAC Guard',
        detail: 'Isolates Admin, Sales, Warehouse, and Accounts permissions via JWT middleware.',
      },
      {
        step: '02',
        label: 'Challan Snapshot (CH-YYYYMMDD)',
        detail: 'Snapshots SKU and unit price into sales_challan_items for immutable Tax Invoices.',
      },
      {
        step: '03',
        label: 'Atomic Stock Deduction & Audit',
        detail: 'Verifies stock across all items and writes immutable IN/OUT stock_movements.',
      },
    ],
  },
  {
    id: 'docchat-rag',
    index: '09',
    title: 'DocChat: Document Q&A with Cited Answers (RAG)',
    category: 'fullstack',
    categoryLabel: 'Full-Stack & AI Apps',
    companyOrType: 'Flagship AI Project',
    timeframe: 'Live on Vercel · GitHub',
    featuredSpan: false,
    headlineMetric: 'Page-Level Citations',
    headlineMetricContext: 'NDJSON token-by-token streaming with pgvector cosine similarity',
    beforeValue: 'Unverified LLM hallucinations over long PDFs',
    afterValue: 'Deterministic page-cited answers isolated per signed-in user',
    summary:
      'Full-stack Retrieval-Augmented Generation platform that ingests PDF, TXT, and Markdown documents, chunks and embeds pages with Google Gemini, and streams answers with exact page citations.',
    problem:
      'Standard document chat interfaces blend context across files, fail to cite exact source pages, or block the UI while waiting for monolithic LLM completions.',
    rootCause:
      'Naive chunking loses page-boundary metadata, and non-streaming responses create high Time-To-First-Token latency.',
    architectureSolution: [
      'Split uploaded PDF, TXT, and Markdown files into page-aware chunks preserving source document ID and exact page numbers.',
      'Generated vector embeddings using Google Gemini and indexed them in Neon Serverless PostgreSQL with pgvector and versioned Drizzle ORM SQL migrations.',
      'Executed cosine similarity retrieval strictly scoped to the signed-in user.',
      'Streamed answers token-by-token over NDJSON alongside verifiable page citation anchors.',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'PostgreSQL + pgvector',
      'Drizzle ORM',
      'Google Gemini',
      'NDJSON Streaming',
      'Vercel',
    ],
    liveUrl: 'https://docchat-kohl.vercel.app',
    repoUrl: 'https://github.com/hgroy/docchat',
    diagramNodes: [
      {
        step: '01',
        label: 'Page-Aware Chunking',
        detail: 'Splits PDF/TXT/MD into page-tagged chunks scoped to the authenticated user.',
      },
      {
        step: '02',
        label: 'Gemini Embeddings + pgvector',
        detail: 'Stores vectors in Neon Serverless Postgres with versioned Drizzle SQL migrations.',
      },
      {
        step: '03',
        label: 'Cosine Similarity & NDJSON Stream',
        detail: 'Retrieves top-K chunks and streams cited answers token-by-token.',
      },
    ],
  },
  {
    id: 'workflow-engine-14k',
    index: '10',
    title: '5-Stage Video Production Workflow Engine & 14k+ Concept Migration',
    category: 'backend',
    categoryLabel: 'Backend & Distributed',
    companyOrType: 'Code Garage Tech',
    timeframe: 'Database State Machine',
    featuredSpan: false,
    headlineMetric: '14,000+ Concepts',
    headlineMetricContext: 'Zero-downtime migration into trigger-enforced 5-stage pipeline',
    beforeValue: 'Skipped production stages & manual task tracking',
    afterValue: 'PostgreSQL trigger enforcement + transactional outbox + Inspector UI',
    summary:
      'Designed and built the core workflow engine governing 5 stages of enterprise video production using database triggers and an outbox pattern, migrating 14k+ existing concepts with zero downtime.',
    problem:
      'Video concepts moved across 5 production stages, and application-only checks risked race conditions or skipped steps across concurrent editors and strategists.',
    rootCause:
      'Workflow transition invariants were not enforced at the database layer.',
    architectureSolution: [
      'Enforced 5 sequential production stages via PostgreSQL triggers and an atomic transactional outbox pattern.',
      'Built role-based "My Tasks" dashboards for editors and strategists and a Workflow Inspector screen.',
      'Migrated 14,000+ existing concepts into the new workflow engine with zero production downtime.',
    ],
    stack: ['Next.js 15', 'TypeScript', 'PostgreSQL Triggers', 'Outbox Pattern', 'Prisma ORM'],
    diagramNodes: [
      {
        step: '01',
        label: 'My Tasks Role Dashboards',
        detail: 'Dedicated workbenches for editors and strategists with stage action controls.',
      },
      {
        step: '02',
        label: 'PostgreSQL Trigger Gate',
        detail: 'Blocks any request that attempts to skip a required production stage.',
      },
      {
        step: '03',
        label: 'Transactional Outbox & Inspector',
        detail: 'Emits reliable events and exposes lineage for 14k+ migrated concepts.',
      },
    ],
  },
  {
    id: 'gcp-pubsub-slack',
    index: '11',
    title: 'Cross-Repo GCP Pub/Sub Slack Notification Service',
    category: 'backend',
    categoryLabel: 'Backend & Distributed',
    companyOrType: 'Code Garage Tech',
    timeframe: 'Event-Driven Microservice',
    featuredSpan: false,
    headlineMetric: '3 Repos · 6 Events',
    headlineMetricContext: 'Cloud Run Python consumer + Firestore ledger + 10s–600s backoff',
    beforeValue: 'Synchronous webhook calls prone to rate-limit drops',
    afterValue: 'Idempotent Pub/Sub bus with Firestore delivery tracking',
    summary:
      'Built a distributed Slack notification service across 3 repositories using idempotent Next.js producers (6 typed events), a Python consumer on Cloud Run, and Firestore delivery state tracking.',
    problem:
      'Multiple services needed to post workflow and compliance alerts to Slack reliably without blocking user requests or sending duplicate messages on retry.',
    rootCause:
      'Direct webhook calls lacked cross-repository event contracts, persistent delivery tracking, and exponential backoff.',
    architectureSolution: [
      'Created idempotent Next.js event producers emitting 6 strongly-typed events across 3 repositories.',
      'Deployed a Python consumer on GCP Cloud Run subscribed to GCP Pub/Sub.',
      'Tracked delivery state in Firestore and implemented exponential backoff retries from 10 seconds up to 600 seconds.',
    ],
    stack: ['GCP Pub/Sub', 'Python', 'Cloud Run', 'Firestore', 'Next.js 15', 'TypeScript'],
    diagramNodes: [
      {
        step: '01',
        label: 'Idempotent Producers (3 Repos)',
        detail: 'Publishes 6 typed events with deterministic idempotency keys.',
      },
      {
        step: '02',
        label: 'GCP Pub/Sub & Cloud Run Python',
        detail: 'Consumes events asynchronously and checks Firestore delivery ledger.',
      },
      {
        step: '03',
        label: 'Exponential Backoff (10s–600s)',
        detail: 'Guarantees delivery to Slack without duplicate messages.',
      },
    ],
  },
  {
    id: 'mcp-repo-graph',
    index: '12',
    title: 'Repository Graph MCP Server for AI Coding Agents',
    category: 'fullstack',
    categoryLabel: 'Full-Stack & AI Apps',
    companyOrType: 'Code Garage Tech',
    timeframe: 'AI Developer Tooling',
    featuredSpan: false,
    headlineMetric: 'Local Graph DB Map',
    headlineMetricContext: 'Model Context Protocol server eliminating repetitive repo grepping',
    beforeValue: 'AI coding agents repeatedly scanning the whole codebase',
    afterValue: 'Persistent local database map reused across agent sessions',
    summary:
      'Tested and set up an MCP (Model Context Protocol) server that maps the entire repository into a local database so AI coding agents reuse the structural map instead of searching the code repeatedly.',
    problem:
      'AI coding agents wasted context window tokens and time re-running grep searches across large multi-service repositories.',
    rootCause:
      'Agents lacked a persistent, queryable index of file dependencies and symbol definitions.',
    architectureSolution: [
      'Configured and tested a local database Model Context Protocol (MCP) server indexing the repository.',
      'Integrated the MCP server into daily AI coding workflows (Cursor, Claude Code, Google Antigravity) to accelerate root-cause analysis and feature delivery.',
    ],
    stack: ['MCP (Model Context Protocol)', 'Local Graph DB', 'TypeScript', 'Cursor / Claude Code / Antigravity'],
    diagramNodes: [
      {
        step: '01',
        label: 'Repository Indexing',
        detail: 'Maps files, symbols, and imports into a persistent local database.',
      },
      {
        step: '02',
        label: 'MCP Protocol Server',
        detail: 'Exposes fast graph lookups to AI coding agents.',
      },
      {
        step: '03',
        label: 'Instant Context Reuse',
        detail: 'Eliminates redundant full-repo code searches during debugging.',
      },
    ],
  },
];

export const EXPERIENCE_TIMELINE = [
  {
    id: 'code-garage-tech',
    role: 'Software Engineer',
    company: 'Code Garage Tech',
    period: 'Nov 2025 – Present',
    location: 'Mohali, Punjab, India',
    projectNote: 'Enterprise Ad-Creative & Performance Platform (Product under NDA)',
    stack:
      'Next.js 15 · TypeScript · Node.js · Prisma/PostgreSQL · Python/Celery · Redis · BigQuery · GCP Pub/Sub & Cloud Run · Vercel · AWS',
    highlights: [
      'Designed and built the 5-stage video production workflow engine using PostgreSQL triggers and an outbox pattern; built "My Tasks" dashboards for editors and strategists, a Workflow Inspector screen, and migrated 14k+ concepts with zero downtime.',
      'Built a cross-repository Slack notification service on GCP Pub/Sub across 3 repos: idempotent Next.js event producers (6 typed events), a Python consumer on Cloud Run, Firestore delivery tracking, and exponential backoff retries from 10s to 600s.',
      'Brought Concepts-V2 analytics dashboard refresh from 60+ seconds down to under 2 seconds by removing legacy 14-table BigQuery cache-warming calls and implementing a hybrid PostgreSQL history + 2-day live BigQuery gap read.',
      'Diagnosed why production Docker deploys took ~43 minutes (a 2.34 GB leftover venv causing an 11m copy + 15m chown -R across 100k+ files, rebuilt 4× across 4 services); added .dockerignore, merged into 1 shared image, and kept build cache to cut deploy time by over 90%.',
      'Re-architected Unit Economics Contribution Margin (CM) recomputation into AWS Python/Celery workers with atomic Redis locks, _lock_holder_is_dead() recovery, 5s status polling, P1/P2 safety guards (recomputeStatusUnknown), and replaced stale 5-min Vercel in-memory caching with React cache().',
      'Root-caused a production-only Vercel Edge CDN URL normalization bug that stripped empty query parameters (&channels=); deployed client-side short-circuit guards in useCachedData.ts and useComparisonConcepts.ts, eliminating 100% of wasted BigQuery/API calls.',
      'Resolved Meta channel (aa0) CVR attribution discrepancy (1.83% vs 3.04% in Ads Manager) by auditing PostgreSQL/BigQuery tables and updating filtered/route.ts to use outbound_clicks_outbound_click alongside click-weighted concept CVR.',
      'Mapped the 15-point blast-radius & 5-phase migration plan from Dropbox/Replay/Air to Google Cloud Storage (GCS), and designed the automated monthly Stripe + PayPal to BigQuery ETL pipeline (Cloud Scheduler, Cloud Run Job, GCS NDJSON, idempotent SQL MERGE).',
    ],
  },
  {
    id: 'geeksforgeeks',
    role: 'Full-Stack Developer Intern',
    company: 'GeeksforGeeks',
    period: 'Jul 2025 – Oct 2025',
    location: 'India',
    projectNote: 'Full-Stack Web Applications & MVC REST APIs',
    stack: 'React · Node.js · Express · PostgreSQL · JWT · Jest · React Testing Library',
    highlights: [
      'Built full-stack web applications with React, Node.js, Express, and PostgreSQL using MVC; added JWT authentication, REST APIs, and CRUD operations.',
      'Added symmetric client- and server-side validation with clear error handling so invalid data is blocked at both ends.',
      'Wrote unit tests with Jest and React Testing Library, and improved rendering performance with React.memo, lazy loading, and code splitting.',
    ],
  },
];

export const EDUCATION_DATA = {
  degree: 'B.Tech, Information Technology',
  institution: 'Arya College of Engineering & IT, Jaipur',
  period: 'Jul 2021 – Jun 2025',
  score: 'CGPA: 8.9 / 10',
};

export interface CertificationCredential {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  issuer: string;
  issuerSubtitle: string;
  issueDate: string;
  credentialId: string;
  verifyUrl?: string;
  imagePath: string;
  pdfPath: string;
  downloadFilename: string;
  signatoryName: string;
  signatoryTitle: string;
  category: string;
  accentTheme: 'redhat' | 'celebal' | 'mongodb' | 'hackerrank' | 'udemy';
  summary: string;
  certificateStatement: string;
  validatedSkills: string[];
}

export const CERTIFICATIONS_DATA: CertificationCredential[] = [
  {
    id: 'rhcsa-red-hat',
    index: '01',
    title: 'Red Hat Certified System Administrator (RHCSA)',
    shortTitle: 'Red Hat RHCSA',
    issuer: 'Red Hat, Inc.',
    issuerSubtitle: 'Enterprise Linux & Systems Administration Certification',
    issueDate: 'May 08, 2023',
    credentialId: '230-092-678',
    verifyUrl: 'https://www.credly.com/go/MZZMS6Ri',
    imagePath: '/assets/certificates/rhcsa.png',
    pdfPath:
      '/assets/aistudio/Red_Hat_Certified_System_Administrator__RHCSA__Badge20230913-28-qszai1_7c45ea7a.pdf',
    downloadFilename: 'Harsh_Gaurav_Red_Hat_RHCSA_Certificate.pdf',
    signatoryName: 'Randolph R. Russell',
    signatoryTitle: 'Director of Red Hat Certification',
    category: 'Linux & Cloud Infrastructure',
    accentTheme: 'redhat',
    summary:
      'Performance-based certification validating hands-on Red Hat Enterprise Linux (RHEL) system administration, container operations, storage management, SELinux security, and service automation.',
    certificateStatement:
      'Red Hat, Inc. hereby certifies that Harsh Gaurav has successfully completed all the program requirements and is certified as a Red Hat Certified System Administrator (RHCSA).',
    validatedSkills: [
      'Red Hat Enterprise Linux (RHEL)',
      'Systemd Services & Daemons',
      'LVM & Storage Partitioning',
      'SELinux Security & Firewalls',
      'Shell Scripting & Cron Automation',
      'User, Group & Access Control',
    ],
  },
  {
    id: 'celebal-data-engineering-coe',
    index: '02',
    title: 'Center of Excellence — Data Engineering Training Program',
    shortTitle: 'Celebal Data Engineering COE',
    issuer: 'Celebal Technologies',
    issuerSubtitle: 'Microsoft Solution Partner · Databricks Elite Partner',
    issueDate: '2024',
    credentialId: 'COE-DE-HARSH-GAURAV',
    imagePath: '/assets/certificates/celebal-coe.png',
    pdfPath:
      '/assets/aistudio/COE_certificate_templateCOE_Certificate_HARSH_GAURAV__Arya_29405fcd.pdf',
    downloadFilename: 'Harsh_Gaurav_Celebal_Data_Engineering_COE_Certificate.pdf',
    signatoryName: 'Sharthak Acharjee',
    signatoryTitle: 'Senior Manager – HR, Celebal Technologies',
    category: 'Data Engineering & Cloud ETL',
    accentTheme: 'celebal',
    summary:
      'Awarded by Celebal Technologies Center of Excellence in recognition of outstanding completion of the Skill Development Training Program under the Data Engineering domain.',
    certificateStatement:
      'In recognition of your outstanding completion of Skill Development Training Program at Celebal Technologies under Data Engineering domain.',
    validatedSkills: [
      'Data Engineering & ETL Pipelines',
      'Cloud Data Warehousing',
      'Databricks & Lakehouse Architecture',
      'Distributed Data Processing',
      'SQL & Dimensional Modeling',
      'Batch & Incremental Ingestion',
    ],
  },
  {
    id: 'mongodb-indexes',
    index: '03',
    title: 'MongoDB Indexes — Proof of Completion',
    shortTitle: 'MongoDB Indexes',
    issuer: 'MongoDB, Inc.',
    issuerSubtitle: 'MongoDB University Database Performance Credential',
    issueDate: 'June 10, 2024',
    credentialId: 'MDB2pz7inbvoi',
    imagePath: '/assets/certificates/mongodb-indexes.png',
    pdfPath:
      '/assets/aistudio/harsh-gaurav-caf20fee-e565-4d43-9460-ee046c18d7cd-certificate_2444e24e.pdf',
    downloadFilename: 'Harsh_Gaurav_MongoDB_Indexes_Certificate.pdf',
    signatoryName: 'Sahir Azam',
    signatoryTitle: 'Chief Product Officer (CPO), MongoDB, Inc.',
    category: 'Database & Query Optimization',
    accentTheme: 'mongodb',
    summary:
      'Validates mastery of MongoDB B-Tree indexing strategies, compound index ESR (Equality, Sort, Range) ordering, multikey indexes, and query execution plan diagnostics.',
    certificateStatement:
      'Proof of Completion: Congratulations to Harsh Gaurav for successfully completing MongoDB Indexes on 06-10-2024.',
    validatedSkills: [
      'B-Tree & Compound Indexes',
      'ESR (Equality, Sort, Range) Rule',
      'Query Plan explain() Diagnostics',
      'Covered Queries & Cardinality',
      'Multikey & Partial Indexes',
      'Read/Write Latency Optimization',
    ],
  },
  {
    id: 'hackerrank-sql-basic',
    index: '04',
    title: 'HackerRank Skill Certification — SQL (Basic)',
    shortTitle: 'HackerRank SQL',
    issuer: 'HackerRank',
    issuerSubtitle: 'Verified Database & SQL Query Assessment',
    issueDate: 'Jun 03, 2023',
    credentialId: '299B3A775077',
    verifyUrl: 'https://www.hackerrank.com/certificates/299b3a775077',
    imagePath: '/assets/certificates/hackerrank-sql.png',
    pdfPath: '/assets/aistudio/sql_basic_certificate_3a198d10.pdf',
    downloadFilename: 'Harsh_Gaurav_HackerRank_SQL_Basic_Certificate_299B3A775077.pdf',
    signatoryName: 'Harishankaran K',
    signatoryTitle: 'CTO, HackerRank',
    category: 'Database & Query Engineering',
    accentTheme: 'hackerrank',
    summary:
      'Cleared the proctored HackerRank SQL assessment validating relational query writing, multi-table JOIN operations, GROUP BY/HAVING aggregations, filtering predicates, and subquery composition.',
    certificateStatement:
      'This is to certify that Harsh Gaurav has successfully cleared the assessment for the skill SQL (Basic).',
    validatedSkills: [
      'Relational SQL Queries & Predicates',
      'INNER / LEFT Multi-Table JOINs',
      'GROUP BY & HAVING Aggregations',
      'Subqueries & Derived Tables',
      'Deterministic Sorting & Filtering',
      'Relational Schema Querying',
    ],
  },
  {
    id: 'udemy-java-for-beginners',
    index: '05',
    title: 'Java for Beginners — Certificate of Completion (14.5 Hours)',
    shortTitle: 'Udemy Java (Navin Reddy)',
    issuer: 'Udemy · Instructor: Navin Reddy',
    issuerSubtitle: 'Object-Oriented Programming & Core Java Engineering',
    issueDate: 'Aug. 8, 2024',
    credentialId: 'UC-3e19a015-bdf8-4d78-b185-32fa241c3c69',
    verifyUrl: 'https://www.udemy.com/certificate/UC-3e19a015-bdf8-4d78-b185-32fa241c3c69/',
    imagePath: '/assets/certificates/udemy-java.png',
    pdfPath: '/assets/certificates/Harsh_Gaurav_Udemy_Java_Certificate.pdf',
    downloadFilename: 'Harsh_Gaurav_Udemy_Java_Certificate_UC-3e19a015.pdf',
    signatoryName: 'Navin Reddy',
    signatoryTitle: 'Lead Instructor (Telusko) · Udemy Ref #0004',
    category: 'Backend & Object-Oriented Programming',
    accentTheme: 'udemy',
    summary:
      'Completed 14.5 hours of comprehensive Java training instructed by Navin Reddy (Telusko), covering JVM internals, Object-Oriented Programming (encapsulation, inheritance, polymorphism, abstraction), collections framework, exception handling, and multithreading fundamentals.',
    certificateStatement:
      'Certificate of Completion awarded to Harsh Gaurav for completing Java for Beginners (14.5 total hours) instructed by Navin Reddy on Aug. 8, 2024.',
    validatedSkills: [
      'Core Java & JVM Architecture',
      'Object-Oriented Programming (OOP)',
      'Java Collections & Generics',
      'Exception Handling & I/O Streams',
      'Interfaces, Abstract Classes & Lambda Expressions',
      'Multithreading & Memory Management',
    ],
  },
  {
    id: 'hackerrank-css',
    index: '06',
    title: 'HackerRank Skill Certification — CSS (Basic)',
    shortTitle: 'HackerRank CSS',
    issuer: 'HackerRank',
    issuerSubtitle: 'Verified Technical Skill Assessment',
    issueDate: 'Jan 23, 2023',
    credentialId: '9A952293FAB4',
    verifyUrl: 'https://www.hackerrank.com/certificates/9a952293fab4',
    imagePath: '/assets/certificates/hackerrank-css.png',
    pdfPath: '/assets/aistudio/css_certificate_33aa5fe8.pdf',
    downloadFilename: 'Harsh_Gaurav_HackerRank_CSS_Certificate.pdf',
    signatoryName: 'Harishankaran K',
    signatoryTitle: 'CTO, HackerRank',
    category: 'Frontend & UI Engineering',
    accentTheme: 'hackerrank',
    summary:
      'Cleared the proctored HackerRank skill assessment validating modern CSS layout architecture, specificity resolution, responsive box model design, and cascading inheritance.',
    certificateStatement:
      'This is to certify that Harsh Gaurav has successfully cleared the assessment for the skill CSS (Basic).',
    validatedSkills: [
      'Responsive Flexbox & Grid Layouts',
      'CSS Specificity & Inheritance',
      'Box Model & Viewport Architecture',
      'Media Queries & Fluid Breakpoints',
      'Cross-Browser UI Styling',
    ],
  },
];

export const SKILL_CATEGORIES = [
  {
    index: '01',
    title: 'Languages & Core Runtime',
    skills: [
      'TypeScript',
      'JavaScript (ES6+)',
      'SQL (PostgreSQL & BigQuery)',
      'Python (Background Services & ETL)',
      'Java (Core & OOP)',
      'HTML5 & CSS3',
    ],
  },
  {
    index: '02',
    title: 'Frontend & Next.js Architecture',
    skills: [
      'Next.js 15 (App Router & React cache())',
      'React 19 & Vite',
      'Streaming UI (SSE & NDJSON)',
      'Client LRU Caching & Edge Guards',
      'Role-Based Dashboards & Heatmaps',
      'Responsive Mobile-First UI',
    ],
  },
  {
    index: '03',
    title: 'Backend, Distributed Locks & ERP',
    skills: [
      'Node.js & Express (MVC & Layered RBAC)',
      'Python + Celery Distributed Workers',
      'Redis Mutex Locks & Dead-Holder Recovery',
      'Transactional Outbox & Atomic Stock Ledger',
      'GCP Pub/Sub & Exponential Backoff',
      'JWT & Secret Manager Auth',
    ],
  },
  {
    index: '04',
    title: 'Databases, Data Warehousing & ORMs',
    skills: [
      'PostgreSQL & Supabase (Triggers, Stored Procs)',
      'Google BigQuery (Partitioned Fact Tables & MERGE)',
      'Google Cloud Firestore',
      'pgvector (Cosine Similarity RAG)',
      'Prisma ORM & Drizzle ORM',
      'Query & Cost Optimization',
    ],
  },
  {
    index: '05',
    title: 'Cloud, DevOps & Storage Pipelines',
    skills: [
      'Vercel (Serverless & Edge CDN Normalization)',
      'GCP (Cloud Run Jobs, Cloud Scheduler, GCS, Secret Manager)',
      'AWS (EC2, S3, CloudWatch)',
      'Docker (.dockerignore, Multi-Service Shared Images)',
      'Stripe & PayPal Financial ETL Pipelines',
      'GitHub Actions CI/CD, Vitest & Jest',
    ],
  },
  {
    index: '06',
    title: 'AI Engineering & Technical Practices',
    skills: [
      'MCP (Model Context Protocol) Repo Graph Servers',
      'Google Gemini Embeddings & RAG Citations',
      'Root-Cause Analysis & Postmortem Architecture',
      'Blast-Radius Migration Planning (Dropbox → GCS)',
      'Cursor, Claude Code & Google Antigravity',
      'CI Schema Guards & PRD Authorship',
    ],
  },
];

export const DOCCHAT_DEMO_QUERIES = [
  {
    id: 'q1',
    question: 'Why did clearing configCache in memory fail on Vercel serverless, and how did React cache() fix it?',
    sourceDoc: 'Unit_Economics_Caching_RFC.md',
    citationPages: ['Section 6', 'Section 8'],
    similarityScore: '0.96 cosine similarity',
    answer:
      'Vercel runs multiple isolated serverless function copies (Copy A, Copy B, Copy C), each with its own memory. Clearing an in-memory Map only cleared one instance while others served stale 5-minute data. Replacing configCache with React cache() in cm-enrichment.ts memoizes the DB read within a single page request (so KPI cards, Table, and Totals share 1 query) while guaranteeing every new request reads fresh from PostgreSQL.',
    excerpt:
      'Section 8: "WITHIN one page request: KPI cards -> reads config from DB (1 query); Table -> reuses it; Totals -> reuses it. ACROSS requests: nothing is kept -> every new request reads FRESH -> never stale."',
  },
  {
    id: 'q2',
    question: 'Why did deselecting all channels ("None") return all records on production but 0 on localhost?',
    sourceDoc: 'Edge_CDN_Normalization_Spec.md',
    citationPages: ['Section 2.2', 'Section 5.1'],
    similarityScore: '0.95 cosine similarity',
    answer:
      'On localhost, the Node.js server received &channels= as an empty string "", which parsed to selectedChannels = [] and returned 0 records. In production, Vercel Edge CDN normalized the cache key by stripping empty query parameters (&channels=), so url.searchParams.get("channels") returned null ("no filter applied"). Deploying a client-side short-circuit guard in useCachedData.ts and useComparisonConcepts.ts fixed the bug in 0ms and cut 100% of wasted BigQuery calls.',
    excerpt:
      'Section 5.1: "if (selectedChannels !== null && selectedChannels.length === 0) { setCachedData([]); setLoading(false); return []; }"',
  },
  {
    id: 'q3',
    question: 'How does the Mini ERP + CRM portal guarantee zero-negative inventory on Sales Challan confirmation?',
    sourceDoc: 'Mini_ERP_CRM_Architecture.md',
    citationPages: ['Section 6.1', 'Section 6.2'],
    similarityScore: '0.97 cosine similarity',
    answer:
      'When PATCH /api/challans/:id/confirm is invoked, the backend pre-validates every item against current warehouse stock. If any SKU has insufficient stock, the entire operation aborts with HTTP 400. Otherwise, stock is deducted atomically, an immutable OUT record is written to stock_movements, and SKU unit prices are snapshotted into sales_challan_items so future catalog edits never alter historical Tax Invoices.',
    excerpt:
      'Section 6.1: "All-or-Nothing Execution: If ANY item exceeds available stock, the operation fails immediately with HTTP 400. Reversal Protection: If a confirmed challan is cancelled by an Admin, stock is credited back (movement_type: IN)."',
  },
];
