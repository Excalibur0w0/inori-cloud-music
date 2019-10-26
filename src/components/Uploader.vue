<template>
    <label class="upload-wap" for="uploader">
        {{content}}
        <input id="uploader" class="upload-input" type="file" @change="fileListChanged"/>
    </label>
</template>

<script>
    import {uploadSingleFile} from '@/api/request'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Uploader',
        props: {
            content: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters(['getUser'])
        },
        methods: {
            focus() {
                console.log('focus')
            },
            fileListChanged(e) {
                let files = e.target.files

                if (!files || files.length < 1) {
                    return
                }

                for (let i = 0; i < files.length; i++) {
                    this.upload(files[i])
                }
            },
            upload(file) {
                uploadSingleFile(file, this.getUser.uuid)
                // let form = new FormData(); // FormData 对象
                // form.append("file", file); // 文件对象
            }
        }
    }
</script>

<style scoped>
        .upload-wap {
                width: 100%;
        }
    .upload-input {
        display: none;
    }
</style>