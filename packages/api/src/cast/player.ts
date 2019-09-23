import { Client, DefaultMediaReceiver } from "castv2-client";

export class Player {
    private client;

    get id() {
        return this.device.name;
    }

    constructor(private device) {
        this.client = new Client();
        this.client.on("error", err => console.error(err));
        this.client.connect(device.addresses[0], this.onConnect);
    }

    serialize() {
        return {
            name: this.device.txtRecord.fn,
            id: this.id
        };
    }

    private onConnect = () => {
        this.client.on("status", this.onStatus);
        this.client.getStatus((err, status) => {
            if (err) {
                console.error(err);
                return;
            }
            return this.onStatus(status);
        });
    };

    private onStatus = status => {
        // if (status.applications) {
        //     this.client.join(status.applications[0], DefaultMediaReceiver, (err, app) => {
        //         if (err) {
        //             return console.error(err);
        //         }
        //
        //         app.getStatus((err, appStatus) => {
        //             if (err) {
        //                 return console.error(err);
        //             }
        //             appStatus && this.onMedia(appStatus);
        //         });
        //         setInterval(() => {
        //             app.getStatus((err, appStatus) => {
        //                 if (err) {
        //                     return console.error(err);
        //                 }
        //                 appStatus && this.onMedia(appStatus);
        //             });
        //         }, 1000);
        //         app.on('status', appStatus => this.onMedia(appStatus));
        //         console.trace(app, 'Running Application');
        //     });
        // }
    };

    private onMedia = status => {};
}
