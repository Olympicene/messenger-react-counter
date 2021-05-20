var path = require("path");
const fs = require("fs");

var writeFileName = 'reactions.json'
var database = JSON.parse(fs.readFileSync(writeFileName));

for (var name in database) {
    var person = database[name];

    var emoji_total = 0;

    for (var j in person) {
        var emoji_count = person[j]

        emoji_total += emoji_count;
    }

    console.log(name + ': ' + emoji_total)
}