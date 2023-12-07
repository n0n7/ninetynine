<template>
    <div class="form-container">
        <!--Login-->
        <h1>Login</h1>
        <form class="login-form">
            <div class="form-input-container">
                <label for="username"> Username </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    v-model="username"
                    placeholder="username"
                />
            </div>
            <div class="form-input-container">
                <label for="password"> Password </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    v-model="password"
                    placeholder="password"
                />
            </div>
            <button type="submit" @click.prevent="login">Login</button>
            <!--register-->
            <div class="form-router">
                <router-link to="/register">Don't have an account?</router-link>
                <router-link to="/register">Forgot Password</router-link>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
        }
    },
    methods: {
        login() {
            // print username and password to console
            console.log(this.username, this.password)
            console.log("login")
        },
    },
}
</script>

<style scoped>
h1 {
    color: black;
}

button {
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    border: 2px solid black;
    margin-bottom: 10px;
}

button:hover {
    cursor: pointer;
    filter: brightness(90%);
}

button:active {
    filter: brightness(80%);
}
.form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form-input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
}
.login-form {
    flex-direction: column;
    text-align: center;
    padding: 10px;
    min-width: 300px;
}

.form-router {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
</style>
