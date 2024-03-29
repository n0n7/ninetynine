<template>
    <div class="account-container">
        <h1>Account</h1>
        <div class="account-content-box">
            <img src="/default_profile_icon.png" alt="user" />
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
            <div class="form-router">
                <label class="label-router" @click="changePassword"> Change Password </label>
                <label class="label-router delete-label" @click="deleteAccount"> Delete Account </label>
            </div>
        </div>
        <button type="submit" @click.prevent="saveInfo">Save</button>
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
        const sessionStorage = useSessionStore();
        const userData = sessionStorage.getData;
        return {
            sessionStorage,
            userData,
        };
    },
    data() {
        return {
            username: "",
            email: "",
            errorMessage: "",
            isUsernameValid: true,
            isEmailValid: true,
            isResponsePassed: true,
        };
    },
    computed: {
        isError() {
            return (
                !this.isUsernameValid ||
                !this.isEmailValid ||
                !this.isResponsePassed
            );
        },
    },
    methods: {
        async saveInfo() {
            this.errorMessage = "";
            this.isUsernameValid = true;
            this.isEmailValid = true;
            this.isResponsePassed = true;

            if (!this.sessionStorage.isLoggedIn) {
                this.isResponsePassed = false;
                this.errorMessage = "Please login first";
                return;
            }
            if (!this.verifyUsername(this.username)) {
                return;
            }
            if (!this.verifyEmail(this.email)) {
                return;
            }

            try {
                const response = await fetch(
                    `http://${BACKEND_URL}/accountSetting`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId: this.userData.userId,
                            username: this.username,
                            email: this.email,
                        }),
                    }
                );
                const data = await response.json();
                if (data.error === undefined) {
                    await this.sessionStorage.accountSetting(data);
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
        },
        clearErrorUsername() {
            this.isUsernameValid = true;
        },
        clearErrorEmail() {
            this.isEmailValid = true;
        },
        verifyUsername(username) {
            if (username.length < 6) {
                this.isUsernameValid = false;
                this.errorMessage = "Username must be at least 6 characters";
                return false;
            }
            return true;
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
        changePassword() {
            window.alert("Change Password is not available for now.");
        },
        deleteAccount() {
            window.alert("Delete Account is not available for now.");
        },
    },
    created() {
        if (this.sessionStorage.isLoggedIn) {
            this.username = this.userData.username;
            this.email = this.userData.email;
        }
    },
};
</script>

<style scoped>
h1 {
    color: white;
}

label {
    color: white;
    margin: 0;
    text-decoration: none;
}

img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
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

.account-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.account-content-box {
    flex-direction: column;
    text-align: center;
    background-color: #242526;
    padding: 10px;
    width: 350px;
    margin-bottom: 40px;
    border-radius: 7px;
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
.form-router {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
}
.label-router {
    color: white;
    text-decoration: none;
}

.label-router:hover {
    cursor: pointer;
    filter: brightness(80%);
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

.text-error {
    color: red;
}

.input-error {
    border: 2px solid red;
}

.delete-label {
    color: red;
}

@media screen and (max-width: 600px) {
    h1 {
        font-size: 30px;
    }

    .account-content-box {
        width: 250px;
        margin-bottom: 20px;
    }

    .form-input-container label {
        font-size: 14px;
    }

    input {
        width: 150px;
        font-size: 12px;
    }

    .label-router {
        font-size: 14px;
    }
    .text-error {
        font-size: 12px;
    }
}
</style>
