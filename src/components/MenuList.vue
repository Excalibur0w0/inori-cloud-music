<template>
    <div class="list">
        <md-list :md-expand-single="false">
            <md-list-item md-expand >
                <md-icon>library_music</md-icon>
                <span class="md-list-item-text">推荐</span>

                <md-list slot="md-expand">

                    <md-ripple>
                        <md-list-item class="md-inset">Europe</md-list-item>
                    </md-ripple>
                    <md-ripple>
                        <md-list-item class="md-inset">South America</md-list-item>
                    </md-ripple>
                </md-list>
            </md-list-item>

            <md-list-item md-expand>
                <md-icon>queue_music</md-icon>
                <span class="md-list-item-text">我的音乐</span>

                <md-list slot="md-expand">
                    <md-list-item class="md-inset">
                        <span class="md-list-item-text">我喜欢</span>
                    </md-list-item>
                    <md-list-item class="md-inset">Console</md-list-item>
                    <md-list-item class="md-inset">PC</md-list-item>
                    <md-list-item class="md-inset">Phone</md-list-item>
                </md-list>
            </md-list-item>

            <md-list-item md-expand  md-expanded>
                <md-icon>video_library</md-icon>
                <span class="md-list-item-text">创建的歌单</span>

                <md-list slot="md-expand">
                    <md-list-item v-for="(item, index) in sheets" :key="index + 'my-sheets-list'" class="md-inset own-sheet-item" @click="clickOwnSheet(item)">
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
            ...mapActions(['createEmptySheet', 'getAllSheet', 'removeSheet']),
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
            clickOwnSheet(sheet) {
                console.log(sheet)
            },
            deleteOwnSheet(sheet) {
                this.removeSheet(sheet.uuid);
            }
        },
        computed: {
            ...mapGetters(['sheets', 'getUser'])
        },
        mounted () {
            this.getAllSheet({
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