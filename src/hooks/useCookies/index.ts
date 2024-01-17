import Cookies from "js-cookie";

const get = (key: string) => Cookies.get(key);
const set = (key: string, value: any) => Cookies.set(key, value);

export default { get, set };
