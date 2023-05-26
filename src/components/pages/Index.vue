<template>
  <div class="content">
    <div>
      <h1 class="h_1">Персональные данные</h1>
      <form @submit.prevent="save()" id="user-form" action="">
        <div class="form-group fl">
          <float-label>
            <input ref="name" type="text" v-model="name" placeholder="Имя" class="index-inp" >
          </float-label>
        </div>
        <div class="form-group fl">
          <float-label>
            <input ref="age" type="text" v-model="age" placeholder="Возраст" class="index-inp">
          </float-label>
        </div>
      </form>
    </div>
    <div v-if="errMsg" class="text-danger">{{ errMsg }}</div>
    <div v-if="successMsg" class="text-success">{{ successMsg }}</div>
    <div class="ch-bt">
      <div class="h_1">Дети (макс. 5)</div>
      <div v-if="this.childs.length <= 4" @click="addChild()" class="add-btn"><span class="plus">+</span> Добавить
        ребенка
      </div>
    </div>
    <div class="child-form" v-for="(row, rowIndex) in childs" :key="rowIndex">
      <div class="form-group fl">
        <float-label>
          <input form="user-form" type="text" v-model="row.name" placeholder="Имя" class="index-inp"
                 :id="'name_' + row.id">
        </float-label>
      </div>
      <div class="form-group fl">
        <float-label>
          <input form="user-form" type="text" v-model="row.age" placeholder="Возраст" class="index-inp" :id="'age_' + row.id">
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
    clearMsgs() { // убираем уведомления и красные рамки ошибок если есть
      this.errMsg = '';
      this.successMsg = '';
      this.$refs.name.style.outline = '';
      this.$refs.age.style.outline = '';
      if (this.childs.length) {
        this.childs.map((item) => {
          document.getElementById('name_' + item.id).style.outline = '';
          document.getElementById('age_' + item.id).style.outline = '';
        })
      }
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
        }
        const uniqueId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.childs.push({id: uniqueId, name: '', age: null});
        console.log(this.childs);
      } else {
        console.log('много');
      }
    },
    delChild(Index) {
      this.clearMsgs();
      this.childs.splice(Index, 1);
      // console.log(this.childs);
    },
    hasError() { // валидация на required и соответствие регуляркам
      let isEmpty = false;
      let notValid = false;
      let msg = null;
      let nameRegexp = /^[А-Яа-яё -][А-Яа-яё -][А-Яа-яё -]*$/i;
      let ageRegexp = /^[1-9][0-9]{0,1}$|^(100)$/;
      if (!this.name) {
        this.$refs.name.style.outline = '1px solid red';
        isEmpty = true;
      }else if(!nameRegexp.test(this.name)){
        this.$refs.name.style.outline = '1px solid red';
        notValid = true;
      }
      if (!this.age) {
        this.$refs.age.style.outline = '1px solid red';
        isEmpty = true;
      }else if(!ageRegexp.test(this.age)){
        this.$refs.age.style.outline = '1px solid red';
        notValid = true;
      }
      if (this.childs.length) {
        this.childs.map((item) => {
          if (!item.name) {
            document.getElementById('name_' + item.id).style.outline = '1px solid red';
            isEmpty = true;
          }else if(!nameRegexp.test(item.name)){
            document.getElementById('name_' + item.id).style.outline = '1px solid red';
            notValid = true;
          }
          if (!item.age) {
            document.getElementById('age_' + item.id).style.outline = '1px solid red';
            isEmpty = true;
          }else if(!ageRegexp.test(item.age)){
            document.getElementById('age_' + item.id).style.outline = '1px solid red';
            notValid = true;
          }
        })
      }
      if(isEmpty){
        msg = 'Есть незаполненные поля!';
      }else if(notValid){
        msg = 'Введите корректные данные! Имя - только кирилица. Возраст - только число 1-100';
      }
      return msg;
    },
    save() {
      this.clearMsgs();
      this.errMsg = this.hasError();
      if (this.errMsg) {
        return;
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
  computed: {}
}
</script>
