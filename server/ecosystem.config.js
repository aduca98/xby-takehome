module.exports = {
    apps: [
        {
            name: "xby_take_home",
            script: "npm run start",
            instances: process.env.WEB_CONCURRENCY,
        },
    ],
};
