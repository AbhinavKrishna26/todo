<template>
    <div id="dashboard">
       <ul class="collection with-header">
           <li class="collection-header">
               <h4 >ToDo</h4>
           </li>
       <li v-for="todo in todos" v-bind:key="todo.id" class="collection-item">
     <div class="chip">{{todo.date}}</div> {{todo.todo_id}}     :   {{todo.description}}
       
       <router-link class="secondary-content" v-bind:to="{name: 'view-todo', params: {todo_id: todo.todo_id}}">
          <i class="fa fa-eye"></i> 
       </router-link>
       </li> </ul>

        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large green">
            <i class="fa fa-plus"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit'
export default {
    name: 'dashboard',
    data (){
        return{
            todos: []

        }
    },
    created(){
        db.collection('todos').orderBy('todo_id').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = {
                 'id': doc.id,
                 'todo_id': doc.data().todo_id,
                 'description': doc.data().description,
                 'date': doc.data().date

                }
                this.todos.push(data)
            })
        })
     }
}
</script>

<style scoped>

</style>