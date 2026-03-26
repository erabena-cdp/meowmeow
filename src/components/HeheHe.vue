<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from '@/stores/ts'

const store = useMessage()

const message = ref()

const submit = () => {
  store.setMsg(message.value)
}
</script>

<template>
  <div></div>
</template>
