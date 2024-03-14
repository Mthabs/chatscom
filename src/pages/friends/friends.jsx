import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/layout";
import AxiosServices from "../../Config/AxiosServices";
import FriendItem from "../../components/friend/friend-item";
import {Helmet} from "react-helmet";
import CardLoader from "../../components/loader/card-loader";

const Friends = () => {
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true);
    const getFriends = async () => {
        try {
            let response = await AxiosServices.get('/api/friends/')
            console.log(response.data)
            setFriends(response.data.results)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getFriends()
    }, []);
    return (
        <Layout>
            <Helmet>
                <title>Friends Page</title>
                <meta name="description" content="Helmet application"/>
            </Helmet>
            <div className="mt-5">
                {
                    loading ?
                        <div className="row">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(data => (
                                <div className="col-sm-6 col-lg-3" key={data}>
                                    <CardLoader/>
                                </div>
                            ))}
                        </div>
                        :
                        friends?.length > 0 ?
                            <div className="row">
                                {friends.map(friend => (
                                    <div key={friend.id} className="col-sm-6 col-lg-3">
                                        <FriendItem friend={friend}/>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className="border p-3 mb-3 rounded contentbox">
                                <p className="mt-10 font-weight-bold text-center">No data found</p>
                            </div>
                }
            </div>
        </Layout>
    );
};

export default Friends;