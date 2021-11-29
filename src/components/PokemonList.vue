<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4"
        sm="6"
        v-for="pokemon in pokemonList.results"
        :key="pokemon.name"
      >
        {{ pokemon.name }}
      </v-col>
    </v-row>
    <v-col cols="12" class="d-flex justify-center">
      <v-btn @click="loadMorePokemonList" depressed rounded x-large color="primary" class="ma-10">Load more</v-btn>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { ActionMethod, useStore } from 'vuex'
import { computed, ComputedRef } from 'vue'
import { NamedAPIResourceList } from 'pokenode-ts'

export default {
  name: 'PokemonList',
  setup(): { pokemonList: ComputedRef<NamedAPIResourceList>, loadMorePokemonList: ActionMethod } {
    const store = useStore()
    store.dispatch('loadPokemonList')

    return {
      pokemonList: computed(() => store.state.pokemonList),
      loadMorePokemonList: () => store.dispatch('loadMorePokemonList')
    }
  }
}
</script>
