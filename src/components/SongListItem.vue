<template>
    <md-table-row>
        <md-table-cell>
                <md-button @click.prevent.stop="clickHeart" class="md-icon-button  md-accent">
                    <md-icon>{{songInfo.isFavorite ? "favorite" : "favorite_border"}}</md-icon>
                </md-button>
                <md-button @click.prevent.stop="clickOneSong" class="md-icon-button" >
                    <md-icon>
                        arrow_downward
                    </md-icon>
                </md-button>
            <md-menu>
                <md-button class="md-icon-button" md-menu-trigger>
                    <md-icon>
                        add
                    </md-icon>
                </md-button>

                <md-menu-content>
                    <md-menu-item v-for="(sheet, index) in mySheets" :key="'itemSheets' + index" @click.prevent.stop="addToList(sheet)">
<!--                        <md-icon>phone</md-icon>-->
<!--                        <span></span>-->
                        {{sheet.shtName}}
                    </md-menu-item>
                </md-menu-content>
            </md-menu>
        </md-table-cell>
        <md-table-cell @click.prevent.stop="clickTest">{{songInfo.song.songName}}</md-table-cell>
        <md-table-cell>{{songInfo.song.songAuthor}}</md-table-cell>
        <md-table-cell>{{songInfo.song.songAlbum}}</md-table-cell>
        <md-table-cell>{{getRightTime(songInfo.song.duration)}}</md-table-cell>
    </md-table-row>
</template>

<script>
    import {downloadFile} from '@/api/request'
    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'SongListItem',
        props: ['songInfo'],
        methods: {
            ...mapActions([
                'likeSong',
                'dislikeSong',
                'collectSong',
                'cancelCollect'
            ]),
            getRightTime(duration) {
                let m = Math.floor(duration / 60)
                let s = Math.ceil(duration % 60)
                return m + " : " + s;
            },
            clickOneSong () {
                console.log('running')
                let song = this.songInfo.song;
                if (song && song.storePath) {
                    downloadFile(song.storePath)
                }
            },
            clickHeart() {
                if (this.songInfo.isFavorite) {
                    this.dislikeSong(this.songInfo.song.uuid).then(() => {
                        this.songInfo.isFavorite = false
                    })
                } else {
                    this.likeSong(this.songInfo.song.uuid).then(() => {
                        this.songInfo.isFavorite = true
                    })
                }
            },
            addToList(sheet) {
                let sheetId = sheet.uuid;

                this.collectSong({
                    songId: this.songInfo.song.uuid,
                    sheetId
                })
            }
        },
        computed: {
            ...mapGetters(['mySheets'])
        }
    }
</script>

<style scoped>
</style>