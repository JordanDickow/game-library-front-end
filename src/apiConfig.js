let apiUrl
const apiUrls = {
  production: 'https://sei-movie-api.herokuapp.com',
  development: 'https://sei-movie-api.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
