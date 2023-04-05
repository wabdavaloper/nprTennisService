/**
* @description Получаем рейтинг победителя и проигравшего. первая запись - рейтинг победителя, вторая запись - рейтинг проигравшего
* @param   {string} winnerId - айди победителя 
* @param   {string} losserId - айди проигравшего
* @returns {string} строк запроса
*/
const getScoresWinnerAndLossers = (winnerId, losserId) => {
    return `
    SELECT p.score
    FROM PLAYERS p
    WHERE ID = ${winnerId}
    UNION ALL
    SELECT l.score
    FROM PLAYERS l
    WHERE ID = ${losserId};
    `  
}

const calculateScoreForWinner = (winnerId, winnerScore) => {
    return `
        UPDATE PLAYERS
        SET score = ${winnerScore}
        WHERE ID = ${winnerId}
        ;
    `
}

const calculateScoreForLosser = (losserId, losserScore) => {
    return `
        UPDATE PLAYERS
        SET score = ${losserScore}
        WHERE ID = ${losserId}
        ;
    `
}

const createMatch = (winnerId, losserId) => {
    return `
        INSERT INTO MATCH ( winner_id, losser_id )
        VALUES ( ${winnerId}, ${losserId} );
    `
}

const allPlayersInfo = () => {
    return `
        SELECT pl.id, pl.first_name, pl.second_name, pl.nickname, pl.score
        FROM players pl
        ORDER BY SCORE DESC;
    `
}

module.exports = { getScoresWinnerAndLossers, createMatch, calculateScoreForWinner, calculateScoreForLosser, allPlayersInfo }