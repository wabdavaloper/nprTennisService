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
 *       400:
 *         description: Некорректный запрос
 *       500:
 *         description: Внутренняя ошибка сервера
 */
matches.post('/', async (req, res) => {
  log.writeLog(req.method, req.path, req.body);
  console.log(req.body);
  try {
    const result = await matchLogic.createNewMatches(req.body.winnerId, req.body.losserId);
	  
    if (!result) {
      console.log('400', result);
		  return res.status(400).json({msg: 'Некорректный запрос'})
    } else {
      console.log('200', result);
		  return res.status(200).json({msg: result});
	  } 
  } catch (err) {
    log.writeLog('ERROR', req.path, err.message);
    return res.status(500).json({msg: 'Internal server error'});
  }
});

module.exports = matches;