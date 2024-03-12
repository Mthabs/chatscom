import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/layout";
import AxiosServices from "../../Config/AxiosServices";
import FriendItem from "../../components/friend/friend-item";
import {Helmet} from "react-helmet";

const Friends = () => {
    const [friends, setFriends] = useState([])
    const getFriends = async () => {
        try {
            let response = await AxiosServices.get('/api/friends/')
            console.log(response.data)
            setFriends(response.data.results)
        } catch (error) {
            console.log(error)
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
                    friends?.length > 0 ?
                        <div className="row">
                            {friends.map(friend => (
                                <div key={friend.id} className="col-sm-6 col-lg-3">
                                    <FriendItem  friend={friend}/>
                                </div>
                            ))}
                        </div>
                        :
                        <p className="mt-10 font-weight-bold text-center">No data found</p>
                }
            </div>
        </Layout>
    );
};

export default Friends;