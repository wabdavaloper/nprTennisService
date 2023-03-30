const express = require('express');
const matchLogic = require('../logic/matches/matchesLogic')

const matches = express();

matches.post('/', (req, res) => {
	if (matchLogic.createNewMatches(req.body.winnerNickname, req.body.losserNickname)) {
		res.json({msg: `Created new match winner: ${req.body.winnerNickname}, losser: ${req.body.losserNickname}`}).status(200);
	}
});

module.exports = matches;