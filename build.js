const fs = require('fs');

fs.rename("./build/RELEASE.env", "./build/.env", (err) => {
    console.error(err);
});
