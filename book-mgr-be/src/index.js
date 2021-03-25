const Koa = require("koa");
const koaBody = require("koa-body");
//新建的语句

const { connect } = require("./db");
const registerRoutes = require("./routers"); //routers下写的业务逻辑代码被引进来了
const cors = require("@koa/cors");
//const Router = require('@koa/router');

const app = new Koa();
// const authrouter = new Router({
//      prefix:'/auth'
// });
connect().then(() => {
  app.use(cors());
  app.use(koaBody());
  registerRoutes(app);
  app.listen(3000, () => {
    console.log("启动成功!");
  });
});
//新建的语句

// authrouter.get('/register',async(ctx)=>{
//     ctx.body = "注册成功！";
// });

// app.use(authrouter.routes());
