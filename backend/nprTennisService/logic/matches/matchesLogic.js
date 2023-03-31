// бесполезная функция. пока что. тут запрос к БД будет
const getScoresWinnersLossers = (winnerNickname, losserNickname) => {
	return {
		defaultWinnerScore: 50,
		defaultLosserScore: 50
	}
}

/**
* Расчет очков по результатам матча и создание записи в БД о матче
* @param {string} winnerNickname - Никнейм победителя матча
* @param {string} losserNickname - Никнейм проигравшего в матче
* @returns {string} Возвращает строку с ошибкой и рекомендацией, либо строку с участниками и их расчитанные очки
* Рейтинг для выигравшего игрока (РВ) определяется по формуле:
* РВ = РТВ + (100 – (РТВ – РТП)) / 10
* Рейтинг для проигравшего игрока (РП) определяется по формуле:
* РП = РТП - (100 – (РТВ – РТП)) / 20
* где РТВ - текущий рейтинг выигравшего игрока, РТП - текущий рейтинг проигравшего игрока
*/
const createNewMatches = (winnerNickname, losserNickname) => {
	let { defaultWinnerScore , defaultLosserScore } = getScoresWinnersLossers(winnerNickname, losserNickname);
	if (winnerNickname === undefined && losserNickname === undefined) {
		console.log('Необходимо заполнить никнейм победившего участника и проигравшего');
		return 'Необходимо заполнить никнейм победившего участника и проигравшего';
	} 
	else if ( winnerNickname === undefined ) {
		console.log('Необходимо заполнить никнейм победившего участника');
		return 'Необходимо заполнить никнейм победившего участника';	
	}
	else if ( losserNickname === undefined ) {
		console.log('Необходимо заполнить никнейм проигравшего участника');
		return 'Необходимо заполнить никнейм проигравшего участника';	
	}
	else {
		defaultWinnerScore += defaultWinnerScore + (100 - (defaultWinnerScore - defaultLosserScore)) / 20;
		defaultLosserScore += defaultLosserScore - (100 - (defaultWinnerScore - defaultLosserScore)) / 20;
		console.log(`Created new match winner: ${winnerNickname}, score: ${defaultWinnerScore}, losser: ${losserNickname}, score: ${defaultLosserScore}`);
		return `Created new match winner: ${winnerNickname}, score: ${defaultWinnerScore}, losser: ${losserNickname}, score: ${defaultLosserScore}`;
	}

}

module.exports = { createNewMatches }