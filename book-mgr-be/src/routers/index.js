const auth = require('./auth');
const inviteCode = require('./invite-code');
module.exports =(app)=>{
    app.use(auth.routes());
    app.use(inviteCode.routes());
};