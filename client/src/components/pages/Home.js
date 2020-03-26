import React, {useContext, useEffect} from 'react';
import Parts from '../parts/Parts';
import PartForm from '../parts/PartForm';
import PartFilter from '../parts/PartFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    const {user} = authContext;

    useEffect(() => {
        authContext.loadUser();  // get token, validate user and put user into state
        // eslint-disable-next-line
    }, []);

    return (
        <div>
        <div className="badge-dark my-2 header-text name-part-list ">
            <h2 className=" text-center">{user && user.name}'s PC Part List</h2>
        </div>
        <div className="grid-2">
            <div>
                <PartForm />
            </div>
            <div>
                <PartFilter />
            <Parts />
            </div>
            
        </div>
        </div>
    )
}

export default Home;
