import { ActionContext, ActionTree, createStore, MutationTree } from 'vuex'
import { NamedAPIResourceList } from 'pokenode-ts'
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

export interface RootMutations extends MutationTree<RootState> {
  setPokemonList(state: RootState, pokemonList: NamedAPIResourceList): void
}

const mutations: RootMutations = {
  setPokemonList(state: RootState, pokemonList: NamedAPIResourceList): void {
    state.pokemonList = pokemonList
  }
}

export interface RootActions extends ActionTree<RootState, RootState> {
  loadPokemonList(ctx: ActionContext<RootState, RootState>): void,
  loadMorePokemonList(ctx: ActionContext<RootState, RootState>): void
}

const actions: RootActions = {
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
