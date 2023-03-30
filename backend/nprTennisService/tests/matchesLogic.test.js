var assert = require('assert');

const matchesLogic = require('../logic/matches/matchesLogic');

describe('Тест бизнес логики взаимодействия с матчами', () => {

	it('Положительная проверка. Заполнение победителя и проигравшего', () => {
		const realEquals = matchesLogic.createNewMatches('Denis', 'Dima');
		assert.equal(realEquals, 'Created new match winner: Denis, losser: Dima');
	});

	it('Негативная проверка. Заполнение победителя без проигравшего', () => {
		const realEquals = matchesLogic.createNewMatches('Denis', undefined);
		assert.equal(realEquals, 'Необходимо заполнить никнейм проигравшего участника');
	});

	it('Негативная проверка. Заполнение проигравшего без победителя', () => {
		const realEquals = matchesLogic.createNewMatches(undefined, 'Dima');
		assert.equal(realEquals, 'Необходимо заполнить никнейм победившего участника');
	});

	it('Негативная проверка. Поля полностью не заполнены', () => {
		const realEquals = matchesLogic.createNewMatches(undefined, undefined);
		assert.equal(realEquals, 'Необходимо заполнить никнейм победившего участника и проигравшего');
	});

});
