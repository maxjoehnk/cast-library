import { Service } from "typedi";
import { Player } from "./player";

const mdns = require("mdns");

@Service()
export class CastDiscovery {
    private players: Player[] = [];

    getPlayer(id: string) {
        return this.players.find(d => d.id === id);
    }

    getDevices() {
        return this.players.map(player => player.serialize());
    }

    discover() {
        const resolverSequence = [
            mdns.rst.DNSServiceResolve(), // eslint-disable-line new-cap
            "DNSServiceGetAddrInfo" in mdns.dns_sd
                ? mdns.rst.DNSServiceGetAddrInfo() // eslint-disable-line new-cap
                : mdns.rst.getaddrinfo({ families: [4] }),
            mdns.rst.makeAddressesUnique()
        ];
        const browser = mdns.createBrowser(mdns.tcp("googlecast"), {
            resolverSequence
        });
        browser.on("serviceUp", service => {
            console.log(`Found ${service.txtRecord.fn}`);
            this.players.push(new Player(service));
        });
        browser.on("serviceDown", service => {
            console.log(`Lost ${service}`);
            this.players = this.players.filter(s => s.id !== service);
        });
        browser.start();
    }
}
