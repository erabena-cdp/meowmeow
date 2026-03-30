<template>
  <div class="page-container">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>User Management</h1>
        <p class="subtitle">Create and manage user records</p>
      </div>

      <!-- Create User Form Card -->
      <div class="card">
        <div class="card-header">
          <h2>Create New User</h2>
          <div class="card-icon">👤</div>
        </div>
        
        <form @submit.prevent="submitForm" class="user-form">
          <div class="form-group">
            <label for="fName">First Name</label>
            <input 
              id="fName"
              v-model="user.fName" 
              type="text"
              placeholder="Enter first name"
              required 
              class="form-control"
            />
          </div>
          
          <div class="form-group">
            <label for="mName">Middle Name</label>
            <input 
              id="mName"
              v-model="user.mName" 
              type="text"
              placeholder="Enter middle name (optional)"
              class="form-control"
            />
          </div>
          
          <div class="form-group">
            <label for="lName">Last Name</label>
            <input 
              id="lName"
              v-model="user.lName" 
              type="text"
              placeholder="Enter last name"
              required 
              class="form-control"
            />
          </div>
          
          <button type="submit" class="btn btn-primary">
            <span class="btn-icon">➕</span>
            Create User
          </button>
        </form>
        
        <transition name="fade">
          <div v-if="message" :class="['alert', messageType]">
            {{ message }}
          </div>
        </transition>
      </div>

      <!-- User List Card -->
      <div class="card">
        <div class="card-header">
          <h2>User List</h2>
          <div class="card-icon">📋</div>
        </div>
        
        <div class="list-actions">
          <div class="search-section">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search by first, middle, or last name..."
              class="search-input"
            />
          </div>
          <div class="action-buttons">
            <button @click="fetchUsers" class="btn btn-secondary">
              <span class="btn-icon">🔄</span>
              Refresh List
            </button>
            <span v-if="filteredUsers.length > 0" class="user-count">
              Showing {{ filteredUsers.length }} of {{ users.length }} user{{ users.length !== 1 ? 's' : '' }}
            </span>
          </div>
        </div>
        
        <div v-if="filteredUsers.length > 0" class="table-container" :class="{ 'scrollable': filteredUsers.length > 7 }">
          <table class="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id" class="user-row">
                <td class="user-id">{{ user.id }}</td>
                <td>{{ user.fName }}</td>
                <td>{{ user.mName || '—' }}</td>
                <td>{{ user.lName }}</td>
                <td class="actions">
                  <button @click="deleteUser(user.id)" class="btn-icon-only" title="Delete user">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-else-if="usersLoaded && users.length === 0" class="empty-state">
          <div class="empty-icon">👥</div>
          <p>No users found. Create your first user above!</p>
        </div>
        <div v-else-if="usersLoaded && users.length > 0 && filteredUsers.length === 0" class="empty-state">
          <div class="empty-icon">🔍</div>
          <p>No users match your search.</p>
        </div>
        <div v-else-if="!usersLoaded" class="empty-state">
          <div class="empty-icon">🔍</div>
          <p>Click "Refresh List" to load users</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

interface User {
  id: string
  fName: string
  mName: string
  lName: string
}

const user = reactive({
  fName: '',
  mName: '',
  lName: ''
})

const message = ref('')
const messageType = ref('success')
const users = ref<User[]>([])
const usersLoaded = ref(false)
const searchQuery = ref('')

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) {
    return users.value
  }
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user =>
    user.fName.toLowerCase().includes(query) ||
    (user.mName && user.mName.toLowerCase().includes(query)) ||
    user.lName.toLowerCase().includes(query)
  )
})

async function submitForm() {
  try {
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    
    if (!response.ok) {
      throw new Error('Failed to create user')
    }
    
    const data = await response.json()
    message.value = `✅ User created successfully with ID: ${data.id}`
    messageType.value = 'success'
    
    user.fName = ''
    user.mName = ''
    user.lName = ''
    
    await fetchUsers()
    
    setTimeout(() => {
      message.value = ''
    }, 3000)
  } catch (error) {
    console.error(error)
    message.value = '❌ Error creating user. Please try again.'
    messageType.value = 'error'
    
    setTimeout(() => {
      message.value = ''
    }, 3000)
  }
}

async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:8080/users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    
    const data = await response.json()
    users.value = data
    usersLoaded.value = true
  } catch (error) {
    console.error('Error fetching users:', error)
    message.value = '❌ Error loading users'
    messageType.value = 'error'
    
    setTimeout(() => {
      message.value = ''
    }, 3000)
  }
}

async function deleteUser(userId: string) {
  if (confirm(`Are you sure you want to delete user ${userId}?`)) {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete user')
      }
      
      message.value = `✅ User ${userId} deleted successfully`
      messageType.value = 'success'
      
      await fetchUsers()
      
      setTimeout(() => {
        message.value = ''
      }, 3000)
    } catch (error) {
      console.error('Error deleting user:', error)
      message.value = '❌ Error deleting user'
      messageType.value = 'error'
      
      setTimeout(() => {
        message.value = ''
      }, 3000)
    }
  }
}
</script>

<style scoped>
/* Remove .app-container background and padding */
.page-container {
  width: 100%;
  /* no background, no padding – inherited from parent */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header text colors adapt to parent theme */
.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  color: inherit; /* inherit from parent (light or dark) */
}

.subtitle {
  font-size: 1rem;
  color: inherit;
  opacity: 0.9;
}

/* Card styles remain unchanged – they are white and work on both themes */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.card-icon {
  font-size: 1.5rem;
  background: rgba(255,255,255,0.2);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.user-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.875rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: 100%;
  justify-content: center;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #edf2f7;
  transform: translateY(-1px);
}

.btn-icon-only {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.btn-icon-only:hover {
  background: #f7fafc;
}

.list-actions {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.search-section {
  flex: 1;
}

.search-input {
  width: 100%;
  max-width: 300px;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-count {
  font-size: 0.875rem;
  color: #718096;
  white-space: nowrap;
}

.table-container {
  overflow-x: auto;
}

.table-container.scrollable {
  max-height: 460px;
  overflow-y: auto;
}

.table-container.scrollable .user-table thead th {
  position: sticky;
  top: 0;
  background: #f7fafc;
  z-index: 1;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th {
  background: #f7fafc;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #4a5568;
  border-bottom: 2px solid #e2e8f0;
}

.user-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
}

.user-row:hover {
  background: #f7fafc;
}

.user-id {
  font-family: 'Courier New', monospace;
  font-weight: 500;
  color: #667eea;
}

.actions {
  text-align: center;
}

.alert {
  margin: 1rem 1.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
}

.alert.success {
  background: #c6f6d5;
  color: #22543d;
  border-left: 4px solid #48bb78;
}

.alert.error {
  background: #fed7d7;
  color: #742a2a;
  border-left: 4px solid #f56565;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #a0aec0;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  .header h1 {
    font-size: 1.5rem;
  }
  .user-table th,
  .user-table td {
    padding: 0.75rem;
    font-size: 0.75rem;
  }
  .search-section {
    width: 100%;
    margin-right: 0;
  }
  .search-input {
    max-width: 100%;
  }
  .list-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .action-buttons {
    justify-content: space-between;
  }
  .table-container.scrollable {
    max-height: 350px;
  }
}
</style>