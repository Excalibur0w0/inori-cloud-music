<template>
    <md-table-row>
        <md-table-cell>
                <md-button @click="likeSong" class="md-icon-button  md-accent">
                    <md-icon>{{isFavorite ? "favorite" : "favorite_border"}}</md-icon>
                </md-button>
                <md-button @click="clickOneSong" class="md-icon-button" >
                    <md-icon>
                        arrow_downward
                    </md-icon>
                </md-button>
        </md-table-cell>
        <md-table-cell @click="clickTest">{{songInfo.songName}}</md-table-cell>
        <md-table-cell>{{songInfo.songAuthor}}</md-table-cell>
        <md-table-cell>{{songInfo.songAlbum}}</md-table-cell>
        <md-table-cell>{{getRightTime(songInfo.duration)}}</md-table-cell>
    </md-table-row>
</template>

<script>
    import {downloadFile} from '@/api/request'

    export default {
        name: 'SongListItem',
        props: ['songInfo'],
        data() {
            return {
                isFavorite: false
            }
        },
        methods: {
            clickTest() {
                console.log("clickTest")
            },
            getRightTime(duration) {
                let m = Math.floor(duration / 60)
                let s = Math.ceil(duration % 60)
                return m + " : " + s;
            },
            clickOneSong () {
                let song = this.songInfo;
                if (song && song.storePath) {
                    downloadFile(song.storePath)
                }
            },
            likeSong(song) {
                this.isFavorite = !this.isFavorite
            }
        }
    }
</script>

<style scoped>
</style>