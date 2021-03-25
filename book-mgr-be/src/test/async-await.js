// async-await

// 一个接口 要拿到数据 跑5个前置接口
const request = (arg, isReject) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isReject) {
        reject("出错啦");
        return;
      }
      console.log(arg);
      resolve(arg + 1);
    }, 300);
  });
};

// async 函数 返回的是一个 promise
const fn = async () => {
  const res1 = await request(1);

  const res2 = await request(res1);
  const res3 = await request(res2);
  const res4 = await request(res3);
  const res5 = await request(res4);

  console.log(res5);
};

// const fn = () => {
//   return new Promise((resolve, reject) => {
//     resolve(1);
//   });
// };

fn();
