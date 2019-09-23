import { Get, JsonController, Param } from "routing-controllers";
import { MediaServiceDiscovery } from "../media-services/media-service-discovery";
import { deserializeCursor } from "../cursor";

function fromBase64(id: string) {
    return Buffer.from(id, "base64").toString();
}

@JsonController("/library")
export class LibraryController {
    constructor(private serviceDiscovery: MediaServiceDiscovery) {}

    @Get()
    async getLibrary() {
        const services = this.serviceDiscovery.getAllServices();

        const results = await Promise.all(services.map(service => service.getLibrary()));

        return results.reduce((a, b) => [...a, ...b], []);
    }

    @Get("/:id")
    async getMedia(@Param("id") id: string) {
        const [provider, identifier] = deserializeCursor(id);
        const service = this.serviceDiscovery.getProvider(provider);
        const media = await service.getAllMedia(identifier);

        return media;
    }
}
