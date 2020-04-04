<template>
    <div id="new-todo">
        <h3>New ToDo</h3>
        <form @submit.prevent="saveTodo" class="col s18">
            <div class="input-field col s12">
                <input type="text" v-model="todo_id" required>
                <label> Todo ID#</label>
            </div>
            <div class="input-field col s12">
                <input type="text" v-model="description" required>
                <label> Description</label>
            </div>
            <div class="input-field col s12">
                <input type="text" v-model="date" required>
                <label> Date</label>
            </div>
            <button type="submit" class="btn">Submit</button>
            <router-link to="/" class="btn pink">Cancel</router-link>

        </form>
    </div>
</template>

<script>
import db from "./firebaseinit";
export default {
    name: 'new-todo',
    data (){
        return{
            todo_id: null,
            description: null,
            date: null
        }
    },
    methods: {
        saveTodo() {
            db.collection('todos').add({
                todo_id: this.todo_id,
                description: this.description,
                date: this.date
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
}
</script>
