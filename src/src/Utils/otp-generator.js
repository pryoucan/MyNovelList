const passwordCharacters = "ABCDEFGHIJKLM1234567890NOPQRSTUVWXYZ";
export function otpGenerator(min, max) {
    let OTP = "";
    for(let i = 0; i < 6; i++) {
        const randomIdxGenerator = Math.floor((Math.random()) * (max - min) + min);
        OTP += passwordCharacters[randomIdxGenerator];
    }

    return OTP;
}

otpGenerator(6, passwordCharacters.length);