<template>
    <md-dialog-alert
            class="alert-wap"
            :md-active.sync="model.show"
            :md-title="model.title"
            :md-content="model.content"
            @md-confirm="cancel"/>
</template>

<script>
    export default {
        name: 'Alert',
        data: () => ({
            model: {
                show: false,
                title: null,
                content: null,
                callback: null
            }
        }),
        methods: {
            cancel() {
                this.callback();
            }
        }
    }
</script>

<style>
    .alert-wap {
        z-index: 20;
    }
</style>