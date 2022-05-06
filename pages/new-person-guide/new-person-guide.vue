<template>
    <view>

        <view>
            <u-steps :current="currentStep">
                <u-steps-item title="个人信息">
                </u-steps-item>
                <u-steps-item title="心仪信息"></u-steps-item>
                <u-steps-item title="必读事项"></u-steps-item>
            </u-steps>

            <!-- 个人信息 -->
            <personalInfo ref="p" v-if="isPShow" @personInfoCom="PInfoCom"></personalInfo>
            <favoriteInfo v-if="isFShow" @favoInfoCom="FInfoCom" @goBack="goBackToP" @skip="skip"></favoriteInfo>
            <annoucement v-if="annShow" @goBack="goBackToF"></annoucement>
        </view>
    </view>
</template>

<script>
    const dbUser = uniCloud.database().collection('uni-id-users')
    import {
        mapMutations
    } from 'vuex'
    import personalInfo from '@/pages/new-person-guide/personal-info/personal-info'
    import favoriteInfo from '@/pages/new-person-guide/favorite-info/favorite-info'
    import annoucement from '@/pages/new-person-guide/annoucement/annoucement'
    export default {
        components: {
            personalInfo,
            favoriteInfo,
            annoucement
        },
        data() {
            return {
                currentStep: "0",
                isPShow: true,
                isFShow: false,
                annShow: false,
            }
        },
        methods: {
            ...mapMutations({
                setUserInfo: 'getFavoriteId/changeFavoInfo',
                setFavoInfo: 'user/login'
            }),
            PInfoCom(info) {
                //数据存入数据库
                if (info) {
                    dbUser.where('_id==$env.uid')
                        .update({
                            nickname: info.nickname,
                            gender: info.sex,
                            address: info.address,
                            company: info.company,
                            school: info.school
                        }).then((res) => {
                            this.isPShow = false
                            this.isFShow = true
                            this.currentStep = "1"
                            //this.setUserInfo(info)
                        }).catch((err) => {
                            uni.showToast({
                                icon: "error",
                                title: err.message.substr(8, 10)
                            })
                        })
                }
                console.log("Pinfo", info)

            },
            FInfoCom(info) {
                this.currentStep = "2"
                this.annShow = true
                this.isFShow = false
                //心仪人确定之后 需要搜索人 如果存在就存入数据 
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
            if (res.result.data.length == 0) {
                uni.showToast({
                    title: '很抱歉，未找到',
                    icon: 'error'
                });
            } else {
                //有数据
                // this.setFavoInfo(info)
                uni.showToast({
                    title: '心仪已同步',
                    icon: 'success'
                });
            }

        }).catch((err) => {
            console.log(err.code); // 打印错误码
            console.log(err.message); // 打印错误内容
        })
        console.log("Finfo", info)
    },
    goBackToP() {
            this.isPShow = true
            this.isFShow = false
            this.currentStep = "0"
        },
        goBackToF() {
            this.annShow = false
            this.isFShow = true
            this.currentStep = "1"
        },
        skip() {
            this.currentStep = "2"
            this.annShow = true
            this.isFShow = false
        }
    }
    }
</script>

<style lang="scss" scoped>

</style>
