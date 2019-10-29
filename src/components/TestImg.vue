<template>
    <div>test img
        <img :src="imgSource" alt="">
        <img src="http://localhost:5333/provider-music/io/resource/img?imgPath=53eca629b56d3aa45831eaaed1f3a7f6">
    </div>
</template>

<script>
    import {getImg} from '@/api/request'

    export default {
        name: 'TestImg',
        data() {
          return {
              imgSource: ""
          }
        },
        methods: {
          async showImg() {
              // let data = await getImg()
              // let url = window.URL.createObjectURL(data)
              // this.imgSource = url
          }
        },
        mounted() {
            this.showImg()
        }
    }
</script>

<style scoped>

</style>