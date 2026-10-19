import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import type { CoffeeProduct } from './products.service.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): CoffeeProduct[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): CoffeeProduct {
    const product = this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException('Товар не найден');
    }
    return product;
  }

  @Post()
  create(@Body() product: Omit<CoffeeProduct, 'id'>): CoffeeProduct {
    return this.productsService.create(product);
  }
}
