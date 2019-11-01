<template>
    <div class="alter-user-wap">
        <div class="title">更改用戶</div>
        <div class="main">
            <div class="form-wap">
                <div class="avatar-wap">
                    <div class="new-avatar" @click="readFile" :style="`background: url(${base64}) 50% / cover;`">
                        上传新头像
                        <input @change="fileListChanged" ref="selectAvatar" style="display: none;" id="select-avatar"
                               type="file">
                    </div>
                    <image-cuter :img="base64" :show-cuter="showCuter" @ok="getCutImg" @cancel="() => showCuter = false"></image-cuter>
                    <div class="border-line"></div>
                    <div class="cur-avatar" :style="`background: url(${avatarPath + getUser.uuid}) 50% / cover;`">
                    </div>
                </div>
                <md-field>
                    <label>当前昵称: {{getUser.uname}}</label>
                    <md-input v-model="form.uname"></md-input>
                </md-field>

                <div class="block">
                    <h3>生日</h3>
                    <md-datepicker v-model="form.birthday"/>
                </div>

                <md-radio v-model="form.gender" value="男">男 <small>(Male)</small></md-radio>
                <md-radio v-model="form.gender" value="女">女 <small>(Female)</small></md-radio>
                <md-field>
                    <label>简单描述自己:</label>
                    <md-textarea v-model="form.description"></md-textarea>
                    <md-icon>description</md-icon>
                </md-field>
                <md-button @click="submit">
                    确认提交
                </md-button>
            </div>
        </div>
    </div>
</template>


<script>
    import {VueCropper} from 'vue-cropper'
    import {mapActions, mapGetters, mapState} from 'vuex'
    import ImageCuter from '@/components/ImageCuter'
    import {uploadAvatar} from '@/api/request'

    export default {
        name: 'AlterUser',
        watch: {
          getUser(oldVal, newVal) {
              this.refreshData(newVal)
          }
        },
        data() {
            return {
                form: {
                    uname: "",
                    birthday: new Date(),
                    gender: "男",
                    description: "",
                },
                cropOption: {
                    img: 'https://shnhz.github.io/shn-ui/img/Koala.jpg',
                    size: 64,
                    outputType: 'png',
                },
                base64: '',
                showCuter: false,
            }
        },
        components: {
            VueCropper,
            ImageCuter
        },
        methods: {
            ...mapActions(['updateUser']),
            refreshData(newVal) {
                this.form.birthday = newVal.birthday;
                this.form.description = newVal.description;
                this.form.gender = newVal.gender;
                this.form.uname = newVal.uname;
            },
            submit() {
                this.updateUser(this.form).then(() => {
                    this.$alert({
                        show: true,
                        content: '更改成功'
                    })
                })
            },
            readFile() {
                this.$refs.selectAvatar.click()
            },
            fileListChanged(e) {
                let files = e.target.files

                if (!files || files.length < 1) {
                    return
                }

                let file = files[0]
                let url = window.URL.createObjectURL(file)
                this.base64 = url
                this.showCuter = true
            },
            getCutImg(base64) {
                // console.log(base64)
                this.base64 = base64
                this.showCuter =false;
                this.uploadImg(this.base64)
            },
            uploadImg(base64) {
                uploadAvatar(base64)
            }
        },
        mounted() {
            if (this.getUser) {
                this.refreshData(this.getUser)
            }
        },
        computed: {
            ...mapGetters(['getUser', 'musicImgPath', 'avatarPath']),
            ...mapState(['user']),   // 只应该在watch中监听
        }

    }
</script>

<style lang="scss" scoped>
    //object-fit: cover;
    @import '../assets/public';


    .alter-user-wap {
        padding: $std_margin $big_margin;
        width: 100%;

        > .title {
            width: 100%;
            font-size: $sml_title_size;
            padding-bottom: $sml_padding;
            border-bottom: .5px #666 solid;
        }

        > .main {
            margin: 0 auto;
            width: 800px;
            display: flex;
            justify-content: flex-start;

            > .form-wap {
                width: 500px;

                > .avatar-wap {
                    margin-top: $big_margin;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .new-avatar {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 180px;
                        height: 180px;
                        border: 1px solid #666;
                        cursor: pointer;
                        background: #f1f2f5;
                        border-radius: 4px;
                        -webkit-transition: all .6s ease;
                        transition: all .6s ease;
                    }

                    .border-line {
                        height: 182px;
                        width: 1px;
                        background: #666;
                        float: left;
                    }

                    .cur-avatar {
                        margin-right: $std-margin;
                        margin-top: $std_margin;
                        margin-bottom: $big_margin;
                        width: 120px;
                        height: 120px;
                        /*object-fit: cover;*/
                        border-radius: 50%;
                        background-color: #73d2f3;
                        position: relative;
                        &::after {
                            content: '当前头像';
                            position: absolute;
                            bottom: -$std_margin;
                            left: 50%;
                            transform: translate3d(-50%, 100%, 0);
                        }
                    }
                }

            }
        }
    }
</style>