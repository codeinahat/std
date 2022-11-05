const { createReadStream, createWriteStream, rmdir } = require('fs');


const readPackageJson = createReadStream("./package.json");
const disPackageJson = createWriteStream("./dis/package.json");

disPackageJson.on("finish", _ => console.log("build >> copied package.json"))

readPackageJson.pipe(disPackageJson);


const readLicense = createReadStream("./LICENSE");
const disLisence = createWriteStream("./dis/LICENSE");


disLisence.on('finish', _ => console.log("build >> copied LICENSE"))

readLicense.pipe(disLisence);
