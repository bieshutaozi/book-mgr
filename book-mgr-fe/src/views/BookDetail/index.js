import {defineComponent, onMounted,ref} from 'vue';
import {useRoute,useRouter} from 'vue-router';
import * as book from "@/service/book";
import {result,formatTimestamp} from '@/helpers/utils';
import{message}from 'ant-design-vue';
import Update from '@/views/Books/Update/index.vue';

export default defineComponent({
  components: {
    Update,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { id } = route.params;
    const detailInfo = ref({});
    const showUpdateModal = ref(false);
    const getDetail = async () => {
      const res = await book.detail(id);
      result(res).success(({ data }) => {
        detailInfo.value = data;
      });
    };
    onMounted(() => {
      getDetail();
    });
    const remove = async () => {
      const res = await book.remove(id);
      result(res).success(({ msg }) => {
        message.success(msg);
        router.push("/books");
      });
    };
    const update=(book)=>{
        Object.assign(detailInfo.value,book);
    };
    return {
      d: detailInfo,
      formatTimestamp,
      remove,
      showUpdateModal,
      update,
    };
  }
});