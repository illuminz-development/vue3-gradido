import api from './api';

class CommunityUserService {
  list(params = {}) {
    return api.get('/community-user/list', {params});
  }
  fetchNearBy(params = {}) {
    return api.get('/nearby-user', {params});
  }
}

export default new CommunityUserService();