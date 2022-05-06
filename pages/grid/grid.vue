<template>
    <view class="warp">

        <!-- 获取位置 -->
        <template>
            <button @click="getAdress">7adreess</button>
        </template>
        
        <u-button @click="guide" text="新手指导"></u-button>
    </view>
</template>

<script>
    export default {
        components: {

        },
        data() {
            return {

            }
        },
        computed: {

        },
        onLoad() {

        },
        methods: {
            guide(){
                uni.navigateTo({
                    url: '/pages/new-person-guide/new-person-guide'
                })
            },
            getAdress() {
                const userInfo = uniCloud.getCurrentUserInfo();
                console.log("user", userInfo)  
                uni.getLocation({
                    type: 'wgs84',
                    success: function(res) {
                        //获取位置成功后 调用云函数
                        uniCloud.callFunction({
                            name: 'location',
                            data: {
                                res: res,
                                userInfo: userInfo
                            }
                        }).then(res => {
                            console.log(res);
                        })
                    },
                    fail: () => {
                        uni.showModal({
                            content: '获取位置失败'
                        })
                    }
                });



            }

        }
    }
</script>

<style lang="scss" scoped>
    /* #ifndef APP-NVUE */
    page {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        background-color: #fff;
        min-height: 100%;
        height: auto;
    }

    view {
        font-size: 14px;
        line-height: inherit;
    }

    /* #endif */

    /* #ifdef APP-NVUE */
    .warp {
        background-color: #fff;
    }

    /* #endif */
</style>
