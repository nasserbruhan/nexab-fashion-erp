
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Shirt, 
  Layers, 
  ShoppingBag, 
  Truck, 
  Settings, 
  ChevronRight,
  Plus,
  Search,
  Bell,
  User,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  INITIAL_STYLES, 
  INITIAL_MATERIALS, 
  INITIAL_ORDERS 
} from './constants';
import { 
  Style, 
  RawMaterial, 
  Order, 
  ProductionStage, 
  OrderStatus 
} from './types';
import DashboardView from './components/DashboardView';
import ProductManagement from './components/ProductManagement';
import InventoryProduction from './components/InventoryProduction';
import OrdersSales from './components/OrdersSales';
import LogisticsView from './components/LogisticsView';

type View = 'dashboard' | 'products' | 'inventory' | 'orders' | 'logistics';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [styles, setStyles] = useState<Style[]>(INITIAL_STYLES);
  const [materials, setMaterials] = useState<RawMaterial[]>(INITIAL_MATERIALS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'products', label: 'Products', icon: <Shirt size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <Layers size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { id: 'logistics', label: 'Logistics', icon: <Truck size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white">N</div>
          {isSidebarOpen && <span className="text-white font-display text-xl tracking-tight">Nexab</span>}
        </div>
        
        <nav className="flex-1 px-4 mt-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl mb-1 transition-colors ${
                currentView === item.id 
                  ? 'bg-indigo-500/10 text-indigo-400 font-semibold' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white w-full">
            <Settings size={20} />
            {isSidebarOpen && <span>Settings</span>}
          </button>
          <div className="mt-4 flex items-center gap-3 px-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">JD</div>
            {isSidebarOpen && (
              <div className="text-xs">
                <p className="text-white font-medium">Jane Doe</p>
                <p className="text-slate-500">Creative Director</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <h2 className="text-xl font-semibold text-slate-800 capitalize">
            {currentView}
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 rounded-full text-sm w-64 transition-all"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full md:block hidden"
            >
              <ChevronRight className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {currentView === 'dashboard' && <DashboardView styles={styles} orders={orders} materials={materials} />}
          {currentView === 'products' && <ProductManagement styles={styles} setStyles={setStyles} />}
          {currentView === 'inventory' && <InventoryProduction styles={styles} materials={materials} setMaterials={setMaterials} />}
          {currentView === 'orders' && <OrdersSales orders={orders} setOrders={setOrders} />}
          {currentView === 'logistics' && <LogisticsView orders={orders} />}
        </div>
      </main>
    </div>
  );
};

export default App;
