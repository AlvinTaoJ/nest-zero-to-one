import { Controller, Get, Post, UseGuards, Body, Query, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TowerService } from './tower.service'
import { RecordDTO } from './tower.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('tower')
@ApiBearerAuth()
@Controller('tower')
export class TowerController {
  constructor(private readonly towerService: TowerService) {}
  
  @UseGuards(AuthGuard('jwt'))
  @Get('get')
  get(): string {
    return this.towerService.get();
  }

  @Get('ranking')
  async getRanking(@Query() query): Promise<object[]> {
    return this.towerService.queryRecordList(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @ApiBody({
    description: '创建用户记录',
    type: RecordDTO,
  })
  async createRecord(@Body() Body, @Request() req): Promise<object[]> {
    return this.towerService.createRecord(Body, req.user.userId);
  }
}
