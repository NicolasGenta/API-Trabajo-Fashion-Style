// pedidos.dto.ts
import { IsInt, IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class DetalleCompraDto {
  @IsInt()
  emprendimiento_id: number;

  @IsInt()
  codigo_producto: number;

  @IsInt()
  cantidad: number;

  @IsNumber()
  precio_total: number; 
}

export class CreatePedidoDto {
  @IsInt()
  cliente_id: number;

  @IsString()
  fecha_de_pedido: string;

  @IsInt()
  timestamp: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetalleCompraDto)
  detalle_compra: DetalleCompraDto[];
}

