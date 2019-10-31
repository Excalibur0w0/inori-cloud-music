<template>
    <div class="comment-song">
        <div>
            <div class="write-titie">听友评论</div>
            <md-field class="clear-margin-bottom">
                <label>快来留下你的评论吧</label>
                <md-input v-model="newComment" @keyup="typeComment"></md-input>
            </md-field>
        </div>
        <div class="comment-lookup">

<!--            <div class="comment-group">-->
<!--                <div class="comment-group-title">精彩评论</div>-->
<!--            </div>-->
            <div class="comment-group">
<!--                <div class="comment-group-title">最新评论</div>-->
                <comment-item v-for="(comment, index) in comments" :key="'song_comments' + index" :comment="comment">
                </comment-item>
            </div>
        </div>
    </div>
</template>

<script>
    import CommentItem from '@/components/CommentItem'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'Comment',
        props: ['song'],
        data() {
            return {
                // 用户即将写下的新的评论
                newComment: '',
                comment: {
                    content: '发生的获得阿大会',
                    createdAt: '2019-10-31',
                    countFavorite: 0,
                    uuid: '',
                }
            }
        },
        components: {
            CommentItem
        },
        mounted() {
            if (this.song.uuid) {
                this.getCommentsBySongId(this.song.uuid)
            }
        },
        methods: {
            ...mapActions(['getCommentsBySongId', 'createComment']),
            typeComment(e) {
                // 用户按下enter键位
                if(e.keyCode === 13 && this.song) {
                    this.createComment({
                        songId: this.song.uuid,
                        content: this.newComment
                    })
                }
            }
        },
        computed: {
            ...mapGetters(['comments'])
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/public";

    .comment-song {
    }
    .clear-margin-bottom {
        margin-bottom: 0px !important;
    }

    .write-titie {
        font-size: $sml_title_size;
        padding: $sml_padding 0;
    }
    .comment-group-title {
        font-size: $big_size;
        border-bottom: 0.5px #666 solid;
        padding-bottom: $sml_padding;
    }
    .comment-lookup {
        height: 250px;
    }
    .comment-group {
        //margin-top: $big_margin;

    }

</style>