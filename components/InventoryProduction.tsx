
import React from 'react';
import { 
  Package, 
  Layers, 
  Settings2, 
  Plus, 
  ArrowRight,
  ClipboardList
} from 'lucide-react';
import { RawMaterial, Style, ProductionStage } from '../types';

interface Props {
  materials: RawMaterial[];
  styles: Style[];
  setMaterials: React.Dispatch<React.SetStateAction<RawMaterial[]>>;
}

const InventoryProduction: React.FC<Props> = ({ materials, styles, setMaterials }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Raw Materials Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers size={20} className="text-indigo-500" />
              <h3 className="font-semibold text-lg">Raw Materials</h3>
            </div>
            <button className="text-indigo-600 font-bold text-sm flex items-center gap-1">
              <Plus size={16} /> Add Material
            </button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Material Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">In Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {materials.map((mat) => (
                <tr key={mat.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">{mat.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">{mat.id}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{mat.category}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{mat.quantity} {mat.unit}</td>
                  <td className="px-6 py-4">
                    {mat.quantity < mat.threshold ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider">
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                        Healthy
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active Production Line */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings2 size={20} className="text-indigo-500" />
              <h3 className="font-semibold text-lg">Active Production Stages</h3>
            </div>
            <button className="text-slate-400 hover:text-indigo-600">
              <ClipboardList size={20} />
            </button>
          </div>
          <div className="flex-1 p-6 space-y-6">
            {Object.values(ProductionStage).filter(s => s !== ProductionStage.COMPLETED).map((stage) => {
              const items = styles.filter(s => s.stage === stage);
              return (
                <div key={stage} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-800">{stage}</span>
                    <span className="text-xs font-semibold text-slate-400">{items.length} units</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.length > 0 ? (
                      items.map(item => (
                        <div key={item.id} className="group relative">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-12 h-16 rounded-lg object-cover border-2 border-slate-100 group-hover:border-indigo-400 transition-colors"
                          />
                          <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-white text-[8px] text-center font-bold rounded-b-lg py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.sku.split('-').pop()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full py-4 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center text-slate-300 text-xs italic">
                        No styles in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryProduction;
