module.exports = {
    apps: [
        {
            name: "todo-share",
            script: "./src/server.js",
            env_production: {
                "NODE_ENV": "production"
            }
        },
    ]
}
