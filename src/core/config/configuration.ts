import * as process from 'node:process';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { EnvConfig } from './env';

export default (): EnvConfig => {
  const config = {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    ethereum: {
      rpc_url: process.env.ETHEREUM_RPC_URL,
      private_key: process.env.ETHEREUM_PRIVATE_KEY,
      contract_address: process.env.ETHEREUM_CONTRACT_ADDRESS,
    }
  };

  const configInstance = plainToInstance(EnvConfig, config);
  const errors = validateSync(configInstance, {
    skipMissingProperties: false,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  });

  if (errors.length > 0) {
    const formatValidationErrors = (
      errors: ValidationError[],
      parentPath: string = '',
    ): any[] => {
      return errors.flatMap((error: ValidationError) => {
        const currentPath = parentPath
          ? `${parentPath}.${error.property}`
          : error.property;

        const fieldErrors = Object.entries(error.constraints || {}).map(
          (message) => ({
            field: `${currentPath}`,
            message: message.pop(),
          }),
        );

        const nestedErrors = formatValidationErrors(
          error.children as ValidationError[],
          currentPath,
        );

        return [...fieldErrors, ...nestedErrors];
      });
    };
    const formattedErrors = formatValidationErrors(errors);
    console.error(
      '❌ Invalid environment variables:',
      JSON.stringify(formattedErrors, null, 2),
    );
    process.exit(1);
  }

  return configInstance;
};
