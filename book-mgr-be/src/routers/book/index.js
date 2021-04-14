const Router = require("@koa/router");

const mongoose = require("mongoose");
const { getBody } = require("../../helpers/utils");
const BOOK_COUNT={
  IN_COUNT:'IN_COUNT',
  OUT_COUNT:'OUT_COUNT',
}
const Book = mongoose.model("Book");
const InventoryLog=mongoose.model('InventoryLog');
const findBookOne=async(id)=>{
  const one=await Book.findOne({
    _id:id,
  }).exec();

  return one;

};


const router = new Router({
  prefix: "/book",
});

router.post("/add", async (ctx) => {
  const { name, price, author, publishDate, classify ,count} = getBody(ctx).form;
  const book= new Book({
      name,
      price,
      author,
      publishDate,
      classify,
      count,
  });
  
  const res = await book.save();
  
  

  ctx.body = {
      data:res,
      code:1,
      msg:'添加成功',

  };
});
router.get('/list',async(ctx)=>{
  //https://aa.cc.com/user?page=2&size=20&keyword=书名#fdsafds
  const {
    page=3,
    keyword='',
  }=ctx.query;
  let={
    size=5
  }=ctx.query;
  size= Number(size);
  //2 20
  //20 20
  //(page-1)*size
  const query={};
  if(keyword){
    query.name=keyword;
  }
  const list =await Book
  .find(query)
  .sort({
    _id:-1,
  })
  .skip((page-1)*size)
  .limit(size)
  .exec();
  const total= await Book.countDocuments();
  //将数据返回，实现分页的接口。
  ctx.body={
      data:{
        total,
        list,
        page,
        size,
      },
      code:1,
      msg:'获取列表成功',
  };
});
router.delete('/:id',async(ctx)=>{
    const{
      id,
    }=ctx.params;
    const delMsg=await Book.deleteOne({
      _id:id,
    });
    ctx.body={
      data:delMsg,
      msg:"删除成功",
      code:1,
    };
});
router.post('/update/count',async(ctx)=>{
  const {
    id,
    type, //出库或入库
  } = ctx.request.body;

  let {
    num, //库存数量
  } = ctx.request.body;
  num = Number(num);

  
  //找到该书
  const book = await findBookOne(id);
  if (!book) {
    ctx.body = {
      code: 0,
      msg: "没有找到书籍",
    };
    return;
  }
  //入库操作
  if (type === BOOK_COUNT.IN_COUNT) {
    num = Math.abs(num);
  } else {
    //出库操作
    num = -Math.abs(num);
  }
  book.count = book.count + num;
  if (book.count < 0) {
    ctx.body = {
      code: 0,
      msg: "剩下的量不足以出库",
    };
    return;
  }
  const res = await book.save();
  const log = new InventoryLog({
    num,
    type,
  });

  log.save();
  ctx.body = {
    data: res,
    code: 1,
    msg: "操作成功",
  };
});
router.post('/update',async(ctx)=>{
  //先取需要修改的数据
  const {
    id, //获取该书
    // name,
    // price,
    // author,
    // publishDate,
    // classify,
    //剩余参数，代替nxame,price...
    ...others
  } = ctx.request.body;
  
  
  const newQuery={};
  Object.entries(others).forEach(([key,value])=>{
    if(value){
      newQuery[key]=value;
    }
});
const one = await findBookOne(id);
Object.assign(one,newQuery);
const res=await one.save();
ctx.body={
  data:res,
  code:1,
  msg:'保存成功',
}
});
router.get('/detail/:id',async(ctx)=>{
  const{
    id,
  }=ctx.params;
  const one = await findBookOne(id);
  if (!one) {
    ctx.body = {
      msg: "没有找到书籍",
      code: 0,
    };
    return;
  }
  ctx.body = {
    msg: "查询成功",
    data: one,
    code: 1,
  };
});


module.exports = router;
