<template>
    <!-- 顶部导航栏组件 -->
    <TopBar></TopBar>

    <!-- 主容器 -->
    <n-card>
        <!-- 一个带有类名 "svg" 的 div -->
        <div class="svg">
            <!-- 内容的 div -->
            <div style="max-width: 1000px; margin: 0 auto;margin-top :10px">
                <!-- 加载时显示的旋转器组件 -->
                <n-spin :show="loading" v-if="showList" size="small">
                    <!-- 问题项列表 -->
                    <ul style="background: none;list-style: none;padding: 0 20px;">
                        <!-- 遍历 items 数组中的每个项 -->
                        <li class="question-item" v-for="(item, index) in items" :key="index">
                            <!-- 问题内容 -->
                            <div style="position: relative;">
                                <p style="font-size: 14;font-weight: 700;margin-bottom: 5px;" v-html="item.content">
                                </p>
                                <!-- 问题的时间戳 -->
                                <div style="text-align: right; color: #ccc;font-size: 12px;">
                                    {{ formatTime(item.created_at) }}
                                </div>
                            </div>
                            <!-- 分隔线 -->
                            <n-divider style="margin: 10px 0" />
                            <!-- 回复部分 -->
                            <div style="position: relative;">
                                <!-- 如果有回复 -->
                                <div v-if="item.reply">
                                    <!-- 回复者的头像 -->
                                    <p style="display: flex;margin-bottom: 5px;">
                                        <span>
                                            <n-avatar round :size="40" :src="generateUrl(item.avatar)" />
                                        </span>
                                        <!-- 回复内容 -->
                                        <div style="margin-left:20px" v-html="item.reply"></div>
                                    </p>
                                    <!-- 回复的时间戳 -->
                                    <div style="text-align: right; color: #ccc;font-size: 12px;">
                                        {{ formatTime(item.updated_at) }}
                                    </div>
                                </div>
                                <!-- 如果没有回复 -->
                                <p style="color: red;" v-else>暂未回复</p>
                            </div>
                        </li>
                    </ul>
                </n-spin>

                <!-- 提交新问题的部分 -->
                <section v-else>
                    <!-- 富文本编辑器组件 -->
                    <RichTextEditor v-model="question"></RichTextEditor>
                    <div style="margin-top: 10px;text-align: center;">
                        <!-- 提交按钮 -->
                        <n-button @click="submit" size="large" type="primary">提交</n-button>
                        <!-- 返回按钮 -->
                        <n-button @click="showList = true" style="margin-left: 20px;" size="large">返回</n-button>
                    </div>
                </section>
            </div>
        </div>
    </n-card>

    <!-- 操作按钮的固定组件 -->
    <n-affix style="position: fixed;right: 30px;" :trigger-bottom="1000" v-if="showList" :bottom="60" :top="0">
        <!-- "提问" 按钮，用于提出新问题 -->
        <n-button @click="showList = !showList" size="medium" round type="primary">
            <n-icon>
                <AddCircleSharp />
            </n-icon> 提问</n-button>
        <br>
        <!-- "返回" 按钮，用于返回 -->
        <n-button style="margin-top:10px" @click="goback" size="medium" round>
            <n-icon>
                <ArrowBack />
            </n-icon> 返回</n-button>
    </n-affix>
</template>
<script setup>
import TopBar from '../components/TopBar.vue';
import { AddCircleSharp, ArrowBack } from '@vicons/ionicons5'
import axios from '../request';
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { ref, onMounted,inject } from 'vue'
import {getText,isNull,generateUrl} from '../util'
import RichTextEditor from '../components/RichTextEditor.vue';
const items = ref([])
let showList = ref(true);
let question = ref("")
let loading = ref(false)
const goback = () => { window.history.go(-1) }
const teacherId = useRoute().params.id
const loadList = () => {
    loading.value = true
    axios.get(`/teacher/${teacherId}/answer`).then(res => {
        const { data, code } = res.data
        if (code === 200) {
            items.value = data.list || []
        }
        loading.value = false
    })
}

onMounted(() => {
    loadList()
})
const message = inject("message")
const formatTime = (str) => dayjs(str).format("YYYY-MM-DD HH:mm:ss")
const submit = () => {
    const text = getText(question.value)
    if (isNull(text)) {
        message.error("内容不能为空")
        return
    }
    axios.post(`/teacher/${teacherId}/ask`,{content:question.value}).then(res => {
        const {data,code} =res.data
        if (code === 200) {
            showList.value = true
            loadList()
        }
    })
}
</script>
<style scoped>
.question-item {
    padding: 20px;
    background: rgb(238, 255, 243);
    margin-top: 15px;
    border-radius: 10px;

}
.svg {
    width: 1850px;
    height: 1600px;
   
    background-image: url(bg.svg); /* The image used */
    background-size: cover; /* Added this line */
  }
</style>