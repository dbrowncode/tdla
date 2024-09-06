import React,  { useState, useEffect } from "react";

/*
 * Banner: pulls an image url from api.nasa.gov and displays the site banner
 */
const Banner: React.FC = () => {
    const [currentImgUrl, setCurrentImgUrl] = useState<string | null>(null);
    const [copyright, setCopyright] = useState<string | null>(null);
    const backupData = {
        copyright: "\nMike Taivalmaa\n",
        url: "img/Bat_Taivalnaa_960.jpg",
    }

    useEffect(() => {
        const fetchImg = async () => {
            const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
            let data = await res.json();

            if (res.status !== 200) {
                // If we hit a rate limit or otherwise bad response, use a backup image.
                // The APOD image from 20240904 is a good one.
                data = backupData;
            }

            setCurrentImgUrl(data.url);
            setCopyright(data.copyright);
        };

        if (!currentImgUrl) // avoid fetching too often - consider caching once daily?
            fetchImg();
    }, []);

    if (!currentImgUrl)
        return (
            <div className="banner">
                <h1>To Do List</h1>
                <p className="copyright">Banner Loading...</p>
            </div>
        );

    return (
        <div className="banner" style={{ backgroundImage: `url(${currentImgUrl})` }}>
            <h1>To Do List</h1>
            {copyright && (
                <p className="copyright">{copyright} ©</p>
            )}
        </div>
    );
}

export default Banner;