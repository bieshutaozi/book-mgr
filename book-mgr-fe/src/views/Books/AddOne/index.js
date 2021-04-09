import {defineComponent,reactive,ref} from 'vue';
import * as book from "@/service/book";
import {message} from 'ant-design-vue';
import {result,clone} from '@/helpers/utils';

const defaultFormData = {
  name: "",
  price: 0,
  author: "",
  publishDate: 0,
  classify: "",
  count:'',
};
export default defineComponent ({
   props:{
     show:Boolean,
   },
   setup(props,context){
    console.log(props);
    //先对数据进行了clone处理后，再赋值给addForm
    //const addForm = reactive(),reactive括号内是从index.vue传过来的值
    const addForm = reactive (clone(defaultFormData));
      const submit = async()=>{
          const form = clone(addForm);
          form.publishDate = addForm.publishDate.valueOf();
          const res= await book.add(form);

          result(res)
          .success((d,{data})=>{
            Object.assign(addForm,defaultFormData);
            message.success(data.msg);
          });
          
         
      };
      const close=()=>{
          context.emit('update:show',false);
      };
      
    return{
        addForm,
        submit,
        props,
        //只有这样在index.vue才能引用他们
        close,
    };
        
   },
});