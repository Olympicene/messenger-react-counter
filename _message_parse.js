var path = require("path");
const fs = require("fs");


////////////////////////////////////////////////////////////STUP////////////////////////////////////////////////////////////

var writeFileName = 'reactions.json'

const databaseDir = path.resolve(__dirname + "/database/");
fs.writeFileSync(writeFileName, '{}', function(){console.log(`wiped ${writeFileName} \n`)})
const length = fs.readdirSync(databaseDir).length

////////////////////////////////////////////////////////////WORK////////////////////////////////////////////////////////////

var database = JSON.parse(fs.readFileSync(writeFileName));



for (var i = 1; i <= length; i++) {

    console.log(i)
    var file = JSON.parse(fs.readFileSync(databaseDir + `/message_${i}.json`));

    for (var j in file.messages) {

        var message = file.messages[j]

        if ('reactions' in message) {

            if (!(message.sender_name in database)) {
                database[message.sender_name] = {};
            }

            for (var k in message.reactions) {

                //console.log(decode_utf8(message.reactions[j].reaction))
                var react = decode_utf8(message.reactions[k].reaction)

                if (!(react in database[message.sender_name])) {
                    database[message.sender_name][react] = 1
                } else {
                    database[message.sender_name][react] += 1
                }
            }
        }
    }
}
////////////////////////////////////////////////////////////WRITE////////////////////////////////////////////////////////////

fs.writeFile(writeFileName, JSON.stringify(database, null, '\t'), (err) => {
    if (err) return console.error(err);
});

////////////////////////////////////////////////////////////HELPERS////////////////////////////////////////////////////////////


function cleanString(input) {
    var output = "";
    for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
  }
