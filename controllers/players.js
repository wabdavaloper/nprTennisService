const express = require('express');
const Log = require('../log/Log');
const log = new Log('./log.txt', 'DEBUG');
const players = express();
const playerLogic = require('../logic/players/playersLogic');

/**
 * @swagger
 * /api/players/all:
 *  get:
 *      summary: Получаем и отдаем список всех игроков
 *      description: Получаем и отдаем список всех игроков
 *      responses:
 *          200:
 *              description: Список всех игроков
 */
players.get('/all', async (req, res) => {
    log.writeLog(req.method, req.path, req.body);

    try {
        console.log('success');
        return res.json({msg: await playerLogic.getAllPlayersInfo()}).status(200);
    } catch {
        return res.json({msg: err}).status(401);
    }

});

module.exports = players;