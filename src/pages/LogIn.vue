<script setup>
import Button from '@/components/Button.vue';
import Input from "@/components/Input.vue";
import { useAuth } from '@/composables/useAuth'

const { email, password, checkbox, signIn } = useAuth()
</script>

<template>
  
    <div class="login-page">
        <div class="upper-part">
            <div class="login-page-logo">
                <Img
                    src="image/loginPage.png"
                />
            </div>
            <div class="login-page-title">DEVFED</div>
            <div class="login-page-text">Empowering the future of development</div>
        </div>
        <div class="login-page-window">
            <div class="container">
                <div class="login-page-window-title">Welcome back</div>
                <div class="login-page-window-text">Please enter your details to sign in.</div>
                <form @submit.prevent="signIn">
                    <div class="login-page-email-address">
                        <span>Email address</span>
                        <Img
                            src="image/Icon1.png"
                        />
                        <Input
                            placeholder="name@company.com"
                            v-model = "email" 
                        />
                    </div>
                    <div class="login-page-password">
                        <div class="login-page-password-title">
                            <span>Password</span>
                            <a href="!#">Forgot password?</a>
                        </div>
                            <Img
                                src="image/Icon2.png"
                            />
                        <Input
                            placeholder="••••••••"
                            type="password"
                            v-model = "password"
                        />
                    </div>
                    <div class="password-icon">
                        <Img
                            src="image/Icon3.png"
                        />
                    </div>
                    <div class="remember-me">
                        <Input
                            type="checkbox"
                            v-model = "checkbox"
                        />
                        <div>Remember me for 30 days</div>
                    </div>
                    <div class="buttons">
                        
                        <div class="button-sign-in">
                            <Img
                                src="image/Icon4.png"
                            />
                            <Button type="submit"
                                text="Sign In"
                                background="#5048E5"
                            />
                        </div>
                        
                        <div class="or-continue">OR CONTINUE WITH</div>
                    
                        <div class="button-gitHub">
                            <Img
                                src="image/Icon5.png"
                            />
                            <Button
                                text="GitHub"
                                background="white"
                            />
                        </div>
                    </div>
                </form>
                <div class="window-lower-part">
                    <span>Don't have an account?</span> <a href="!#">Create an account</a> 
                </div>
            </div>
        </div>
        <div class="login-page-footer">
            <div>
                <Img
                    src="image/Icon6.png"
                />
                All systems operational
            </div>
            <div>Privacy Policy</div>
            <div>Terms of Service</div>
        </div>
    </div>
    
</template>

<style>

.login-page {
    display: flex;
    flex-direction: column;
    margin: 50px 515px 110px 515px
}

.upper-part {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-page-title {
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    margin-top: 8px;
}
.login-page-text {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    opacity: 60%;
    margin-top: 8px;
    margin-bottom: 32px;
}
.login-page-window {
    background: white;
    border-radius: 12px;
    box-shadow: 2px 2px 4px rgba(168, 168, 168, 0.5);
}
.container {
    padding: 32px 32px 24px 32px;
}
.login-page-window-title {
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 4px;
}
.login-page-window-text {
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    opacity: 60%;
    margin-bottom: 24px;
}
.login-page-email-address {
    display: flex;
    flex-direction: column;
}

.login-page-email-address span {
    font-weight: medium;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 6px;
}
.login-page-email-address Img{
    max-width: 15px;
    position: relative;
    top: 24px;
    left: 12px;
}

.login-page-password-title {
    font-weight: medium;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.login-page-password-title a {
    font-weight: bold ;
    font-size: 12px;
    line-height: 16px;
    color: #5048E5;
}
.login-page-password Img {
    position: relative;
    top: 36px;
    left: 12px;
}
.password-icon Img {
    position: relative;
    bottom: 33px;
    left: 341px;
}
.remember-me{
    display: flex;
    margin-bottom: 10px;
}
.remember-me div{
    font-weight: normal ;
    font-size: 14px;
    line-height: 20px;
    color: #475569;
    margin-left: 8px;
}

.remember-me Input {
    cursor: pointer;
    transform: scale(1.3);
    opacity: 60%;
}
.button-sign-in Img {
    position: relative;
    top: 34px;
    left: 221px;
}

.button-sign-in Button {
    font-weight:normal ;
    font-size: 16px;
    line-height: 24px;
    color: #ffff;
}

.or-continue {
    font-weight:normal ;
    font-size: 14px;
    line-height: 16px;
    opacity: 50%;
    margin: 30px 0 20px 0;
    display: flex;
    justify-content: center;
}

.button-gitHub Button {
    font-weight: normal ;
    font-size: 14px;
    line-height: 20px;
    color: #334155;
    border: 1px solid #e9e9e9;
    margin-bottom: 32px;
}

.button-gitHub Img {
    position: relative;
    top: 36px;
    left: 134px;
    
}
.window-lower-part {
    padding-top: 24px;
    text-align: center;
}
.window-lower-part span {
    font-weight: normal ;
    font-size: 14px;
    line-height: 20px;
    color: #334155;
}
.window-lower-part a {
    font-weight: normal ;
    font-size: 14px;
    line-height: 20px;
    color: #5048E5;
}
.login-page-footer div {
    font-weight: normal ;
    font-size: 12px;
    line-height: 16px;
    color: #64748B;
}

.login-page-footer {
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-top: 32px;
}
</style>
