import Axios from 'axios';
import { Message } from 'iview';
import Cookies from 'js-cookie';
class httpRequest {
    constructor () {
        this.options = {
            method: '',
            url: ''
        };
        // 存储请求队列
        this.queue = {};
    }
    // 销毁请求实例
    destroy (url) {
        delete this.queue[url];
        const queue = Object.keys(this.queue);
        return queue.length;
    }
    // 请求拦截
    interceptors (instance, url) {
    // 添加请求拦截器
        instance.interceptors.request.use(config => {
          config.headers.Authorization = 'Basic ' + 'ZWl2ZXhWZkhVVnUzSVdKUXVJRTlUbXFOazNoZlEzWEE6'
            if (!config.url.includes('/users')) {
                config.headers['x-access-token'] = Cookies.get('token');
            }
            // Spin.show()
            // 在发送请求之前做些什么
            return config;
        }, error => {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use((res) => {
            let { data } = res;
            const is = this.destroy(url);
            if (!is) {
                setTimeout(() => {
                    // Spin.hide()
                }, 500);
            }

            if (res.status !== 200) {
                // 后端服务在个别情况下回报201，待确认
                if (res.status === 401) {
                  Cookies.remove('token');
                  window.location.href = '/#/login';
                  Message.error('未登录，或登录失效，请登录');
                } else {
                  if (res.errormsg) Message.error(res.errormsg);
                }
                return false;
            }

            return data;
        }, (error) => {
            Message.error('服务内部错误');
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    // 创建实例
    create () {
        let conf = {
            // baseURL: 'https://together-api.zhlzzz.com',
            baseURL: 'http://localhost:8090',
            timeout: 15000,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'authorization': 'Basic ZWl2ZXhWZkhVVnUzSVdKUXVJRTlUbXFOazNoZlEzWEE6'
            }
        };
        return Axios.create(conf);
    }
    // 合并请求实例
    mergeReqest (instances = []) {
    //
    }
    // 请求实例
    request (options) {
        var instance = this.create();
        this.interceptors(instance, options.url);
        options = Object.assign({}, options);
        this.queue[options.url] = instance;
        return instance(options);
    }
}
export default httpRequest;
