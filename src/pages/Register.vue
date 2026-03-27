<script setup>
import Button from '@/components/Button.vue'
import Header from '@/components/Header.vue'
import Input from '@/components/Input.vue'
import { useRegistration } from '@/composables/useRegistration'

const { email, password, confirm, checkbox, createAccount } = useRegistration()
</script>

<template>
    <Header/>
    <div class="register-page">
        <div class="register-page-window">
            <div class="container">
                <div class="register-page-window-title">Create account</div>
                <div class="register-page-window-text">Join the developer community and start building.</div>
                <form @submit.prevent="createAccount">
                    <div class="register-page-email-address">
                        <span>Email address</span>
                        <Img
                            src="image/Icon1.png"
                        />
                        <Input
                            placeholder="name@company.com"
                            v-model = "email" 
                        />
                    </div>
                    <div class="register-page-password">
                        <span>Password</span>
                        <Img
                            src="image/Icon2.png"
                        />
                        <Input
                            placeholder="••••••••"
                            type="password"
                            v-model = "password"
                        />
                    </div>
                    <div class="confirm-password">
                        <span>Confirm Password</span>
                        <Img
                            src="image/Icon7.png"
                        />
                        <Input
                            placeholder="••••••••"
                            type="password"
                            v-model = "confirm"
                        />
                    </div>
                    <div class="privacy-policy">
                        <Input
                            type="checkbox"
                            v-model = "checkbox"
                        />
                        <div>I accept the <a href="!#">Terms of Service</a> and <a href="!#">Privacy Policy</a></div>
                    </div>
                    <div class="button-create-an-account">
                        <Img
                            src="image/Icon8.png"
                        />
                        <Button type="submit"
                            text="Create account"
                            background="#5048E5"
                        />
                    </div>
                </form>
                <div class="window-register-lower-part">
                    <div class="log-in">Already have an account?<a href="!#">Log In</a></div> 
                    <div class="join">OR JOIN WITH</div>
                    <div class="buttons">
                        <div class="button-git-hub">
                            <Img
                                src="image/Icon9.png"
                            />
                            <Button
                                text="GitHub"
                                background="white"
                            />
                        </div>
                            <div class="button-google">
                                <Img
                                    src="image/Icon10.png"
                                />
                                <Button
                                    text="Google"
                                    background="white"
                                />
                            </div>
                    </div>
                </div>                      
            </div>
        </div>
    </div>
</template>

<style scoped>
.register-page {
    display: flex;
    flex-direction: column;
    margin: 40px 515px 110px 515px
}
.register-page-window {
    min-width: 443px;
    background: white;
    border-radius: 12px;
    box-shadow: 2px 2px 4px rgba(168, 168, 168, 0.5);
}
.container {
    padding: 32px 32px 24px 32px;
}
.register-page-window-title {
    font-weight: bolder;
    font-size: 30px;
    line-height: 37px;
    margin-bottom: 8px;
}
.register-page-window-text {
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    opacity: 60%;
    margin-bottom: 32px;
}
.register-page-email-address span {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
}
.register-page-email-address Input {
    margin-top: 10px;
    margin-bottom: 20px;
}
.register-page-email-address Img {
    position: relative;
    top: 42px;
    right: 80px;
}
.register-page-password span {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
}
.register-page-password Input {
    margin-top: 10px;
    margin-bottom: 20px;
}

.register-page-password Img {
    position: relative;
    top: 47px;
    right: 53px;
}

.confirm-password span {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
}

.confirm-password Input {
    margin-top: 10px;
    margin-bottom: 20px;
}

.confirm-password Img {
    position: relative;
    top: 46px;
    right: 110px;
}

.privacy-policy Input {
    cursor: pointer;
    transform: scale(1.3);
    opacity: 60%;
    margin-right: 12px;
}

.privacy-policy {
    display: flex;
    margin-bottom: 25px;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #475569
}
.privacy-policy a {
    color: #5048E5;
}

.button-create-an-account Button {
    font-weight: 800;
    font-size: 18px;
    color: #ffff;
    white-space: nowrap;
    padding: 17px 115px;
}

.button-create-an-account Img {
    position: relative;
    top: 41px;
    left: 279px;
}

.window-register-lower-part a {
    padding-left: 5px;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: #5048E5;
}
.log-in {
    text-align: center;
    margin-top: 24px;
    font-weight: medium;
    font-size: 14px;
    line-height: 20px;
    color: #475569;
}
.join {
    text-align: center;
    margin-top: 32px;
    font-weight: medium;
    font-size: 12px;
    line-height: 16px;
    color: #64748B;
}
.buttons {
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
}
.button-git-hub Button { 
    padding: 10px 53px 10px 81px;
    font-weight: bold ;
    font-size: 14px;
    line-height: 20px;
    color: #0F172A;
    border: 1px solid #e9e9e9;
}

.button-git-hub Img {
    position: relative;
    top: 34px;
    left: 52px;
}

.button-google Button {
    padding: 10px 53px 10px 81px;
    font-weight: bold ;
    font-size: 14px;
    line-height: 20px;
    color: #0F172A;
    border: 1px solid #e9e9e9;
}

.button-google Img {
    position: relative;
    top: 34px;
    left: 52px;
}

</style>