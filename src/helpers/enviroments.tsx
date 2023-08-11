import { Environments } from '../typings/env';

export const isProduction = (): boolean => (process.env.NEXT_PUBLIC_NODE_ENV as string) === Environments.Production;
