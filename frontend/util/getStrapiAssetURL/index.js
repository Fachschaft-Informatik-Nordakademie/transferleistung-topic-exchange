function getStrapiAssetURL(thumbnail, format) {
    const allowed_formats = ['small', 'medium', 'large', 'thumbnail']
    const strapi_url = process.env.STRAPI_URL;
    const path = format in allowed_formats ? thumbnail.formats[format].url : thumbnail.url;

    return strapi_url + path;
}

module.exports = getStrapiAssetURL;