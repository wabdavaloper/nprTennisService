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
const createNewMatches = async (winnerId, losserId) => {


    if (!winnerId || !losserId) {
        console.log('Необходимо заполнить никнейм победившего участника и проигравшего');
        return 'Необходимо заполнить никнейм победившего участника и проигравшего';
    } else if (!winnerId) {
        console.log('Необходимо заполнить никнейм победившего участника');
        return 'Необходимо заполнить никнейм победившего участника';
    } else if (!losserId) {
        console.log('Необходимо заполнить никнейм проигравшего участника');
        return 'Необходимо заполнить никнейм проигравшего участника';
    } else if (isNaN(parseInt(winnerId)) || isNaN(parseInt(losserId))) {
        console.log('Некорректный запрос');
        return 'Некорректный запрос';
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
            return `Created new match winner: ${winnerId}, score: ${defaultWinnerScore}, losser: ${losserId}, score: ${defaultLosserScore}`;
        } catch (err) {
            console.log(err)
            await pool.query('ROLLBACK');
            return false;
        } finally {
            await pool.end();
        }
    }
}

module.exports = { createNewMatches };