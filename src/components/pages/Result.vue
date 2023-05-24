<template>
  <div class="content">
    <h3 class="h-light">Персональные данные</h3>
    <div v-if="data">
      <div>
        <h4>{{ data.name }}, {{ data.age }} лет</h4>
      </div>
      <div v-if="data.childs">
        <br>
        <br>
        <div class="h3 h-light">Дети</div>
        <div v-for="(child, index) in data.childs">
          <h4>{{ data.childs[index].name }}, {{ data.childs[index].age }} лет</h4>
        </div>
      </div>
    </div>
    <div v-else>
      Нет данных
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('app', ['data']), // vuex module...mapState(['main']), // global state
  }
}
</script>
