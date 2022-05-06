<template>
    <view class="u-demo-block__content">
        <u-divider text="姓名" textPosition="left"></u-divider>
        <u-row>
            <u-col span="10">
                <view class="input-style">
                    <u--input v-if="isEditInfo" placeholder="姓名" shape="circle" border="surround"
                        v-model="favoriteInfo.nickname">
                    </u--input>
                    <u--input v-else shape="circle" color="#ababab" border="surround" v-model="favoriteInfo.nickname"
                        disabled>
                    </u--input>
                </view>
            </u-col>
        </u-row>
        <u-divider text="性别" textPosition="left"></u-divider>
        <u-row>
            <u-col span="10">
                <view class="input-style">
                    <u--input v-if="isEditInfo" placeholder="性别" shape="circle" border="surround"
                        v-model="favoriteInfo.gender" @focus="pickerShow = true">
                    </u--input>
                    <u--input v-else shape="circle" color="#ababab" border="surround" v-model="favoriteInfo.gender"
                        disabled>
                    </u--input>
                </view>
            </u-col>
        </u-row>
        <u-divider text="地区" textPosition="left"></u-divider>
        <u-row>
            <u-col span="10">
                <view class="input-style">
                    <u--input v-if="isEditInfo" placeholder="地区" shape="circle" border="surround"
                        v-model="favoriteInfo.address">
                    </u--input>
                    <u--input v-else shape="circle" color="#ababab" border="surround" v-model="favoriteInfo.address"
                        disabled>
                    </u--input>
                </view>
            </u-col>
        </u-row>
        <u-divider text="学校" textPosition="left"></u-divider>
        <u-row>
            <u-col span="10">
                <view class="input-style">
                    <u--input v-if="isEditInfo" placeholder="学校" shape="circle" border="surround"
                        v-model="favoriteInfo.school">
                    </u--input>
                    <u--input v-else shape="circle" color="#ababab" border="surround" v-model="favoriteInfo.school"
                        disabled>
                    </u--input>
                </view>
            </u-col>
        </u-row>
        <u-divider text="工作地点" textPosition="left"></u-divider>
        <u-row>
            <u-col span="10">
                <view class="input-style">
                    <u--input v-if="isEditInfo" placeholder="工作地点" shape="circle" border="surround"
                        v-model="favoriteInfo.company">
                    </u--input>
                    <u--input v-else shape="circle" color="#ababab" border="surround" v-model="favoriteInfo.company"
                        disabled>
                    </u--input>
                </view>
            </u-col>
        </u-row>
        <u-gap></u-gap>
        <u-row>
            <u-col span="4" offset="4">
                <u-button type="primary" shape="circle" :loading="isLoading" :plain="true" text="找寻"
                    @click="searchPerson"></u-button>
            </u-col>
        </u-row>

        <!-- fab -->
        <uni-fab></uni-fab>
        <!-- picker -->
        <view class="pickerStyle">
            <u-picker :show="pickerShow" :columns="sexEnum" @cancel="pickerShow = false" @confirm="confirmPicker">
            </u-picker>
        </view>
        {{isEditInfo}}
    </view>

</template>

<script>
    import {
        mapMutations,
        mapGetters
    } from 'vuex';
    const db = uniCloud.database() //代码块为cdb
    export default {
        data() {
            return {
                isLoading: false,
                pickerShow: false,
                sexEnum: [
                    ['男', '女']
                ]

            }
        },
        created() {

        },
        computed: {
            ...mapGetters({
                favoriteInfo: 'getFavoriteId/info',
                isEditInfo: 'getFavoriteId/isEdit'
            })
        },
        methods: {
            //修改心仪信息 后续开发可用到
            ...mapMutations({
                setFavoriteInfo: 'getFavoriteId/changeFavoInfo'
            }),
            //查找该用户是否有心意人
            searchPerson() {
                this.isLoading = true;
                console.log("xini==============", this.favoriteInfo)
                db.collection('uni-id-users').field({
                        'nickname': true,
                        'gender': true,
                        'address': true,
                        'company': true,
                        'school': true,
                    })
                    .where({
                        nickname: this.favoriteInfo.nickname,
                        gender: this.favoriteInfo.gender,
                        address: this.favoriteInfo.address,
                        company: this.favoriteInfo.company,
                        school: this.favoriteInfo.school,
                    })
                    .get().then((res) => {
                        console.log(res.result.data)
                        this.isLoading = false;
                        if (res.result.data.length == 0) {
                            uni.showToast({
                                title: '很抱歉，未找到',
                                icon: 'error'
                            });
                        }else{
                            //有数据
                            uni.showToast({
                                title: '心仪已同步',
                                icon: 'success'
                            });
                        }

                    }).catch((err) => {
                        this.isLoading = false;
                        console.log(err.code); // 打印错误码
                        console.log(err.message); // 打印错误内容
                    })


            },
            fabTrigger(event) {

            },
            confirmPicker(e) {
                this.setFavoriteInfo({
                    "gender": e.value[0]
                })
                // this.favoriteInfo.gender = e.value[0];         
                this.pickerShow = false;
            }

        }
    }
</script>

<style lang="scss">
    .input-style {
        margin: 0px 0px 10px 28px;
        background-color: #f4f5ff;
        border-radius: 22px;
        border-bottom-style: inset;
    }

    .pickerStyle {
        max-width: min-content;
        margin: 0px 0px 0px 30px;
    }

    .button-style {}
</style>
