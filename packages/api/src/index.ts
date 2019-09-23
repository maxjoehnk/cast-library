import 'dotenv/config'
import 'reflect-metadata';
import { Container } from 'typedi';
import { createExpressServer, useContainer } from 'routing-controllers';
import { LibraryController } from './controllers/library.controller';
import { CastDiscovery } from './cast/cast-discovery';
import { PlayerController } from './controllers/player.controller';
import { CoverartController } from './controllers/coverart.controller';

useContainer(Container);

const app = createExpressServer({
    controllers: [
        LibraryController,
        PlayerController,
        CoverartController
    ],
    routePrefix: 'api'
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on Port ${port}`));

const discovery = Container.get(CastDiscovery);
discovery.discover();