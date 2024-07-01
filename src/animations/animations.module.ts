import { Module } from '@nestjs/common';
import { AnimationsResolver } from './animations.resolver';
import { AnimationsService } from './animations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animation } from './entities/animation.entity';

@Module({
  providers: [AnimationsResolver, AnimationsService],
  imports: [TypeOrmModule.forFeature([Animation])],
})
export class AnimationsModule {}
