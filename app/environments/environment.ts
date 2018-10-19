import { DEFAULT_CONFIG } from '../config/default/default';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
//https://app.ofypets.com/


export const environment = {
  production: false,
  currency_symbol: '₹',
  apiEndpoint: 'https://ofypets.indiepet.co.in/',
  config: DEFAULT_CONFIG
};
