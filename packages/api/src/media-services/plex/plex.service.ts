import { Service } from 'typedi';
import { MEDIA_SERVICE } from '../media-service-token';
import { MediaService } from '../media-service';
import { serializeCursor } from '../../cursor';
import { parse } from 'url';

const PlexApi = require('plex-api');

const clientFactory = () => {
    const url = process.env.PLEX_HOST;
    const {
        hostname,
        port,
        protocol
    } = parse(url);
    const api = new PlexApi({
        hostname,
        https: protocol === 'https:',
        port,
        token: process.env.PLEX_TOKEN,
        options: {
            identifier: process.env.PLEX_IDENTIFIER,
            product: 'Cast Library',
            version: '1.0',
            deviceName: 'Cast Library Server'
        }
    });
    return new PlexService(api);
};

@Service({factory: clientFactory, id: MEDIA_SERVICE, multiple: true})
export class PlexService implements MediaService {
    readonly provider = 'plex';

    constructor(private api) {
    }

    async getLibrary() {
        const res = await this.api.query('/library/sections');

        const libraries = res.MediaContainer.Directory.map(async d => ({
            title: d.title,
            type: getType(d.type),
            language: d.language,
            id: buildPlexId(d),
            provider: 'plex',
            media: await this.getAllMedia(d.key)
        }));
        return await Promise.all(libraries);
    }

    async getAllMedia(identifier: string) {
        const res = await this.api.query(`/library/sections/${identifier}/albums`);

        const media = (res.MediaContainer.Metadata || []).map(m => ({
            title: m.title,
            id: buildPlexMediaId(m),
            genres: (m.Genre || []).map(g => g.tag),
            artist: m.parentTitle,
            cover: `/api/coverart/${serializeCursor('plex', m.thumb)}`
        }));

        return media;
    }

    getCoverart(url: string) {
        return this.api.query(url);
    }
}

export enum MediaType {
    Movies,
    Music,
    Pictures,
    TvShows
}

const typeDictionary = {
    movie: MediaType.Movies,
    artist: MediaType.Music
};

function getType(plexType: string): MediaType {
    return typeDictionary[plexType];
}

function buildPlexId(directory): string {
    return serializeCursor('plex', directory.key);
}

function buildPlexMediaId(metadata): string {
    return serializeCursor('plex', metadata.ratingKey);
}
