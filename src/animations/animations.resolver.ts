import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Animations } from './models/animations';
import { AnimationsService } from './animations.service';
import { AddAnimationDto } from './dtos/input/upload-animations.dto';
import { join } from 'path';
import * as fs from 'fs';
import * as util from 'util';
import * as mime from 'mime-types';
import { GetAnimationArgs } from './dtos/args/get-animation.args';
import { GetAnimationsArgs } from './dtos/args/get-animations.args';

const readFile = util.promisify(fs.readFile);

@Resolver(() => Animations)
export class AnimationsResolver {
  constructor(private readonly animationsService: AnimationsService) {}

  @Query(() => [Animations])
  async getAnimations(
    @Args() getAnimationsArgs: GetAnimationsArgs,
  ): Promise<Animations[]> {
    const { searchTerm } = getAnimationsArgs;
    return this.animationsService.getAnimations(searchTerm);
  }

  @Query(() => Animations)
  async getAnimation(
    @Args() getAnimationArgs: GetAnimationArgs,
  ): Promise<Animations> {
    const { id } = getAnimationArgs;
    return this.animationsService.getAnimationById(id);
  }

  @Mutation(() => Animations)
  async addAnimations(
    @Args('addAnimationsData') addAnimationsData: AddAnimationDto,
  ): Promise<Animations> {
    const { file, title, author } = addAnimationsData;
    const { createReadStream, filename, mimetype } = await file;

    // Validate the file type
    if (
      mimetype !== 'application/json' ||
      mime.extension(mimetype) !== 'json'
    ) {
      throw new Error('Invalid file type. Only JSON files are allowed.');
    }

    // Save the file temporarily to read its content
    const filePath = join(process.cwd(), 'uploads', filename);
    await new Promise((resolve, reject) => {
      createReadStream()
        .pipe(fs.createWriteStream(filePath))
        .on('finish', resolve)
        .on('error', reject);
    });

    // Read the file content
    const fileContent = await readFile(filePath, 'utf8');

    const JSONData = JSON.parse(fileContent);
    const JSONString = JSON.stringify(JSONData);
    // Optionally delete the file after reading its content
    fs.unlinkSync(filePath);

    return this.animationsService.uploadAnimation({
      source: JSONString,
      title,
      author,
    });
  }
}
