var fs = require("fs");
import lack from './src/AppContainer';
var sampleObject = lack;

fs.writeFile("./problem.json", JSON.stringify(sampleObject), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

//komenda node -r esm saveData.js