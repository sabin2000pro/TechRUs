export const fetchTokenFromSessionStorage = () => {
    const token = JSON.parse(sessionStorage.getItem("token") as any);
    return token;
}