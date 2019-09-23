import { Media } from "./media";

export interface MediaService {
    readonly provider: string;

    getLibrary();

    getAllMedia(identifier: string);

    getCoverart?(identifier: string);
}
