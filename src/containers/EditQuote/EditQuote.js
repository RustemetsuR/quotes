import React, { useState, useEffect } from 'react';
import categoryValues from '../../categoryValues';
import axiosQuote from '../../axiosQuote';
import './EditQuote.css';

const EditQuote = props => {

    const [quote, setQuote] = useState({
        text: '',
        author: '',
        category: '',
        categoryId: '',
    });

    useEffect(() => {
        const quoteData = async () => {
            const quoteResponse = await axiosQuote('/quotes/' + props.match.params.fireBaseId + '.json');
            const quoteCopy = {
                text: quoteResponse.data.text,
                author: quoteResponse.data.author,
                category: quoteResponse.data.category,
                categoryId: quoteResponse.data.categoryId,
            };
            setQuote(quoteCopy);
        };
        quoteData();
    },[props.match.params.fireBaseId]);
    
    const quoteDataChanged = event => {
        const name = event.target.name;
        const value = event.target.value;
        setQuote(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const edit = async(event) =>{
        event.preventDefault();
        for (let i = 0; i < categoryValues.length; i++) {
            if (quote.category === categoryValues[i].name) {
                quote.categoryId = categoryValues[i].data.id;
            }
        }
        await axiosQuote.put('/quotes/' + props.match.params.fireBaseId + '.json', quote);
        props.history.replace('/quotes/categories/all/');
    };

    const deleteQuote = async() =>{
        await axiosQuote.delete('/quotes/' + props.match.params.fireBaseId + '.json');
        props.history.replace('/quotes/categories/all/');
    };

    const cancel = () =>{
        props.history.replace('/quotes/categories/all/' + props.match.params.id);
    };


    return (
        <div className="edit-div">
            <div className="container">
                <form onSubmit={edit}>
                    <select className="edit-quote-select edit-quote-inputs" name='category' value={quote.category} onChange={quoteDataChanged}>
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
                        className="edit-quote-inputs edit-author-input" />

                    <textarea
                        name='text'
                        value={quote.text}
                        onChange={quoteDataChanged}
                        required
                        placeholder="Enter The Quote"
                        className="edit-quote-inputs edit-quote-input" />
                    <button className='edit-btn' type='submit'>Save</button>
                    <button className='edit-btn' type='button' onClick={deleteQuote}>Delete</button>
                    <button className='edit-btn' type='button' onClick={cancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditQuote;