<template>
    <div>
        <md-toolbar class="md-title md-accent">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <router-link to="/">
                        <md-button class="md-icon-button">
                            <md-icon>toys</md-icon>
                        </md-button>
                    </router-link>
                    祈云音乐
                    <md-field class="search-input-wap">
                        <label>请输入搜索内容</label>
                        <md-input v-model="searchText"></md-input>
                    </md-field>
                </div>

                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button">
                        <router-link to="/userCenter">
                            <md-icon>person</md-icon>
                        </router-link>
                    </md-button>

                    <md-button class="md-icon-button">
                        <md-icon>refresh</md-icon>
                    </md-button>

                    <md-button class="md-icon-button">

                        <md-menu md-direction="bottom-end">
                            <md-button md-menu-trigger>
                                <md-icon>more_vert</md-icon>
                            </md-button>

                            <md-menu-content>
                                <md-menu-item @click="clickLogOut">注销</md-menu-item>
                                <md-menu-item @click="clearStoreUser">测试：清除USER</md-menu-item>
                                <md-menu-item>My Item 3</md-menu-item>
                            </md-menu-content>
                        </md-menu>
                    </md-button>
                </div>
            </div>
        </md-toolbar>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'MusicHeader',
        data() {
            return {
                searchText: '',
            }
        },
        methods: {
            ...mapActions(['logout']),
            clickLogOut () {
                this.logout().then(() => {
                    this.$router.push("/login")
                });
            },
            clearStoreUser () {
                this.$store.state.userModule.user = null;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-toolbar + .md-toolbar {

    }

    .search-input-wap {
        width: 10em;
        margin-left: 1em;
    }
</style>

