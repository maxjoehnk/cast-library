import { DefaultMediaReceiver } from 'castv2-client';

export class PlexApplication extends DefaultMediaReceiver {
    static APP_ID = '9AC194DC';

    playMedia(id, contentType) {
        const media = {
            contentId: id,
            contentType,
            streamType: 'BUFFERED'
        };
        // @ts-ignore
        this.load(media);
    }
}
