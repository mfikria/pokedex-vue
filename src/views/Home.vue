<template>
  <v-container fluid>
    <Navbar />
    <PokemonList />
  </v-container>
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue'
import PokemonList from '@/components/PokemonList.vue'

export default {
  components: {
    Navbar,
    PokemonList,
  },
}
</script>
