export const isphoneValid=(phone)=>{
    const indianPhoneNumberRegex = /^[6-9]\d{9}$/;
   return indianPhoneNumberRegex.test(phone);
}