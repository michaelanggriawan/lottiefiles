import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animation } from './entities/animation.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class AnimationsService {
  constructor(
    @InjectRepository(Animation)
    private animationRepository: Repository<Animation>,
  ) {}
  getAnimations(searchTerm?: string) {
    if (searchTerm) {
      return this.animationRepository.find({
        where: [
          { title: Like(`%${searchTerm}%`) },
          { author: Like(`%${searchTerm}%`) },
        ],
      });
    }
    const animations = this.animationRepository.find();
    return animations;
  }
  getAnimationById(id: number) {
    const animation = this.animationRepository.findOneBy({
      id,
    });

    return animation;
  }
  uploadAnimation(animationData: {
    title: string;
    source: string;
    author: string;
  }) {
    const animation = this.animationRepository.create(animationData);
    return this.animationRepository.save(animation);
  }
}
