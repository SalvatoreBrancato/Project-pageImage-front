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
      },
      //date: new Date(this.result.image.created_at),
      //formattedDate : `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()}`
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
    },
    modificaData(data){
      const date = new Date(data);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('it-IT', options);
    }
  }
}  
</script>

<template>

<div class="container">
    <div class="row">
        <div class="col-12 col-md-8 animate__animated animate__backInLeft animate__slow">
            <img :src="`http://127.0.0.1:8000/storage/${result.image.image}`" alt="">
        </div>
        <div class="col-4">
            <div class="animate__animated animate__backInRight animate__delay-2s">
                <h1 class="text-capitalize">
                    {{ this.result.image.user.name}}
                </h1>
                <h2>
                    {{ this.modificaData(this.result.image.created_at) }}
                </h2>
                <h3 v-for="(elem, index) in this.result.image.tags" :key="index">
                    {{'#' + elem.tag }}
                </h3>
            </div>
        </div>
    </div>
    <h2 v-if="(this.result.comments.length == 0)" class="mt-3">Commenta per primo</h2>
    <h2 v-else class="mt-3">Lascia il tuo commento</h2>
    <form class="mt-5" @submit.prevent="sendForm()">
        <input type="hidden" name="image_id">
        <input class="w-100 mt-1" type="text" name="comment" v-model="this.data.comment">
        <input type="hidden" name="visibility">            
        <button class="btn btn-primary my-3" type="submit">Submit</button>
    </form>
    <div v-if="(this.result.comments.length == 0)">Non ci sono commenti</div>
    <div class="border" v-else v-for="(elem, index) in this.result.comments" :key="index">{{ elem.comment }}</div>
          
</div>

</template>

<style lang="scss" scoped>

    img{
        max-width: 100%;
        max-height: 75vh;
        display: block;
        object-fit: contain;
        margin-top: 20px;
        border-radius: 20px 10px 20px 10px;
        box-shadow: 15px 15px 7px -5px rgba(0, 0, 0, 0.75);
    }

</style>