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
import moment from "moment";
 import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
import db from "./firebaseinit";
export default {
    name: 'new-todo',
     components: {
        DatePicker
    },
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
                date: Date(this.date.seconds*1000)
            })
            .then(docRef => this.$router.push('/'))
            .catch(error => console.log(err))
        }
    }
}
</script>
