import { Service, InjectMany } from "typedi";
import { MEDIA_SERVICE } from "./media-service-token";
import { MediaService } from "./media-service";
import "./plex/plex.service";
import "./zdf/zdf-mediathek.service";

@Service()
export class MediaServiceDiscovery {
    constructor(@InjectMany(MEDIA_SERVICE) private services) {}

    getAllServices(): MediaService[] {
        return this.services;
    }

    getProvider(provider: string): MediaService {
        return this.services.find(service => service.provider === provider);
    }
}
