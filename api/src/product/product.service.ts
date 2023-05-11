import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model, MongooseError } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<ProductDocument> {
    try {
      return await this.productModel.findById(id).exec();
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException('Not found product by id', HttpStatus.FOUND);
      }
    }
  }

  async create(name: string, price: string, description?: string) {
    const newProduct = new this.productModel({
      name,
      price,
      description,
    });

    return newProduct.save();
  }

  async updateProduct(id: string, data: Product) {
    try {
      const productExit = await this.productModel.findById(id).exec();

      //Save product
      return productExit.updateOne(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
    }
  }

  async deleteProduct(id: string) {
    try {
      const productExit = await this.productModel.findById(id).exec();

      return productExit.deleteOne();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
