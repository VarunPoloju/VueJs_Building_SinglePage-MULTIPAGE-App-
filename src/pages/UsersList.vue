<template>
  <button @click="confirm">Confirm</button>
  <button @click="saveChanges">Save changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data(){
    return{
      changesSaved : false
    }
  },
  beforeRouteLeave(to, from ,next){
    console.log('Userslist comp before route leave');
    console.log(to, from);
    if(this.changesSaved){
      next()
    }
    else{
     const userWantsToLeave =  confirm('Are u sure? u got unsaved changes');
     next(userWantsToLeave)
    }
  },
    methods : {
    confirm(){
      this.$router.push('/teams')
    },
    saveChanges(){
      this.changesSaved = true
    }
  },
  inject: ['users'],
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>