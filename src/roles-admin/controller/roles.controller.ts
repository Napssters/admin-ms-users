import { Controller, Post, Get, Param, Put, Patch, Body } from '@nestjs/common';
import { RolesService } from '../roles-services/roles.service';
import { CreateRolDTO } from '../dto/create-rol.dto';
import { Roles } from 'src/entities/roles.entity';
import { UpdateRolRequestDTO } from '../dto/requests/update-rol.request.dto';

@Controller('rol')
export class RolesAdminController {

    constructor(private rolesService: RolesService) { }

    @Post('create-rol')
    async createRol(@Body() createRol: CreateRolDTO): Promise<Roles> {
        return this.rolesService.create(createRol);
    }

    @Get('find-rol/:name')
    async findRol(@Param('name') name: string): Promise<Roles> {
        return this.rolesService.findByName(name);
    }

    @Put('update-rol/:name')
    updateRol(
        @Param('name') name: string, 
        @Body() updatedData: Partial<UpdateRolRequestDTO>
        ): Promise<Roles> {
        return this.rolesService.update(name, updatedData);
    }
    
    @Patch('delete-rol')
    deleteTol(@Param('name') name: string): Promise<string> {
        return this.rolesService.softDelete(name);
    }
}
