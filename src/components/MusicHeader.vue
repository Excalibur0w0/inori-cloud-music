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
                        <md-input v-model="searchText" @keyup="searchTextKeyUp"></md-input>
                    </md-field>
                </div>

                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button">
                        <router-link to="/userCenter">
                            <md-icon>person</md-icon>
                        </router-link>
                    </md-button>

                    <md-button class="md-icon-button" @click="goBack">
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
                                <md-menu-item @click="() => {}">
                                    <uploader :content="'上传'" ></uploader>
                                </md-menu-item>
                            </md-menu-content>
                        </md-menu>
                    </md-button>
                </div>
            </div>
        </md-toolbar>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import Uploader from '@/components/Uploader'

    export default {
        name: 'MusicHeader',
        data() {
            return {
                searchText: '',
            }
        },
        methods: {
            ...mapActions(['logout', 'searchSongs']),
            clickLogOut () {
                this.logout().then(() => {
                    this.$router.push("/login")
                });
            },
            goBack() {
                this.$router.go(-1);
            },
            clearStoreUser () {
                this.$store.state.userModule.user = null;
            },
            searchTextKeyUp(e) {
                // 用户按下enter键位
                if(e.keyCode === 13) {
                    this.searchSongs(this.searchText).then(() => {
                        if(this.$route.name === 'SearchSongList') {
                            return
                        }
                        this.$router.push({
                            name: 'SearchSongList',
                            // params: { keywords: this.searchText }
                        })
                    })
                }
            },
        },
        computed: {
            ...mapGetters(['getUser'])
        },
        components: {
            Uploader
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

