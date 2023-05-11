import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getAllProduct() {
    try {
      return this.productService.findAll();
    } catch (error) {}
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    try {
      return this.productService.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  async createProduct(
    @Body('name') name: string,
    @Body('price') price: string,
    @Body('description') description?: string,
  ) {
    const newProduct = await this.productService.create(
      name,
      price,
      description,
    );

    return newProduct;
  }

  @Post(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: string,
    @Body('description') description?: string,
  ) {
    await this.productService.updateProduct(id, { name, price, description });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
