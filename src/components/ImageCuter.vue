<template>
    <div>
        <md-dialog :md-active.sync="showCuter">
            <md-dialog-title>裁减头像</md-dialog-title>

            <md-dialog-content class="cuter-content">
                <div class="target">
                    <vue-cropper
                            autoCrop
                            ref="cropper"
                            :img="img"
                            fixed
                            :fixedNumber="[1,1]"
                            centerBox/>
                </div>

                <div class="operation">
                    <md-button @click="cancel">
                        取消
                    </md-button>
                    <md-button @click="cutImg">
                        确认
                    </md-button>
                </div>
            </md-dialog-content>
        </md-dialog>
    </div>
</template>

<script>
    import {VueCropper} from 'vue-cropper'

    export default {
        name: 'ImageCuter',
        props: ['img', 'showCuter'],
        components: {
            VueCropper
        },
        methods: {
            cutImg() {
                this.$refs.cropper.getCropData(data => {
                    this.$emit('ok', data);
                })
            },
            cancel() {
                this.$emit('cancel');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/public";

    .cuter-content {
        border-top: .5px solid #666;
        padding-top: $std_padding + 5px;
        overflow: hidden;
        &::after {
            clear: both;
            content: ' ';
            visibility: visible;
            display: block;
            height: 0;
        }

        .target {
            width: 800px;
            height: 600px;
        }

        .operation {
            margin-top: 5px;
            display: flex;
            float: right;
        }
    }
</style>