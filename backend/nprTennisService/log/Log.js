const fs = require('fs');
const uuid = require('uuid');

class Log {

    constructor(path, setupMethod) {
        this.path = path;
        this.setupMethod = this.setupMethod;
    }

    /**
     * 
     * @param {Date} timestamp - Дата события 
     * @param {String} method - метод api события
     * @param {String} endpoint - эндопинт события
     * @param {Object} requestData - входящие данные при вызове события
     * @param {Date} err - ошибка при возникновении события, если имеется
     * @description Создание Объекта лога и возврат объекта
     */
    createLogString(method, endpoint, requestData, err=null) {

        const timestamp = new Date();

        const logStr = {
            uuid: uuid.v4,
            timestamp: timestamp,
            method: method,
            endpoint: endpoint,
            requestData: requestData,
            err: err
        }

        return logStr;
    }

    writeLog(method, endpoint, requestData, err=null) {
        this.printLogToFile(
            this.createLogString(method, endpoint, requestData, err)
        );
        this.printLogToFile(this.createLogString(method, endpoint, requestData, err));
    }

    printLogToFile(msg) {
        console.log(JSON.stringify(msg))
        fs.appendFile(this.path, JSON.stringify(msg).toString() + '\n', { 'flag':'a' }, (err) => {
            if (err) {
                this.printLogToConsole(err)
            }
        });       

    }

    /** 
     * @param {String} msg - Строка для печати на консоль
     * @description запись лога в консоль
    */
    printLogToConsole(msg) {
        if ( this.setupMethod == 'DEBUG' ) {
            console.log(msg);
        }   
    }

}

module.exports = Log;