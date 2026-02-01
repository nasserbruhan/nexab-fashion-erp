
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  Package, 
  Truck,
  Sparkles,
  ArrowUpRight,
  Zap,
  ChevronRight,
  BrainCircuit,
  Activity,
  Users,
  Target,
  BarChart3,
  Timer,
  Flame,
  LineChart,
  ArrowRight,
  Waves,
  ZapOff,
  Compass
} from 'lucide-react';
import { Style, Order, RawMaterial } from '../types';
import { getTrendAnalysis, getTrendForecast, getMarketSentiment } from '../services/geminiService';

interface Props {
  styles: Style[];
  orders: Order[];
  materials: RawMaterial[];
}

interface TrendForecast {
  trendName: string;
  explanation: string;
  popularity: string;
  suggestion: string;
  confidenceScore: number;
  timeFrame: string;
}

interface SentimentData {
  segment: string;
  sentimentScore: number;
  momentum: string;
  strategicPivot: string;
}

const DashboardView: React.FC<Props> = ({ styles, orders, materials }) => {
  const [aiAnalysis, setAiAnalysis] = useState<any[]>([]);
  const [loadingAi, setLoadingAi] = useState(false);
  
  const [forecasts, setForecasts] = useState<TrendForecast[] | null>(null);
  const [loadingForecast, setLoadingForecast] = useState(false);

  const [sentimentData, setSentimentData] = useState<SentimentData[] | null>(null);
  const [loadingSentiment, setLoadingSentiment] = useState(false);

  useEffect(() => {
    const fetchAi = async () => {
      setLoadingAi(true);
      try {
        const analysis = await getTrendAnalysis(styles);
        setAiAnalysis(analysis);
      } catch (error) {
        console.error("Failed to fetch initial AI analysis:", error);
      } finally {
        setLoadingAi(false);
      }
    };
    fetchAi();
  }, [styles]);

  const handleGenerateForecast = async () => {
    if (loadingForecast) return;
    setLoadingForecast(true);
    try {
      const results = await getTrendForecast(styles);
      if (results) setForecasts(results);
    } catch (error) {
      console.error("Forecast generation failed:", error);
    } finally {
      setLoadingForecast(false);
    }
  };

  const handleGenerateSentiment = async () => {
    if (loadingSentiment) return;
    setLoadingSentiment(true);
    try {
      const results = await getMarketSentiment(styles);
      if (results) setSentimentData(results);
    } catch (error) {
      console.error("Sentiment analysis failed:", error);
    } finally {
      setLoadingSentiment(false);
    }
  };

  const data = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5500 },
    { name: 'Thu', sales: 4800 },
    { name: 'Fri', sales: 7000 },
    { name: 'Sat', sales: 9000 },
    { name: 'Sun', sales: 6000 },
  ];

  const lowStock = materials.filter(m => m.quantity < m.threshold);

  // Advanced theme configuration for distinct trend visuals
  const themeColors = [
    { 
      bg: 'bg-indigo-950', 
      accent: 'bg-indigo-500', 
      text: 'text-indigo-400', 
      border: 'border-indigo-500/20', 
      lightBg: 'bg-indigo-500/10', 
      glow: 'shadow-indigo-500/20',
      icon: <Flame size={16} />
    },
    { 
      bg: 'bg-slate-950', 
      accent: 'bg-emerald-500', 
      text: 'text-emerald-400', 
      border: 'border-emerald-500/20', 
      lightBg: 'bg-emerald-500/10', 
      glow: 'shadow-emerald-500/20',
      icon: <Waves size={16} />
    },
    { 
      bg: 'bg-zinc-950', 
      accent: 'bg-rose-500', 
      text: 'text-rose-400', 
      border: 'border-rose-500/20', 
      lightBg: 'bg-rose-500/10', 
      glow: 'shadow-rose-500/20',
      icon: <Compass size={16} />
    },
    { 
      bg: 'bg-blue-950', 
      accent: 'bg-amber-500', 
      text: 'text-amber-400', 
      border: 'border-amber-500/20', 
      lightBg: 'bg-amber-500/10', 
      glow: 'shadow-amber-500/20',
      icon: <LineChart size={16} />
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Operational Overview</h3>
          <p className="text-slate-500 text-sm">Welcome back, Jane. Here's your brand's intelligence summary.</p>
        </div>
        <button 
          onClick={handleGenerateForecast}
          disabled={loadingForecast}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingForecast ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Zap size={18} />
              <span>Generate Forecast</span>
            </>
          )}
        </button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value="$142,500" 
          trend={12.5} 
          icon={<TrendingUp className="text-emerald-500" />} 
        />
        <StatCard 
          label="Active Production" 
          value={styles.filter(s => s.stage !== 'Completed').length} 
          trend={-2} 
          icon={<Package className="text-indigo-500" />} 
        />
        <StatCard 
          label="Pending Orders" 
          value={orders.length} 
          trend={5.4} 
          icon={<Truck className="text-amber-500" />} 
        />
        <StatCard 
          label="Low Stock Materials" 
          value={lowStock.length} 
          trend={0} 
          icon={<AlertTriangle className={lowStock.length > 0 ? "text-red-500" : "text-slate-400"} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-semibold text-lg text-slate-800">Weekly Sales Volume</h3>
            <select className="bg-slate-50 border-none text-sm font-medium text-slate-500 rounded-lg px-3 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={20} className="text-indigo-300" />
            <h3 className="font-semibold text-lg">Nexab AI Insights</h3>
          </div>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {loadingAi ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-indigo-300">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium">Analyzing current collections...</p>
              </div>
            ) : (
              aiAnalysis.map((item, idx) => (
                <div key={idx} className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-colors cursor-default">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm tracking-wide uppercase text-indigo-200">{item.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      item.impact === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-indigo-500/20 text-indigo-300'
                    }`}>
                      {item.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-indigo-100/80 leading-relaxed">{item.description}</p>
                </div>
              ))
            )}
          </div>
          
          <button 
            onClick={handleGenerateForecast}
            disabled={loadingForecast}
            className="mt-6 w-full py-3 bg-white text-indigo-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingForecast ? (
              <div className="w-4 h-4 border-2 border-indigo-900/30 border-t-indigo-900 rounded-full animate-spin"></div>
            ) : <ArrowUpRight size={16} />}
            {loadingForecast ? 'Analysing...' : 'Run Full Seasonal Forecast'}
          </button>
        </div>
      </div>

      {/* Redesigned Seasonal Trend Forecast Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
              <BrainCircuit size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Nexab AI Trend Tracker</h3>
              <p className="text-slate-500 text-sm">Advanced seasonal forecasting based on current inventory and market signals.</p>
            </div>
          </div>
          <button 
            onClick={handleGenerateForecast}
            disabled={loadingForecast}
            className={`px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-200 transition-all ${loadingForecast ? 'opacity-70 cursor-not-allowed scale-[0.98]' : 'active:scale-95'}`}
          >
            {loadingForecast ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing Market...
              </div>
            ) : (
              <>
                <Zap size={18} />
                Generate Forecast
              </>
            )}
          </button>
        </div>

        <div className="p-8">
          {!forecasts && !loadingForecast && (
            <div className="py-24 flex flex-col items-center justify-center text-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 group hover:border-indigo-300 transition-colors cursor-pointer" onClick={handleGenerateForecast}>
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="text-indigo-500" size={32} />
               </div>
               <p className="text-slate-900 font-bold text-xl">Discover Your Brand's Future</p>
               <p className="text-slate-400 text-sm mt-2 max-w-sm">Use our proprietary AI models to analyze your current SKU performance and project next season's best sellers.</p>
               <div className="mt-8 flex items-center gap-2 text-indigo-600 font-bold text-sm">
                 <Zap size={14} />
                 Start Market Analysis
               </div>
            </div>
          )}

          {loadingForecast && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[420px] bg-slate-50 animate-pulse rounded-3xl border border-slate-100 flex flex-col p-8 space-y-6">
                   <div className="flex justify-between">
                     <div className="space-y-2">
                       <div className="w-24 h-3 bg-slate-200 rounded-full"></div>
                       <div className="w-40 h-6 bg-slate-200 rounded-full"></div>
                     </div>
                     <div className="w-16 h-8 bg-slate-200 rounded-lg"></div>
                   </div>
                   <div className="flex-1 bg-slate-100/50 rounded-2xl"></div>
                   <div className="space-y-3">
                     <div className="w-full h-2 bg-slate-200 rounded-full"></div>
                     <div className="w-2/3 h-2 bg-slate-200 rounded-full"></div>
                   </div>
                </div>
              ))}
            </div>
          )}

          {forecasts && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in zoom-in-95 duration-700">
              {forecasts.map((forecast, index) => {
                const theme = themeColors[index % themeColors.length];
                return (
                  <div key={index} className={`flex flex-col ${theme.bg} p-8 rounded-[2.5rem] border ${theme.border} shadow-2xl ${theme.glow} group hover:translate-y-[-8px] transition-all duration-500 relative overflow-hidden`}>
                    {/* Visual embellishments */}
                    <div className={`absolute -top-12 -right-12 w-48 h-48 ${theme.accent} opacity-5 blur-[80px] rounded-full group-hover:opacity-10 transition-opacity`}></div>
                    <div className="absolute top-8 right-8 text-white/5 group-hover:scale-125 transition-transform duration-700 opacity-20">
                       {/* Fix: Explicitly cast to React.ReactElement<any> to avoid TS error on 'size' prop in cloneElement */}
                       {React.cloneElement(theme.icon as React.ReactElement<any>, { size: 64 })}
                    </div>
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="flex flex-col">
                        <span className={`text-[10px] font-black uppercase ${theme.text} tracking-[0.2em] mb-2`}>
                          Forecast 0{index + 1}
                        </span>
                        <h4 className="text-2xl font-bold text-white leading-tight font-display tracking-tight">{forecast.trendName}</h4>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg backdrop-blur-md ${
                          forecast.popularity === 'High' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          <Flame size={12} className={forecast.popularity === 'High' ? 'animate-pulse' : ''} />
                          {forecast.popularity} Pull
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-indigo-100/60 leading-relaxed mb-8 flex-1 relative z-10">
                      {forecast.explanation}
                    </p>

                    <div className="space-y-6 pt-8 border-t border-white/5 relative z-10">
                      {/* Confidence Progress Meter */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className={`flex items-center gap-2 ${theme.text}`}>
                            <BarChart3 size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">AI Confidence Level</span>
                          </div>
                          <span className="text-xs font-black text-white px-2 py-0.5 bg-white/5 rounded-md">{forecast.confidenceScore}%</span>
                        </div>
                        <div className="h-2.5 bg-black/40 rounded-full overflow-hidden p-[1px] shadow-inner">
                          <div 
                            className={`h-full ${theme.accent} rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_15px_rgba(0,0,0,0.5)]`} 
                            style={{ width: `${forecast.confidenceScore}%` }}
                          >
                            <div className="absolute top-0 right-0 bottom-0 w-12 bg-white/20 blur-md animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Timer size={14} className={theme.text} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{forecast.timeFrame}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${theme.text}`}>
                          Signal Source <LineChart size={12} />
                        </div>
                      </div>

                      {/* Actionable Strategy Box */}
                      <div className={`${theme.lightBg} p-5 rounded-2xl border border-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-300 relative overflow-hidden`}>
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.accent} opacity-50`}></div>
                        <div className="flex items-center gap-2 mb-2.5">
                           <div className={`w-2 h-2 rounded-full ${theme.accent} animate-ping`}></div>
                           <p className="text-[10px] font-black text-white uppercase tracking-widest">Strategic Production Pivot</p>
                        </div>
                        <p className="text-xs text-indigo-100/90 font-medium italic leading-relaxed">
                          "{forecast.suggestion}"
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                           <span className="text-[9px] text-white/30 font-bold uppercase">Automate Workflows</span>
                           <ArrowRight size={14} className={`${theme.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* AI Market Sentiment Analysis Section */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden border border-white/5">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-3 text-emerald-400 mb-3">
                <div className="w-8 h-8 bg-emerald-400/10 rounded-lg flex items-center justify-center">
                  <Activity size={18} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Sentiment Processing</span>
              </div>
              <h3 className="text-4xl font-display leading-tight">Demographic Pulse Analysis</h3>
              <p className="text-slate-400 text-sm mt-3 max-w-2xl leading-relaxed font-medium">Deep-dive analysis into how global target demographics are projected to respond to your current production line and style aesthetics.</p>
            </div>
            <button 
              onClick={handleGenerateSentiment}
              disabled={loadingSentiment}
              className={`px-10 py-5 bg-white text-slate-900 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 hover:text-white transition-all transform active:scale-95 shadow-2xl shadow-white/5 flex items-center gap-3 group ${loadingSentiment ? 'animate-pulse cursor-wait disabled:opacity-50' : ''}`}
            >
              {loadingSentiment ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                  <span>Processing Hub...</span>
                </>
              ) : (
                <>
                  <Target size={18} className="group-hover:rotate-45 transition-transform" />
                  <span>Analyze Market Pull</span>
                </>
              )}
            </button>
          </div>

          {!sentimentData && !loadingSentiment && (
            <div className="py-24 flex flex-col items-center justify-center text-center bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm border-dashed">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                 <Users size={40} className="text-slate-500" />
              </div>
              <p className="text-slate-200 font-bold text-xl">Sentiment engine is offline</p>
              <p className="text-slate-500 text-sm mt-2 max-w-sm">Trigger the analysis to quantify segment reception and identify strategic pivot points for your collections.</p>
            </div>
          )}

          {loadingSentiment && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-80 bg-white/5 animate-pulse rounded-3xl border border-white/10"></div>
              ))}
            </div>
          )}

          {sentimentData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in zoom-in-95 duration-700">
              {sentimentData.map((data, idx) => (
                <div key={idx} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{data.segment}</span>
                    <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-tight shadow-lg ${
                      data.momentum === 'Rising' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 
                      data.momentum === 'Stable' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 'bg-rose-500/20 text-rose-400 border border-rose-500/20'
                    }`}>
                      {data.momentum}
                    </div>
                  </div>
                  
                  <div className="mb-10">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-4xl font-display leading-none group-hover:scale-110 transition-transform origin-left">{data.sentimentScore}%</span>
                      <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Score</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden p-[1px]">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                        style={{ width: `${data.sentimentScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-4">
                       <Zap size={14} className="text-indigo-400" />
                       <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Market Directive</p>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {data.strategicPivot}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string | number; trend: number; icon: React.ReactNode }> = ({ label, value, trend, icon }) => (
  <div className="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 group">
    <div className="flex items-center justify-between mb-6">
      <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 group-hover:scale-110 transition-all duration-500">
        {icon}
      </div>
      {trend !== 0 && (
        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
      <p className="text-3xl font-bold text-slate-800 mt-2 tracking-tight group-hover:text-indigo-600 transition-colors">{value}</p>
    </div>
  </div>
);

export default DashboardView;
