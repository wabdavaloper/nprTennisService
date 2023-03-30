const createNewMatches = (winnerNickname, losserNickname) => {
	if (winnerNickname === undefined && losserNickname === undefined) {
		console.log('Необходимо заполнить никнейм победившего участника и проигравшего');
		return 'Необходимо заполнить никнейм победившего участника и проигравшего';
	} else {
		const result = `Created new match winner: ${winnerNickname}, losser: ${losserNickname}`;
		console.log(`Created new match winner: ${winnerNickname}, losser: ${losserNickname}`);
		return result;
	}

}

module.exports = { createNewMatches }