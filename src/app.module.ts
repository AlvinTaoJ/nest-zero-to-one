import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './logical/auth/auth.module';
import { CommodityService } from './logical/commodity/commodity.service';
import { CommodityController } from './logical/commodity/commodity.controller';
import { PlayerController } from './logical/player/player.controller';
import { PlayerModule } from './logical/player/player.module';
import { TowerModule } from './logical/tower/tower.module';

@Module({
  imports: [PlayerModule, AuthModule, TowerModule],
  controllers: [AppController, CommodityController, PlayerController],
  providers: [AppService, CommodityService],
})
export class AppModule {}
