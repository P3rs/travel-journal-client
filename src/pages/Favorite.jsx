import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { AuthContext } from "../authContext";
import "../styles/home.css";
import Card from "../components/Card";

const Favorite = () => {
    const [query, setQuery] = useState("");
    const { user } = useContext(AuthContext);
    const keys = ["title", "location", "date"];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `https://travel-journal-server.onrender.com/api/favorite/fav`,
                { userId: user._id }
            );
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
        setLoading(false);
    }, [user, loading]);
    const handleDelete = (id) => {
        console.log(data);
        setData(data.filter((item) => item._id !== id));
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
                        <div
                            className="p"
                            style={{
                                color: "white",
                                fontFamily: "'Kaushan Script', cursive",
                            }}
                        >
                            Loading...
                        </div>
                    </>
                ) : (
                    <>
                        {data?.map((item, i) => (
                            <Card
                                key={i} // Remember to add a unique key
                                _id={item._id}
                                photos={item.photos}
                                title={item.title}
                                date={item.date}
                                location={item.location}
                                text={item.text}
                                isFavorite={true}
                                setLoading={setLoading}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Favorite;