import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PhasesService } from './phases.service';
import { CreatePhaseDto } from './dto/create-phases.dto';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Role } from 'src/core/role.enum';

@Controller('phases')
export class PhasesController {
  constructor(private readonly phasesService: PhasesService) {}

  @Get()
  async findAll() {
    return this.phasesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    console.log("id:")
    return this.phasesService.findOne(id);
  }

  @Post()
  @Roles(Role.Teacher)
  async create(@Body() createPhaseDto: CreatePhaseDto) {
    return this.phasesService.create(createPhaseDto);
  }

  @Delete(':id')
  @Roles(Role.Teacher)
  async delete(@Param('id') id: number) {
    return this.phasesService.delete(id);
  }
}
