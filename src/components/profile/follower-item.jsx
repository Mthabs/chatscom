import React from 'react';

const FollowerItem = ({follower}) => {
    return (
        <div className="bg-white p-4 mb-4 border rounded-lg shadow-md text-center text-sm-left">
            <img
                src="https://placebeard.it/200x200"
                alt="Profile"
                className="img-fluid"
            />
            <div className="my-3 text-center text-sm-left">
                <p className="font-weight-bold">{follower.followed_name}</p>
                <p className="">{follower.followed} mutual friends</p>
            </div>
        </div>
    );
};

export default FollowerItem;