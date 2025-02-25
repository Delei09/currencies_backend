import { SetMetadata } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

export const IS_PUBLIC_KEY = process.env.KEY_IS_PUBLIC_KEY;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
