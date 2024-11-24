import { ContractABI } from '../../contracts/types';
import * as path from 'node:path';
import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as process from 'node:process';

@Injectable()
export class ContractLoaderService {
  loadContractABI(name: string): ContractABI {
    try {
      const abiPath = path.join(process.cwd(), 'contracts', 'abis', `${name}.json`);
      const abiFile = fs.readFileSync(abiPath, 'utf8');
      return JSON.parse(abiFile);
    } catch (error) {
      throw new Error(`failed to load abi for ${name}: ${error.message}`);
    }
  }
}
