import ajax from "@/utils/request";
import {ElMessage} from "element-plus";
import axios, {AxiosInstance, AxiosPromise, AxiosResponse} from "axios";


export const fetchData = () => {
    return service({
        url: './table.json',
        method: 'get'
    });
};


const service: AxiosInstance = axios.create({
    timeout: 5000
});

export class Urls {
    static Login = "/api/login";
}


interface Result<T = any> {
    code: number
    msg: string
    data: T
}

export const commonRequest = <T>(url: string, params: Record<string, string>, successMsg?: string, errorMsg?: string, errCallBack?: any) => (

    ajax<Result<T>>(url, params,).then((res: Result<T>) => {
        if (res.code === 200) {
            if (successMsg) {
                ElMessage.success(successMsg)
            }
            return res.data;
        } else {
            let msg = res.msg
            if (errorMsg) {
                msg = errorMsg + ":" + res.msg
            }
            ElMessage.error(msg)
            if (errCallBack) {
                errCallBack()
            }
            return
        }
    })
    // }).catch(err => {
    //     ElMessage.error(errorMsg + ":" + err.message)
    //     if (errCallBack) {
    //         errCallBack()
    //     }
    //     return
    // })
)