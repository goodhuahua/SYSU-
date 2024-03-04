<template>
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <n-button @click="goback">回首页</n-button>
      </template>
    </n-result>
  </template>
  <script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter()
    const goback = () => {
      router.push({path: '/'})
    }
    </script>