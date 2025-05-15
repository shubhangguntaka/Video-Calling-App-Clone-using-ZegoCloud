/*import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { APP_ID, SERVER_SECRET } from "./constant";

const VideoPage = () => {
    const { id } = useParams();
    const roomID = id;
    //const roomID = getUrlParams().get('roomID') || randomID(5);
    let myMeeting = async (element) => {
        // generate Kit Token
        const appID = APP_ID;
        const serverSecret = SERVER_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), "shubhang");


        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        roomID,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
                //mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
        });
    }

    return (
        <div ref={myMeeting}>

        </div>
    )
}
export default VideoPage */


import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { APP_ID, SERVER_SECRET } from "./constant";
import "./VideoPage.css";

const VideoPage = () => {
    const { id: roomID } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Get the "name" query param from the URL
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get("name");

    useEffect(() => {
        if (!userName || !roomID) {
            alert("Missing name or room ID. Redirecting to home...");
            navigate("/");
            return;
        }

        const initMeeting = async () => {
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                APP_ID,
                SERVER_SECRET,
                roomID,
                Date.now().toString(),
                userName
            );

            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: containerRef.current,
                sharedLinks: [
                    {
                        name: "Copy this link to invite",
                        url: `${window.location.protocol}//${window.location.host}/room/${roomID}?name=${userName}`,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                showScreenSharingButton: true,
            });

            setIsLoaded(true);
        };

        initMeeting();
    }, [roomID, userName, navigate]);

    return (
        <div className="video-page">
            {!isLoaded && <p className="loading-text">Setting up your meeting...</p>}
            <div ref={containerRef} className="video-container" />
        </div>
    );
};

export default VideoPage;
