export interface ContractABI {
  abi: Array<{
    inputs: any[];
    name: string;
    outputs?: any[];
    stateMutability: string;
    type: string;
  }>;
}
