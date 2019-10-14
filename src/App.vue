<template>
    <div id="app">
        <song-sheet-list></song-sheet-list>
        <router-view/>
    </div>
</template>

<script>
    import SongSheetList from '@/components/SongSheetList'

    export default {
        name: 'app',
        components: {
            SongSheetList
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
