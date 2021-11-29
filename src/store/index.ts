import { ActionTree, createStore, MutationTree } from 'vuex';
import { NamedAPIResourceList } from 'pokenode-ts';
import axios from 'axios'

export type RootState = {
  pokemonList: NamedAPIResourceList
}

const state: RootState = {
  pokemonList: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }
}

const mutations: MutationTree<RootState> = {
  setPokemonList(state: RootState, pokemonList: NamedAPIResourceList) {
    state.pokemonList = pokemonList
  }
}

const actions: ActionTree<RootState, RootState> = {
  async loadPokemonList({ commit }) {
    const { data }: { data: NamedAPIResourceList } = await axios.get('https://pokeapi.co/api/v2/pokemon/')
    commit('setPokemonList', data)
  },
  async loadMorePokemonList({ commit, state }) {
    if (!state.pokemonList.next) return

    const { data }: { data: NamedAPIResourceList } = await axios.get(state.pokemonList.next)
    commit('setPokemonList', {
      ...state.pokemonList,
      results: [
        ...state.pokemonList.results,
        ...data.results
      ]
    })
  },
}

export default createStore({
  state,
  mutations,
  actions,
})
