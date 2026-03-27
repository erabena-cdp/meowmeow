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
  <div>
    <h1>Hehe</h1>
    <input v-model="message" placeholder="Type something..." />
    <button @click="submit">Submit</button>
    <p>Message: {{ store.message }}</p>
    <p>Message2: {{ store.message2 }}</p>
  </div>
</template>
