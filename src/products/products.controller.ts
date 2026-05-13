import { Controller, ParseIntPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PaginationDto } from "../common/dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: "create_product" })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: "find_all_products" })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: "find_product_by_id" })
  findOne(@Payload() idproduct: number) {
    return this.productsService.findOne(+idproduct);
  }

  @MessagePattern({ cmd: "update_product" })
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  @MessagePattern({ cmd: "enable_product" })
  enable(@Payload() idproduct: number) {
    return this.productsService.enableProduct(+idproduct);
  }

  @MessagePattern({ cmd: "remove_product" })
  remove(@Payload() idproduct: number) {
    return this.productsService.remove(idproduct);
  }
}
