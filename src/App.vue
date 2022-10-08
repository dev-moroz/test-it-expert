<template>
  <div class="main">

    <button 
      class="loading_btn" 
      :class="{ disabled : isLoading}" 
      :disabled="isLoading" 
      @click="getTodos"
    >
      Загрузить данные
    </button>
    <div 
      v-if="haveData" 
      class="cards"
    >
      <div 
        v-for="item in todos" 
        :key="item.id" 
        class="card"
      >
        <div class="header_card">
          <p>Пользователь {{item.userId}}</p>
          <p>
            <span class="completed">{{item.completed}}</span> /
            <span class="not_completed">{{item.count - item.completed}}</span>
          </p>
        </div>
        <ul>
          <li 
            v-for="title,i in partTitles(item.title)" 
            :key="i"
          >
            {{title}}
          </li>
        </ul>
      </div>

      <Statistic :data="todos" />

    </div>
    <Spinner v-if="isLoading" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Spinner from '@/components/SpinnerVue.vue'
import Statistic from '@/components/StatisticVue.vue'
export default {
  components: {
    Spinner,
    Statistic
  },
  setup() {
    const store = useStore()
    const getTodos = () => {
      store.dispatch('getData')
      store.dispatch('changeIsLoading')
    }
    const todos = computed(() => store.getters.data)
    const isLoading = computed(() => store.getters.isLoading)
    const haveData = computed(() => store.getters.haveData)

    const partTitles = titles => {
      let titlesPart = titles.splice(0, 2)
      titlesPart.push('...')
      return titlesPart
    }

    return {
      getTodos,
      todos,
      isLoading,
      haveData,
      partTitles
    }
  }
}
</script>

<style lang="sass">
.main
  display: flex
  flex-direction: column
  align-items: center
  margin-top: 50px
  .loading_btn
      border: 1px solid #fff
      padding: 10px
      background: #47b1ff
      border-radius: 5px
      color: #fff
  .disabled
    background: #adadad
.cards
  display: flex
  flex-wrap: wrap
  flex-direction: row
  justify-content: center
  width: 90%
  gap: 10px
  margin-top: 50px
  .card
    border: 1px solid #aaa
    padding: 10px 20px
    width: 300px
    border-radius: 5px
    ul
      padding-left: 15px
    .header_card
      display: flex
      justify-content: space-between
    .completed
      color: green
    .not_completed
      color: red
  .statistic
    width: 90%
</style>