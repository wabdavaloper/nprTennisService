const express = require('express');
const Log = require('../log/Log');
const log = new Log('./log.txt', 'DEBUG');
const matchLogic = require('../logic/matches/matchesLogic')

const matches = express();

/**
 * @swagger
 * /api/matches:
 *  post:
 *   summary: Создание с результатами нового матча между двумя игроками
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           required:
 *             - winnerNickname
 *             - losserNickname
 *           properties:
 *             winnerNickname:
 *               type: string
 *               description: Никнейм победителя
 *             losserNickname:
 *               type: string
 *               description: Никнейм проигравшего
 *   description: Создание с результатами нового матча между двумя игроками
 *   responses:
 *       200:
 *         description: Успешное создание матча
 */
matches.post('/', (req, res) => {
	log.writeLog(req.method, req.path, req.body);
	const result = matchLogic.createNewMatches(req.body.winnerNickname.toString(), req.body.losserNickname.toString());
	res.json({msg: result}).status(200);
});

module.exports = matches;