const axios = require('axios');

const authorize= async (shop)=>{
    return encodeURI( `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${process.env.client_id}&scope=${process.env.scopes}&redirect_uri=${process.env.redirect_uri}`);
}

const redirect = async (code, shop) =>{
    let shopifyOauthUri= `https://${shop}/admin/oauth/access_token?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${code}`

    const {
        data
    } = await axios({
        url: shopifyOauthUri,
        method: 'post',
        data: {}
    }).then(response => {
        console.log(response.data.access_token);
        return response;
    }).catch(error => {
        console.log(error)
        return error;
    })

    return data;
}

module.exports = {
    authorize,
    redirect
}