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
 *             - winnerId
 *             - losserId
 *           properties:
 *             winnerId:
 *               type: string
 *               description: Айди победителя
 *             losserId:
 *               type: string
 *               description: Айди проигравшего
 *   description: Создание с результатами нового матча между двумя игроками
 *   responses:
 *       200:
 *         description: Успешное создание матча
 */
matches.post('/', async (req, res) => {
	log.writeLog(req.method, req.path, req.body);
	try {
		res.json({msg: await matchLogic.createNewMatches(req.body.winnerId.toString(), req.body.losserId.toString())}).status(200);
	  } catch (err) {
	  
		res.json({msg: err}).status(401);
	  
	  }
});

module.exports = matches;