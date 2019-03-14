const app = require('./src/app');
const PORT = process.env.PORT || 1337;

app.listen(PORT, () =>
    console.log(`Server listening on port: ${PORT}`));
