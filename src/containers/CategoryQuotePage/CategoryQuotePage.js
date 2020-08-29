import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import categoryValue from '../../categoryValues';
import axiosQuote from '../../axiosQuote';
import QuoteContainer from '../../components/QuoteContainer/QuoteContainer';

const CategoryQuotePage = props => {

    const [allQuotes, setAllQuotes] = useState([]);

    useEffect(() => {
        const getQuoteData = async () => {
            const quoteResponse = await axiosQuote.get('/quotes.json');
            const allQuotesCopy = [];
            for (let key in quoteResponse.data) {
                if (props.match.params.id === quoteResponse.data[key].categoryId) {
                    allQuotesCopy.push({
                        ...quoteResponse.data[key],
                        id: key,
                    });
                };
            }
            setAllQuotes(allQuotesCopy);
        }
        getQuoteData();
    }, [props.match.params.id]);

    const edit = id =>{
        const index = allQuotes.findIndex(q => q.id === id);
        props.history.replace('/quotes/categories/all/'+ allQuotes[index].categoryId+'/'+allQuotes[index].id+'/edit/');
    }

    const allQuotesList = allQuotes.map(quote => {
        return <QuoteContainer key={quote.id} text={quote.text} author={quote.author} category={quote.category} clicked={() => edit(quote.id)}/>
    })

    return (
        <div className="main-quotes">
            <div className="container">
                <div className="category-list-box">
                    <ul className="category-list">
                        <li className="category-list-item"><NavLink to={'/quotes/categories/all/'}>All</NavLink></li>
                        {categoryValue.map(category => (
                            <li key={category.data.id} className="category-list-item"><NavLink to={'/quotes/categories/all/' + category.data.id + '/'}>{category.data.title}</NavLink></li>
                        ))}
                    </ul>
                </div>
                <div className="quotes-list">
                    {allQuotesList}
                </div>
            </div>
        </div>
    );
};

export default CategoryQuotePage;