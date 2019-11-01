<template>
    <div class="music-player">
        <div class="music-player-bar">
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
                    {{ isMute ? 'volume_mute' : 'volume_down'}}
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
                <md-button class="md-icon-button" @click.stop.prevent="pullUpOrDownPlayer">
                    <md-icon v-if="!isUp">arrow_upward</md-icon>
                    <md-icon v-if="isUp">arrow_downward</md-icon>
                </md-button>
            </div>

            <audio ref="player"
                   @timeupdate="timeupdate"
                   @play="play"
                   @pause="pause"
                   @loadedmetadata="ready"
                   :src="audioSource"
                   autoplay>
            </audio>
        </div>
        <div class="music-player-content" v-if="isUp">
            <div class="comment-song-wap">
                <div class="song-wap">
                    <div class="song-decor">
                        <div class="avatar"
                             :style="`background: url(${musicImgPath + curPlay.imgPath}) 50% 50% / cover;`">
                        </div>
                        <div class="operation">
                            <md-button>
                                <md-icon>favorite_border</md-icon>
                                喜欢
                            </md-button>
                            <md-button>
                                <md-icon>star_border</md-icon>
                                收藏
                            </md-button>
                            <md-button>
                                <md-icon>cloud_download</md-icon>
                                下载
                            </md-button>
                            <md-button>
                                <md-icon>share</md-icon>
                                分享
                            </md-button>
                        </div>
                    </div>
                    <div class="song-info">
                        <div class="basic-msg">
                            <div class="title">
                                {{curPlay.songName}}
                            </div>
                            <div class="desc">阿哦，似乎这首歌没有简介</div>
                            <div class="info">
                                <span>专辑: {{curPlay.songAlbum}}</span>
                                <span>歌手: {{curPlay.songAuthor}}</span>
                                <span>来源: unknown</span>
                            </div>

                        </div>
                        <div class="lyric"></div>
                    </div>
                </div>

                <div class="comment-wap">
                    <comment :song="curPlay"></comment>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {getRightTime} from '@/utils/transdate'
    import Comment from '@/components/Comment'

    export default {
        name: 'MusicPlayer',
        components: {
            Comment,
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
                isUp: false
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
                this.isPause = false
            },
            pause() {
                this.isPause = true
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
                this.$refs.player.pause()
            },
            mouseUpMusicProgress() {
                this.$refs.player.play()
            },
            changeMusicProgress(e) {
                this.currentTime = e.target.value * this.mapToDuration
                this.$refs.player.currentTime = this.currentTime
            },
            pullUpOrDownPlayer() {
                if (this.curPlay.uuid) {
                    this.isUp = !this.isUp
                } else {
                    this.$alert({
                        show: true,
                        content: '请先选择歌曲'
                    })
                }
            }
        },
        computed: {
            ...mapGetters(['curPlay', 'audioPath', 'musicImgPath']),
            audioSource() {
                if (this.curPlay && this.curPlay.storePath) {
                    return this.audioPath + this.curPlay.storePath
                } else {
                    return ''
                }
            },
            formatDuration() {
                return getRightTime(this.duration)
            },
            formatCurrentTime() {
                return getRightTime(this.currentTime)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/public";

    $play-bar-height: 50px;

    .progress-cover {
        position: absolute;
        width: 100%;
        top: -10px;
        opacity: 0;
    }

    .music-player {
        /*overflow: auto;    //这里overflow:scroll也可以*/
    }

    .music-player-bar {
        height: $play-bar-height;
        background: $light_black;
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
            width: calc(100% - 650px);
            position: relative;
        }

        .sound-progress-bar {
            width: 120px;
            position: relative;
        }
    }

    .music-player-content {
        height: calc(100vh - 50px);
        position: relative;
        padding-top: $big_padding;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        &::-webkit-scrollbar {
            display: none;
        }

        &::before {
            content: ' ';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: $dark_black;
            z-index: -1;
        }

        .comment-song-wap {
            margin: 0 auto;
            /*width: 80%;*/
            width: 1200px;
            min-width: 800px;

            .song-wap {
                display: flex;
                justify-content: space-between;
                width: 100%;

                .song-decor {
                    width: 400px;

                    .avatar {
                        width: 100%;
                        padding-bottom: 100%;
                        height: 0px;
                        /*width: 200px;*/
                    }
                }

                .song-info {
                    width: calc(100% - 430px);
                    padding-left: $big_more_margin;

                    .basic-msg {
                        .title {
                            font-size: $sml_title_size;
                        }

                        .desc {
                            color: $msg_color;
                            margin-top: $std_margin;
                        }

                        .info {
                            color: $msg_color;
                            margin-top: $sml_margin;

                            > span {
                                margin-right: $std_margin;
                            }

                            &:last-child {
                                margin-right: 0;
                            }
                        }
                    }
                }
            }

            .comment-wap {
                margin-top: $std_margin;
            }
        }
    }
</style>