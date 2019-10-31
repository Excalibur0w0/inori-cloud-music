<template>
    <div class="alter-user-wap">
        <div class="title">更改用戶</div>
        <div class="main">
            <div class="form-wap">
                    <div class="avatar" >

                    </div>
                <md-field>
                    <label>账号昵称:</label>
                    <md-input></md-input>
                </md-field>

                <div class="block">
                    <h3>生日</h3>
                    <md-datepicker v-model="birthday"/>
                </div>

                <md-radio v-model="radio" value="男">男 <small>(Male)</small></md-radio>
                <md-radio v-model="radio" value="女">女 <small>(Female)</small></md-radio>
                <md-field>
                    <label>简单描述自己:</label>
                    <md-textarea></md-textarea>
                    <md-icon>description</md-icon>
                </md-field>
                <md-button>
                    确认提交
                </md-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AlterUser',
        data() {
            return {
                radio: false,
                birthday: new Date()
            }
        }
    }
</script>

<style lang="scss" scoped>
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
            display: flex;
            justify-content: flex-start;

            > .form-wap {
                width: 500px;
                > .avatar {
                    margin-top: $std_margin;
                    width: 180px;
                    height: 180px;
                    /*border-radius: 50%;*/
                    background-color: #73d2f3;
                }
            }
        }
    }
</style>