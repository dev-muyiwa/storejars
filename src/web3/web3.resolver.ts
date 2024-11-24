import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Web3Service } from './web3.service';
import { Counter, TransactionResponse } from './dto/counter.dto';

@Resolver()
export class Web3Resolver {
  constructor(private readonly web3Service: Web3Service) {}

  @Query(() => Counter)
  async getCounterValue(): Promise<Counter> {
    const count = await this.web3Service.getCounterValue();
    return { count: count.toString() };
  }

  @Mutation(() => TransactionResponse)
  async incrementCounter() {
    const hash = await this.web3Service.incrementCounter();
    return { hash };
  }
}
