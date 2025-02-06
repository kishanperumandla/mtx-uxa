
 
 class AppErrorGlobal extends Error{
    constructor(message, status_code){
        super(message);
        this.status = `${status_code}`.startsWith('4') ? 'fail' : 'error';
        this.stausCode = status_code || 500;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        
        this.isOperational = true;

    }
}



module.exports = AppErrorGlobal;