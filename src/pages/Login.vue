<template>
    <div>
        <!--Login-->
        <h1> Login </h1>
        <form class="login-form">
            <label for="username"> Username </label>
            <input type="text" id="username" name="username" v-model="username">
            <br>
            <label for="password"> Password </label>
            <input type="password" id="password" name="password" v-model="password">
            <br>
            <button type="submit" @click.prevent="login"> Login </button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                console.log('login');
            }
        }
    }
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        color: black;
        padding-left: 10px;
    }

    .login-form {
        flex-direction: column;
        text-align: center;
        padding: 10px;
    }

    .login-form input {
        margin-bottom: 10px;
    }

    #password {
        margin-left: 2px;
    }
</style>

