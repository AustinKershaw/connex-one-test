
const leadingZero = num => num < 10 ? `0${ num }` : num;

module.exports = function getDate( type ){
    const d = new Date();

    if( type === "epoch" ){
        return `${ d.getUTCFullYear() }-${ d.getUTCMonth() + 1 }-${ d.getUTCDate() }T${ leadingZero( d.getUTCHours() ) }:${ leadingZero( d.getUTCMinutes() ) }:${ leadingZero( d.getUTCSeconds() ) }Z`;
    };

    return 'Type not found.'
};
