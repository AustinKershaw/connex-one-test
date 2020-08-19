
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const promMid = require( 'express-prometheus-middleware' );

const config = require( './app/config.json' );
const port = process.env.PORT || config.port || 8080;
const app = express();


app.use( bodyParser.urlencoded({ extended : true, limit : '50mb' }) );
app.use( bodyParser.json({ strict : true, limit : '50mb' }) );
app.use( promMid({
    metricsPath: '/api/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [ 0.1, 0.5, 1, 1.5 ],
    authenticate: req => req.headers.authorization === 'mysecrettoken'
}));
    // SERVE PUBLIC DIRECTORY
app.use( '/', express.static( 'src/dist/' ) );
app.use( '/public', express.static( 'public/' ) );
    // ADD ROUTES
app.use( '/api', require('./app/routes/api') );
    // CATCH ALL UNKNOWN ROUTES AND REDIRECT HOME
// app.get( '*', ( req, res ) => { res.redirect('/') });
    // INIT
app.listen( port, () => { console.log(`Active on port :: ${ port }`) });
