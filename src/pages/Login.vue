<template>
    <div class="form-container">
        <!--Login-->
        <h1>Login</h1>
        <form class="login-form">
            <div class="form-input-container">
                <label
                    for="username"
                    :class="{ 'text-error': !isUsernameValid }"
                >
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    v-model="username"
                    placeholder="username"
                    :class="{ 'input-error': !isUsernameValid }"
                    @input="clearErrorUsername()"
                />
            </div>
            <div class="form-input-container">
                <label
                    for="password"
                    :class="{ 'text-error': !isPasswordValid }"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    v-model="password"
                    placeholder="password"
                    :class="{ 'input-error': !isPasswordValid }"
                    @input="clearErrorPassword()"
                />
            </div>
            <!--register-->
            <div class="form-router">
                <router-link to="/register">
                    <label class="label-router"> Don't have an account? </label>
                </router-link>
            </div>
        </form>
        <button type="submit" @click.prevent="login">Login</button>
        <label id="error-message" class="text-error" v-if="isError">{{
            errorMessage
        }}</label>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
            isUsernameValid: true,
            isPasswordValid: true,
            errorMessage: "",
        };
    },
    computed: {
        isError() {
            return !this.isUsernameValid || !this.isPasswordValid;
        },
    },
    methods: {
        login() {
            // print username and password to console
            console.log(this.username, this.password);

            // check if username is valid
            if (!this.verifyUsername(this.username)) {
                this.isUsernameValid = false;
                this.errorMessage = "Username or Password is invalid";
                console.log("username is invalid");
            }

            // check if password is valid
            if (!this.verifyPassword(this.password)) {
                this.isPasswordValid = false;
                this.errorMessage = "Username or Password is invalid";
                console.log("password is invalid");
            }

            // if username and password are valid, login
            if (this.isUsernameValid && this.isPasswordValid) {
                console.log("login");
            }
        },
        verifyUsername(username) {
            // check if username is valid
            return username.length > 0;
        },
        verifyPassword(password) {
            // check if password is valid
            return password.length > 0;
        },
        clearErrorUsername() {
            this.isUsernameValid = true;
        },
        clearErrorPassword() {
            this.isPasswordValid = true;
        },
    },
};
</script>

<style scoped>
h1 {
    color: white;
}

label {
    color: white;
}

button {
    width: 10%;
    height: 5%;
    padding: 5px;
    background-color: #a35bff;
    color: white;
    border-radius: 10px;
    border: 2px solid black;
}

button:hover {
    cursor: pointer;
    filter: brightness(90%);
}

button:active {
    filter: brightness(80%);
}

input {
    color: white;
    background-color: #4e4f50;
    border-radius: 7px;
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
    background-color: #242526;
    padding: 10px;
    min-width: 300px;
    margin-bottom: 20px;
}

.form-router {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 10px;
}

.label-router {
    color: white;
}

.label-router:hover {
    cursor: pointer;
    filter: brightness(80%);
}

.input-error {
    border: 2px solid red;
}

.text-error {
    color: red;
}
</style>
