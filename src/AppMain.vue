<template>
    <div>
        <div class="header-wap">
            <music-header></music-header>
        </div>
        <div class="menu-list-wap">
            <menu-list></menu-list>
        </div>
        <div class="content-wap">
            <router-view/>
        </div>
        <music-player class="music-player-wap"></music-player>
    </div>
</template>

<script>
    import MenuList from '@/components/MenuList'
    import MusicHeader from '@/components/MusicHeader'
    import MusicPlayer from '@/components/MusicPlayer'

    export default {
        data() {
            return {}
        },
        components: {
            MenuList,
            MusicHeader,
            MusicPlayer
        }
    }
</script>

<style lang="scss">
    @import './assets/scroll-bar';

    body, div {
        @extend .scroll-bar;
    }

    .header-wap {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 20;
    }

    .menu-list-wap {
        min-width: 320px;
        position: fixed;
        top: 64px;
    }

    .content-wap {
        display: flex;
        justify-content: flex-start;
        margin-left: 320px;
        margin-top: 64px;
    }

    .music-player-wap {
        z-index: 20;
        position: fixed;
        bottom: 0;
        width: 100%;
    }

</style>