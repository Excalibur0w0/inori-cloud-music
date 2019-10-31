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
        computed: {
            ...mapGetters([
                'getUser'
            ])
        },
        methods: {
            fileListChanged(e) {
                let files = e.target.files

                if (!files || files.length < 1) {
                    return
                }

                for (let i = 0; i < files.length; i++) {
                    this.uploadMusic(files[i])
                }
            },
            uploadMusic(file) {
                uploadSingleFile(file, this.getUser.uuid)
            },
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