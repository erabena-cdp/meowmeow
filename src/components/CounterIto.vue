<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()
</script>

<template>
  <main>
    <h1>Meow</h1>
    store.count: {{ store.count }}
    <button @click="store.increment()">Increment</button>
    <button @click="store.decrement()">Decrement</button>
  </main>
</template>
