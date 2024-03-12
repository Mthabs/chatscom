import React from 'react';

const FriendItem = ({friend}) => {
    return (
        <div className="bg-white p-4 mb-4 border rounded-lg shadow text-center text-sm-left">
            <img
                src="https://placebeard.it/200x200"
                alt="Profile"
                className="img-fluid"
            />
            <div className="my-3 text-center text-sm-left">
                <p className="font-weight-bold text-sm">{friend.friend_name}</p>
                <p className="">{friend.friend} mutual friends</p>
            </div>
            <button className="ml-auto font-weight-lighter py-2 px-2 rounded-lg bg-secondary cursor-pointer border-white text-white btn-block">
                Add Friend
            </button>
        </div>
    );
};

export default FriendItem;