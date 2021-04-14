const Router = require("@koa/router");
const mongoose = require("mongoose");

const User = mongoose.model("User");
const router = new Router({
  prefix: "/user",
});
router.get('/list',async(ctx)=>{
    let{
      page,
      size,
    }=ctx.query;
    page=Number(page);
    size=Number(size);
    const list=await User.find().skip((page-1)*size).limit(size).exec();
    const total=await User.countDocuments().exec();
    ctx.body={
        msg:'获取列表成功',
        data:{
            list,
            page,
            size,
            total,
        },
        code:1,
    };
});
router.delete('/:id',async(ctx)=>{
    const{
        id,
    }=ctx.params;
    const delMsg=await User.deleteOne({
        _id:id,
    });
    ctx.body={
        data:delMsg,
        code:1,
        msg:'删除成功',
    };
});

router.post('/add',async(ctx)=>{
console.log(ctx.request.body);
 const { account , password = "123123" } = ctx.request.body;
 console.log(account,password);
 const user = new User({
   account,
   password:password||'123123',
 });
 console.log(user);
 const res = await user.save();
 console.log('res:'+res);
 ctx.body = {
    data:res,
    code:1,
    msg:'添加成功',
};
});

module.exports = router;
