<script>
import axios from 'axios';


export default{
  name: "Home",
  components:{
    
},
data(){
    return{
      result : []
     
    }
  },
  mounted(){
    this.chiamataApi();
    
  },
  methods: {
    chiamataApi(){
      axios.get('http://127.0.0.1:8000/api/image')
      .then((res) => {
        this.result = res.data.image;
        console.log(this.result)
    });
    }
  }
}  
</script>

<template>
    <div class="container">
        <div class="row">
            <div id="card" class="col-12 col-md-6 col-lg-4"  v-for="(elem, index) in this.result" :key="index">
                <router-link :to="{name:'singleImage', params:{id:elem.id}}">
                    <img :src="`http://127.0.0.1:8000/storage/${elem.image}`" alt="">
                </router-link>
            </div>
        </div>
    </div>


</template>

<style lang="scss" scoped>
    .container{
        .row{
            #card{
                position: relative;
                z-index: 99;
                img{
                    width: 100%;
                    display: block;
                    object-fit: cover;
                    margin-top: 20px;
                    &:hover{
                        transform: scale(105%);
                        transition: 800ms linear;
                    }
                }
            }
        }
    }
   
</style>