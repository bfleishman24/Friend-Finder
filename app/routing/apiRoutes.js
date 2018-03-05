// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require('../data/friends.js');


// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  // GET route for /api/friends returns friendData.
  app.get('/api/friends', function(req, res) {
      res.json(friendData);
  });

  // POST route for /api/friends
  app.post('/api/friends', function(req, res) {
      var thisUser = req.body;

      var differences = [];

      if (friendData.length > 1) {

          friendData.forEach(function(user) {
              var totalDifference = 0;

              for (var i = 0; i < thisUser.scores.length; i++) {
                  var otherAnswer = user.scores;
                  var thisAnswer = thisUser.scores;
                  var difference = parseInt(otherAnswer) - parseInt(thisAnswer);
                  var totalDifference = Math.abs(difference);
                  console.log(totalDifference);
                  break;
              }
              differences.push(totalDifference);
          });

          // Find the minimum difference score.
          var minimumDifference = Math.min.apply(null, differences);

          var bestMatches = [];

          for (var i = 0; i < differences.length; i++) {
              if (differences[i] === minimumDifference) {
                  bestMatches.push(friendData[i]);
              }
          }
          res.json(bestMatches);
      } else {
          res.json(friendData);
      }
      friendData.push(thisUser);
  });
};