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
      desc: 'Жасмин, бергамот, спелый персик. Легкое тело, яркая цитрусовая кислинка.',
      process: 'Мытая',
      region: 'Иргачеффе',
      roasting: 'Светлая (фильтр)',
      altitude: '1900–2100 м',
      category: 'single',
    },
    {
      id: '2',
      name: 'Колумбия Уила Натуральная',
      price: 30,
      weight: '250 г',
      desc: 'Молочный шоколад, карамель, красное яблоко. Сбалансированный сладкий вкус.',
      process: 'Натуральная',
      region: 'Уила',
      roasting: 'Средняя (универсальная)',
      altitude: '1650–1800 м',
      category: 'single',
    },
    {
      id: '3',
      name: 'Бразилия Серрадо',
      price: 26,
      weight: '250 г',
      desc: 'Жареный фундук, какао-бобы, минимум кислотности. Плотное тело под эспрессо.',
      process: 'Натуральная',
      region: 'Минас-Жерайс',
      roasting: 'Темная (эспрессо)',
      altitude: '1100 м',
      category: 'single',
    },
    {
      id: '4',
      name: 'Кения Ньери АА',
      price: 36,
      weight: '250 г',
      desc: 'Черная смородина, томаты, гибискус. Насыщенный и сочный профиль.',
      process: 'Мытая',
      region: 'Ньери',
      roasting: 'Светлая (фильтр)',
      altitude: '1800 м',
      category: 'single',
    },
    {
      id: '5',
      name: 'Гватемала Антигуа',
      price: 33,
      weight: '250 г',
      desc: 'Темный шоколад, пряная корица, печеные яблоки. Бархатистая текстура.',
      process: 'Мытая',
      region: 'Антигуа',
      roasting: 'Средняя',
      altitude: '1500–1700 м',
      category: 'single',
    },
    {
      id: '6',
      name: 'Коста-Рика Тарразу',
      price: 35,
      weight: '250 г',
      desc: 'Желтая слива, тростниковый сахар, ноты лесного ореха.',
      process: 'Медовая (Honey)',
      region: 'Тарразу',
      roasting: 'Светлая',
      altitude: '1600 м',
      category: 'single',
    },
    {
      id: '7',
      name: 'Руанда Мухуту',
      price: 31,
      weight: '250 г',
      desc: 'Красный апельсин, шиповник, чайная роза. Чистая чашка.',
      process: 'Мытая',
      region: 'Южная провинция',
      roasting: 'Светлая',
      altitude: '1750 м',
      category: 'single',
    },
    {
      id: '8',
      name: 'Сальвадор Апапека',
      price: 29,
      weight: '250 г',
      desc: 'Ириска, грецкий орех, сушеные фрукты.',
      process: 'Анаэробная',
      region: 'Апапека',
      roasting: 'Средняя',
      altitude: '1400 м',
      category: 'single',
    },
    {
      id: '9',
      name: 'Дрип-пакеты «Кварта Ассорти»',
      price: 19,
      weight: '10 шт',
      desc: 'Спешелти кофе в вашем кармане. 4 лучших сорта для заваривания в чашке.',
      process: 'Микс',
      region: 'Разные регионы',
      roasting: 'Смешанная',
      altitude: 'Разная',
      category: 'drip',
    },
    {
      id: '10',
      name: 'Кофейная подписка «Знакомство»',
      price: 55,
      weight: '2 пачки по 250г',
      desc: 'Два новых свежеобжаренных сорта каждый месяц с бесплатной доставкой.',
      process: 'Подборка обжарщика',
      region: 'Эксклюзив',
      roasting: 'Свежая обжарка',
      altitude: 'Элитные лоты',
      category: 'subscription',
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
