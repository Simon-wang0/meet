<template>
    <view class="container">

        <u-gap height="40"></u-gap>
        <u-row justify="start">
            <u-col span="3" offset="1">
                <u--text :text="$t('userinfo.username')"></u--text>
            </u-col>
            <u-col span="6">
                <u--input v-model="personInfo.username" placeholder="填写你心仪对象的真实姓名" border="bottom" clearable></u--input>
            </u-col>
        </u-row>
        <u-gap height="20"></u-gap>
        <u-row justify="start">
            <u-col span="3" offset="1">
                <u--text :text="$t('userinfo.sex')"></u--text>
            </u-col>
            <u-col span="6">
                <u--input v-model="personInfo.sex" placeholder="填写你心仪对象的性别" border="bottom" @focus="pickerShow = true"
                    clearable></u--input>
            </u-col>
        </u-row>
        <u-gap height="20"></u-gap>
        <u-row justify="start">
            <u-col span="3" offset="1">
                <u--text :text="$t('userinfo.address')"></u--text>
            </u-col>
            <u-col span="6">
                <u--input v-model="personInfo.address" @focus="open" placeholder="填写你心仪对象的地址" border="bottom" clearable>
                </u--input>
            </u-col>
        </u-row>
        <u-gap height="20"></u-gap>
        <u-row justify="start">
            <u-col span="3" offset="1">
                <u--text :text="$t('userinfo.company')"></u--text>
            </u-col>
            <u-col span="6">
                <u--input v-model="personInfo.company" placeholder="填写你心仪对象的公司" border="bottom" clearable></u--input>
            </u-col>
        </u-row>
        <u-gap height="20"></u-gap>
        <u-row justify="start">
            <u-col span="3" offset="1">
                <u--text :text="$t('userinfo.school')"></u--text>
            </u-col>
            <u-col span="6">
                <u--input v-model="personInfo.school" placeholder="填写你心仪对象的学校" border="bottom" clearable></u--input>
            </u-col>
        </u-row>
        <u-gap height="40"></u-gap>
        <u-row>
            <u-col offset="2" span="3">
                <u-button type="primary" :plain="true" text="返回上一页" @click="goBack"></u-button>
            </u-col>
            <u-col offset="2" span="3">
                <u-button type="primary" text="完成" @click="comfirmFinal"></u-button>
            </u-col>
        </u-row>
        <u-gap height="20"></u-gap>
        
        <u-row>
            <u-col offset="1" span="8">
                <u--text text="*如果没有,可以点击_跳过_" @click="skip" color="grey"></u--text>
            </u-col>

            </u-col>
        </u-row>
        <!-- picker -->
        <view class="pickerStyle">
            <u-picker :show="pickerShow" :columns="sexEnum" @cancel="pickerShow = false" @confirm="confirmPicker">
            </u-picker>
        </view>
        <!-- address picker -->
        <cityPicker :defaultValue="defaultValue" :mask-close-able="maskCloseAble" @confirm="confirm" @cancel="cancel"
            :visible="visible" />
    </view>
</template>

<script>
    import cityPicker from '@/components/piaoyi-cityPicker/pioayi-cityPicker.vue'
    import {
        mapMutations
    } from 'vuex'
    export default {
        name: 'favoriteInfo',
        props: {

        },
        components: {
            cityPicker
        },
        data() {
            return {
                pickerShow: false,
                sexEnum: [
                    ['男', '女']
                ],
                personInfo: {
                    nickname: '',
                    sex: '',
                    address: '',
                    company: '',
                    school: '',
                },
                visible: false,
                maskCloseAble: true,
                str: '',
                defaultValue: ''
            }
        },
        methods: {
            ...mapMutations({
                setUserInfo: 'getFavoriteId/changeFavoInfo'
            }),
            comfirmFinal() {
                this.$emit('favoInfoCom', this.personInfo)

            },
            confirmPicker(e) {
                this.personInfo.sex = e.value[0]
                this.pickerShow = false;
            },
            goBack() {
                this.$emit('goBack')
            },
            // 下面是address Picker相关的函数
            open() {
                this.visible = true
            },
            confirm(val) {
                this.personInfo.address = val.name
                this.visible = false
            },
            cancel() {
                this.visible = false
            },
            // ----------------------
            skip() {
                this.$emit('skip')
           
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        position: relative;
        width: auto;
        height: auto;
    }
</style>
