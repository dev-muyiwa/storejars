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
  @IsString()
  @IsIn(['local', 'development', 'production', 'test'])
  node_env: 'local' | 'development' | 'production' | 'test';

  @IsString()
  app_name: string;

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
