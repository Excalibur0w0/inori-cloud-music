<template>
    <div class="search-list-wap">
        <md-table v-if="songs && songs.length > 0" >
            <md-table-row>
                <md-table-head>操作</md-table-head>
                <md-table-head>音乐标题</md-table-head>
                <md-table-head>歌手</md-table-head>
                <md-table-head>专辑</md-table-head>
                <md-table-head md-sort-by="song">时常</md-table-head>
            </md-table-row>
            <song-list-item v-for="(item, index) in songs" :song-info="item" :key="'songs' + index">
            </song-list-item>
        </md-table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import SongListItem from '@/components/SongListItem'

    export default {
        name: 'SearchSongList',
        methods: {
        },
        computed: {
            ...mapGetters(['songs'])
        },
        mounted() {
        },
        components: {
            SongListItem
        }

    }
</script>

<style lang="scss" scoped>
    @import "public/public.scss";

    .search-list-wap {
        width: 100%;
        padding: 0 $std_padding;
        /*z-index: 10;*/
    }
</style>