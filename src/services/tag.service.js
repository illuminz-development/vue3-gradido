import api from './api';

class TagService {
  list(params = {}) {
  	return api.get('/category/tags/list', {params: {allLanguage: 1, ...params}});
    //return api.get('/tags/list', {params});
  }
}

export default new TagService();