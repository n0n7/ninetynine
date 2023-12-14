<template>
    <div class="form-container">
        <h1>Sign up</h1>
        <form class="register-form">
            <div class="form-input-container">
                <label
                    for="email"
                    :class="{ 'text-error': !isEmailValid }"
                >
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    v-model="email"
                    placeholder="email"
                    :class="{ 'input-error': !isEmailValid }"
                    @input="clearErrorEmail()"
                />
            </div>
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
                    @input="clearErrorConfirmPassword()"
                />
            </div>
        </form>
        <button type="submit" @click.prevent="register">Register</button>
        <label id="error-message" class="text-error" v-if="isError">{{
            errorMessage
        }}</label>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            isEmailValid: true,
            isUsernameValid: true,
            isPasswordValid: true,
            isConfirmPasswordValid: true,
            errorMessage: "",
        };
    },
    computed: {
        isError() {
            return (
                !this.isEmailValid ||
                !this.isUsernameValid ||
                !this.isPasswordValid ||
                !this.isConfirmPasswordValid
            );
        },
    },
    methods: {
        register() {
            // print username and password to console
            console.log(this.email, this.username, this.password, this.confirmPassword);

            // check if form is valid
            if (!this.verifyEmail(this.email)) {
                return;
            }
            if (!this.verifyUsername(this.username)) {
                return;
            }

            if (!this.verifyPassword(this.password)) {
                return;
            }

            if (
                !this.verifyConfirmPassword(this.password, this.confirmPassword)
            ) {
                return;
            }

            // send username and password
            console.log(
                "register" + this.username,
                this.password,
                this.confirmPassword
            );
        },
        verifyEmail(email) {
            if (email.length < 1) {
                this.isEmailValid = false;
                this.errorMessage = "Email must not be empty";
                return false;
            }
            return true;
        },
        verifyUsername(username) {
            if (username.length < 6) {
                this.isUsernameValid = false;
                this.errorMessage = "Username must be at least 6 characters";
                return false;
            }
            return true;
        },
        verifyPassword(password) {
            if (password.length < 8) {
                this.isPasswordValid = false;
                this.errorMessage = "Password must be at least 8 characters";
                return false;
            }
            return true;
        },
        verifyConfirmPassword(password, confirmPassword) {
            if (password !== confirmPassword) {
                this.isConfirmPasswordValid = false;
                this.errorMessage = "Passwords do not match";
                return false;
            }
            return true;
        },
        clearErrorEmail() {
            this.isEmailValid = true;
        },
        clearErrorUsername() {
            this.isUsernameValid = true;
        },
        clearErrorPassword() {
            this.isPasswordValid = true;
        },
        clearErrorConfirmPassword() {
            this.isConfirmPasswordValid = true;
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

input {
    color: white;
    background-color: #4e4f50;
    border-radius: 7px;
}

button {
    width: 10%;
    height: 5%;
    padding: 5px;
    background-color: #a35bff;
    color: white;
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
    background-color: #242526;
    padding: 10px 10px 0px 10px;
    min-width: 350px;
    margin-bottom: 20px;
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
