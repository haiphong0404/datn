import axios from "axios"

const getCsrfToken = () => {
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    return tokenElement ? tokenElement.getAttribute('content') : '';
  };
  
  // Cấu hình mặc định cho Axios
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['X-CSRF-TOKEN'] = getCsrfToken();

export const configAxios =()=>{
    axios.defaults.baseURL = "http://127.0.0.1:8000/api";
    const token = localStorage.getItem('token')
    axios.interceptors.request.use((config)=>{
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })
};