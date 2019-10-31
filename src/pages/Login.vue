<template>
    <div class="login-wap">

        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>登陆/注册</md-dialog-title>

            <md-tabs @md-changed="setActiveStatus" md-dynamic-height>
                <md-tab id="tab-login" md-label="登陆">
                    <md-field>
                        <label>请输入用户名</label>
                        <md-input v-model="uname"></md-input>
                    </md-field>

                    <md-field>
                        <label>请输入密码</label>
                        <md-input v-model="password" type="password"></md-input>
                    </md-field>
                </md-tab>

                <md-tab id="tab-register" md-label="注册">
                    <md-field>
                        <label>请输入用户名</label>
                        <md-input v-model="uname"></md-input>
                    </md-field>
                    <md-field>
                        <label>请输入密码</label>
                        <md-input v-model="password" type="password"></md-input>
                    </md-field>
                </md-tab>

                <md-tab id="tab-about" md-label="关于我们">
                    <p>Nothing to tell you</p>
                </md-tab>
            </md-tabs>

            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">取消</md-button>
                <md-button class="md-primary" @click="submit">确认</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button>
        <md-button class="md-primary md-raised" @click="clickLogOut">LogOut</md-button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'Login',
        data () {
            return {
                showDialog: false,
                password: '',
                uname: '',
                tabId: 'tab-login',
            }
        },
        methods: {
            ...mapActions(['login', 'logout']),
            setActiveStatus (activeTabId) {
                this.tabId = activeTabId;
            },
            submit () {
                if (this.tabId === 'tab-login') {
                    this.login({
                        uname: this.uname,
                        password: this.password
                    }).then(() => {
                        this.$router.push("/userCenter")
                    }).catch(() => {
                        // err
                    })
                } else if (this.tabId === 'tab-register') {
                    // do-nothing
                }
            },
            clickLogOut () {
                this.logout();
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
    .login-wap-a {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
</style>