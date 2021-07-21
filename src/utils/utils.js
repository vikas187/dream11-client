import axios from 'axios';

const axiosAuth = async(url) => {
    try {
        if(!document.cookie) {
            window.location.href = "../login";
        } 
        const index = document.cookie.indexOf("token=");
        if(index!=-1) {
            const token = document.cookie.substring(index+6);
            const response = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
            if(response.status===200) {
                if(response.data.autherror) {
                    window.location.href = "../login";
                }
                return response;
            }
        } 
    } catch(ex) {
        console.log(ex.message);
        return {error: ex.message};
    }
}

export {axiosAuth}