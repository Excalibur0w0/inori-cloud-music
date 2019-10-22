<template>
    <md-dialog-prompt
            :md-active.sync="model.show"
            v-model="model.value"
            :md-title="model.title"
            md-input-maxlength="30"
            :md-content="model.content"
            :md-input-placeholder="model.placeholder"
            :md-confirm-text="model.confirmText"
            :md-cancel-text="model.cancelText"
            @md-confirm="close(model.value)"
            @md-cancel="close()"
    />
</template>

<script>
    export default {
        name: 'Prompt',
        data(){
            return {
                model: {
                    show: false,
                    callback: null,
                    title: undefined,
                    content: undefined,
                    placeholder: undefined,
                    confirmText: undefined,
                    cancelText: undefined,
                    value: undefined
                }
            }
        },
        methods: {
            close(text){
                this.model.show = false;
                if(this.model.callback){
                    this.model.callback(text);
                }
            },
        }
    }
</script>

<style scoped>

</style>