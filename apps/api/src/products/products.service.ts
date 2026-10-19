import { Injectable } from '@nestjs/common';

export interface CoffeeProduct {
  id: string;
  name: string;
  price: number;
  weight: string;
  desc: string;
  process: string;
  region: string;
  roasting: string;
  altitude: string;
  category: 'single' | 'drip' | 'blend' | 'subscription';
}

@Injectable()
export class ProductsService {
  private readonly products: CoffeeProduct[] = [
    {
      id: '1',
      name: 'Эфиопия Иргачеффе G1',
      price: 32,
      weight: '250 г',
      desc: 'Жасмин, бергамот, спелый персик.',
      process: 'Мытая',
      region: 'Иргачеффе',
      roasting: 'Светлая',
      altitude: '1900–2100 м',
      category: 'single',
    },
    {
      id: '2',
      name: 'Колумбия Уила Натуральная',
      price: 30,
      weight: '250 г',
      desc: 'Молочный шоколад, карамель, красное яблоко.',
      process: 'Натуральная',
      region: 'Уила',
      roasting: 'Средняя',
      altitude: '1650–1800 м',
      category: 'single',
    },
    {
      id: '3',
      name: 'Бразилия Серрадо',
      price: 26,
      weight: '250 г',
      desc: 'Жареный фундук, какао-бобы, минимум кислотности.',
      process: 'Натуральная',
      region: 'Минас-Жерайс',
      roasting: 'Темная',
      altitude: '1100 м',
      category: 'single',
    },
    {
      id: '4',
      name: 'Кения Ньери АА',
      price: 36,
      weight: '250 г',
      desc: 'Черная смородина, томаты, гибискус.',
      process: 'Мытая',
      region: 'Ньери',
      roasting: 'Светлая',
      altitude: '1800 м',
      category: 'single',
    },
  ];

  findAll(): CoffeeProduct[] {
    return [...this.products];
  }

  findById(id: string): CoffeeProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  create(product: Omit<CoffeeProduct, 'id'>): CoffeeProduct {
    const newProduct = { id: String(Date.now()), ...product };
    this.products.unshift(newProduct);
    return newProduct;
  }
}
