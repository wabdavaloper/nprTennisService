const validator = require('validator');
const { Pool } = require('pg');
const AuthDbData = require('../../db/connect_db.json');
const pool = new Pool(AuthDbData);
const db = require('../../db/db');

pool.connect();

const getScoresWinnersLossers = async (winnerId, losserId) => {
  const res = await pool.query(db.getScoresWinnerAndLossers(winnerId, losserId));
  console.log(res.rows[0].score, res.rows[1].score)
  const defaultWinnerScore = res.rows[0].score + (100 - (res.rows[0].score - res.rows[1].score)) / 10;
  const defaultLosserScore = res.rows[1].score - (100 - (res.rows[0].score - res.rows[1].score)) / 20;
  return { defaultWinnerScore, defaultLosserScore };
}

const insertMatch = async (winnerId, winnerScore, losserId, losserScore) => {
  await pool.query(db.calculateScoreForWinner(winnerId, winnerScore));
  await pool.query(db.calculateScoreForLosser(losserId, losserScore));
  await pool.query(db.createMatch(winnerId, losserId));
}

/**
* Расчет очков по результату матча и создание записи в БД о матче
* @param {string} winnerId - Айди победителя матча
* @param {string} losserId - Айди проигравшего в матче
* @returns {string} Возвращает строку с ошибкой и рекомендацией, либо строку с участниками и их расчитанные очки
* Рейтинг для выигравшего игрока (РВ) определяется по формуле:
* РВ = РТВ + (100 – (РТВ – РТП)) / 10. 50 + (100 - (50 - 50)) / 10 = 60
* Рейтинг для проигравшего игрока (РП) определяется по формуле:
* РП = РТП - (100 – (РТВ – РТП)) / 20. 50 - (100 - (50 - 50)) / 20 = 45
* где РТВ - текущий рейтинг выигравшего игрока, РТП - текущий рейтинг проигравшего игрока
*/
const createNewMatches = async (winnerId, losserId, winnerPoints, losserPoints) => {
    console.log('winnerPoints', winnerPoints);
    console.log('losserPoints', losserPoints);
    if (!winnerId || !losserId) {
        console.log('Необходимо заполнить никнейм победившего участника и проигравшего');
        return 'Необходимо заполнить никнейм победившего участника и проигравшего';
    } 
    else if ( (winnerPoints.toString() == '') || (losserPoints.toString() == '') )
    {
        console.log('Необходимо заполнить счет у обоих игроков');
        return 'Необходимо заполнить счет у обоих игроков';   
    }
    else if (
        !(
            (winnerPoints == 2 && losserPoints == 1) ||
            (winnerPoints == 2 && losserPoints == 0) ||
            (losserPoints == 2 && winnerPoints == 1) ||
            (losserPoints == 2 && winnerPoints == 0)
        )
    ) {
        console.log('Счет матча заполнен некорректно.');
        return 'Счет матча заполнен некорректно.';
    }
    else if (winnerId === losserId) {
        console.log('Необходимо выбрать двух разных игроков');
        return 'Необходимо выбрать двух разных игроков';  
    }
    else if (isNaN(winnerPoints) || isNaN(losserPoints)) {
        console.log('Некорректно заполнен счет игроков');
        return 'Некорректно заполнен счет игроков';
    } 
    else if (isNaN(parseInt(winnerId)) || isNaN(parseInt(losserId))) {
        console.log('Некорректно заполнен счет игроков');
        return 'Некорректно заполнен счет игроков';
    } else {
        try {
            await pool.query('BEGIN');
            const {
                defaultWinnerScore,
                defaultLosserScore
            } = await getScoresWinnersLossers(winnerId, losserId);
            await insertMatch(winnerId, defaultWinnerScore, losserId, defaultLosserScore);
            console.log(`Created new match winner: ${winnerId}, score: ${defaultWinnerScore}, losser: ${losserId}, score: ${defaultLosserScore}`);
            await pool.query('COMMIT');
            return `MATCH_CREATED`;
        } catch (err) {
            console.log(err)
            await pool.query('ROLLBACK');
            return false;
        } 
    }
}

module.exports = { createNewMatches };