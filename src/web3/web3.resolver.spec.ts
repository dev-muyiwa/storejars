import { Test, TestingModule } from '@nestjs/testing';
import { Web3Resolver } from './web3.resolver';
import { Web3Service } from './web3.service';

describe('Web3Resolver', () => {
  let resolver: Web3Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Web3Resolver, Web3Service],
    }).compile();

    resolver = module.get<Web3Resolver>(Web3Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
