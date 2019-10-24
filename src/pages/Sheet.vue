<template>
    <div class="sheet-wap">
        <div class="sheet-msg-wap">
            <div class="avartar">
                <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1571107210&di=39c571dac0dc82a931dbfc2ce38e439b&src=http://hbimg.b0.upaiyun.com/cd9a0aa4ee80e126d3bea1f06c305c100fc82d396ffce-lMjAYv_fw658">
            </div>
            <div class="info">
                <div class="features">
                    <div>歌单</div>
                    <div>{{ sheet.shtName }}</div>
                    <div>
                        <md-icon>edit</md-icon>
                    </div>
                </div>
                <div class="active">
                    <div>{{ sheetAuthorName }}</div>
                    <div>于{{ sheet.createdAt }}创建</div>
                    <div v-if="isSelf"> 这是您创建的歌单 </div>
                </div>
                <div class="active">
                    <div>播放全部</div>
                    <div>收藏</div>
                    <div>分享</div>
                    <div>下载全部</div>
                </div>
                <div>标签： </div>
                <div>简介： {{sheet.shtDesc}}</div>
            </div>
            <div class=""></div>
        </div>

        <md-table>
            <md-table-row>
                <md-table-head md-numeric>操作</md-table-head>
                <md-table-head>音乐标题</md-table-head>
                <md-table-head>歌手</md-table-head>
                <md-table-head>专辑</md-table-head>
                <md-table-head>时常</md-table-head>
            </md-table-row>

            <md-table-row v-for="(item, index) in songList" :key="'songList' + index">
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
    import { mapGetters, mapActions } from 'vuex'
    import {getSheetInfo, getUserBasicInfo} from '@/api/request'

    export default {
        name: 'Sheet',
        data() {
            return {
                sheetId: null,
                // default - status
                sheet: {
                    shtName: "noname",
                    shtDesc: "nodesc",
                    shtCreator: "nocreator",
                    createdAt: 'maybe today',
                },
                sheetAuthorName: null,
                songList: [
                    2, 3, 4, 6, 7, 8
                ]
            }
        },
        mounted() {
            this.sheetId = this.$route.params.id;
            getSheetInfo(this.sheetId).then(data => {
                this.sheet = data
                let userId = this.sheet.shtCreator;
                if (userId) {
                    getUserBasicInfo(userId).then((userBasic) => {
                        this.sheetAuthorName = userBasic.uname;
                        // eslint-disable-next-line no-console
                        console.log(this.sheet);
                    })
                }
            })
        },
        computed: {
            ...mapGetters(['getUser']),
            isSelf () {
                return this.getUser.uuid === this.sheet.shtCreator;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "public/public.scss";

    .sheet-wap {
        width: 100%;
        padding: 0 $std_padding;
        .sheet-msg-wap {
            display: flex;
            justify-content: flex-start;
            padding: $std_padding 0;
            margin-bottom: $std_padding;

            .avartar {
                width: 200px;
                border: 1px solid #EAEAEA;
            }

            .info {
                width: calc(100% - 200px);
                margin-left: 20px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;

                & > div {
                    margin-bottom: $sml_padding;
                }

                .features {
                    display: flex;
                    justify-content: flex-start;

                    & > div {
                        margin-right: $sml_padding;
                    }

                    border-bottom: 0.5px #666 solid;
                    padding-bottom: 5px;
                }

                .active {
                    display: flex;
                    justify-content: flex-start;

                    & > div {
                        margin-right: $sml_padding;
                    }
                }
            }
        }
    }
</style>