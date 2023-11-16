const gameData = require('./dataSchema');

function pushToDB(idPlayer, idGame, ivent){
    const data = new gameData({player: idPlayer, gameNumber: idGame, iventType: ivent});
    data
        .save()
        .then();  
}

module.exports = pushToDB;