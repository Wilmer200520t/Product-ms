import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "../prisma-config/prisma.service";
import { PaginationDto } from "../common/dto";
import { envs } from "../configs";
import {
  Prisma__ProductClient,
  ProductFindFirstArgs,
  ProductFindUniqueArgs,
} from "../generated/models";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async validateProductExists(
    data: Promise<Product | null>,
    idproduct: number,
  ): Promise<Product> {
    const productData = await data;

    if (!productData) {
      throw new NotFoundException(`Product with ID: ${idproduct} not found`);
    }

    return productData;
  }

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

    const totalItems = await this.prisma.product.count();
    const totalPages = Math.ceil(totalItems / limit);
    const data = await this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }

  async findOne(idproduct: number) {
    const data = this.prisma.product.findFirst({
      where: { idproduct },
    });

    return this.validateProductExists(data, idproduct);
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

  async remove(idproduct: number) {
    const product = this.prisma.product.findUnique({ where: { idproduct } });

    await this.validateProductExists(product, idproduct);

    const deletedProduct = await this.prisma.product.delete({
      where: { idproduct },
    });

    return {
      message: `Product with ID: ${idproduct} has been deleted`,
      deletedProduct,
    };
  }
}
