import { ImageModel } from './image';
export interface Product {
  productId: number;
  name: string;
  provider: string;
  sellPrice: number;
  buyPrice: number;
  expirationDate: Date;
  description: string;
  image: string;
  created:Date;
  unitTypeId: number;
  productTypeId: number;
  images:ImageModel[];
}
