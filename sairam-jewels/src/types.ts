export interface CollectionItem {
  id?: string;
  title: string;
  description: string;
  price?: number;
  images: string[];
  link: string;
  type: string;
  material: string;
}

export interface CartItem extends CollectionItem {
  quantity: number;
}
