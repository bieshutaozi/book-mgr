const Router = require("@koa/router");
const mongoose = require("mongoose");
const InventoryLog = mongoose.model("InventoryLog");
const router = new Router({
  prefix: "/inventory-log",
});
router.get('/list',async(ctx)=>{
 const{
     type,
     size,
     page,
 }=ctx.query;
 const list=await InventoryLog.find({
     type,
 }).skip((page-1)*size).limit(size).exec();
 ctx.body={
     data:list,
     code:1,
     msg:'获取列表成功',
 };
});
module.exports = router;
