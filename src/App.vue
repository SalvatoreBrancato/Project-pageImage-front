<script >
import Header from './components/Header.vue'


export default{
  name: "App",
  components:{
    Header
},
data(){
    return{
      
     
    }
  },
  mounted(){
    
  },
  methods: {
   
  }
}  
</script>

<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<style lang="scss">
@use './style/main.scss';
</style>
