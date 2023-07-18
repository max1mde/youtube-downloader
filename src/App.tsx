import Form from "./components/Form.tsx";
import { useState } from 'react';

interface DropDown {
    options: string[];
}

function App() {
    const dropDownYT: DropDown[] = [
        { options: ["MP4", "MP3"] },
        { options: ["Best quality", "FullHD (1080p) if available", "720p", "480p",  "Shit quality"] },
    ];

    const dropDownTT: DropDown[] = [

    ];

    const [status, setStatus] = useState('');

    const handleFormSubmitYouTube = async (link: string, mp4: boolean, quality: number) => {
        setStatus(mp4 ? 'Downloading video...' : 'Downloading audio...');
        try {
            const response = await fetch('/download-youtube', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ link, mp4, quality }),
            });
            if (response.ok) {
                const fileName = response.headers
                    .get('Content-Disposition')
                    ?.split('filename=')[1]
                    .replace(/"/g, '') || 'video';
                const blob = await response.blob();
                const downloadUrl = URL.createObjectURL(blob);
                const anchor = document.createElement('a');
                anchor.href = downloadUrl;
                anchor.download = fileName;
                anchor.click();
                setStatus(`Downloading ${fileName}...`);
                setTimeout(() => {
                    setStatus('');
                }, 6000);
            } else {
                throw new Error('Error downloading YouTube video');
            }
        } catch (error) {
            console.error('Error downloading YouTube video:', error);
            setStatus('Error downloading YouTube video');
        }
    };


    const handleFormSubmitTikTok = async (link: string) => {
        setStatus('Downloading video...');
        try {
            const response = await fetch('http://localhost:4002/download-tiktok', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ link }),
            });
            if (response.ok) {
                const fileName = response.headers
                    .get('Content-Disposition')
                    ?.split('filename=')[1]
                    .replace(/"/g, '') || 'video';
                const blob = await response.blob();
                const downloadUrl = URL.createObjectURL(blob);
                const anchor = document.createElement('a');
                anchor.href = downloadUrl;
                anchor.download = fileName;
                anchor.click();
                setStatus(`Downloading ${fileName}...`);
                setTimeout(() => {
                    setStatus('');
                }, 6000);
            } else {
                throw new Error('Error downloading TikTok video');
            }
        } catch (error) {
            console.error('Error downloading TikTok video:', error);
            setStatus('Error downloading TikTok video');
        }
    };


    return (
        <div>
            <img className={"main-logo"} src={"../public/logo.svg"} alt={"logo"}/>
            <p className={"center-text download-status"}>{status}</p>
            <div className={"container"}></div>
            <div className={"main-container"}>
                <div className={"youtube-downloader hover-card"}>
                    <Form name={"YouTube Downloader"} onSubmit={handleFormSubmitYouTube} inputName={"Download any video from YouTube using a link with the best quality"} inputPlaceholder={"Link https://yout..."} buttonName={"Download"} dropdowns={dropDownYT}></Form>
                </div>
            </div>
            <div className={"container"}></div>
            <div className={"main-container"}>
                <div className={"youtube-downloader hover-card"}>
                    <Form name={"TikTok Downloader"} onSubmit={handleFormSubmitTikTok} inputName={"Download any video from TikTok using a link with the best quality"} inputPlaceholder={"Link https://tiktok..."} buttonName={"Download"} dropdowns={dropDownTT}></Form>
                </div>
            </div>
            <p className={"center-text made-by"}>Made by <a href={"https://github.com/MaximFiedler"}>Maxim Fiedler</a></p>
        </div>
    )
}


export default App
