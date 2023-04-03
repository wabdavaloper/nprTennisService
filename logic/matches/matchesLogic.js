const validator = require('validator');
const { Client } = require('pg');
const AuthDbData = require('../../db/connect_db.json');
const client = new Client(AuthDbData);
const db = require('../../db/db');

client.connect();

// бесполезная функция. пока что. тут запрос к БД будет
// https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666338130_51-mykaleidoscope-ru-p-ulibka-negra-instagram-57.jpg
const getScoresWinnersLossers = async (winnerId, losserId) => {

	const res = await client.query(db.getScoresWinnerAndLossers(winnerId, losserId));
	console.log(res.rows[0].score, res.rows[1].score)
	return {
		defaultWinnerScore: 
			res.rows[0].score + (100 - (res.rows[0].score - res.rows[1].score)) / 10,
		defaultLosserScore: 
			res.rows[1].score - (100 - (res.rows[0].score - res.rows[1].score)) / 20
	}
}

const insertMatch = async (winnerId, winnerScore, losserId, losserScore) => {
	await client.query(db.calculateScoreForWinner(winnerId, winnerScore));
	await client.query(db.calculateScoreForLosser(losserId, losserScore));
	await client.query(db.createMatch(winnerId, losserId));
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
	
	if (winnerId === undefined && losserId === undefined) {
		console.log('Необходимо заполнить никнейм победившего участника и проигравшего');
		return 'Необходимо заполнить никнейм победившего участника и проигравшего';
	} 
	else if ( winnerId === undefined ) {
		console.log('Необходимо заполнить никнейм победившего участника');
		return 'Необходимо заполнить никнейм победившего участника';	
	}
	else if ( losserId === undefined ) {
		console.log('Необходимо заполнить никнейм проигравшего участника');
		return 'Необходимо заполнить никнейм проигравшего участника';	
	}
	else {
		let { defaultWinnerScore , defaultLosserScore } = await getScoresWinnersLossers(winnerId, losserId);
		//defaultWinnerScore += defaultWinnerScore + (100 - (defaultWinnerScore - defaultLosserScore)) / 20;
		//defaultLosserScore += defaultLosserScore - (100 - (defaultWinnerScore - defaultLosserScore)) / 20;
		await insertMatch(winnerId, defaultWinnerScore, losserId, defaultLosserScore);
		
		console.log(`Created new match winner: ${winnerId}, score: ${defaultWinnerScore}, losser: ${losserId}, score: ${defaultLosserScore}`);
		
		return `Created new match winner: ${winnerId}, score: ${defaultWinnerScore}, losser: ${losserId}, score: ${defaultLosserScore}`;
	}

}

module.exports = { createNewMatches }