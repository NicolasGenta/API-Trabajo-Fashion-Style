import { IsInt, IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class ProductoDto {
  @IsInt()
  codigo_producto: number;

  @IsInt()
  cantidad: number;

  @IsNumber()
  precio_total: number;

  @IsInt()
  emprendimiento_id: number;
}

export class CreatePedidoDto {
  @IsInt()
  cliente_id: number;

  @IsString()
  fecha_de_pedido: string;

  @IsString()
  timestamp: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoDto)
  detalle_compra: ProductoDto[];
}
