import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "../prisma/prisma.service";
import { PaginationDto } from "../common/dto";
import { envs } from "../configs";

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

  async findAll(paginationDto: PaginationDto) {
    const { page = envs.DEFAULT_PAGE_SIZE, limit = envs.DEFAULT_LIMIT_PAGE } =
      paginationDto;
    return this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
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
    const product = this.prisma.product.findUnique({ where: { idproduct } });

    if (product == null) {
      throw new Error(`Product with id ${idproduct} not found`);
    }

    this.prisma.product.delete({
      where: { idproduct },
    });
  }
}
