
export enum ProductionStage {
  DESIGN = 'Design',
  CUTTING = 'Cutting',
  SEWING = 'Sewing',
  FINISHING = 'Finishing',
  COMPLETED = 'Completed'
}

export enum OrderStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered'
}

export interface Style {
  id: string;
  sku: string;
  name: string;
  collection: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  stage: ProductionStage;
  season: string;
}

export interface RawMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  threshold: number;
  category: 'Fabric' | 'Trims' | 'Hardware';
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: { styleId: string; quantity: number }[];
}

export interface KPI {
  label: string;
  value: string | number;
  trend: number;
  icon: string;
}
