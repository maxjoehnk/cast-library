import { ContentType, Get, JsonController, Param } from "routing-controllers";
import { MediaServiceDiscovery } from "../media-services/media-service-discovery";
import { deserializeCursor } from "../cursor";

@JsonController("/coverart")
export class CoverartController {
    constructor(private mediaServiceDiscovery: MediaServiceDiscovery) {}

    @Get("/:id")
    getCoverart(@Param("id") id: string) {
        const [provider, identifier] = deserializeCursor(id);
        const service = this.mediaServiceDiscovery.getProvider(provider);
        return service.getCoverart(identifier);
    }
}
