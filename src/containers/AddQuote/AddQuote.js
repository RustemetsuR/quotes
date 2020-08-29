import React, { useState } from 'react';
import categoryValues from '../../categoryValues';
import axiosQuote from '../../axiosQuote';
import './AddQuote.css';

const AddQuote = props => {

    const [quote, setQuote] = useState({
        author: '',
        category: categoryValues[0].data.title,
        text: '',
        categoryId: null,
    });

    const quoteDataChanged = event => {
        const name = event.target.name;
        const value = event.target.value;
        setQuote(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const addQuote = async event => {
        event.preventDefault();

        const quoteData = {
            author: quote.author,
            category: quote.category,
            text: quote.text,
            categoryId: quote.categoryId,
        };

        for (let i = 0; i < categoryValues.length; i++) {
            if (quoteData.category === categoryValues[i].name) {
                quoteData.categoryId = categoryValues[i].data.id;
            };
        };

        try {
            await axiosQuote.post('/quotes.json', quoteData);
        } finally {
            props.history.replace('/quotes/categories/all/');
        };
    };

    const cancel = () =>{
        props.history.replace('/quotes/categories/all/');
    };

    return (
        <div className="add-quote-page">
            <div className="container">
                <form onSubmit={addQuote}>
                    <select className="add-quote-select add-quote-inputs" name='category' value={quote.category} onChange={quoteDataChanged}>
                        {categoryValues.map(category => (
                            <option key={category.data.id} className='category-option' id={category.data.id}>{category.data.title}</option>
                        ))}
                    </select>
                    <input
                        name='author'
                        value={quote.author}
                        onChange={quoteDataChanged}
                        required
                        placeholder="Enter the Author"
                        className="add-quote-inputs author-input" />

                    <textarea
                        name='text'
                        value={quote.text}
                        onChange={quoteDataChanged}
                        required
                        placeholder="Enter The Quote"
                        className="add-quote-inputs quote-input" />
                    <button className='add-btn' type='submit'>Add</button>
                    <button className='add-btn' onClick={cancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddQuote;