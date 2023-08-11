import axios from 'axios';

const comingSoonService = () => {
    function postEmail(email: string) {
        return axios
            .post(`api/email`, { email })
            .then((res) => {
                console.log(`Request Status: ${res.status}${res.statusText}`);
                return res;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    }
    return { postEmail };
};
export default comingSoonService;
