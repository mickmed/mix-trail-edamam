

let apiUrl

const apiUrls = {
    production: 'https://mix-trail.herokuapp.com/api',
    development: 'https://mix-trail.herokuapp.com/api'
}

if (window.location.hostname === 'localhost') {
    apiUrl = apiUrls.development
} else {
    apiUrl = apiUrls.production
}


export default apiUrl