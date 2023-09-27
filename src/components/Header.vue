<script>


export default{
  name: "Header",
  components:{
    
  },
  data(){
      return{
        
      }
    }
}
</script>

<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{name:'Home'}" class="nav-link" >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <a href="http://127.0.0.1:8000" class="nav-link" >
            Registrati subito!
          </a>
        </li>
        <!-- <li class="nav-item">
          <router-link :to="{name: 'contatti'}" class="nav-link" >
            Contatti
          </router-link>
        </li> -->
      </ul>
    </div>
  </div>
</nav>
</template>

<style lang="scss" scoped>

</style>d