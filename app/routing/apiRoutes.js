var chars = require("../data/characters");
var input = [];

module.exports = function (app) {
    app.get("/api/characters", function (req, res) {
        res.json(chars);
    });

    app.post("/api/characters", function (req, res) {

        var difference = 0;
        var userTotal = 0;
        var charScoreTotals = [];
        var scoreTotal = 0;
        var match = {};
        var smallestVal = 100;
        
        console.log(req.body);
        
        for (var i = 0; i <= chars.length; i++) {
            userTotal += parseInt(req.body.scores[i]);
        }

        for (var i = 0; i < chars.length; i++) {
            for (var j = 0; j < 10; j++) {
                scoreTotal += chars[i].scores[j];
            }
            charScoreTotals.push(scoreTotal);
            scoreTotal = 0;
        }
       console.log(charScoreTotals);

        for (var i = 0; i < charScoreTotals.length; i++){
           difference = Math.abs(userTotal - charScoreTotals[i]);
            if (difference < smallestVal){
                smallestVal = difference;
                match = chars[i];
            }
        }
        res.json(match);
    });
}
