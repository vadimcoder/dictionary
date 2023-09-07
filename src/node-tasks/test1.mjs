import fs from "fs";

let rr2Json = fs.readFileSync("./rr2.json");
let rr2 = JSON.parse(rr2Json);

rr2[0].groupName = "asdfsdf";

let data = JSON.stringify(rr2, null, 2);

fs.writeFileSync("./rr3.json", data);
