export const formValidate = (email,password,username) => {
    const IsValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const IsValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const IsValidUsername = /^[a-zA-Z0-9]{3,16}$/.test(username)
    if(!IsValidEmail) return "Email is invalid"
    if(!IsValidPassword) return "Password should be strong"
    if(!IsValidUsername) return "Username is invalid"

    return null;
}