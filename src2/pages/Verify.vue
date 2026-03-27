<script>
import Button from '@/components/Button.vue';
import Header from '@/components/Header.vue';

export default {
    components: {Header, Button}
}
</script>

<template>
    <Header/>
    <div class="verify-page">
        <div class="verify-page-window">
            <div class="container">
                <div class="verify-page-window-title">Verify your email</div>
                <div class="verify-page-window-text">We've sent a 6-digit code to your email</div>
                <div class="code-fields">
                    <div class="field1"></div>
                    <div class="field2"></div>
                    <div class="field3"></div>
                    <div class="field4"></div>
                    <div class="field5"></div>
                    <div class="field6"></div>
                </div>
                <div class="button-verify">
                    <Button
                        text="Verify"
                        background="#5048E5"
                    />
                </div>
                <div class="stopwatch">
                     <div class="minutes">00</div>
                     <div class="seconds">00</div>
                </div>  
                <div class="resend-code">
                    <span>Didn't receive a code?<a href="!#">Resend code</a></span>
                </div>                    
            </div>
        </div>
    </div> 
</template>

<style scoped>
.verify-page {
    display: flex;
    flex-direction: column;
    margin: 151px 515px 151px 515px
}
.verify-page-window {
    min-width: 443px;
    background: white;
    border-radius: 12px;
    box-shadow: 2px 2px 4px rgba(168, 168, 168, 0.5);
}
.container {
    padding: 32px 32px 24px 32px;
}
.verify-page-window-title {
    text-align: center;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 30px;
    line-height: 37px;
}
.verify-page-window-text {
    text-align: center;
    margin-bottom: 32px;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    opacity: 60%;
}
.code-fields {
    display: grid;
    margin-bottom: 32px;
    grid-template-columns: repeat(6, 1fr)  
}
.field1, .field2, .field3, .field4, .field5, .field6 {
    min-height: 56px;
    border-radius: 8px;
    border: 2px solid #E2E8F0;
}

.button-verify Button {
    margin-bottom: 32px;
    font-weight: bold ;
    font-size: 18px;
    line-height: 24px;
    color: #FFFF;
}
.stopwatch {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 15px;
}
.minutes, .seconds {
    padding: 9px 11px;
    background: #F1F5F9;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    font-weight: bold ;
    font-size: 18px;
    line-height: 28px;
}

.resend-code {
    text-align: center;
    font-weight: medium;
    font-size: 14px;
    line-height: 20px;
    color: #64748B;
}

.resend-code a {
    margin-left: 5px;
    font-weight: bold;
    color: #5048E5;
}

</style>