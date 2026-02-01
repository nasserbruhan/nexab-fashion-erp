
import React from 'react';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Calendar,
  Package,
  ArrowRight,
  // Fix: Added Plus to the list of imported icons from lucide-react
  Plus
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface Props {
  orders: Order[];
}

const LogisticsView: React.FC<Props> = ({ orders }) => {
  const shipments = orders.filter(o => o.status === OrderStatus.SHIPPED || o.status === OrderStatus.PROCESSING);

  return (
    <div className="space-y-8 animate-in slide-in-from-left duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Shipments List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Truck className="text-indigo-500" />
              Active Shipments
            </h3>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">{shipments.length} Moving</span>
          </div>

          <div className="space-y-4">
            {shipments.map((ship) => (
              <div key={ship.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                      <Package size={24} className="text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{ship.id}</h4>
                      <p className="text-xs text-slate-400 font-medium">Destination: {ship.customerName}</p>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center gap-4 px-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-indigo-50"></div>
                      <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">WH</span>
                    </div>
                    <div className="flex-1 h-1 bg-slate-100 relative rounded-full overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-2/3 bg-indigo-500 rounded-full"></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                      <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">DEST</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ETA</p>
                      <p className="font-bold text-slate-800">24 May</p>
                    </div>
                    <button className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                      <Navigation size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logistics Partners & Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MapPin size={18} className="text-rose-500" />
              Logistics Partners
            </h3>
            <div className="space-y-4">
              <PartnerCard name="DHL Express" efficiency={98} status="Active" color="bg-amber-400" />
              <PartnerCard name="FedEx Global" efficiency={92} status="Active" color="bg-indigo-600" />
              <PartnerCard name="Nexab Logistics" efficiency={100} status="In-House" color="bg-emerald-500" />
            </div>
            <button className="w-full mt-6 py-3 border border-dashed border-slate-200 text-slate-400 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
              <Plus size={16} /> Assign New Partner
            </button>
          </div>

          <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg">
             <div className="flex items-center gap-2 mb-4">
               <Calendar size={18} />
               <h4 className="font-bold">Dispatch Schedule</h4>
             </div>
             <div className="space-y-3">
               <div className="flex items-center justify-between text-xs font-bold text-indigo-200">
                 <span>Today's Pickups</span>
                 <span>4 Orders</span>
               </div>
               <div className="flex items-center justify-between text-xs font-bold text-indigo-200">
                 <span>International</span>
                 <span>12 Orders</span>
               </div>
             </div>
             <button className="mt-6 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors">
               View Full Calendar
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PartnerCard: React.FC<{ name: string; efficiency: number; status: string; color: string }> = ({ name, efficiency, status, color }) => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`w-1.5 h-8 ${color} rounded-full`}></div>
      <div>
        <p className="font-bold text-slate-800 text-sm">{name}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase">{status}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs font-bold text-emerald-600">{efficiency}%</p>
      <p className="text-[10px] text-slate-400 font-medium">On-Time</p>
    </div>
  </div>
);

export default LogisticsView;
