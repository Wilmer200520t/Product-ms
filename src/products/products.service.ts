import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: createProductDto.price,
        description: createProductDto.description,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  findOne(idproduct: number) {
    return this.prisma.product.findUnique({
      where: { idproduct },
    });
  }

  update(idproduct: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { idproduct },
      data: {
        name: updateProductDto.name,
        price: updateProductDto.price,
        description: updateProductDto.description,
      },
    });
  }

  remove(idproduct: number) {
    return this.prisma.product.delete({
      where: { idproduct },
    });
  }
}
