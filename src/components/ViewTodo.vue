<template>
    <div id="view-todo">
         <li class="collection-header"><h2>View ToDo</h2></li>
      <ul class="collection with-header">
          <li class="collection-header"><h5>Description  : {{description}}</h5>
          </li>
          <li class="collection-item">Date of Assignment  :  {{date}}</li>
      </ul>
      <router-link to="/" class="btn red">Back</router-link>
       <button v-on:click="deleteTodo" class="btn red">Delete</button>
      <div class="fixed-action-btn">
            <router-link v-bind:to="{name: 'edit-todo',params: {todo_id: todo_id}}"
             class="btn-floating btn-large indigo">
            <i class="fa fa-pencil"></i>
            </router-link>
        </div>
    
    
    </div>
</template>

<script>
import db from "./firebaseinit";
export default {
    name: 'view-todo',
    data (){
        return{
            todo_id: null,
            description: null,
            date: null
        }
    },
    beforeRouteEnter(to,from,next){
        db.collection('todos').where('todo_id', '==',to.params.todo_id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.todo_id = doc.data().todo_id
                    vm.description = doc.data().description
                    vm.date = doc.data().date
                })
            })
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            db.collection('todos').where('todo_id','==', this.$route.params.todo_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.todo_id = doc.data().todo_id
                    this.description = doc.data().description
                    this.date = doc.data().date
                })
            })
        },
        deleteTodo(){
            if(confirm('Are you Sure?')){
               db.collection('todos').where('todo_id','==', this.$route.params.todo_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                   doc.ref.delete()
                   this.$router.push('/')
                })
            })
            }
        }
    }

}
</script>
