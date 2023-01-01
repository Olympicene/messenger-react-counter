var path = require("path");
const fs = require("fs");

var writeFileName = 'reactions.json'
var database = JSON.parse(fs.readFileSync(writeFileName));

var total_database = []

for (var name in database) {
    var person = database[name];

    var emoji_total = 0;

    for (var j in person) {
        var emoji_count = person[j]


        //emoji_total += emoji_count;
        if(j == '👎') {
            emoji_total -= emoji_count;
        } else {
            emoji_total += emoji_count;
        }
    }

    total_database.push({'name': name, 'count': emoji_total})
}

total_database.sort((a,b) => b.count - a.count);

for(person of total_database) {
    console.log(`${person.name} : ${person.count}`);
}