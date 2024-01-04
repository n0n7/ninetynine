<template>
    <div class="form-container">
        <!--Login-->
        <h1>Login</h1>
        <form class="login-form">
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
            <!--register-->
            <div class="form-router">
                <label class="label-router" @click="directToRegister">
                    Don't have an account?
                </label>
            </div>
        </form>
        <button type="submit" @click.prevent="login">Login</button>
        <label id="error-message" class="text-error" v-if="isError">{{
            errorMessage
        }}</label>
    </div>
</template>

<script>
import { useSessionStore } from "../store/session.js";

const BACKEND_URL = import.meta.env.VITE_API_URL;

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
            password: "",
            isEmailValid: true,
            isPasswordValid: true,
            isResponsePassed: true,
            errorMessage: "",
            showPassword: false,
        };
    },
    computed: {
        isError() {
            return (
                !this.isEmailValid ||
                !this.isPasswordValid ||
                !this.isResponsePassed
            );
        },
    },
    methods: {
        async login() {
            // print username and password to console
            console.log(this.email, this.password);

            // clear error message
            this.errorMessage = "";
            this.isResponsePassed = true;

            // check if email is valid
            if (!this.verifyEmail(this.email)) {
                return;
            }

            // check if password is valid
            if (!this.verifyPassword(this.password)) {
                return;
            }

            // if username and password are valid, login
            if (this.isEmailValid && this.isPasswordValid) {
                // post data to server
                try {
                    const response = await fetch(
                        BACKEND_URL+"/login",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: this.email,
                                password: this.password,
                            }),
                        }
                    );
                    const data = await response.json();
                    console.log(data.userId);
                    if (data.error === undefined) {
                        await this.sessionStore.login(data);
                        this.$router.push("/");
                    } else {
                        this.isResponsePassed = false;
                        this.errorMessage = data.error;
                    }
                } catch (error) {
                    this.isResponsePassed = false;
                    this.errorMessage =
                        "Cannot connect to server. Please try again later.";
                }
            }
        },
        verifyEmail(email) {
            if (email.length < 1) {
                this.isEmailValid = false;
                this.errorMessage = "Email is invalid";
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
        verifyPassword(password) {
            if (password.length < 6) {
                this.isPasswordValid = false;
                this.errorMessage = "Password is invalid";
                return false;
            }
            if (password.length > 20) {
                this.isPasswordValid = false;
                this.errorMessage = "Password is invalid";
                return false;
            }
            return true;
        },
        clearErrorEmail() {
            this.isEmailValid = true;
        },
        clearErrorPassword() {
            this.isPasswordValid = true;
        },
        directToRegister() {
            this.$router.push("/register");
        },
    },
    created() {
        console.log(BACKEND_URL);
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
    position: relative;
}

.form-input-container label {
    font-size: 20px;
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

.login-form {
    flex-direction: column;
    text-align: center;
    background-color: #242526;
    padding: 30px;
    min-width: 350px;
    width: 350px;
    margin-bottom: 40px;
    border-radius: 7px;
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
    outline: 2px solid red;
}

.text-error {
    color: red;
}
</style>
