export const isValidString = (str)=> {
    const regex = /^[A-Za-z0-9 ,\-]+$/;
    return regex.test(str);
}