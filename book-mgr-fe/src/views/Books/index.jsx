import {defineComponent,ref,onMounted,} from 'vue';
import * as book from "@/service/book";
import {useRouter} from 'vue-router';
import { result, formatTimestamp } from "@/helpers/utils";
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';
import { message,Modal,Input } from 'ant-design-vue';
export default defineComponent({
    components:{
        AddOne,
        Update,
    },
   setup(){
       const router=useRouter();
       const columns = [
         {
           title: "书名",
           dataIndex: "name"
         },
         {
           title: "作者",
           dataIndex: "author"
         },
         {
           title: "价格",
           dataIndex: "price"
         },
         {
           title: "库存",
           slots: {
             customRender: "count"
           }
         },
         {
           title: "出版日期",
           dataIndex: "publishDate",
           slots: {
             customRender: "publishDate"
           }
         },
         {
           title: "分类",
           dataIndex: "classify"
         },
         {
           title: "操作",
           slots: {
             customRender: "actions"
           }
         }
       ];
      
       const show = ref(false);
       const showUpdateModal=ref(false);
       const list = ref([]);
       const total= ref(0);
       const curPage = ref(1);
       const keyword=ref('');
       const isSearch=ref(false);
       const curEditBook=ref({});
       //获取书籍列表 
       const getList=async()=>{
           const res = await book.list({
               page:curPage.value,
               size:5,
               keyword:keyword.value,
           });
           result(res).success(({ data }) => {
             const { list: l, total: t } = data;
             list.value = l;
             total.value = t;
           });
       };
       onMounted(async()=>{
          getList();
        });
        //页面发生改变时候做的调用的算法
        //切页
        const setPage =(page)=>{
            curPage.value=page;
            getList();
        }
       const showRecord =(data)=>{
           console.log(data);
       };

       const onSearch =()=>{
           //重新获取列表数据的意思
          getList();
          isSearch.value=!!keyword.value;
       };
       //回到全部列表
       const backAll=()=>{
          keyword.value='';
          isSearch.value=false;
          getList();
       };

       const remove =async({text:record})=>{
          const{_id}=record;
          const res = await book.remove(_id);
          result(res)
          .success(({msg})=>{
            // message.success(msg);
            // const idx= list.value.findIndex((item)=>{
            //   return item._id===_id;
            // });
            // list.value.splice(idx,1);
            // getList();
          });
       };
       const updateCount =(type,record)=>{
         let word='增加';
         if(type==='OUT_COUNT'){
           word='减少';
         }

         Modal.confirm({
           title:`要${word}多少库存`,
           content:(
            <div>
              <Input class="__book_input_count"/>
            </div>
           ),
           onOk:async()=>{
              const el= document.querySelector('.__book_input_count');
              let num = el.value;
              const res = await book.updateCount({
                id:record._id,
                num,
                type,
              });
              result(res)
              .success((data)=>{
                  if(type===type){
                    //入库操作
                    num=Math.abs(num);
                  }else{
                    num=-Math.abs(num);
                  }
                  const one=list.value.find((item)=>{
                    return item._id===record._id;
                  });
                  if(one){
                    one.count=one.count+num;
                    message.success(`成功${word} ${Math.abs(num)}本书`);
                  }
              });
           },
         });
       };
       //显示更新弹框
       const update=({record})=>{
           showUpdateModal.value=true;
           curEditBook.value=record;
       };
       //更新列表的某一行数据
       const updateCurBook=(newData)=>{
         Object.assign(curEditBook.value,newData);
       };
       //进入书籍详情页
       const toDetail=({record})=>{
            router.push(`/books/${record._id}`);
       };
      
       return {
         columns,
         show,
         list,
         formatTimestamp,
         showRecord,
         curPage,
         total,
         setPage,
         keyword,
         onSearch,
         backAll,
         isSearch,
         remove,
         updateCount,
         showUpdateModal,
         update,
         curEditBook,
         updateCurBook,
         toDetail,
       };
   },
});