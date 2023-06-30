import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto } from 'src/dtos/create-product.dto';
import { updateProductDto } from 'src/dtos/update-product.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @UseGuards(AdminGuard)
  @Post()
  async productCreated(@Body() productData: createProductDto) {
    const product = await this.productService.create(productData);
    return product;
  }

  @Get(':id')
  async getSingleProduct(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return product;
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  async productUpdated(
    @Param('id') id: string,
    @Body() body: updateProductDto,
  ) {
    const product = await this.productService.update(id, body);
    return product;
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async productDeleted(@Param('id') id: string) {
    const product = await this.productService.delete(id);
    return product;
  }
}
