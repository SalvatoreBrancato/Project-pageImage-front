<script>
import axios from 'axios';


export default{
  name: "singleImage",
  components:{
    
},
data(){
    return{
      result : [],
      success: false,
      data: {
        comment: '' ,
        visibility: '',
        image_id: '' 
      }
    }
  },
  mounted(){
    this.data.visibility = this.result.image.visibility;
    this.data.image_id = this.result.image.id;
  },
  created(){
    this.chiamataApi();
    
  },
  methods: {
    chiamataApi(){
      axios.get(`http://127.0.0.1:8000/api/image/${this.$route.params.id}`)
      .then((res) => {
        this.result = res.data;
    });
    },
    sendForm(){
        axios.post(`http://127.0.0.1:8000/api/comments`, this.data)
        .then((res) => {
            this.success = res.data.success;
            console.log(res.data);
             if(this.success){
                 this.data.comment = ''
             }
             this.chiamataApi();
        })
    }
  }
}  
</script>

<template>

<div class="container">
    <div class="row">
        <div class="col-12 col-md-8 ">
            <img :src="`http://127.0.0.1:8000/storage/${result.image.image}`" alt="">
        </div>
        <div class="col-4">
            <div>
                <h1 class="text-capitalize">
                    {{ this.result.image.user.name}}
                </h1>
                <h2>
                    {{ this.result.image.created_at }}
                </h2>
                <h3 v-for="(elem, index) in this.result.image.tags" :key="index">
                    {{ elem.tag }}
                </h3>
            </div>
        </div>
    </div>

    <form @submit.prevent="sendForm()">
        <input type="hidden" name="image_id">
        <input class="w-100 mt-1" type="text" name="comment" v-model="this.data.comment">
        <input type="hidden" name="visibility">            
        <button class="btn btn-primary" type="submit">Submit</button>
    </form>
    <div v-if="(this.result.comments.length == 0)">Non ci sono commenti</div>
    <div class="border" v-else v-for="(elem, index) in this.result.comments" :key="index">{{ elem.comment }}</div>
          
</div>

</template>

<style lang="scss" scoped>

    img{
        width: 100%;
        height: 75vh;
        display: block;
        object-fit: contain;
        margin-top: 20px;
    }

</style>