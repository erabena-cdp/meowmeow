<template>
  <div>
    <h2>Create User</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label>First Name:</label>
        <input v-model="user.fName" required />
      </div>
      <div>
        <label>Middle Name:</label>
        <input v-model="user.mName" />
      </div>
      <div>
        <label>Last Name:</label>
        <input v-model="user.lName" required />
      </div>
      <button type="submit">Save</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const user = reactive({
  fName: '',
  mName: '',
  lName: ''
})

const message = ref('')

async function submitForm() {
  try {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    const data = await response.json()
    message.value = `User created with ID: ${data.id}`
    // Reset form
    user.fName = ''
    user.mName = ''
    user.lName = ''
  } catch (error) {
    console.error(error)
    message.value = 'Error creating user'
  }
}
</script>
