import { Module } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { Web3Resolver } from './web3.resolver';
import { ContractLoaderService } from './contract-loader.service';

@Module({
  providers: [Web3Resolver, Web3Service, ContractLoaderService],
})
export class Web3Module {}
