<template>
  <div class="content">
    <h1 class="h_1">Персональные данные</h1>
    <div v-if="data">
      <div>
        <div>{{ data.name }}, {{ data.age }} лет</div>
      </div>
      <div v-if="data.childs">
        <br>
        <br>
        <h1 class="h_1">Дети</h1>
        <br>
        <div v-for="(child, index) in data.childs">
          <div class="childs-item">{{ data.childs[index].name }}, {{ data.childs[index].age }} лет</div>
          <br>
          <br>
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
    ...mapState('user', ['data']),
  }
}
</script>
