import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonRow from '../components/PersonRow';
import { Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox';

const Home = () => {

    const [people, setPeople] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const getPeople = async () => {
            const { data } = await axios.get('/api/peoplecars/getall');
            setPeople(data);
        }

        getPeople();
    }, []);

    return (
        <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 10 }}>
            <SearchBox
                searchText={searchText}
                placeholder="Search People"
                onTextChange={e => setSearchText(e.target.value)}
                onClearClick={() => setSearchText('')} />
            <div className="row mt-5">
                <div className="col-md-12" style={{ marginBottom: 20 }}>
                    <Link to='/addperson' style={{ textDecoration: 'none' }}>
                        <button className='btn btn-success btn-lg w-100'>Add Person</button>
                    </Link>
                </div>
            </div>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Car Count</th>
                        <th>Add Car</th>
                        <th>Delete Cars</th>
                    </tr>
                </thead>
                <tbody>
                    {people
                        .filter(p => `${p.firstName.toLowerCase()} ${p.lastName.toLowerCase()}`.includes(searchText))
                        .map(p => <PersonRow person={p} key={p.id} />)}
                </tbody>
            </table>
        </div>
    );
}

export default Home;