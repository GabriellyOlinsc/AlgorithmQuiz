import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phases.dto';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Role } from 'src/core/role.enum';

@Controller('phases')
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

  @Get()
  @Roles(Role.Teacher)
  async findAll() {
    return await this.phasesService.findAll();
  }

  @Get(':id')
  @Roles(Role.Teacher)
  async findOne(@Param('id') id: number) {
    return await this.phasesService.findOne(id);
  }

  @Post('/manual')
  @Roles(Role.Teacher)
  async createPhaseManual(@Body() createPhaseDto: CreatePhaseDto) {
    return await this.phasesService.createPhaseManual(createPhaseDto);
  }


  @Delete(':id')
  @Roles(Role.Teacher)
  async delete(@Param('id') id: number) {
    return await this.phasesService.delete(id);
  }
}
