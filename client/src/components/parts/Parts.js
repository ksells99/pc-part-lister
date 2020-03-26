import React, {Fragment, useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import PartItem from './PartItem';
import PartContext from '../../context/part/partContext';
import Spinner from '../layout/Spinner';

const Parts = () => {
    const partContext = useContext(PartContext);

    const {parts, filtered, getParts, loading} = partContext;

    useEffect(() => {
        getParts();
        // eslint-disable-next-line
    }, []);

    if(parts !== null && parts.length === 0 && !loading) {                 // if no parts...
        return <h4>Please add a part</h4>
    };

    return (
        <Fragment>

            {/* check if anything in filtered - if so, any matching results displayed - if nothing in filtered, show all  */}
            
            {(parts !== null && !loading) ? (
                <TransitionGroup>

                {filtered !== null 
                ? filtered.map(part => (
                    <CSSTransition key={part._id} timeout={500} classNames="item">
                        <PartItem part={part}/>
                    </CSSTransition>
                )) 
                :parts.map(part => (
                    <CSSTransition key={part._id} timeout={500} classNames="item">
                        <PartItem part={part} />
                    </CSSTransition>
                    ))
                }
                </TransitionGroup>

            ) : <Spinner />}    
            
            
            

        </Fragment>
    )
}

export default Parts;