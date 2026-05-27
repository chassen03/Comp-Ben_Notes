import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Command, LayoutDashboard, GitMerge, Sliders, 
  Database, BrainCircuit, ChevronRight, X, Info, 
  AlertTriangle, Shield, TrendingUp, Users, Activity, Network
} from 'lucide-react';

/* ==========================================================================
   GLOBAL KNOWLEDGE BASE (For Search Engine)
   ========================================================================== */
const KNOWLEDGE_BASE = [
  { id: 'equity_theory', title: 'Equity Theory', type: 'Psychology', content: 'Humans measure fairness relative to peers, not absolute wealth. Finding out a peer makes 10% more destroys motivation instantly.', tags: ['fairness', 'psychology', 'motivation'] },
  { id: 'procedural_justice', title: 'Procedural Justice', type: 'Systems', content: 'The psychological belief that the process used to determine pay was fair, even if the individual is unhappy with the final number. Codification creates this trust.', tags: ['fairness', 'process', 'trust'] },
  { id: 'talent_pirating', title: 'Talent Pirating & Markets', type: 'Strategy', content: 'You do not benchmark against your industry; you benchmark against the companies you steal talent from, and who steal from you.', tags: ['strategy', 'markets', 'benchmarking'] },
  { id: 'affordability', title: 'Affordability Principle', type: 'Finance', content: 'The baseline of strategy: What can the organization afford to pay for at least two successive years based on projected growth?', tags: ['strategy', 'finance', 'sustainability'] },
  { id: 'pay_mix', title: 'Compensation Mix (Leverage)', type: 'Strategy', content: 'The ratio of guaranteed base pay vs. at-risk variable pay. Higher variable pay introduces leverage (upside) but also psychological risk.', tags: ['strategy', 'bonus', 'risk'] },
  { id: 'big_data', title: 'Big Data Symbiosis', type: 'Analytics', content: 'Leveraging disparate HR and business systems together to form a symphony of knowledge, answering whether pay actually drives engagement and business results.', tags: ['data', 'analytics', 'monitoring'] },
  { id: 'change_triggers', title: 'Change Triggers & Monitoring', type: 'Systems', content: 'Business strategies evolve continuously. Monitoring means anticipating environmental or cultural shifts to ensure the reward system does not disconnect from reality.', tags: ['monitoring', 'change management', 'adaptation'] },
];

/* ==========================================================================
   MAIN OPERATING SYSTEM SHELL
   ========================================================================== */
export default function CompensationOS() {
  const [activeModule, setActiveModule] = useState('network');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // LocalStorage Progress Tracking
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('comp_os_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('comp_os_progress', JSON.stringify(progress));
  }, [progress]);

  const markProgress = (key) => {
    if (!progress[key]) {
      setProgress(prev => ({ ...prev, [key]: true }));
    }
  };

  const progressCount = Object.keys(progress).length;
  const totalTrackable = 6; // Arbitrary total interactable nodes
  const progressPercent = Math.min(100, Math.round((progressCount / totalTrackable) * 100));

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-300 font-sans overflow-hidden selection:bg-amber-900/50">
      
      {/* Search Modal */}
      {isSearchOpen && <SearchEngine onClose={() => setIsSearchOpen(false)} />}

      {/* OS Sidebar */}
      <aside className="w-64 border-r border-slate-800/60 bg-slate-950/50 flex flex-col backdrop-blur-xl z-10 relative">
        <div className="p-6 border-b border-slate-800/60">
          <div className="flex items-center gap-3 text-amber-500 mb-1">
            <LayoutDashboard size={24} />
            <h1 className="font-bold tracking-tight text-white">Comp.OS</h1>
          </div>
          <p className="text-xs text-slate-500 font-mono tracking-widest uppercase mt-2">Architecture Engine v1.0</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem id="network" icon={<GitMerge size={18} />} title="System Topography" active={activeModule} onClick={setActiveModule} />
          <NavItem id="simulator" icon={<Sliders size={18} />} title="Behavioral Simulator" active={activeModule} onClick={setActiveModule} />
          <NavItem id="data" icon={<Database size={18} />} title="Data MRI Scanner" active={activeModule} onClick={setActiveModule} />
          <NavItem id="expertise" icon={<BrainCircuit size={18} />} title="Expertise Matrix" active={activeModule} onClick={setActiveModule} />
        </nav>

        <div className="p-6 border-t border-slate-800/60 bg-slate-900/30">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between bg-slate-900 border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 transition-all rounded-md px-3 py-2 text-sm text-slate-400 group"
          >
            <span className="flex items-center gap-2"><Search size={14} /> Search OS</span>
            <span className="text-[10px] bg-slate-800 group-hover:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-700">⌘K</span>
          </button>
          
          <div className="mt-6">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-500">Cognitive Mapping</span>
              <span className="text-amber-500 font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-1000 ease-out" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Render Area */}
      <main className="flex-1 relative overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-6xl mx-auto p-8 md:p-12 min-h-full">
          {activeModule === 'network' && <NetworkGraph markProgress={markProgress} />}
          {activeModule === 'simulator' && <BehavioralSimulator markProgress={markProgress} />}
          {activeModule === 'data' && <DataMRI markProgress={markProgress} />}
          {activeModule === 'expertise' && <ExpertiseMatrix />}
        </div>
      </main>
    </div>
  );
}

function NavItem({ id, icon, title, active, onClick }) {
  const isActive = active === id;
  return (
    <button 
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300 relative overflow-hidden group ${
        isActive ? 'text-amber-400 bg-slate-800/50 border border-amber-900/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border border-transparent'
      }`}
    >
      {isActive && <div className="absolute left-0 top-0 w-1 h-full bg-amber-500" />}
      <span className={isActive ? "text-amber-500" : "text-slate-500 group-hover:text-slate-300 transition-colors"}>{icon}</span>
      <span className="font-medium tracking-wide">{title}</span>
    </button>
  );
}

/* ==========================================================================
   MODULE 1: INTERACTIVE KNOWLEDGE GRAPH (D3/React Flow Simulation)
   ========================================================================== */
function NetworkGraph({ markProgress }) {
  const [activeNode, setActiveNode] = useState('philosophy');

  // Network structure representing causality based on Berger's Codified Methodologies
  const nodes = {
    philosophy: { x: 50, y: 15, title: "Compensation Philosophy", type: "Core Promise", desc: "The foundational DNA. A publicized set of core values detailing how we balance institutional affordability with attracting, retaining, and rewarding talent.", impact: "Aligns human resources with business reality. Without this, pay is just a reactionary expense." },
    strategy: { x: 50, y: 35, title: "Pay Strategy", type: "Allocation", desc: "The holistic toolkit that answers five questions: Affordability, Pay Markets, Competitive Level (Percentiles), The Mix, and expected Employee Contribution.", impact: "Translates the Philosophy into mathematical reality. It dictates exactly how the finite budget is distributed." },
    admin: { x: 25, y: 55, title: "Salary Administration", type: "Execution", desc: "The documented, replicable processes: Job evaluation, market pricing, salary structures, and merit increases.", impact: "Creates 'Procedural Justice'. Employees must believe the process is fair, even if they dislike their specific pay." },
    mix: { x: 75, y: 55, title: "The Mix & Leverage", type: "Behavioral", desc: "The strategic percentage of base salary vs. variable/incentive pay. Shifts based on organizational maturity (startup vs. secure establishment).", impact: "Directly filters the psychological profile of the workforce (risk-takers vs. steady operators)." },
    trust: { x: 25, y: 80, title: "Equity Perception", type: "Psychology", desc: "The human emotional reaction to the administration. Are performance increases actually earned, or just frozen entitlements?", impact: "Drives internal harmony. If administration is corrupted by bias, perceived equity collapses." },
    culture: { x: 75, y: 80, title: "Organizational Culture", type: "Outcome", desc: "The emergent behavior of the system. Is the culture highly collaborative or fiercely competitive?", impact: "Dictates long-term business survival and whether you successfully 'pirate' talent or lose it." }
  };

  const edges = [
    { source: 'philosophy', target: 'strategy' },
    { source: 'strategy', target: 'admin' },
    { source: 'strategy', target: 'mix' },
    { source: 'admin', target: 'trust' },
    { source: 'mix', target: 'culture' },
    { source: 'trust', target: 'culture', dashed: true },
  ];

  const handleNodeClick = (key) => {
    setActiveNode(key);
    markProgress(`node_${key}`);
  };

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col">
      <header className="mb-8 border-l-4 border-amber-500 pl-6">
        <h2 className="text-3xl font-bold text-white mb-3 font-serif">Codified Methodologies: The Blueprint</h2>
        <p className="text-slate-400 max-w-3xl leading-relaxed text-lg">
          Why do we codify pay into formal systems? Because human nature, left unchecked, defaults to bias, emotion, and negotiation prowess. 
          Codification—blending <strong>Philosophy, Strategy, and Administration</strong>—is how an organization replaces chaos with procedural justice. 
          Click through the topography below to see how a high-level philosophy materializes into human behavior.
        </p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[500px]">
        {/* SVG Network Map */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent pointer-events-none" />
          
          <svg className="w-full h-full max-h-[600px] overflow-visible">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="25" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
              </marker>
              <marker id="arrow-active" viewBox="0 0 10 10" refX="25" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>
            
            {/* Draw Edges */}
            {edges.map((edge, i) => {
              const isSourceActive = edge.source === activeNode;
              const isTargetActive = edge.target === activeNode;
              const isActiveEdge = isSourceActive || isTargetActive;
              
              return (
                <line 
                  key={i}
                  x1={`${nodes[edge.source].x}%`} y1={`${nodes[edge.source].y}%`}
                  x2={`${nodes[edge.target].x}%`} y2={`${nodes[edge.target].y}%`}
                  stroke={isActiveEdge ? "#f59e0b" : "#334155"}
                  strokeWidth={isActiveEdge ? "2" : "1"}
                  strokeDasharray={edge.dashed ? "5,5" : "none"}
                  markerEnd={isActiveEdge ? "url(#arrow-active)" : "url(#arrow)"}
                  className="transition-all duration-700 ease-in-out"
                />
              )
            })}

            {/* Draw Nodes */}
            {Object.keys(nodes).map((key) => {
              const node = nodes[key];
              const isActive = activeNode === key;
              return (
                <g 
                  key={key} 
                  className="cursor-pointer transition-transform duration-300 hover:scale-105"
                  onClick={() => handleNodeClick(key)}
                  style={{ transformOrigin: `${node.x}% ${node.y}%` }}
                >
                  <circle 
                    cx={`${node.x}%`} cy={`${node.y}%`} r="12" 
                    fill={isActive ? "#f59e0b" : "#1e293b"}
                    stroke={isActive ? "#fff" : "#475569"}
                    strokeWidth="2"
                    className="transition-colors duration-500"
                  />
                  {isActive && (
                    <circle cx={`${node.x}%`} cy={`${node.y}%`} r="24" fill="none" stroke="#f59e0b" strokeWidth="1" className="animate-ping opacity-30 pointer-events-none" />
                  )}
                  <text 
                    x={`${node.x}%`} y={`${node.y + 7}%`} 
                    textAnchor="middle" 
                    fill={isActive ? "#fff" : "#94a3b8"}
                    className="text-[11px] font-semibold tracking-wide uppercase transition-colors duration-300 pointer-events-none"
                  >
                    {node.title}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Dynamic Context Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Network size={120} /></div>
          
          <div key={activeNode} className="animate-in slide-in-from-right-4 fade-in duration-500 z-10">
            <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase border border-amber-500/30 px-2 py-1 rounded bg-amber-500/10 mb-4 inline-block">
              {nodes[activeNode].type}
            </span>
            <h3 className="text-2xl font-bold text-white mb-4 font-serif">{nodes[activeNode].title}</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <Info size={16} /> The Core Concept
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{nodes[activeNode].desc}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <TrendingUp size={16} /> Systemic & Human Impact
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{nodes[activeNode].impact}</p>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-500 italic">Structural Dependency: {
                  edges.filter(e => e.source === activeNode).map(e => nodes[e.target].title).join(', ') || 'End state behavioral outcome.'
                }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   MODULE 2: BEHAVIORAL PHYSICS SIMULATOR
   ========================================================================== */
function BehavioralSimulator({ markProgress }) {
  // Inputs
  const [leverage, setLeverage] = useState(20); // Base vs Bonus (0 = all base, 100 = all bonus)
  const [transparency, setTransparency] = useState(50); // Pay transparency

  // Run simulation maths whenever inputs change
  useEffect(() => {
    markProgress('simulator_used');
  }, [leverage, transparency, markProgress]);

  // The "Physics" Engine of HR
  const trustScore = Math.max(0, Math.min(100, transparency - (leverage > 70 ? 30 : 0))); 
  const politicsScore = Math.max(0, Math.min(100, leverage + (100 - transparency) / 2)); 
  const turnoverScore = Math.max(0, Math.min(100, (politicsScore * 0.7) + (100 - trustScore) * 0.3));

  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-8 border-l-4 border-emerald-500 pl-6">
        <h2 className="text-3xl font-bold text-white mb-3 font-serif">Strategy Simulator: The Mix & The Market</h2>
        <p className="text-slate-400 max-w-3xl leading-relaxed text-lg">
          Strategy forces a deeply human decision: <em>How do we allocate finite resources to drive performance?</em> 
          The "Mix" (Guaranteed Base vs. Variable Risk) is not just math; it is a behavioral filter. As organizations evolve from precarious startups to secure establishments, the required leverage changes. Adjust the strategic levers below to witness how structural pay decisions manipulate organizational psychology.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2">
            <Sliders size={18} className="text-emerald-500" /> Allocation Levers
          </h3>
          
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-400">Pay Leverage (Risk Mix)</span>
              <span className="text-emerald-500">{leverage}% Variable</span>
            </div>
            <input 
              type="range" min="0" max="100" value={leverage} 
              onChange={(e) => setLeverage(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
              <span>High Base (Secure)</span>
              <span>High Risk (Eat-what-you-kill)</span>
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              * Higher variable pay introduces "leverage." Startups and senior executives rely on high leverage to force alignment with aggressive growth goals.
            </p>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-400">System Transparency</span>
              <span className="text-emerald-500">{transparency}% Open</span>
            </div>
            <input 
              type="range" min="0" max="100" value={transparency} 
              onChange={(e) => setTransparency(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
              <span>Black Box (Opaque)</span>
              <span>Public Methodologies</span>
            </div>
          </div>
        </div>

        {/* Real-time Telemetry (Outputs) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2">
              <Activity size={18} className="text-amber-500" /> Behavioral Telemetry
            </h3>
            
            <div className="mt-6 space-y-6">
              <TelemetryBar label="Procedural Trust" value={trustScore} color="bg-emerald-500" />
              <TelemetryBar label="Political Friction (Toxicity)" value={politicsScore} color="bg-red-500" invertWarning />
              <TelemetryBar label="Talent Pirating Risk (Turnover)" value={turnoverScore} color="bg-amber-500" invertWarning />
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-950 rounded-lg border border-slate-800 text-sm text-slate-400 leading-relaxed italic">
            <strong>Strategic Reality Check: </strong> 
            {leverage > 70 && transparency < 30 ? "Danger: High risk combined with secrecy breeds paranoia. The environment is highly political; employees negotiate aggressively behind closed doors, threatening internal equity." : 
             leverage < 30 && transparency > 70 ? "Comfort Zone: High safety and transparency creates extreme stability. However, you risk losing aggressive, high-potential 'A-players' to competitors offering massive upside." :
             "Equilibrium: The system balances institutional affordability with moderate performance incentives. Monitor your talent market percentiles closely to prevent pirating."}
          </div>
        </div>
      </div>
    </div>
  );
}

function TelemetryBar({ label, value, color, invertWarning = false }) {
  // Logic to determine if the state is "dangerous" based on context
  const isHigh = value > 66;
  const isDangerous = invertWarning ? isHigh : value < 33;
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-2 font-semibold">
        <span className="text-slate-300">{label}</span>
        <span className={isDangerous ? "text-red-400 animate-pulse" : "text-slate-400"}>{Math.round(value)} / 100</span>
      </div>
      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div 
          className={`h-full transition-all duration-700 ease-out ${isDangerous ? 'bg-red-500' : color}`} 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );
}

/* ==========================================================================
   MODULE 3: BIG DATA MRI SCANNER
   ========================================================================== */
function DataMRI({ markProgress }) {
  const [scanState, setScanState] = useState('idle'); // idle -> scanning -> complete

  const runScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('complete');
      markProgress('data_mri_run');
    }, 2000);
  };

  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-8 border-l-4 border-blue-500 pl-6">
        <h2 className="text-3xl font-bold text-white mb-3 font-serif">Big Data & Monitoring: The Reality Check</h2>
        <p className="text-slate-400 max-w-3xl leading-relaxed text-lg">
          Big Data often intimidates practitioners, but its purpose is profound: <strong>It stops us from flying blind.</strong> It combines unlikely confederations of data—business outcomes, culture, and pay—to reveal whether our Codified Strategy is actually working, or if it is the hidden cause of our turnover. Monitoring this data is fundamentally an act of change management.
        </p>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 pb-6 border-b border-slate-800">
          <div>
            <h3 className="text-white font-bold flex items-center gap-2"><Database size={18} className="text-blue-500"/> Enterprise Dataset Alpha</h3>
            <p className="text-xs text-slate-500 mt-1">Cross-referencing: Performance Appraisals × Salary Trajectory × Managerial Cohort</p>
          </div>
          <button 
            onClick={runScan}
            disabled={scanState === 'scanning'}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-6 py-2 rounded shadow-lg transition-all font-semibold tracking-wide disabled:opacity-50"
          >
            {scanState === 'idle' ? 'Run Deep Correlation Scan' : scanState === 'scanning' ? 'Aggregating Data Lakes...' : 'Re-run Analysis'}
          </button>
        </div>

        {/* Data Visualization Area */}
        <div className="relative min-h-[300px]">
          
          {/* Scanning Overlay Effect */}
          {scanState === 'scanning' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-lg">
              <div className="w-full max-w-md h-1 bg-slate-800 overflow-hidden rounded-full mb-4">
                <div className="w-1/3 h-full bg-blue-500 animate-[scan_1s_ease-in-out_infinite]" />
              </div>
              <p className="text-blue-400 font-mono text-xs uppercase tracking-widest animate-pulse">Running heuristic algorithms...</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Surface Level Data */}
            <div className={`transition-opacity duration-500 ${scanState === 'scanning' ? 'opacity-20' : 'opacity-100'}`}>
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Surface View (Looks Fine)</h4>
              <ul className="space-y-3">
                <DataRow name="Sarah's Team" perf="4.5" pay="$95k" state={scanState} type="victim" />
                <DataRow name="David's Team" perf="4.3" pay="$94k" state={scanState} type="neutral" />
                <DataRow name="Alex's Team" perf="3.8" pay="$90k" state={scanState} type="neutral" />
              </ul>
              <p className="text-xs text-slate-500 mt-4 italic">Analysis: Pay generally aligns with performance. System appears healthy.</p>
            </div>

            {/* The Deep Scan Data (Reveals bias) */}
            <div className={`transition-all duration-700 ${scanState === 'complete' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
              <h4 className="text-sm font-semibold text-amber-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                <AlertTriangle size={16} /> MRI View (Systemic Misalignment Detected)
              </h4>
              <ul className="space-y-3">
                <DataRow name="Sarah's Team (Tenured)" perf="4.5" pay="$95k" state={scanState} type="victim" detailed />
                <DataRow name="David's Team (Recent Hires)" perf="2.9" pay="$108k" state={scanState} type="offender" detailed />
              </ul>
              
              <div className="mt-6 p-4 bg-red-950/20 border-l-2 border-red-500 rounded-r text-sm text-slate-300">
                <strong>Change Trigger Identified:</strong> The aggregated data hid a massive flaw. David bypassed the codified methodology, pirating new talent at premium rates who are now underperforming. Sarah's tenured team is carrying the business but experiencing wage compression. 
                <br/><br/>
                <em>Big Data insight:</em> Pay is currently a primary cause of impending turnover for your most critical group. Immediate gap analysis and change management required.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function DataRow({ name, perf, pay, state, type, detailed = false }) {
  const isOffender = state === 'complete' && type === 'offender';
  const isVictim = state === 'complete' && type === 'victim' && detailed;

  return (
    <li className={`flex justify-between items-center p-3 rounded border transition-colors duration-500 ${
      isOffender ? 'bg-red-900/20 border-red-800/50' : 
      isVictim ? 'bg-slate-800 border-slate-700' : 
      'bg-slate-950 border-slate-800'
    }`}>
      <span className="font-medium text-slate-300">{name}</span>
      <div className="flex gap-4 font-mono text-sm">
        <span className={isOffender ? "text-red-400" : "text-slate-400"}>Perf: {perf}</span>
        <span className={isOffender ? "text-red-400 font-bold" : "text-amber-500"}>Pay: {pay}</span>
      </div>
    </li>
  );
}

/* ==========================================================================
   MODULE 4: EXPERTISE MATRIX
   ========================================================================== */
function ExpertiseMatrix() {
  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-8 border-l-4 border-purple-500 pl-6">
        <h2 className="text-3xl font-bold text-white mb-3 font-serif">The Expertise Continuum</h2>
        <p className="text-slate-400 max-w-3xl leading-relaxed text-lg">
          Compensation is not merely a task handed to HR; it is a complex discipline requiring distinct capabilities across the organization. From the line manager defending a salary decision to the architect linking pay to long-term business survival, understanding the required <em>Level of Expertise</em> is non-negotiable for system integrity.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ExpertiseCard 
          level="Basic" 
          role="Line Manager" 
          color="border-slate-700" 
          desc="The frontline defender. Knows fundamental principles, terminology, and concepts. This is the absolute minimum requirement so they do not inadvertently create legal liabilities or destroy team trust during performance reviews." 
        />
        <ExpertiseCard 
          level="Operational" 
          role="HR Generalist" 
          color="border-blue-800" 
          desc="The implementer. Translates the codified methodologies into daily reality. Handles the administration of salary structures and baseline market pricing with guidance from specialists." 
        />
        <ExpertiseCard 
          level="Tactical" 
          role="Comp Professional" 
          color="border-amber-600" 
          desc="The builder. Develops and implements variable pay and base programs independently. Actively coaches operational staff and line managers to ensure the system remains uncorrupted by 'squeaky wheels'." 
        />
        <ExpertiseCard 
          level="Strategic" 
          role="Recognized Expert" 
          color="border-purple-600" 
          desc="The architect. Possesses deep technical mastery and business acumen. Troubleshoots massive misalignments, anticipates environmental change triggers, and explicitly links total rewards to the CEO's growth strategy." 
        />
      </div>
      
      <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-3 font-serif">The Differentiators of Mastery</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            According to WorldatWork, advancing through these levels requires more than just knowing how to read a salary survey. True practitioners master a blend of analytical rigor and human psychology.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Technical Mastery', 'Strategic Business Understanding', 'Analytical Attention to Detail', 'Communication & Connection', 'Adaptability', 'Passion & Proactivity'].map(skill => (
              <span key={skill} className="bg-slate-950 border border-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-full font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-purple-900/20 rounded-full border border-purple-500/30">
          <BrainCircuit size={48} className="text-purple-400" />
        </div>
      </div>
    </div>
  );
}

function ExpertiseCard({ level, role, color, desc }) {
  return (
    <div className={`bg-slate-900 border-t-2 ${color} p-6 rounded-b-xl shadow-lg hover:-translate-y-1 transition-transform`}>
      <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-2">{role}</span>
      <h3 className="text-xl font-bold text-white mb-3">{level}</h3>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  );
}

/* ==========================================================================
   SEARCH ENGINE (Command Center Modal)
   ========================================================================== */
function SearchEngine({ onClose }) {
  const [query, setQuery] = useState('');

  // Simulating a fuzzy search (Lunr/Fuse capability)
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const searchTerms = query.toLowerCase().split(' ');
    return KNOWLEDGE_BASE.filter(item => {
      const textToSearch = `${item.title} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
      return searchTerms.every(term => textToSearch.includes(term));
    });
  }, [query]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-slate-700 bg-slate-800/50">
          <Search size={20} className="text-slate-400 mr-3" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search concepts, risks, psychological models..."
            className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500 font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-1 rounded bg-slate-700 text-slate-400 hover:text-white text-xs font-mono">ESC</button>
        </div>

        {/* Results Area */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-500">
              <Command size={32} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm">Try searching for "fairness", "strategy", or "bias".</p>
            </div>
          ) : results.length > 0 ? (
            <ul className="space-y-1">
              {results.map((res) => (
                <li key={res.id} className="p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-amber-400 font-semibold group-hover:text-amber-300 transition-colors">{res.title}</h4>
                    <span className="text-[10px] font-mono uppercase tracking-widest border border-slate-700 px-2 py-0.5 rounded text-slate-400">{res.type}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-2">{res.content}</p>
                  <div className="flex gap-2">
                    {res.tags.map(tag => (
                      <span key={tag} className="text-xs text-slate-500 bg-slate-950 px-2 rounded-full">#{tag}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm">
              No theoretical models found matching your query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Additional Tailwind Custom Keyframes for Animations injected via style tag for self-containment */
const style = document.createElement('style');
style.textContent = `
  @keyframes scan {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(200%); }
    100% { transform: translateX(-100%); }
  }
`;
document.head.appendChild(style);