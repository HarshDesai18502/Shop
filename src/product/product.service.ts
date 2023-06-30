import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async create(data): Promise<Product> {
    return new this.productModel(data).save();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async update(id: string, data) {
    return await this.productModel.findOneAndUpdate({ _id: id }, data, {
      returnOriginal: false,
    });
  }

  async delete(id: string) {
    return this.productModel.deleteOne({ _id: id });
  }
}
