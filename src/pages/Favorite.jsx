// client/src/pages/Home.jsx

import React, {
    useContext,
    useState
} from 'react';
import Navbar from '../components/Navbar';
import {
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {
    FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import useFetch from "../useFetch"
import {
    AuthContext
} from '../authContext';
import '../styles/home.css';
import Card from '../components/Card';

const Favorite = () => {
    const [query, setQuery] = useState("");
    const { user } = useContext(AuthContext);
    const { data, loading } = useFetch( `/entries`);
    // const { data, loading } = useFetch( `/entries/favorite/${user._id}`);
    const keys = ["title", "location", "date"];

    console.log(data);

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key] &&
                item[key].toLowerCase().includes(query))
        );
    };


    return (
        <div>
            <Navbar />
            <div className="search">
                <div className="searchBar">
                    <h2>Your favorite posts</h2>
                </div>
            </div>

            <div className="searchedPosts">
                {loading ? (
                    <>
                        <div className="p"
                             style={{
                                 color: "white", "fontFamily":
                                     "'Kaushan Script', cursive"
                             }}>
                            Loading...
                        </div>
                    </>
                ) : (
                    <>
                        {search(data)?.map((item, i) => (
                            <Card
                                key={i} // Remember to add a unique key
                                _id={item._id}
                                photos={item.photos}
                                title={item.title}
                                date={item.date}
                                location={item.location}
                                text={item.text}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Favorite;
