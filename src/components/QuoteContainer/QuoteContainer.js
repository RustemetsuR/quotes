import React from 'react';
import './QuoteContainer.css'

const QuoteContainer = props => {
    return (
        <div className='quote-container'>
            <h2 className="quote-container-text"><i>" {props.text} "</i></h2>
            <h4 className="quote-container-author">~ <i>{props.author}</i></h4>
            <p className="quote-container-category">{props.category}</p>
            <button onClick={props.clicked} className='edit-btn'>Edit</button>
        </div>
    );
};

export default QuoteContainer;