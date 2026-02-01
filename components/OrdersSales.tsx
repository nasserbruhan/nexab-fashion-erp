
import React from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink,
  CircleDot,
  Clock,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface Props {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const OrdersSales: React.FC<Props> = ({ orders, setOrders }) => {
  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case OrderStatus.PENDING: return <Clock size={14} className="text-amber-500" />;
      case OrderStatus.CONFIRMED: return <CircleDot size={14} className="text-blue-500" />;
      case OrderStatus.PROCESSING: return <CircleDot size={14} className="text-indigo-500 animate-pulse" />;
      case OrderStatus.SHIPPED: return <PackageCheck size={14} className="text-emerald-500" />;
      case OrderStatus.DELIVERED: return <CheckCircle2 size={14} className="text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Sales & Distribution</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total Value</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Invoicing</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800">{order.id}</td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-700">{order.customerName}</p>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">{order.date}</td>
                <td className="px-6 py-4 text-sm font-bold text-indigo-600">${order.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{order.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold">
                    <FileText size={16} /> Generate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersSales;
