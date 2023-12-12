<template>
    <div class="form-container">
        <!--Login-->
        <h1>Login</h1>
        <form class="login-form">
            <div class="form-input-container">
                <label for="username" :class="{'text-error': !isUsernameValid }"> Username </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    v-model="username"
                    placeholder="username"
                    :class="{'input-error': !isUsernameValid }"
                    @input="clearError('isUsernameValid')"
                />
            </div>
            <div class="form-input-container">
                <label for="password" :class="{'text-error': !isPasswordValid }"> Password </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    v-model="password"
                    placeholder="password"
                    :class="{'input-error': !isPasswordValid }"
                    @input="clearError('isPasswordValid')"
                />
            </div>
            <button type="submit" @click.prevent="login">Login</button>
            <label id="error-message" class="text-error" v-if="!isError">{{ errorMessage }}</label>
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
            isUsernameValid: true,
            isPasswordValid: true,
            errorMessage: ""
        }
    },
    computed: {
        isError() {
            return this.isUsernameValid && this.isPasswordValid
        }
    },
    methods: {
        login() {
            // print username and password to console
            console.log(this.username, this.password)

            // check if username is valid
            if (!this.verifyUsername(this.username)) {
                this.isUsernameValid = false
                this.errorMessage = "Username or Password is invalid"
                console.log("username is invalid")  
            }

            // check if password is valid
            if(!this.verifyPassword(this.password)) {
                this.isPasswordValid = false
                this.errorMessage = "Username or Password is invalid"
                console.log("password is invalid")
            }

            // if username and password are valid, login
            if (this.isUsernameValid && this.isPasswordValid) {
                console.log("login")
            }

        },
        verifyUsername(username) {
            // check if username is valid
            return username.length > 0
        },
        verifyPassword(password) {
            // check if password is valid
            return password.length > 0
        },
        clearError(error) {
            // clear error
            this[error] = true
        }
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
    margin-top: 10px;
}

.input-error {
    border: 2px solid red;
}

.text-error {
    color: red;
}

</style>
