<template>
    <div class="music-player">
        <div class="operation">
            <md-button class="md-icon-button">
                <md-icon>skip_previous</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click="pauseOrPlay">
                <md-icon v-if="!isPause">pause</md-icon>
                <md-icon v-if="isPause">play_arrow</md-icon>
            </md-button>
            <md-button class="md-icon-button">
                <md-icon>skip_next</md-icon>
            </md-button>
        </div>

        <div class="time">
            {{formatCurrentTime}}
        </div>

        <div class="song-progress-bar">
            <md-progress-bar md-mode="buffer" :md-value="musicProgress" :md-buffer="buffer"></md-progress-bar>
            <input @mousedown="mouseDownMusicProgress"
                   @mouseup="mouseUpMusicProgress"
                   @change="changeMusicProgress"
                   class="progress-cover"
                   type="range"
                   v-model.number="musicProgress">
        </div>

        <div class="time">
            {{formatDuration}}
        </div>

        <md-button class="md-icon-button">
            <md-icon>
                {{ isMute ? "volume_mute" : "volume_down"}}
            </md-icon>
        </md-button>

        <div class="sound-progress-bar">
            <md-progress-bar md-mode="determinate" :md-value="soundLevel"></md-progress-bar>
            <input class="progress-cover" type="range" v-model.number="soundLevel">
        </div>

        <div class="list-operation">
            <md-button class="md-icon-button">
                <md-icon>repeat</md-icon>
            </md-button>
            <md-button class="md-icon-button">
                <md-icon>reorder</md-icon>
            </md-button>
        </div>

        <audio ref="player"
               @timeupdate="timeupdate"
               @play="play"
               @pause="pause"
               @loadedmetadata="ready"
               :src="'http://localhost:5333/provider-music/io/resource/audio?md5=' + curPlay.storePath"
               autoplay>
        </audio>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import { getRightTime } from '@/utils/transdate'

    export default {
        name: 'MusicPlayer',
        components: {
        },
        data() {
            return {
                musicProgress: 0,
                mapToDuration: 0,
                soundLevel: 0,
                buffer: 0,
                isMute: false,
                isPause: true,
                duration: 0,
                currentTime: 0,
            }
        },
        methods: {
            ...mapActions(['changeCurPlay']),
            pauseOrPlay() {
                if (this.isPause) {
                    this.$refs.player.play()
                } else {
                    this.$refs.player.pause()
                }
            },
            play() {
                this.isPause = false;
            },
            pause() {
                this.isPause = true;
            },
            // meta加载后发生
            ready(e) {
                this.getMetaData(e)
            },
            timeupdate(e) {
                if (!this.hasMetaData()) {
                    this.getMetaData(e)
                }
                this.currentTime = e.target.currentTime
                let newPos = this.currentTime / this.mapToDuration
                if (newPos - this.musicProgress > 1) {
                    this.musicProgress = newPos
                }
            },
            getMetaData(e) {
                this.duration = e.target.duration
                this.mapToDuration = this.duration / 100
                this.musicProgress = 0
            },
            hasMetaData() {
                return this.duration !== 0 && this.mapToDuration !== 0
            },
            mouseDownMusicProgress() {
                this.$refs.player.pause();
            },
            mouseUpMusicProgress() {
                this.$refs.player.play()
            },
            changeMusicProgress(e) {
                this.currentTime = e.target.value * this.mapToDuration
                console.log(this.currentTime);
                this.$refs.player.currentTime = this.currentTime
            }
        },
        computed: {
            ...mapGetters(['curPlay']),
            formatDuration() {
                return getRightTime(this.duration);
            },
            formatCurrentTime() {
                return getRightTime(this.currentTime);
            }
        }
    }
</script>

<style lang="scss" scoped>

    .progress-cover {
        position: absolute;
        width: 100%;
        top: -10px;
        opacity: 0;
    }
    .music-player {
        height: 50px;
        background: #424242;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .operation {
            margin-left: 20px;
        }
        .list-operation {
            margin-left: 20px;
        }
        .time {
            margin-left: 15px;
        }
        .song-progress-bar {
            margin-left: 20px;
            width: calc(100% - 600px);
            position: relative;
        }
        .sound-progress-bar {
            width: 120px;
            position: relative;
        }
    }
</style>