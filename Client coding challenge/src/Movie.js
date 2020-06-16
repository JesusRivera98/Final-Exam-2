import React from 'react';

function Movie( props ){
    return(
        <div>
            title = {props.title}, year = {props.year}, rating={props.rating}
        </div>
    );
}

export default Movie;