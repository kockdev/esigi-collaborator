import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { CreateDocumentsDto } from "../documents/dtos/create-documents.dto";
import { UpdateEducationsDto } from "./dtos/update-educations.dto";
import { EducationsService } from "./educations.service";

@Controller('educations')
export class EducationsController {
  constructor(private readonly educationService: EducationsService) {}

  @Get()
  async index() {
    return await this.educationService.findAll();
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.educationService.findOneOrFail({ id });
  }

  @Post()
  async store(@Body() body: CreateDocumentsDto) {
    return await this.educationService.store(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateEducationsDto,
  ) {
    return await this.educationService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.educationService.destroy(id);
  }
}