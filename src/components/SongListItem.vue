<template>
    <md-table-row @dblclick.prevent.stop="selectOneSong">
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
                <md-button @click.prevent.stop class="md-icon-button" md-menu-trigger>
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
        <md-table-cell @click.prevent.stop="clickTest">{{songInfo.songName}}</md-table-cell>
        <md-table-cell>{{songInfo.songAuthor}}</md-table-cell>
        <md-table-cell>{{songInfo.songAlbum}}</md-table-cell>
        <md-table-cell>{{getRightTime(songInfo.duration)}}</md-table-cell>
    </md-table-row>
</template>

<script>
    import {downloadFile} from '@/api/request'
    import { mapActions, mapGetters } from 'vuex';
    import { getRightTime } from '@/utils/transdate'

    export default {
        name: 'SongListItem',
        props: ['songInfo'],
        methods: {
            ...mapActions([
                'likeSong',
                'dislikeSong',
                'collectSong',
                'cancelCollect',
                'changeCurPlay'
            ]),
            getRightTime(duration) {
                return getRightTime(duration);
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
                    this.dislikeSong(this.songInfo.uuid).then(() => {
                        this.songInfo.isFavorite = false
                    })
                } else {
                    this.likeSong(this.songInfo.uuid).then(() => {
                        this.songInfo.isFavorite = true
                    })
                }
            },
            addToList(sheet) {
                let sheetId = sheet.uuid;

                this.collectSong({
                    songId: this.songInfo.uuid,
                    sheetId
                })
            },
            selectOneSong() {
                this.changeCurPlay(this.songInfo);
            }
        },
        computed: {
            ...mapGetters(['mySheets'])
        }
    }
</script>

<style scoped>
</style>