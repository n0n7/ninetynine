<template>
    <div class="form-container">
        <h1>Register</h1>
        <form class="register-form">
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
                    @input="clearError('isUsernameValid')"
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
                    @input="clearError('isPasswordValid')"
                />
            </div>
            <!--confirm password-->
            <div class="form-input-container">
                <label
                    for="confirm-password"
                    :class="{ 'text-error': !isConfirmPasswordValid }"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    v-model="confirmPassword"
                    placeholder="confirm password"
                    :class="{ 'input-error': !isConfirmPasswordValid }"
                    @input="clearError('isConfirmPasswordValid')"
                />
            </div>
            <button type="submit" @click.prevent="register">Register</button>
            <label id="error-message" class="text-error" v-if="!isError">{{
                errorMessage
            }}</label>
            <div class="form-router">
                <router-link to="/login">Already have an account?</router-link>
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
            confirmPassword: "",
            isUsernameValid: true,
            isPasswordValid: true,
            isConfirmPasswordValid: true,
            errorMessage: "",
        }
    },
    computed: {
        isError() {
            return (
                this.isUsernameValid &&
                this.isPasswordValid &&
                this.isConfirmPasswordValid
            )
        },
    },
    methods: {
        register() {
            // print username and password to console
            console.log(this.username, this.password, this.confirmPassword)

            // check if form is valid
            if (!this.verifyUsername(this.username)) {
                return
            }

            if (!this.verifyPassword(this.password)) {
                return
            }

            if (
                !this.verifyConfirmPassword(this.password, this.confirmPassword)
            ) {
                return
            }

            // send username and password
            console.log(
                "register" + this.username,
                this.password,
                this.confirmPassword
            )
        },
        verifyUsername(username) {
            if (username.length < 6) {
                this.isUsernameValid = false
                this.errorMessage = "Username must be at least 6 characters"
                return false
            }
            return true
        },
        verifyPassword(password) {
            if (password.length < 8) {
                this.isPasswordValid = false
                this.errorMessage = "Password must be at least 8 characters"
                return false
            }
            return true
        },
        verifyConfirmPassword(password, confirmPassword) {
            if (password !== confirmPassword) {
                this.isConfirmPasswordValid = false
                this.errorMessage = "Passwords do not match"
                return false
            }
            return true
        },
        clearError(error) {
            this[error] = true
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
.register-form {
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
