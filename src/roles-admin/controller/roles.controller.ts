import { Controller, Post, Get, Param, Put, Patch, Body } from '@nestjs/common';
import { RolesService } from '../roles-services/roles.service';
import { CreateRolDTO } from '../dto/create-rol.dto';
import { Roles } from 'src/database/entities/roles.entity';

@Controller()
export class RolesAdminController {

    constructor(private rolesService: RolesService) { }

    @Post('signup')
    async signup(@Body() createRol: CreateRolDTO): Promise<Roles> {
        return this.rolesService.create(createRol);
    }
}
