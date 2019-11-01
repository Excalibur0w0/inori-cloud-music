<template>
    <div class="comment-item">
        <div class="comment-avatar">
            <img :src="userAvatar" alt="">
        </div>
        <div class="comment-content-wap">
            <div class="comment-content">
                <router-link to="" style="color: #6CF;">
                    {{comment.uname}} :
                </router-link>
                {{comment.content}}
            </div>
            <div class="comment-meta">
                <div>{{transDate(comment.createdAt)}}</div>
                <div>
                    举报 回复 点赞
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {transToShow} from '@/utils/transdate'
    import { mapGetters } from 'vuex';

    export default {
        name: 'CommentItem',
        props: {
            comment: {
                default: null,
                type: Object
            }
        },
        methods: {
            transDate(date) {
                return transToShow(date)
            }
        },
        computed: {
            ...mapGetters(['avatarPath']),
            userAvatar() {
                return this.avatarPath + this.comment.avatar
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/public";

    .comment-item {
        padding: $std_padding 0;
        display: flex;
        justify-content: flex-start;
        border-bottom: .5px solid #666;

        .comment-avatar {
            width: 60px;
            height: 60px;
            background-color: white;
            border-radius: 50%;
            overflow: hidden;
            > img {
                object-fit: cover;
            }
        }
        .comment-content-wap {
            width: 100%;
            /*width: calc(100% - 60px);*/
            margin-left: $std_margin;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .comment-content {

            }
            .comment-meta {
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>