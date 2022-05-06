<template>
    <view class="container">
        <u-gap height="40"></u-gap>
        <u-row justify="start">
            <u-col span="3" offset="1">
                <u--text :text="$t('userinfo.nickname')"></u--text>
            </u-col>
            <u-col span="6">
                <u--input v-model="personInfo.nickname" placeholder="一定要填写真实姓名" border="bottom" clearable></u--input>
            </u-col>
        </u-row>
        <u-gap height="20"></u-gap>
        <u-row justify="start">
            <u-col span="3" offset="1">
                <u--text :text="$t('userinfo.sex')"></u--text>
            </u-col>
            <u-col span="6">
                <u--input v-model="personInfo.sex" placeholder="请输入性别" border="bottom" @focus="pickerShow = true"
                    clearable></u--input>
            </u-col>
        </u-row>
        <u-gap height="20"></u-gap>
        <u-row justify="start">
            <u-col span="3" offset="1">
                <u--text :text="$t('userinfo.address')"></u--text>
            </u-col>
            <u-col span="6">
                <u--input v-model="personInfo.address" @focus="open" placeholder="请输入地址" border="bottom" clearable></u--input>
                
                
            </u-col>
        </u-row>
        <u-gap height="20"></u-gap>
        <u-row justify="start">
            <u-col span="3" offset="1">
                <u--text :text="$t('userinfo.company')"></u--text>
            </u-col>
            <u-col span="6">
                <u--input v-model="personInfo.company" placeholder="请输入公司" border="bottom" clearable></u--input>
            </u-col>
        </u-row>
        <u-gap height="20"></u-gap>
        <u-row justify="start">
            <u-col span="3" offset="1">
                <u--text :text="$t('userinfo.school')"></u--text>
            </u-col>
            <u-col span="6">
                <u--input v-model="personInfo.school" placeholder="请输入学校" border="bottom" clearable></u--input>
            </u-col>
        </u-row>
        <u-gap height="40"></u-gap>
        <u-row>
            <u-col offset="4" span="4">
                <u-button type="primary" text="完成" @click="comfirmFinal"></u-button>
            </u-col>
        </u-row>
        <!-- sex picker -->
        <view class="pickerStyle">
            <u-picker :show="pickerShow" :columns="sexEnum" @cancel="pickerShow = false" @confirm="confirmPicker">
            </u-picker>
        </view>
        <!-- address picker -->
        <cityPicker :defaultValue="defaultValue" :mask-close-able="maskCloseAble" @confirm="confirm" @cancel="cancel" :visible="visible" />
    </view>
</template>

<script>
    import cityPicker from '@/components/piaoyi-cityPicker/pioayi-cityPicker.vue'
    import {
        mapMutations
    } from 'vuex'
    export default {
        name: 'personalInfo',
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
                setUserInfo: 'user/login'
            }),
            comfirmFinal() {
                this.$emit('personInfoCom', this.personInfo);

            },
            confirmPicker(e) {
                this.personInfo.sex = e.value[0]
                this.pickerShow = false;
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
            }
            // ----------------------
            

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
