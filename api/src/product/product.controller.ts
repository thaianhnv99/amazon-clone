import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getProduct() {
    return '123';
  }

  @Post()
  async createProduct(
    @Body('name') name: string,
    @Body('price') price: string,
    @Body('description') description?: string,
  ) {
    try {
      const newProduct = await this.productService.create(
        name,
        price,
        description,
      );

      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }
}
