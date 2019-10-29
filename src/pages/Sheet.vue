<template>
    <div class="sheet-wap">
        <div class="sheet-msg-wap">
            <div class="avartar" :style="`background: url(http://localhost:5333/provider-music/io/resource/img?imgPath=${sheet.imgPath}) 50% 50%;`">
<!--                <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1571107210&di=39c571dac0dc82a931dbfc2ce38e439b&src=http://hbimg.b0.upaiyun.com/cd9a0aa4ee80e126d3bea1f06c305c100fc82d396ffce-lMjAYv_fw658">-->
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
                    <div>于{{ createdTime }}创建</div>
<!--                    <div v-if="isSelf"> 这是您创建的歌单 </div>-->
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
                <md-table-head>操作</md-table-head>
                <md-table-head>音乐标题</md-table-head>
                <md-table-head>歌手</md-table-head>
                <md-table-head>专辑</md-table-head>
                <md-table-head>时常</md-table-head>
            </md-table-row>


            <song-list-item v-for="(item, index) in sheetList" :song-info="item" :key="'songs' + index">
            </song-list-item>
        </md-table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import {getSheetInfo, getSongsBySheetId, getUserBasicInfo} from '@/api/request'
    import SongListItem from '@/components/SongListItem'
    import {transToShow} from '@/utils/transdate'

    export default {
        name: 'Sheet',
        watch: {
          '$route' (to, from) {
            this.fetchSheetData();
          }
        },
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
                sheetList: []
            }
        },
        mounted() {
            this.fetchSheetData();
        },
        methods: {
          fetchSheetData() {
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

                  getSongsBySheetId(this.sheetId).then(data => {
                      this.sheetList = data
                  })
              })
          }
        },
        computed: {
            ...mapGetters(['getUser']),
            isSelf () {
                return this.getUser.uuid === this.sheet.shtCreator;
            },
            createdTime() {
                return transToShow(this.sheet.createdAt);
            }
        },
        components: {
            SongListItem
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/public.scss";

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
                padding-bottom: 200px;
                border: 1px solid #EAEAEA;
                background-size: cover !important;
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