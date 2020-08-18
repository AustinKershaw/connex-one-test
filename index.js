
const express     = require( 'express' );
const bodyParser  = require( 'body-parser' );
    
const config      = require( './app/config.json' );
const port        = process.env.PORT || config.port || 8080;
const app         = express();

    // PARSING DATA PASSED
app.use( bodyParser.urlencoded({ extended : true, limit : '50mb' }) );
app.use( bodyParser.json({ strict : true, limit : '50mb' }) );
    // SERVE PUBLIC DIRECTORY
app.use( '/', express.static( 'src/dist' ) );
    // ADD ROUTES
app.use( '/api', require('./app/routes/api') );
    // CATCH ALL UNKNOWN ROUTES AND REDIRECT HOME
app.get( '*', ( req, res ) => { res.redirect('/') });
    // INIT
app.listen( port, () => { console.log(`Active on port :: ${ port }`) });
