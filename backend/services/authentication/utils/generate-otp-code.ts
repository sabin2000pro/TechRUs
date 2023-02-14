export const generateOTPCode = (OTP_LENGTH = 6) => {
    let OTP = '';

    for(let i = 1; i <= OTP_LENGTH; i++) {
        const randomOTP = Math.floor(Math.random() * OTP_LENGTH)
        OTP += randomOTP;
    } 

    return OTP;

}