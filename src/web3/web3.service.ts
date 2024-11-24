import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { ContractLoaderService } from './contract-loader.service';

@Injectable()
export class Web3Service {
  private readonly provider: ethers.JsonRpcProvider;
  private readonly wallet: ethers.Wallet;
  private contract: ethers.Contract;

  constructor(
    @Inject() private readonly configService: ConfigService,
    @Inject() private readonly contractLoader: ContractLoaderService,
  ) {
    const rpcUrl = this.configService.get<string>('ethereum.rpc_url');
    const privateKey = this.configService.get<string>('ethereum.private_key');
    const ca = this.configService.get<string>('ethereum.contract_address');
    const { abi } = this.contractLoader.loadContractABI('counter');

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.contract = new ethers.Contract(ca, abi, this.wallet);
  }

  async getCounterValue(): Promise<bigint> {
    try {
      const data = await this.contract.getCount();
      return data;
    } catch (error) {
      throw new Error(`failed to get counter value: ${error.message}`);
    }
  }

  async incrementCounter(): Promise<string> {
    try {
      const tx = await this.contract.increment();

      tx.wait(1)
        .then(() => {
          console.log('transaction confirmed:', tx.hash);
        })
        .catch((error) => {
          throw error;
        });
      return tx.hash;
    } catch (error) {
      throw new Error(`failed to increment counter: ${error.message}`);
    }
  }
}
