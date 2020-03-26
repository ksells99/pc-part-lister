import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import PartContext from '../../context/part/partContext';
import processor from '../layout/processor.png';

const PartItem = ({part}) => {

    const partContext = useContext(PartContext);

    const {deletePart, setCurrent, clearCurrent} = partContext;

    const {_id, name, url, imgUrl, price, type} = part;

    const onDelete = () => {
        deletePart(_id);
        clearCurrent();             // ensure part form is cleared
    };



    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '} <span style={{float: 'right'}} className={'badge badge-primary'}>
                {(type === 'cpu' || type === 'gpu' || type === 'psu' || type === 'ram') ? (type.toUpperCase()) : (type.charAt(0).toUpperCase() + type.slice(1))}
                            </span>
            </h3> 
            <a href={(imgUrl === '' ? null : imgUrl)}>
                <img className='part-image' src={(imgUrl === '' ? processor : imgUrl)} alt='Ivalid image URL'/>
            </a>
            <ul className="list"> 
                {url && (<li>
                    <i className="fas fa-globe"></i> <a href={url}>{url}</a>
                </li>)}
                {price && (<li>
                    <i className="fas fa-pound-sign"></i> {price}
                </li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(part)}>Edit</button>

                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
            
        </div>
    );
};

PartItem.propTypes = {
    part: PropTypes.object.isRequired
};

export default PartItem;

