<template>
    <div class="discovery-wap">
        <div class="discovery-header">
            <span class="tab-title">
                个性推荐
            </span>
        </div>

        <div class="discovery-content">
            <carousel :autoplay="true" :autoplayTimeout="2000" :autoplayHoverPause="true" :perPage="3">
                <slide>
                    <img src="http://p1.music.126.net/XFqofQo7pmZ0RrkQtZRjPg==/109951164453388148.jpg" alt="">
                </slide>
                <slide>
                    <img src="http://p1.music.126.net/NFpdj6K2Fptf5e-AewtJ5A==/109951164453325676.jpg" alt="">
                </slide>
                <slide>
                    <img src="http://p1.music.126.net/C37WAY_IftgoFmF4_MoD5w==/109951164453369881.jpg" alt="">
                </slide>
            </carousel>

            <div class="title-has-border">
                推荐歌单
            </div>

            <div class="recommand-sheet-wap">
                <div v-for="(item, index) in recommandSheets"
                     :key="'rec_sheets' + index"
                     class="img-cover"
                     :style="`background: url(http://localhost:5333/provider-music/io/resource/img?imgPath=${item.imgPath}) 50% 50%;`"
                     @click="goToSheet(item)"
                >
                    {{item.shtName}}
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    import {getAllSheet} from '@/api/request'

    export default {
        name: 'Discovery',
        data() {
            return {
                recommandSheets: []
            }
        },
        components: {
            Carousel,
            Slide
        },
        methods: {
            getLatestSheet() {
                getAllSheet().then(data => {
                    this.recommandSheets = data;
                })
            },
            goToSheet(sheet) {
                let sheetId = sheet.uuid;

                this.$router.push({
                    name: 'Sheet',
                    params: { id: sheetId }
                })
            }
        },
        mounted() {
            this.getLatestSheet()
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/public-class.scss";

    .discovery-wap {
        padding: 0 $std_padding;
        width: 100%;
        /*z-index: 10;*/
        .discovery-header {
            border-bottom: 0.5px #666 solid;
            margin-bottom: 20px;
            margin-top: 12px;
            text-align: center;
            .tab-title {
                font-size: $big_size;
                vertical-align: super;
            }
        }
        .discovery-content {
            // padding: 0 $super_big_padding;

            .recommand-sheet-wap {
                margin-top: $std_margin;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                & > div {
                    width: 12%;
                    padding-bottom: 12%;
                    height: 0px;
                    background: antiquewhite;
                    margin-right: $std_margin;
                    margin-bottom: $std_margin;
                }
            }
        }
    }
</style>