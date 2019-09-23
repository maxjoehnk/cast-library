import { Service } from 'typedi';
import { MEDIA_SERVICE } from '../media-service-token';
import { MediaService } from '../media-service';
import { serializeCursor } from '../../cursor';

const got = require('got');

const token = process.env.ZDF_MEDIATHEK_TOKEN;
const shows = [
    {
        id: 'neomagazinroyale',
        title: 'NEO MAGAZIN ROYALE',
        genre: 'comedy'
    },
    {
        id: 'heuteshow',
        title: 'heute-show',
        genre: 'comedy'
    }
];

@Service({id: MEDIA_SERVICE, multiple: true})
export class ZdfMediathekService implements MediaService {
    readonly provider = 'zdf';

    async getLibrary() {
        return await Promise.all(shows.map(async show => ({
            title: show.title,
            id: getZdfShowId(show),
            type: 3,
            provider: 'zdf',
            language: 'de',
            media: await this.getAllMedia(`${show.genre}/${show.id}`)
        })));
    }

    async getAllMedia(identifier: string) {
        const [genre, show] = identifier.split('/');
        const url = `content/documents/zdf/${genre}/filter-${show}-beitraege-100.json`;
        const res = await this.fetch(url);

        const episodes = res.body.resultsWithVideo['http://zdf.de/rels/search/results']
            .map(r => r['http://zdf.de/rels/target'])
            .filter(r => r.contentType === 'episode')
            .map(r => ({
                title: r.mainVideoContent['http://zdf.de/rels/target'].title,
                id: buildZdfEpisodeId(r),
                genres: [r['http://zdf.de/rels/category'].title],
                artist: r['http://zdf.de/rels/brand'].title,
                cover: r.teaserImageRef.layouts.original
            }));

        return episodes;
    }

    private fetch(url: string) {
        return got(url, {baseUrl: 'https://api.zdf.de', json: true, headers: {'Api-Auth': `Bearer ${token}`}});
    }
}

function getZdfShowId(show): string {
    return serializeCursor('zdf', `${show.genre}/${show.id}`);
}

function buildZdfEpisodeId(episode): string {
    return serializeCursor('zdf', episode.id);
}
