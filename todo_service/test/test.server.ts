import { envs } from '../src/config'
import { AppRoutes, Server } from '../src/presentation'

export const testServer = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
})