// vite.config.js
export default {
    ssr: {
        noExternal: ['node:async_hooks']
    }
};
