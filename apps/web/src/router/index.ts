import { Role } from '@virtual-trader/shared';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { AuthMeta, useAuthGuard } from './guards';
import { routes } from './routes';

declare module 'vue-router' {
    export interface RouteMeta {
        auth: AuthMeta;
        roles?: Role[];
    }
}

const router = createRouter({
    history:
        import.meta.env.VITE_DEV_MODE === 'electron'
            ? createWebHashHistory(import.meta.env.BASE_URL)
            : createWebHistory(import.meta.env.BASE_URL),
    routes,
});

useAuthGuard(router);

export default router;
