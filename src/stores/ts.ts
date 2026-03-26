import { ref, computed } from 'vue'

import { defineStore } from 'pinia'

export const useMessage = defineStore('message', () => {
  const message = ref()
  const message2 = computed(() => message.value + '!!!')

  function setMsg(msg: string) {
    message.value = msg
    console.log('Message updated:', message.value)
  }

  return { message, message2, setMsg }
})
