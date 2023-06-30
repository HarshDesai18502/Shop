import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.model';
import { CurrentUserMiddleWare } from 'src/middlewares/current-user.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          global: true,
          signOptions: { expiresIn: config.get<string>('JWT_TIME') },
        };
      },
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleWare).forRoutes(ProductController);
  }
}
