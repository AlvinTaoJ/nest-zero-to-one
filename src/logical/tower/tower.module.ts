import { Module } from '@nestjs/common';
import { TowerService } from './tower.service'
import { TowerController } from './tower.controller'

@Module({
  controllers: [TowerController],
  providers: [TowerService]
})
export class TowerModule {}

