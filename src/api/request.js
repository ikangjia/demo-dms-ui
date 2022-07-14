import axios from "axios";
import {Message} from "element-ui";

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 1000 * 10,
})

service.interceptors.request.use(config => {
      //判断token是否存在
      if (localStorage.token) {
        //将token设置成请求头
        config.headers.Authorization = localStorage.token;
      }
      return config
    },
    err => {
      return Promise.reject(err);
    }
)
// 返回拦截
service.interceptors.response.use((response) => {
  // 获取接口返回结果
  const res = response.data;
  // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data.
  if (res.code === 0) {
    return res;
  } else if (res.code === 10000) {
    // 也可使用router进行跳转
    window.location.href = '/login';
    return res;
  } else {
    // 错误显示可在service中控制，因为某些场景我们不想要展示错误
    // Message.error(res.message);
    return res;
  }
}, error => {
  Message.error('网络请求异常，请稍后重试!');
  return Promise.reject(error)
});
export default service;
