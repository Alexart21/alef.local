<template>
  <div class="content">
    <div>
      <h2>Персональные данные</h2>
      <form @submit.prevent="save()" id="user-form" action="">
        <div class="form-group fl">
          <float-label>
            <input type="text" v-model="name" placeholder="Имя" class="index-inp" required name="name">
          </float-label>
        </div>
        <div class="form-group fl">
          <float-label>
            <input type="number" v-model="age" placeholder="Возраст" class="index-inp" required min="18" max="100" name="age">
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
          <input form="user-form" type="text" v-model="row.name" placeholder="Имя" class="index-inp" required>
        </float-label>
      </div>
      <div class="form-group fl">
        <float-label>
          <input form="user-form" type="number" v-model="row.age" placeholder="Возраст" class="index-inp" max="17" required>
        </float-label>
      </div>
      <div @click="delChild(rowIndex)" class="ch-del">удалить</div>
    </div>
    <button form="user-form" type="submit" class="save-bt">Сохранить</button>
  </div>

</template>
<script>
import {mapActions} from 'vuex'
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
    ...mapActions('user', ['setUserData']),
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
      console.log('here');
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
          this.setUserData(data);
          this.successMsg = 'Успешно!';
        } catch (e) {
          console.log(e)
        }
      }
    },
  },
  computed: {
  }
}
</script>
