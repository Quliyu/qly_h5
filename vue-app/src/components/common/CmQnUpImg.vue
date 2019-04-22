<template>
  <div>
    <div class="hide">
      <input type="file" id="CmQnUpImg" ref="CmQnUpImg" name="file" class="ipt" />
    </div>

    <!-- 提示组件 开始 -->
    <cm-message ref="CmMessage"></cm-message>
    <!-- 提示组件 结束 -->

  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { QnUpUrl } from '@/const';
import CmMessage from '@/components/common/CmMessage';

const axiosInstance = axios.create({});

export default {
  name: 'CmQnUpImg',
  components: { CmMessage },
  data() {
    return {
      progress: 0, // 进度条
    };
  },
  mounted() {
    const QNUPTOKEN = JSON.parse(window.localStorage.getItem('QNUPTOKEN') || '{}');
    if (QNUPTOKEN.uptoken && QNUPTOKEN.origin) {
      this.$refs.CmQnUpImg.addEventListener('change', (e) => {
        this.$refs.CmMessage.loadingTips('图片上传中...');
        const ev = e || event;
        // console.log(ev.currentTarget);
        const files = ev.currentTarget.files;
        const time3 = dayjs().format('YYYYMMDD/HHmmss/SSS');
        const rStr4 = Math.random().toString(36).substr(2).substring(0, 4);
        const upKey = `azb/addPic/${time3}/${rStr4}.png`;
        // console.log(upKey);
        const data = new FormData();
        data.append('token', QNUPTOKEN.uptoken);
        data.append('file', files[0]);
        data.append('key', upKey);
        axiosInstance({
          method: 'POST',
          url: QnUpUrl,
          data,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            // console.log(percentCompleted);
            // 对应上传进度条
            this.progress = percentCompleted;
          },
        }).then((res) => {
          // console.log('res=>', res);
          if (res.data) {
            const imgUrl = QNUPTOKEN.origin + res.data.key;
            console.log('imgUrl=>', imgUrl);
            this.$parent.setPicObjList(imgUrl);
          } else {
            console.log('res=>', res);
          }
          this.$refs.CmMessage.loadingTips();
        }).catch((err) => {
          console.log('err=>', err);
        });
      });
    } else {
      //
    }
  },
};
</script>

<style scoped>
.hide {
  display: none;
}
</style>
