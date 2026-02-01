
import React from 'react';
import { 
  Style, 
  ProductionStage, 
  RawMaterial, 
  Order, 
  OrderStatus 
} from './types';

export const INITIAL_STYLES: Style[] = [
  {
    id: 'S001',
    sku: 'FW24-L-DR-01',
    name: 'Midnight Velvet Gown',
    collection: 'Fall Winter 2024',
    category: 'Dresses',
    price: 299,
    image: 'https://picsum.photos/seed/fashion1/400/500',
    stock: 45,
    stage: ProductionStage.FINISHING,
    season: 'FW24'
  },
  {
    id: 'S002',
    sku: 'SS25-M-JK-05',
    name: 'Linen Safari Jacket',
    collection: 'Spring Summer 2025',
    category: 'Outerwear',
    price: 185,
    image: 'https://picsum.photos/seed/fashion2/400/500',
    stock: 12,
    stage: ProductionStage.CUTTING,
    season: 'SS25'
  },
  {
    id: 'S003',
    sku: 'RES-L-TP-09',
    name: 'Silk Bow Blouse',
    collection: 'Resort 2025',
    category: 'Tops',
    price: 145,
    image: 'https://picsum.photos/seed/fashion3/400/500',
    stock: 88,
    stage: ProductionStage.COMPLETED,
    season: 'RES25'
  }
];

export const INITIAL_MATERIALS: RawMaterial[] = [
  { id: 'M001', name: 'Premium Mulberry Silk', quantity: 120, unit: 'm', threshold: 50, category: 'Fabric' },
  { id: 'M002', name: 'Recycled Polyester Thread', quantity: 30, unit: 'cones', threshold: 10, category: 'Trims' },
  { id: 'M003', name: 'Italian Calf Leather', quantity: 15, unit: 'skins', threshold: 20, category: 'Fabric' },
  { id: 'M004', name: 'Gold-Plated Zippers', quantity: 500, unit: 'pcs', threshold: 100, category: 'Hardware' }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-5542',
    customerName: 'Moda Boutique Paris',
    date: '2024-05-12',
    total: 4500.00,
    status: OrderStatus.PROCESSING,
    items: [{ styleId: 'S001', quantity: 15 }]
  },
  {
    id: 'ORD-5543',
    customerName: 'Saks Fifth Avenue',
    date: '2024-05-14',
    total: 12800.00,
    status: OrderStatus.CONFIRMED,
    items: [{ styleId: 'S003', quantity: 40 }]
  }
];
