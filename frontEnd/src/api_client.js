import axios from 'axios';
import router from '@/router';

export const API_URL='http://localhost:8000';

axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        router.push('/login')
    }
    return Promise.reject(error)
});

//@TODO use single instance for api calls

export const login = ({ username, password }) => axios.post(`${API_URL}/api/token/`, { username, password });

export const register = ({ username, email, password, about, image }) => {
    //axios.post(`${API_URL}/api/register/`, { username, email, password, about, avatar });

    var formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("about", about);

    if(image !== null)
        formData.append("avatar", image);
    
    return axios({
        method: 'post',
        url: `${API_URL}/api/register/`,
        data: formData,
    });
};

// export const getDashboarddatasets = (type) => axios.get(`${API_URL}/api/datasets/dashboard/${type}/`, {
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//     }
// });

export const getWorkbooks = () => axios.get(`${API_URL}/api/tableau/workbooks/`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

// START DATASET
// DATASET[GET, GET<id>, POST], smaple, report
export const createDataset = (payload) => {
    const formdata = new FormData();
    for ( var key in payload )
        formdata.append(key, payload[key]);
        
    return axios.post(`${API_URL}/api/datasets/`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
};

export const updateDataset = (id, payload) => axios.put(`${API_URL}/api/datasets/${id}`, payload, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getDatasets = () => axios.get(`${API_URL}/api/datasets/`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getDataset = (id) => axios.get(`${API_URL}/api/datasets/${id}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getDatasetsPublic = () => axios.get(`${API_URL}/api/datasets/public`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getDatasetSample = (id) => axios.get(`${API_URL}/api/datasets/sample/${id}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getDatasetRaport = (id) => axios.get(`${API_URL}/api/datasets/raport/html/${id}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});
// END DATASET

export const getMarketplaceOfferings = () => axios.get(`${API_URL}/api/marketplace/offering/`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getMarketplaceOfferingById = (id) => axios.get(`${API_URL}/api/marketplace/offering/?id=${id}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

// export const getMyIP = () => axios.get('http://icanhazip.com/');


export const purchaseOffering = (data) => axios.post(`${API_URL}/api/marketplace/purchase/`, { ...data }, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});


export const publishOffering = (data) => axios.post(`${API_URL}/api/marketplace/offering/`, { ...data }, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const hubLogin = () => axios.get(`${API_URL}/hub/login/`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getSession = () => axios.get(`${API_URL}/api/ses/`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
});

export const getUser = () => axios.get(`${API_URL}/api/accounts/users/`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
});

export const updateUser = (payload) => axios.put(`${API_URL}/api/accounts/users/`, payload, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const getUser_fake = () => axios.get('json/user_fakedata.json', {
});

// services
export const get_services = () => axios.get(`${API_URL}/api/services/`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const delete_service = (id) => axios.delete(`${API_URL}/api/services/${id}`, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const save_services = (payload) => axios.post(`${API_URL}/api/services`, payload, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const post_service = (payload) => axios.post(`${API_URL}/api/services/run`, payload, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});