import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users') // Tag for Swagger documentation
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get user by ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBearerAuth() // Requires JWT Bearer token authentication
  @ApiResponse({ status: 200, description: 'Returns the user with the specified ID.' })
  async getUserById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  // Get all users
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  async getAllUsers() {
    return this.usersService.findAll();
  }

  // Edit user by ID
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id/edit')
  @ApiOperation({ summary: 'Edit user by ID (admin only)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBearerAuth() // Requires JWT Bearer token authentication
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden: Only admin users can perform this operation.' })
  async editUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(id, updateUserDto);
    return this.usersService.update(id, updateUserDto);
  }
}
