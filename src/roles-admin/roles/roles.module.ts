import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles.entity';
import { RolesAdminController } from '../controller/roles.controller';
import { RolesService } from '../roles-services/roles.service';

@Module({
    imports: [TypeOrmModule.forFeature([Roles])],
    controllers: [RolesAdminController],
    providers: [RolesService],
    exports: [RolesService],
})
export class RolesModule {}
