import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
const axiosInstance=axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_BASE_API_URL}`
})

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.url == '/auth/tokens') {
        config.headers.Authorization = `Bearer ${Cookies.get('refreshToken')}`
    }
    else {
        if (!config.url?.includes('/auth') && !config.url?.includes('/gpt') && !config.url?.includes('/chat')) {
            if (Cookies.get('accessToken')) {
                config.headers.Authorization = `Bearer ${Cookies.get('accessToken')}`
            }
            else {
                console.log('url',config.url)
                window.location.href='/login'
            }
        }
        // console.log('token',Cookies.get('accessToken'))
        // else {
        //     window.location.href='/auth/login'
        // }
    }
    return config
})
axiosInstance.interceptors.response.use((response:AxiosResponse) => {
    if(response.config.url?.includes('/login')){
        // console.log('axios login',response.data)
        if(response.data.data.user.isApproved){
            const { access_token, refresh_token } =response.data.data.tokens
            // console.log('new tokens set',access_token,refreshT)
            Cookies.set('accessToken', access_token)
            Cookies.set('refreshToken', refresh_token)
            Cookies.set('userData',JSON.stringify(response.data.data.user))
        }
        else{
            const { access_token, refresh_token } =response.data.data.tokens
            localStorage.setItem('accessToken',access_token)
            localStorage.setItem('refreshToken',refresh_token)
            localStorage.setItem('userData',JSON.stringify(response.data.data.user))
        }
    }
    else if(response?.config.url?.includes('/logout')){
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('userData')
        Cookies.remove('clientSecret')
        window.location.href='/login'
    }

    return response
}, async (error: AxiosError) => {
    if(error.response?.statusText == "Unauthorized") {
        console.log('token expired')
        const refreshToken = Cookies.get('refreshToken')
        try {
            const refreshTokenFetch=await axiosInstance.get('/auth/tokens', {
                headers: {
                    Authorization:`Bearer ${refreshToken}`
                }
            })
            const { access_token, refresh_token } = refreshTokenFetch.data.data.tokens
            console.log('new tokens set',access_token,refreshToken)
            Cookies.set('accessToken', access_token)
            Cookies.set('refreshToken', refresh_token)
            return axiosInstance({
                ...error.config, headers: {
                ...error.config?.headers,Authorization:`Bearer ${access_token}`
            }})
        }
        catch (e) {
            console.log('refresh token error')
            try {
                // const userData = JSON.parse(Cookies.get('userData')!)
                // if (userData.role == 'Admin') {
                //     window.location.href = '/admin/login'
                // }
                // else {
                //     window.location.href = '/auth/login'
                // }
                // window.location.href = '/login'
                Cookies.remove('userData')
                Cookies.remove('accessToken')
                Cookies.remove('refreshToken')
                Cookies.remove('clientSecret')
            }
            catch(e) {
                console.log('userdata error', e)
                // // redirect("/auth/login");
                // if (window.location.href.includes('/admin')) {
                //     window.location.href = '/admin/login'
                // }
                // else {
                //     window.location.href = '/auth/login'
                // }
                // // console.log(window.location.href)
            }
        }
    }
    if(error.response?.config.url?.includes('/logout')){
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('userData')
        Cookies.remove('clientSecret')
        window.location.href='/login'
    }
    console.log('interceptor error', error)
    return Promise.reject(error);
})
export default axiosInstance

