import React, {useState, useContext, useEffect} from 'react';
import PartContext from '../../context/part/partContext';



const PartForm = () => {

    const partContext = useContext(PartContext);

    const {addPart, clearCurrent, current, updatePart} = partContext;

    useEffect(() => {
        if(current !== null) {
            setPart(current)    // set form to current part
        } else {
            setPart({
            name: '',
            imgUrl: '',
            url: '',
            price: '',
            type: 'cpu'
        });
    }
}, [partContext, current]);          // only runs if these are changed


    const [part, setPart] = useState({
        name: '',
        url: '',
        imgUrl: '',
        price: '',
        type: 'cpu'
    });

    const {name, url, imgUrl, price, type} = part;

    const onChange = (e) => setPart({...part, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        if (current === null) {
            addPart(part);    // pass in new part
        } else {
            updatePart(part);
        };
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    };



    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Part' : 'Add Part'}</h2>

        <div className="input-container">
            <i className="form-icon fas fa-desktop"></i>
            <input type="text" 
            placeholder="Part Name..."
            name="name" 
            value={name} 
            onChange={onChange}>
            </input>
        </div>

        <div className="input-container">
            <i className="form-icon fas fa-globe"></i>
            <input type="text" 
            placeholder="Part URL..."
            name="url" 
            value={url} 
            onChange={onChange}>
            </input>
        </div>

        <div className="input-container">
            <i className="form-icon fas fa-image"></i>    
            <input type="text" 
            placeholder="Image URL (optional)..."
            name="imgUrl" 
            value={imgUrl} 
            onChange={onChange}>
            </input>
        </div>

        <div className="input-container">
            <i className="form-icon fas fa-pound-sign"></i> 
            <input type="text" 
            placeholder="Price"
            name="price" 
            value={price} 
            onChange={onChange}>
            </input>
        </div>    
            
            <h5 className>Part Type</h5>

            <input type="radio" 
            name="type"
            value="cpu"
            checked={type === "cpu"}
            onChange={onChange}>
            </input> CPU{' '}

            <br></br>

            <input type="radio" 
            name="type"
            value="motherboard"
            checked={type === "motherboard"}
            onChange={onChange}>
            </input> Motherboard{' '}

            <br></br>

            <input type="radio" 
            name="type"
            value="ram"
            checked={type === "ram"}
            onChange={onChange}>
            </input> RAM{' '}

            <br></br>

            <input type="radio" 
            name="type"
            value="storage"
            checked={type === "storage"}
            onChange={onChange}>
            </input> Storage{' '}

            <br></br>

            <input type="radio" 
            name="type"
            value="gpu"
            checked={type === "gpu"}
            onChange={onChange}>
            </input> GPU{' '}

            <br></br>

            <input type="radio" 
            name="type"
            value="cooler"
            checked={type === "cooler"}
            onChange={onChange}>
            </input> Cooler{' '}

            <br></br>

            <input type="radio" 
            name="type"
            value="psu"
            checked={type === "psu"}
            onChange={onChange}>
            </input> PSU{' '}

            <br></br>

            <input type="radio" 
            name="type"
            value="case"
            checked={type === "case"}
            onChange={onChange}>
            </input> Case{' '}

            <br></br>

            <input type="radio" 
            name="type"
            value="fans"
            checked={type === "fans"}
            onChange={onChange}>
            </input> Fans{' '}

            <br></br>

            <input type="radio" 
            name="type"
            value="other"
            checked={type === "other"}
            onChange={onChange}>
            </input> Other{' '}

            <br></br>

            <div>
                <input type="submit" 
                value={current ? 'Update Part' : 'Add Part'}
                className="form-button btn btn-primary btn-block">
                </input>
            </div>

            {current && <div>
                <button className="form-button btn btn-light btn-block" onClick={clearAll}>Clear</button>           
                </div>}
        </form>
    )
}

export default PartForm;
