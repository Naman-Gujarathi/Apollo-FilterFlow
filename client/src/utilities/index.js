// Function to validate user input checks if the string contains only letters, numbers, spaces, commas, and hyphens
export const isValidString = (str)=> {
    const regex = /^[A-Za-z0-9 ,-]+$/;
    return regex.test(str);
}