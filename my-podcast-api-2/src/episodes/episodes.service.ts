import { Injectable } from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { randomUUID } from 'crypto';
import { CreateEpisodeDto } from './dto/create-episode.dto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  findAll(sort: 'asc' | 'desc' = 'asc') {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  findOne(id: string) {
    return this.episodes.find((episode) => episode.id === id);
  }

  create(CreateEpisodeDto: CreateEpisodeDto) {
    const newEpisode = { ...CreateEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);

    return newEpisode;
  }
}
