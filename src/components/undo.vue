<script setup>
import { ref } from 'vue'
import * as bootstrap from 'bootstrap'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
 
</template>

<style lang="scss" scoped>
@import "bootstrap/scss/bootstrap";
.read-the-docs {
  color: #888;
}
</style>
