/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const submitHandler = () => {
        navigate(`/room/${input}`);
    }
    return (
        <div>
            <div>
                <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Enter your NAME' />
                <button onClick={submitHandler}>JOIN</button>
            </div>
        </div>
    )
}

export default HomePage */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Custom CSS for styling

const HomePage = () => {
    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();

    const handleJoin = () => {
        if (!name.trim()) {
            alert("Please enter your name.");
            return;
        }

        if (!roomId.trim()) {
            alert("Please enter a room ID.");
            return;
        }

        navigate(`/room/${roomId}?name=${encodeURIComponent(name)}`);
    };

    const handleCreateRoom = () => {
        if (!name.trim()) {
            alert("Please enter your name.");
            return;
        }

        const newRoomId = crypto.randomUUID(); // Unique room ID
        navigate(`/room/${newRoomId}?name=${encodeURIComponent(name)}`);
    };

    return (
        <div className="homepage-container">
            <h1 className="title">VideoCall</h1>
            <p className="subtitle">Connect face-to-face with anyone, anywhere.</p>

            <div className="form-container">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Your Name"
                    className="input-field"
                />
                <input
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    type="text"
                    placeholder="Room ID (optional if creating new)"
                    className="input-field"
                />

                <div className="button-group">
                    <button className="join-button" onClick={handleJoin}>Join Room</button>
                    <button className="create-button" onClick={handleCreateRoom}>Create New Room</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;