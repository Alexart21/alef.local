<template>
  <div class="content">
    <div>
      <h2>Персональные данные</h2>
      <form action="">
        <div class="form-group fl">
          <float-label>
            <input type="text" v-model="name" placeholder="Имя" class="index-inp">
          </float-label>
        </div>
        <div class="form-group fl">
          <float-label>
            <input type="number" v-model="age" placeholder="Возраст" class="index-inp">
          </float-label>
        </div>
      </form>
    </div>
    <div v-if="errMsg" class="text-danger">{{ errMsg }}</div>
    <div v-if="successMsg" class="text-success">{{ successMsg }}</div>
    <div class="ch-bt">
      <div>Дети (макс. 5)</div>
      <div v-if="this.childs.length <= 4" @click="addChild()" class="add-btn">+ добавить ребенка</div>
    </div>
    <div class="child-form" v-for="(row, rowIndex) in childs" :key="rowIndex">
      <div class="form-group fl">
        <float-label>
          <input type="text" v-model="row.name" placeholder="Имя" class="index-inp">
        </float-label>
      </div>
      <div class="form-group fl">
        <float-label>
          <input type="number" v-model="row.age" placeholder="Возраст" class="index-inp">
        </float-label>
      </div>
      <div @click="delChild(rowIndex)" class="ch-del">удалить</div>
    </div>
    <div @click="save()" class="save-bt">Сохранить</div>
  </div>

</template>
<script>
import {mapMutations} from 'vuex'
import FloatLabel from 'vue-float-label/components/FloatLabel'

export default {
  components: {
    FloatLabel,
  },
  data() {
    return {
      name: '',
      age: null,
      childs: [],
      errMsg: '',
      successMsg: '',
      errFlag: false,
    }
  },
  methods: {
    ...mapMutations('app', ['setData']),
    clearMsgs() {
      this.errMsg = '';
      this.successMsg = '';
    },
    addChild() {
      this.clearMsgs();
      if (this.childs.length < 5) {
        if (this.childs.length >= 1) { // уже добавляли детей
          let lastIndex = this.childs.length - 1;
          if (!this.childs[lastIndex].name || !this.childs[lastIndex].age) {
            this.errMsg = 'Заполните поля!';
            return;
          }
          this.childs.push({name: '', age: null});
        } else { // первый дитя
          this.childs.push({name: '', age: null});
        }
        console.log(this.childs);
      } else {
        console.log('много');
      }
    },
    delChild(Index) {
      this.childs.splice(Index, 1);
      // console.log(this.childs);
    },
    validate() { // простейшая валидация на required
      let errors = true;
      if (this.childs.length) {
        this.childs.map((item) => {
          if (!item.name || !item.age) {
            errors = false;
          }
        })
      }
      if (!this.name || !this.age) {
        errors = false;
      }
      return errors;
    },
    save() {
      this.clearMsgs();
      if (!this.validate()) {
        this.errMsg = 'Есть незаполненные поля!';
      } else {
        let data = {
          name: this.name,
          age: this.age
        };
        if (this.childs.length) {
          data.childs = this.childs;
        }
        try {
          this.setData(data);
          this.successMsg = 'Успешно!';
        } catch (e) {
          console.log(e)
        }
      }
    },
  },
  computed: {}
}
</script>
