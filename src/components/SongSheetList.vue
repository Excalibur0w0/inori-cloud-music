<template>
    <div class="full-control">
        <div class="list">
            <md-list :md-expand-single="false">
                <md-list-item md-expand>
                    <md-icon>library_music</md-icon>
                    <span class="md-list-item-text">推荐</span>

                    <md-list slot="md-expand">
                        <md-list-item class="md-inset">Europe</md-list-item>
                        <md-list-item class="md-inset">South America</md-list-item>
                    </md-list>
                </md-list-item>

                <md-list-item md-expand>
                    <md-icon>queue_music</md-icon>
                    <span class="md-list-item-text">我的音乐</span>

                    <md-list slot="md-expand">
                        <md-list-item  class="md-inset">
                            <span class="md-list-item-text">我喜欢</span>
                        </md-list-item>
                        <md-list-item class="md-inset">Console</md-list-item>
                        <md-list-item class="md-inset">PC</md-list-item>
                        <md-list-item class="md-inset">Phone</md-list-item>
                    </md-list>
                </md-list-item>

                <md-list-item md-expand>
                    <md-icon>video_library</md-icon>
                    <span class="md-list-item-text">创建的歌单</span>

                    <md-list slot="md-expand">
                        <md-list-item class="md-inset">Humor</md-list-item>
                        <md-list-item class="md-inset">Music</md-list-item>
                        <md-list-item class="md-inset">Movies</md-list-item>
                        <md-list-item class="md-inset">TV Shows</md-list-item>
                    </md-list>
                </md-list-item>

                <md-list-item>
                    <md-icon>star</md-icon>
                    <span class="md-list-item-text">收藏的歌单</span>
                </md-list-item>
            </md-list>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SongSheetList',

        data () {
            return {
            }
        }
    }
</script>

<style lang="scss" scoped>
    $list-width: 320px;

    .full-control {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap-reverse;
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