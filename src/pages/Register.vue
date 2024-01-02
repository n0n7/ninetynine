<template>
    <div class="form-container">
        <h1>Sign up</h1>
        <form class="register-form">
            <div class="form-input-container">
                <label for="email" :class="{ 'text-error': !isEmailValid }">
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
                <div id="password-field">
                    <input
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        name="password"
                        v-model="password"
                        placeholder="password"
                        :class="{ 'input-error': !isPasswordValid }"
                        @input="clearErrorPassword()"
                    />
                    <div
                        id="password-show"
                        @click="showPassword = !showPassword"
                    >
                        <font-awesome-icon
                            :icon="
                                showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                            "
                        />
                    </div>
                </div>
            </div>
            <!--confirm password-->
            <div class="form-input-container">
                <label
                    for="confirm-password"
                    :class="{ 'text-error': !isConfirmPasswordValid }"
                >
                    Confirm Password
                </label>
                <div id="password-field">
                    <input
                        :type="showConfirmPassword ? 'text' : 'password'"
                        id="confirm-password"
                        name="confirm-password"
                        v-model="confirmPassword"
                        placeholder="confirm password"
                        :class="{ 'input-error': !isConfirmPasswordValid }"
                        @input="clearErrorConfirmPassword()"
                    />
                    <div
                        id="password-show"
                        @click="showConfirmPassword = !showConfirmPassword"
                    >
                        <font-awesome-icon
                            :icon="
                                showConfirmPassword
                                    ? 'fas fa-eye-slash'
                                    : 'fas fa-eye'
                            "
                        />
                    </div>
                </div>
            </div>
        </form>
        <button type="submit" @click.prevent="register">Register</button>
        <label id="error-message" class="text-error" v-if="isError">{{
            errorMessage
        }}</label>
    </div>
</template>

<script>
import { useSessionStore } from "../store/session.js";

const BACKEND_URL = process.env.BACKEND_URL;

export default {
    setup() {
        const sessionStore = useSessionStore();
        return {
            sessionStore,
        };
    },
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
            isResponsePassed: true,
            errorMessage: "",
            showPassword: false,
            showConfirmPassword: false,
        };
    },
    computed: {
        isError() {
            return (
                !this.isEmailValid ||
                !this.isUsernameValid ||
                !this.isPasswordValid ||
                !this.isConfirmPasswordValid ||
                !this.isResponsePassed
            );
        },
    },
    methods: {
        async register() {
            // clear error message
            this.errorMessage = "";
            this.isResponsePassed = true;

            // print username and password to console
            console.log(
                this.email,
                this.username,
                this.password,
                this.confirmPassword
            );

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

            // post data to server
            try {
                const response = await fetch(BACKEND_URL+"/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: this.username,
                        email: this.email,
                        password: this.password,
                    }),
                });
                console.log(response);
                const data = await response.json();
                console.log(data);

                if (data.error === undefined) {
                    await this.sessionStore.login(data);
                    this.$router.push("/");
                }

                // display error message
                else {
                    this.isResponsePassed = false;
                    this.errorMessage = data.error;
                }
            } catch (error) {
                this.isResponsePassed = false;
                this.errorMessage =
                    "Cannot connect to server. Please try again later.";
            }
        },
        verifyEmail(email) {
            if (email.length < 1) {
                this.isEmailValid = false;
                this.errorMessage = "Email must not be empty";
                return false;
            }
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                this.isEmailValid = false;
                this.errorMessage = "Email is invalid";
                return false;
            }
            return true;
        },
        verifyUsername(username) {
            if (username.includes(" ")) {
                this.isUsernameValid = false;
                this.errorMessage = "Username must not contain spaces";
                return false;
            }
            if (username.length < 4) {
                this.isUsernameValid = false;
                this.errorMessage = "Username must be at least 4 characters";
                return false;
            }
            if (username.length > 20) {
                this.isUsernameValid = false;
                this.errorMessage = "Username must be less than 20 characters";
                return false;
            }
            return true;
        },
        verifyPassword(password) {
            if (password.length < 6) {
                this.isPasswordValid = false;
                this.errorMessage = "Password must be at least 6 characters";
                return false;
            }
            if (password.length > 20) {
                this.isPasswordValid = false;
                this.errorMessage = "Password must be less than 20 characters";
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
        clearForm() {
            this.email = "";
            this.username = "";
            this.password = "";
            this.confirmPassword = "";
            this.isEmailValid = true;
            this.isUsernameValid = true;
            this.isPasswordValid = true;
            this.isConfirmPasswordValid = true;
        },
    },
};
</script>

<style scoped>
h1 {
    color: white;
    margin-bottom: 40px;
}

label {
    color: white;
}

input {
    color: white;
    background-color: #4e4f50;
    border-radius: 7px;
    border: none;
    font-size: 16px;
    padding: 7px;
    width: 200px;
}

button {
    width: 10%;
    height: 5%;
    min-height: 50px;
    min-width: 100px;
    padding: 5px;
    background-color: #a35bff;
    border: none;
    color: white;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 16px;
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
    margin-bottom: 20px;
}

.form-input-container label {
    font-size: 20px;
}

#password-field {
    position: relative;
    display: flex;
    align-items: center;
}

#password-show {
    color: white;
    font-size: 16px;
    position: absolute;
    right: 10px;
}

#password-field input {
    width: 167px;
    padding-right: 40px;
}

.register-form {
    flex-direction: column;
    text-align: center;
    background-color: #242526;
    padding: 30px 30px 10px 30px;
    min-width: 350px;
    width: 400px;
    margin-bottom: 40px;
    border-radius: 7px;
}

.form-router {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;
}

.input-error {
    outline: 2px solid red;
}

.text-error {
    color: red;
}
</style>
