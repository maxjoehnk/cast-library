import { Token } from "typedi";
import { MediaService } from "./media-service";

export const MEDIA_SERVICE = new Token<MediaService>("media-service");
