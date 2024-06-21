import { SetMetadata } from '@nestjs/common';

// Definimos el decorador de roles
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
