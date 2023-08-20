import axios, {AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig} from 'axios';

const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.APP_BASE_API, // 请求的接口
    withCredentials: true,
    timeout: 60000  // 请求超时时间
});

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response;
        } else {
            return Promise.reject();
        }
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default function ajax<T>(url = '', params: Record<string, string>, type = 'POST'): Promise<T> {
    // 1. 变量
    let promise: Promise<AxiosResponse<T>>;

    // 2. 返回一个promise对象
    return new Promise<T>((resolve, reject) => {
        // 2.1 判断请求的类型
        if (type.toUpperCase() === 'GET') { // get请求
            // 2.2 拼接字符串
            let paramsStr = '';
            // 2.3 遍历
            Object.keys(params).forEach(key => {
                paramsStr += key + '=' + params[key] + '&';
            });
            // 2.4 过滤最后的&
            if (paramsStr) {
                paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'));
                // 2.5 拼接完整路径
                url += '?' + paramsStr + '&v=' + randomCode(20);
            } else {
                url += '?v=' + randomCode(20)
            }
            // 2.6 发起get请求
            promise = service.get(url);
        } else if (type.toUpperCase() === 'POST') { // post请求
            // 2.7 发起post请求
            promise = service.post(url, params);
        }
        // 2.8 处理结果并返回
        promise.then((response) => {
            resolve(response.data);
        }).catch(error => {
            console.error(error.message)
            reject(error);
        })
    });

}

/*生成指定长度的随机数*/
function randomCode(length: number) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = "";
    for (let i = 0; i < length; i++) {
        let index = Math.ceil(Math.random() * 9);
        result += chars[index];
    }
    return result;
}