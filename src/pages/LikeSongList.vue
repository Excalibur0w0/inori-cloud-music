<template>
    <div class="like-list-wap">
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
    import { mapActions, mapGetters } from 'vuex'
    import SongListItem from '@/components/SongListItem'

    export default {
        name: 'LikeSongList',
        data() {
            return {

            }
        },
        methods: {
            ...mapActions(['getLikeSongs']),
            fetchLikeSongData() {
                let userId = this.$route.params.id;
                this.getLikeSongs(userId)
            }
        },
        mounted() {
          this.fetchLikeSongData();
        },
        computed: {
            ...mapGetters(['songs'])
        },
        components: {
            SongListItem
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/public.scss";

    .like-list-wap {
        width: 100%;
        padding: 0 $std_padding;
    }
</style>