import { get, post } from './fetch.js'

export const spiderRun = (params) => post('/spider/run', params, 'POST')
export const listArticle = (params) => post('/article/list', params)
