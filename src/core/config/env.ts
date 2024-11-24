import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class EthereumConfig {
  @IsString()
  rpc_url: string;

  @IsString()
  private_key: string;

  @IsString()
  contract_address: string;
}

export class EnvConfig {
  @Type(() => Number)
  @IsNumber()
  port: number;

  @IsString()
  @IsNotEmpty({ message: 'Mongo URI is required' })
  mongo_uri: string;

  @ValidateNested()
  @Type(() => EthereumConfig)
  ethereum: EthereumConfig;
}
