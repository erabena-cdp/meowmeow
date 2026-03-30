<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <center>
  <WelcomeItem>
    <RouterLink to="/" class="nav-link" active-class="active">
      <span class="nav-icon">🏠</span>
      <span class="nav-text">Home (You are Here)</span>
    </RouterLink>
  </WelcomeItem>
  <WelcomeItem>
    <RouterLink to="/about" class="nav-link" active-class="active">
      <span class="nav-icon">ℹ️</span>
      <span class="nav-text">About</span>
    </RouterLink>
  </WelcomeItem>
  <WelcomeItem>
    <RouterLink to="/meow" class="nav-link" active-class="active">
      <span class="nav-icon">🐱</span>
      <span class="nav-text">Meow</span>
    </RouterLink>
  </WelcomeItem>

  <WelcomeItem>
    <RouterLink to="/hehe" class="nav-link" active-class="active">
      <span class="nav-icon">😄</span>
      <span class="nav-text">Hehe</span>
    </RouterLink>
  </WelcomeItem>

  <WelcomeItem>
    <RouterLink to="/databasetest" class="nav-link" active-class="active">
      <span class="nav-icon">🗄️</span>
      <span class="nav-text">Database</span>
    </RouterLink>
  </WelcomeItem>
  </center>
</template>
