<template>
        <md-progress-spinner class="progress-wap" v-if="model.show" :md-diameter="100" :md-stroke="10" md-mode="indeterminate">
        </md-progress-spinner>
</template>

<script>
    export default {
        name: 'ProgressSpinner',
        data () {
            return {
                model: {
                    show: false
                }
            }
        }
    }
</script>

<style scoped>
    .progress-wap {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        z-index: 500;
    }
</style>