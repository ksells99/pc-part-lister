import React, {useContext, useRef, useEffect} from 'react';
import PartContext from '../../context/part/partContext';

const PartFilter = () => {
    const partContext = useContext(PartContext);

    const {filterParts, clearFilter, filtered} = partContext;

    const text = useRef('');

    useEffect(() => {
        if(filtered === null) {
            text.current.value = '';            // set search form empty
        }
    })

    const onChange = (e) => {
        if(text.current.value !== '') {     // check value of search input
            filterParts(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <div>
        <h2 className="text-primary">Current Parts</h2>
        <form>
            <input ref={text} type="text" placeholder="Filter parts..." onChange={onChange}></input>
        </form>
        </div>
    )
}

export default PartFilter;
