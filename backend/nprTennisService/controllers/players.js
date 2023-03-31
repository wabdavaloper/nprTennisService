const express = require('express');
const Log = require('../log/Log');
const log = new Log('./log.txt', 'DEBUG');
const players = express();

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
players.get('/all', (req, res) => {
    const msg = 
        [
            {
                nickName: 'asdsad',
                firstName: 'asdasd',
                lastName: 'asdasdsdasdasd'
            },
            {
                nickName: 'asdsad',
                firstName: 'asdasd',
                lastName: 'asdasdsdasdasd'
            }
        ];
    log.writeLog(req.method, req.path, req.body);
	res.json(msg).status(200);
});

module.exports = players;