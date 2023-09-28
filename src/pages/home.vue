<script>
import axios from 'axios';


export default{
  name: "Home",
  components:{
    
},
data(){
    return{
      result : [],
      selectedTag:[],
      tags: [],
      numPerPage: null
     
    }
  },
  mounted(){
    //this.chiamataApi();
    this.getTags(this.numPerPage);
  },
   watch: {
     selectedTag:{
       handler:'getTags', 
       deep:true
     }
   },
  methods: {
    chiamataApi(){
      axios.get('http://127.0.0.1:8000/api/image')
      .then((res) => {
        this.result = res.data;
        console.log(this.result)
    });
    },
    getTags(numPerPage){
      const params = {page: numPerPage}
      if(this.selectedTag.length > 0){
        params.tags_id = this.selectedTag.join(',')
        console.log(params.tags_id);
      }
      if(numPerPage >= 3){
        params.num_page = this.numPerPage;
        console.log(params.num_page);
      }
      axios.get('http://127.0.0.1:8000/api/image', {params})
      .then((res) => {
        this.result = res.data.image.data;
        this.currentPage = res.data.image.current_page;
        this.lastPage = res.data.image.last_page;
        this.tags = res.data.tag;
      })
    }
  }
}  
</script>

<template>
    <div>
      <div v-for="(elem, index) in this.tags" :key="index" class="d-flex align-items-center">
        <input  type="checkbox" :value="elem.id" v-model="selectedTag">
        <span class="ms-2">{{ elem.tag }}</span>
      </div>
      <div>
        <input type="number" placeholder="inserisci quante foto visualizzare" v-model="numPerPage" min="3">
        <button class="btn btn-primary ms-2" @click="this.getTags(this.numPerPage)">Submit</button>
      </div>
    </div>
    <div class="container">
        <div class="row">
            <div id="card" class="col-12 col-md-6 col-lg-4"  v-for="(elem, index) in this.result" :key="index">
                <router-link :to="{name:'singleImage', params:{id:elem.id}}">
                    <img :src="`http://127.0.0.1:8000/storage/${elem.image}`" v-if="elem.visibility === 1" :class="d-none" alt="">
                </router-link>
            </div>
        </div>
    </div>
    <nav aria-label="Page navigation example" class="d-flex justify-content-center mt-5">
    <ul class="pagination">
      <li class="page-item">
        <a @click.prevent="getTags(currentPage - 1) " class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true" >&laquo;</span>
        </a>
      </li>
      <li v-for="(elem, index) in lastPage" :key="index" :class="(currentPage === elem) ? 'active' : ''" class="page-item">
        <a @click.prevent="getTags(elem)" class="page-link" href="#">
          {{ elem }}
        </a>
      </li>
      <li class="page-item">
        <a  @click.prevent="getTags(currentPage + 1) " class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>

</template>

<style lang="scss" scoped>
    .container{
        .row{
            #card{
                position: relative;
                z-index: 99;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                    margin-top: 20px;
                    border-radius: 20px 10px 20px 10px;
                    box-shadow: 15px 15px 7px -5px rgba(0, 0, 0, 0.75);
                    &:hover{
                        transform: scale(105%);
                        transition: 800ms linear;
                    }
                }
            }
        }
    }
   
</style>