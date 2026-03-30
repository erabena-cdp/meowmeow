<template>
  <div :class="['app-wrapper', theme]">
    <header class="main-header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="logo">MyApp</h1>
          <div class="message-section" v-if="hibubu.message">
            <span class="message-badge">{{ hibubu.message }}</span>
            <span v-if="hibubu.message2" class="message-badge secondary">{{ hibubu.message2 }}</span>
          </div>
        </div>
        
        <div class="header-right">
          <nav class="main-nav">
            <RouterLink to="/" class="nav-link" active-class="active">
              <span class="nav-icon">🏠</span>
              <span class="nav-text">Home</span>
            </RouterLink>
            <RouterLink to="/about" class="nav-link" active-class="active">
              <span class="nav-icon">ℹ️</span>
              <span class="nav-text">About</span>
            </RouterLink>
            <RouterLink to="/meow" class="nav-link" active-class="active">
              <span class="nav-icon">🐱</span>
              <span class="nav-text">Meow</span>
            </RouterLink>
            <RouterLink to="/hehe" class="nav-link" active-class="active">
              <span class="nav-icon">😄</span>
              <span class="nav-text">Hehe</span>
            </RouterLink>
            <RouterLink to="/databasetest" class="nav-link" active-class="active">
              <span class="nav-icon">🗄️</span>
              <span class="nav-text">Database</span>
            </RouterLink>
          </nav>
          
          <button class="theme-toggle" @click="toggleTheme">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </div>
    </header>

    <main class="main-area">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessage } from '@/stores/ts'
import { ref, watch, computed } from 'vue'

const hibubu = useMessage()

// Theme state
const isDark = ref(localStorage.getItem('theme') === 'dark')
const theme = computed(() => isDark.value ? 'dark' : 'light')

function toggleTheme() {
  isDark.value = !isDark.value
}

// Persist theme preference
watch(isDark, (val) => {
  localStorage.setItem('theme', val ? 'dark' : 'light')
})
</script>

<style>
/* Global styles – applied to whole app */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}
</style>

<style scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease;
}

/* Light theme */
.app-wrapper.light {
  background-color: #e5e7eb; /* light gray */
  color: #1f2937;
}

/* Dark theme */
.app-wrapper.dark {
  background-color: #1f2937; /* dark gray */
  color: #f3f4f6;
}

/* Header stays semi‑transparent white on both themes, but text color adjusts */
.main-header {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.dark .main-header {
  background: rgba(31, 41, 55, 0.98);
  border-bottom-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.message-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.message-badge.secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Navigation */
.main-nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.dark .nav-link {
  color: #e5e7eb;
}

.nav-icon {
  font-size: 1.1rem;
}

.nav-link:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  transform: translateY(-1px);
}

.nav-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Theme toggle button */
.theme-toggle {
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  padding: 0.4rem 0.8rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.8);
}

.dark .theme-toggle {
  border-color: #4b5563;
  background: rgba(31, 41, 55, 0.8);
}

.theme-toggle:hover {
  transform: scale(1.05);
}

/* Main content area */
.main-area {
  flex: 1;
  overflow-y: auto;
  width: 100%;
  padding: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    padding: 1rem;
  }
  .logo-section {
    width: 100%;
    justify-content: center;
  }
  .header-right {
    width: 100%;
    justify-content: space-between;
  }
  .main-nav {
    justify-content: center;
  }
  .main-area {
    padding: 1rem;
  }
}

@media (max-width: 640px) {
  .nav-text {
    display: none;
  }
  .nav-link {
    padding: 0.5rem;
  }
  .nav-icon {
    font-size: 1.2rem;
  }
}
</style>