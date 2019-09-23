import { Service } from "typedi";
import { Media } from "../media-services/media";
import { MediaServiceDiscovery } from "../media-services/media-service-discovery";
import { CastDiscovery } from "./cast-discovery";

@Service()
export class CastPlayer {
    constructor(private castDiscovery: CastDiscovery, private mediaServiceDiscovery: MediaServiceDiscovery) {}

    async playMedia(playerId: string, media: string) {
        const player = this.castDiscovery.getPlayer(playerId);
    }
}
