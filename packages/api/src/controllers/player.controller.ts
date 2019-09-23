import { Get, JsonController, Param, Post } from "routing-controllers";
import { CastDiscovery } from "../cast/cast-discovery";
import { CastPlayer } from "../cast/cast-player";
import { MediaServiceDiscovery } from "../media-services/media-service-discovery";

@JsonController("/player")
export class PlayerController {
    constructor(private castDiscovery: CastDiscovery, private castPlayer: CastPlayer) {}

    @Get()
    getPlayer() {
        return this.castDiscovery.getDevices();
    }

    @Post("/:player/play/:media")
    async playMedia(@Param("player") player: string, @Param("media") media: string) {
        this.castPlayer.playMedia(player, media);
    }
}
