export default function REQUEST( url, resType ){
    return fetch( url, {
        headers : new Headers({
            'Authorization' : 'mysecrettoken'
        })
    })
    .then( res => res[ !resType ? 'json' : resType ]() );
};
