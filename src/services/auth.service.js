import api from './api';
import TokenService from "./token.service";

class AuthService { 
  login(user) {
    return api
      .post('/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data?.responseData) {
            TokenService.setUser(response.data.responseData);
        }

        return response.data.responseData;
      });
  }

  logout() {
    TokenService.removeUser();
  }
}

export default new AuthService();