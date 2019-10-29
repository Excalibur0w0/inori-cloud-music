<template>
    <div class="list">
        <md-list :md-expand-single="false">
            <md-list-item md-expand >
                <md-icon>library_music</md-icon>
                <span class="md-list-item-text">推荐</span>

                <md-list slot="md-expand">
                    <md-ripple>
                        <md-list-item class="md-inset" @click="goToDiscovery">发现</md-list-item>
                    </md-ripple>
                </md-list>

                <md-list slot="md-expand">
                    <md-ripple>
                        <md-list-item class="md-inset">每日推荐</md-list-item>
                    </md-ripple>
                </md-list>
            </md-list-item>

            <md-list-item md-expand>
                <md-icon>queue_music</md-icon>
                <span class="md-list-item-text">我的音乐</span>

                <md-list slot="md-expand">
                    <md-list-item class="md-inset" @click.stop.prevent="goToILike">
                            我喜欢
                    </md-list-item>
                </md-list>
            </md-list-item>

            <md-list-item md-expand  md-expanded>
                <md-icon>video_library</md-icon>
                <span class="md-list-item-text">创建的歌单</span>

                <md-list slot="md-expand">
                    <md-list-item v-for="(item, index) in mySheets" :key="index + 'my-sheets-list'" class="md-inset own-sheet-item" @click="goToSheet(item)">
                        {{item.shtName}}
                            <md-button class="delete-icon md-icon-button" @click.stop.prevent="deleteOwnSheet(item)">
                                <md-icon>
                                    delete
                                </md-icon>
                            </md-button>
                    </md-list-item>
                    <md-list-item class="md-inset" @click="emitCreateEmptySheet">创建新歌单</md-list-item>
                </md-list>
            </md-list-item>

            <!--                <md-ripple></md-ripple>-->
            <md-list-item>
                <md-icon>star</md-icon>
                <span class="md-list-item-text">收藏的歌单</span>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {deleteSheet} from '@/api/request'

    export default {
        name: 'MenuList',

        data() {
            return {
            }
        },

        methods: {
            ...mapActions(['createEmptySheet', 'getAllMySheet', 'removeMySheet']),
            emitCreateEmptySheet() {
                this.$prompt({
                    show: true,
                    title: '创建歌单',
                    content: '在这里输入新歌单名称',
                    callback: (value) => {
                        if (value) {
                            this.createEmptySheet({
                                sheetName: value,
                                desc: '',
                                userId: this.getUser.uuid
                            })
                        }
                    }
                })
            },
            goToSheet(sheet) {
                this.$router.push({
                    name: 'Sheet',
                    params: {
                        id: sheet.uuid
                    }
                })
                this.$forceUpdate();
            },
            goToDiscovery() {
                this.$router.push({
                    name: 'Discovery'
                });
            },
            goToILike() {
                let userId = this.getUser.uuid

                this.$router.push({
                    name: 'LikeSongList',
                    params: {
                        id: userId
                    }
                })
            },
            deleteOwnSheet(sheet) {
                this.removeMySheet(sheet.uuid);
            }
        },
        computed: {
            ...mapGetters(['mySheets', 'getUser'])
        },
        mounted () {
            this.getAllMySheet({
                userId: this.getUser.uuid
            });
        }
    }
</script>

<style lang="scss" scoped>
    $list-width: 320px;


    .own-sheet-item {
        .delete-icon {
            transition: opacity 0.4s;
            opacity: 0;
        }
        &:hover {
            .delete-icon {
                opacity: 1;
            }
        }
    }

    .list {
        width: $list-width;
    }

    .full-control > .md-list {
        width: $list-width;
        max-width: 100%;
        height: 400px;
        display: inline-block;
        overflow: auto;
        border: 1px solid rgba(#000, .12);
        vertical-align: top;
    }
</style>