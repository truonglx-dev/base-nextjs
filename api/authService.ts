import Api from './config';
interface User {
  email: string;
  password: string;
}
interface UserRegister extends User {
  password_confirmation: string;
}
export class AuthService {
  async me() {
    return await Api.get('me');
  }

  async login(user: User) {
    return await Api.post('login', user);
  }

  async register(user: UserRegister) {
    return await Api.post('register', user);
  }
}

const authService = new AuthService();

export default authService;

export const me = async () => {
  const response = await Api.get('me');
  return response;
};
