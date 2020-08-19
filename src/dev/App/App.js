import React, { useState, useEffect } from 'react';
import getDate from '../../../app/util/getDate';
import timeDiff from '../common/timeDiff';
import REQUEST from '../common/REQUEST';
import Loader from '../common/Loader';

export default function App(){
    const [ data, setData ] = useState({
        error : null,
        loading : true,
        metrics : null,
        time : {
            server : null,
            client : null
        }
    });


    useEffect(() => {

        let interval = null;
        const getData = () => {
            Promise.all([ REQUEST( 'http://localhost:8080/api/time' ), REQUEST( 'http://localhost:8080/api/metrics', 'text' ) ])
                .then(
                    res => {
                        const [ time, metrics ] = res;

                        setData({
                            ...data,
                            metrics,
                            loading : false,
                            time : {
                                server : time.value,
                                client : getDate( "epoch" )
                            }
                        });
                    },
                    error => {
                        setData({
                            ...data,
                            error,
                            loading : false
                        });
                    }
                );
        };

        getData();
        interval = setInterval( getData, 30000 );
        return () => clearInterval( interval );

    }, []);
    

    if( data.error ){ return <h1>Error: { data.error }</h1> };

    if( data.loading ){ return <div className="page-center"><Loader /></div> };
    
    return (
        <div className="page">
            <div className="left">
                <div className="inner">
                    <ul>
                        <li>
                            <span className="label">Server time:</span>
                            <span className="value">{ data.time.server }</span>
                        </li>
                        <li>
                            <span className="label">Time difference:</span>
                            <span className="value">{ timeDiff( data.time.server, data.time.client ) }</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="right">
                <pre>{ data.metrics }</pre>
            </div>
        </div>
    );
};
