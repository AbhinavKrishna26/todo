<template>
    <div id="edit-todo">
        <h3>Edit ToDo</h3>
           
        <form @submit.prevent="updateTodo" class="col s18">
            <div class="row">
            <div class="input-field col s12">
                <input disabled type="text" v-model="todo_id" required>
         
            </div>
            </div>
            <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="description" required>
               
            </div></div>
            <div class="row">
            <div class="input-field col s12">
                <input type="text" v-model="date" required>
            </div>
            </div>
            <button type="submit" class="btn">Submit</button>
            <router-link to="/" class="btn pink">Cancel</router-link>

        </form>
    </div>
</template>

<script>
import db from "./firebaseinit";
export default {
    name: 'edit-todo',
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
        updateTodo(){
             db.collection('todos').where('todo_id','==', this.$route.params.todo_id).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                   doc.ref.update({
                       todo_id: this.todo_id,
                       description: this.description,
                       date: this.date
                   })
                   .then(() => {
                       this.$router.push({name: 'view-todo', params: {todo_id: this.todo_id}})
                   })
                })
            })
        }
    }

}
</script>
