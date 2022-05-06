<template>
    <view>
        <h1>caution</h1>
        <u-row>
            <u-col offset="2" span="3">
                <u-button type="primary" :plain="true" text="返回上一页" @click="goBack"></u-button>
            </u-col>
            <u-col offset="2" span="3">
                <u-button type="primary" text="阅读完成并同意" @click="comfirm"></u-button>
            </u-col>
        
        </u-row>
    </view>
</template>

<script>
    export default {
        name:'annoucement',
        data() {
            return {
                
            }
        },
        methods: {
            goBack(){
                this.$emit('goBack')
            },
            comfirm(){
                //跳转到首页
            }
        }
    }
</script>

<style>

</style>
