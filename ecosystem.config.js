module.exports = {
    apps: [
        {
            name: "todo-share",
            script: "./server.js",
            env_production: {
                "NODE_ENV": "production"
            }
        },
    ]
}
