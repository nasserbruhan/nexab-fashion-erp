
import React, { useState } from 'react';
import { 
  Plus, 
  MoreVertical, 
  Filter, 
  ChevronRight,
  Eye,
  PenTool,
  Archive,
  Wand2,
  // Fix: Added Shirt to the list of imported icons from lucide-react
  Shirt
} from 'lucide-react';
import { Style, ProductionStage } from '../types';
import { generateDesignNotes } from '../services/geminiService';

interface Props {
  styles: Style[];
  setStyles: React.Dispatch<React.SetStateAction<Style[]>>;
}

const ProductManagement: React.FC<Props> = ({ styles, setStyles }) => {
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiNote, setAiNote] = useState("");

  const handleAiNotes = async (styleName: string) => {
    setIsAiLoading(true);
    const note = await generateDesignNotes(styleName);
    setAiNote(note);
    setIsAiLoading(false);
  };

  return (
    <div className="flex h-full gap-8 animate-in slide-in-from-right duration-500">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-lg">Product Catalog</h3>
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">{styles.length} Styles</span>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50">
              <Filter size={16} /> Filter
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20">
              <Plus size={16} /> New Style
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {styles.map((style) => (
            <div 
              key={style.id} 
              onClick={() => { setSelectedStyle(style); setAiNote(""); }}
              className={`group bg-white rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                selectedStyle?.id === style.id ? 'ring-2 ring-indigo-500 border-transparent shadow-xl' : 'border-slate-200 hover:shadow-lg'
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img src={style.image} alt={style.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold rounded-full uppercase tracking-widest shadow-sm">
                    {style.season}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <button className="w-full py-2 bg-white text-slate-900 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                    <Eye size={16} /> View Details
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-slate-800 leading-tight">{style.name}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{style.sku}</p>
                  </div>
                  <span className="font-bold text-indigo-600">${style.price}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-semibold text-slate-600">{style.stage}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">{style.stock} in stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Style Details Sidebar */}
      <div className={`w-96 bg-white border-l border-slate-200 p-8 overflow-y-auto transition-transform duration-300 ${selectedStyle ? 'translate-x-0' : 'translate-x-full absolute right-0'}`}>
        {selectedStyle ? (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">Style Profile</h3>
              <button onClick={() => setSelectedStyle(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between p-4 bg-slate-50 rounded-xl">
                 <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Production Status</div>
                 <div className="text-sm font-bold text-indigo-600">{selectedStyle.stage}</div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-50 rounded-xl">
                   <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Collection</div>
                   <div className="text-sm font-bold text-slate-800">{selectedStyle.collection}</div>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-xl">
                   <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Category</div>
                   <div className="text-sm font-bold text-slate-800">{selectedStyle.category}</div>
                 </div>
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
               <div className="flex items-center justify-between">
                 <h4 className="font-bold text-slate-800 flex items-center gap-2">
                   <Wand2 size={16} className="text-indigo-500" />
                   Smart Design Notes
                 </h4>
                 {!aiNote && (
                   <button 
                     disabled={isAiLoading}
                     onClick={() => handleAiNotes(selectedStyle.name)}
                     className="text-xs font-bold text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                   >
                     {isAiLoading ? 'Generating...' : 'Generate with AI'}
                   </button>
                 )}
               </div>
               
               <div className="bg-slate-50 rounded-2xl p-4 min-h-[120px]">
                 {aiNote ? (
                   <p className="text-sm text-slate-600 leading-relaxed italic">
                     {aiNote}
                   </p>
                 ) : (
                   <p className="text-sm text-slate-400 text-center py-8">No design notes yet. Use AI to generate manufacturing insights.</p>
                 )}
               </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
                <PenTool size={18} /> Edit Style Tech Pack
              </button>
              <button className="w-full py-3 border border-slate-200 text-slate-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <Archive size={18} /> Archive Style
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Shirt size={32} />
            </div>
            <p className="font-bold">Select a style to view profile</p>
            <p className="text-sm mt-1">Manage SKUs, production, and AI notes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
