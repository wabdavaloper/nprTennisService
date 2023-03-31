var assert = require('assert');

const matchesLogic = require('../logic/matches/matchesLogic');

describe('Тест бизнес логики взаимодействия с матчами', () => {

	it('Положительная проверка. Заполнение победителя и проигравшего', () => {
		const realEquals = matchesLogic.createNewMatches('Denis', 'Dima');
		assert.equal(realEquals, 'Created new match winner: Denis, score: 105, losser: Dima, score: 97.75');
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

	it('Негативная проверка. Заполнение полей цифрами', () => {
		const realEquals = matchesLogic.createNewMatches('12', '44');
		assert.equal(realEquals, 'Необходимо ввести корректные данные');
	});

});
