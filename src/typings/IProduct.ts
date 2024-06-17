export interface IProduct {
  id: string;
  name: string;
  listPrice?: number;
  sellingPrice: number;
  parcelamento: Array<number>;
  image: string;
}
