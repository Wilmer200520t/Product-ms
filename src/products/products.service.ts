import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "../prisma-config/prisma.service";
import { PaginationDto } from "../common/dto";
import { envs } from "../configs";
import { Product } from "./entities/product.entity";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findProductOrFail(
    idproduct: number,
    _validateEnable = true,
  ): Promise<Omit<Product, "enabled">> {
    const condition = _validateEnable
      ? { idproduct, enabled: true }
      : { idproduct };
    const product = await this.prisma.product.findFirst({
      where: condition,
      select: {
        idproduct: true,
        name: true,
        description: true,
        price: true,
        enabled: _validateEnable == true ? false : true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!product || product == null) {
      throw new RpcException({
        message: `Product with ID: ${idproduct} not found ${_validateEnable ? "or not enabled" : ""}`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    if (product.enabled) {
      throw new RpcException({
        message: `Product with ID: ${idproduct} is already enabled`,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return product;
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

    const totalItems = await this.prisma.product.count({
      where: { enabled: true },
    });
    const totalPages = Math.ceil(totalItems / limit);
    const data = await this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { enabled: true },
      select: {
        idproduct: true,
        name: true,
        description: true,
        price: true,
        enabled: false,
        createdAt: true,
        updatedAt: true,
      },
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
    return this.findProductOrFail(idproduct);
  }

  async update(updateProductDto: UpdateProductDto) {
    await this.findProductOrFail(updateProductDto.idproduct);

    return this.prisma.product.update({
      where: { idproduct: updateProductDto.idproduct },
      data: {
        name: updateProductDto.name,
        price: updateProductDto.price,
        description: updateProductDto.description,
      },
    });
  }

  async remove(idproduct: number) {
    await this.findProductOrFail(idproduct);

    await this.prisma.product.update({
      where: { idproduct },
      data: {
        enabled: false,
      },
    });

    return {
      message: `Product with ID: ${idproduct} has been disabled`,
    };
  }

  async enableProduct(idproduct: number) {
    const product = await this.findProductOrFail(idproduct, false);

    return this.prisma.product.update({
      where: { idproduct },
      data: { enabled: true },
    });
  }
}
