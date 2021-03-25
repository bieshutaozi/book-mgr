import {defineComponent,reactive} from 'vue';
import{UserOutlined,LockOutlined,MailOutlined} from '@ant-design/icons-vue';
import * as auth from '@/service/auth';
import {result} from '@/helpers/utils';
import {message} from 'ant-design-vue';
export default defineComponent({
components:{
    UserOutlined,
    LockOutlined,
    MailOutlined,
},

setup(){
  //注册的表单数据
   const regForm = reactive({
      account:'',
      password:'',
      inviteCode:'',
   });
   //注册逻辑
   const register = async()=>{
     if(regForm.account===''){
       message.info('请输入账户');
       return;
     }
     if(regForm.password===''){
       message.info('请输入密码');
       return;
     }
      if (regForm.inviteCode === '') {
        message.info('请输入邀请码');
        return;
      }
    const res= await auth.register(regForm.account,regForm.password,regForm.inviteCode);
    result(res)
    .success((data)=>{
      message.success(data.msg);
    })
    
   };
   
   //登入的表单数据
    const loginForm = reactive({
      account: "",
      password: ""

    });
    //登入逻辑
     const login = async() => {
       if (loginForm.account === "") {
         message.info("请输入账户");
         return;
       }
       if (loginForm.password === "") {
         message.info("请输入密码");
         return;
       }

       const res= await auth.login(loginForm.account, loginForm.password);
        result(res)
          .success(data => {
            message.success(data.msg);
          })
         
     };
   return{
     //注册相关数据
       regForm,
       register,
    //登录相关数据
       loginForm,
       login,
   };
},

});