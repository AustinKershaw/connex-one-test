const express = require( 'express' );
const router = express.Router();

function authorize( req, res, next ){
    if( req.get( 'Authorization' ) === 'mysecrettoken' ){ return next() };
    res.status( 403 ).send({ data : "'Authorization' value required", success : false, status : 403 });
};

    // ROUTES
router.get( '/time', authorize, ( req, res ) => {
    res.send({ route : "/time", success : true });
});

router.get( '/metrics', authorize, ( req, res ) => {
    res.send({ route : "/metrics", success : true });
});

    // RETURN ROUTER
module.exports = router;