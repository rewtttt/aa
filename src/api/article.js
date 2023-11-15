// 获取文章列表模块
// 导入axios实例request
import request from '@/utils/request'

// 获取分类接口
// token 不知道为什么带不上
// 好像是因为application/x-www-form-urlencoded格式
export const getListServe = (token) => {
    return request.get('/api/articleCat/all', {
        headers: {
            'token': token
        }
    })
}

export const getArticleListServe = (token) => 
     request.get('/api/articleCat/all', {
        headers: {
            'token': token
        }
    })
