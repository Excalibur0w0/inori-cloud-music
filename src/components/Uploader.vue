<template>
    <div>
        <input type="file" id="upload" @change="fileListChanged"/>
    </div>
</template>

<script>
    import {uploadSingleFile} from '@/api/request'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Uploader',
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters(['getUser'])
        },
        methods: {
            fileListChanged(e) {
                let files = e.target.files;

                if (!files || files.length < 1) {
                    return;
                }

                for (let i = 0; i < files.length; i++) {
                    this.upload(files[i]);
                }
            },
            upload(file) {
                uploadSingleFile(file, this.getUser.uuid);
                // let form = new FormData(); // FormData 对象
                // form.append("file", file); // 文件对象
            }
        }
    }
</script>

<style scoped>

</style>