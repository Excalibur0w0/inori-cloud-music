<template>
    <div class="user-center">
        <div class="user-wap">
            <div class="avartar">
                <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1571107210&di=39c571dac0dc82a931dbfc2ce38e439b&src=http://hbimg.b0.upaiyun.com/cd9a0aa4ee80e126d3bea1f06c305c100fc82d396ffce-lMjAYv_fw658">
            </div>
            <div class="info">
                <div class="features">
                    <div>{{getUser ? getUser.username : 'null'}}</div>
                    <div>等级2</div>
                    <div>男</div>
                </div>
                <div class="active">
                    <div>动态</div>
                    <div>关注</div>
                    <div>粉丝</div>
                </div>
                <div>个人介绍：</div>
                <div>社交网络：</div>
                <div>所在地区：<span>四川省 成都市</span></div>
            </div>
            <div class=""></div>
        </div>
        <div class="sheet-wap">
            <div>
                <div class="banner">
                    <div class="msg">
                        我创建的歌单 (3)
                    </div>
                </div>
                <div class="sht-list">
                    <div :style="`background: url(http://localhost:5333/provider-music/io/resource/img?imgPath=${item.imgPath}) 50% 50%; background-size: cover;`"
                         class="sht-wap" @click="goToSheet(item)"
                         v-for="(item, index) in mySheets"
                         :key="index + 'sht-create'">
                        {{item.shtName}}
                    </div>
                </div>
            </div>

            <div>
                <div class="banner">
                    <div class="msg">
                        我收藏的歌单 (3)
                    </div>
                </div>
                <div class="sht-list">
                    <div  class="sht-wap" v-for="(item, index) in sheetList.slice(4)" :key="index + 'sht-create'">
                        {{item}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'UserCenter',
        data() {
            return {
                sheetList: [
                    // 3,3,4,5,6,7,
                    // 3,3,4,5,6,7,
                ]
            }
        },
        computed: {
            ...mapGetters([
                'getUser',
                'mySheets'
            ])
        },
        mounted() {

        },
        methods: {
            goToSheet (sheet) {
                let sheetId = sheet.uuid;

                this.$router.push({
                    name: 'Sheet',
                    params: { id: sheetId }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/public.scss";

    .user-center {
        width: 100%;
        padding: 0 $std_padding;
        .user-wap {
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
        .sheet-wap {
            .banner {
                border-top: 1px #666 solid;
                border-bottom: 1px #666 solid;
                padding: 5px 12px;
                margin: 0px -12px;
            }
            .sht-list {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                margin-bottom: $std_margin;
                .sht-wap {
                    width: 12%;
                    padding-bottom: 12%;
                    height: 0px;
                    margin-right: $sml_margin;
                    margin-top: $big_margin;
                }
            }
        }
    }
</style>