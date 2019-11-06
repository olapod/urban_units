var fs = require("fs");
import fixed_units from './src/UnitsContainer';
var sampleObject = fixed_units;

fs.writeFile("./jednostki_fix.json", JSON.stringify(sampleObject), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

//komenda node -r esm saveData.js