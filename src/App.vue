<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav class="flex justify-center py-6 shadow-xl">
        <RouterLink class="px-6 py-2" to="/">Actividades</RouterLink>
        <RouterLink class="px-6 py-2" to="/crear">Crear Actividad</RouterLink>
    </nav>

    <RouterView />
</template>
