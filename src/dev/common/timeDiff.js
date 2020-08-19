
const clean = str => str.replace( 'Z', '' ).replace( 'T', ' ' );
const leadingZero = num => num < 10 ? `0${ num }` : num;

export default function( a, b ){

    a = +new Date( clean( a ) );
    b = +new Date( clean( b ) );

    const diff = Math.abs( a - b ) / 1000;
    
    const HH = leadingZero( ~~( diff / 3600 ) % 24 );
    const mm = leadingZero( ~~( diff / 60 ) % 60 );
    const ss = leadingZero( diff % 60 );

    return `${ HH }:${ mm }:${ ss }`;
};
