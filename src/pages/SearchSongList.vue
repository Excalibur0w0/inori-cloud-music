<template>
    <div class="search-list-wap">
        <md-table v-if="songs && songs.length > 0">
            <md-table-row>
                <md-table-head md-numeric>操作</md-table-head>
                <md-table-head>音乐标题</md-table-head>
                <md-table-head>歌手</md-table-head>
                <md-table-head>专辑</md-table-head>
                <md-table-head>时常</md-table-head>
            </md-table-row>
            <md-table-row v-for="(item, index) in songs" :key="'songs' + index">
                <md-table-cell md-numeric>1</md-table-cell>
                <md-table-cell>Viva La Vida</md-table-cell>
                <md-table-cell>David Gareet</md-table-cell>
                <md-table-cell>Music</md-table-cell>
                <md-table-cell>04 : 16</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'SearchSongList',
        methods: {
        },
        getters: {
            ...mapGetters(['songs'])
        },
        actions: {

        }
    }
</script>

<style lang="scss" scoped>
    @import "public/public.scss";

    .search-list-wap {
        width: 100%;
        padding: 0 $std_padding;
        z-index: -5;
    }
</style>