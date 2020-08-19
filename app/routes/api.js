const express = require( 'express' );
const router = express.Router();
const getDate = require( '../util/getDate' );

function authorize( req, res, next ){
    if( req.get( 'Authorization' ) === 'mysecrettoken' ){ return next() };
    res.status( 403 ).send({ data : "'Authorization' value required", success : false, status : 403 });
};

    // ROUTES
router.get( '/time', authorize, ( req, res ) => {
    res.send({
        properties : {
            epoch : {
                description : "The current server time, in epoch seconds, at time of processing the request.",
                type : "number"
            }
        },
        required : [ "epoch" ],
        type : "object",
        value : getDate( "epoch" )
    });
});

    // RETURN ROUTER
module.exports = router;