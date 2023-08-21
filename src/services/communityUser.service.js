import api from './api';

class CommunityUserService {
  list(params = {}) {
    return api.get('/community-user/list', {params});
  }
}

export default new CommunityUserService();