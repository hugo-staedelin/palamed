import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  reference: number;
  @ApiProperty()
  label: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  type: string;
}
