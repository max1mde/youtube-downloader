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

    const [status, setStatus] = useState('');

    const handleFormSubmit = async (link: string, mp4: boolean, quality: number) => {
        setStatus('Downloading video...');
        try {
            const response = await fetch('/download', {
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
            } else {
                throw new Error('Error downloading YouTube video');
            }
        } catch (error) {
            console.error('Error downloading YouTube video:', error);
            setStatus('Error downloading YouTube video');
        }
    };

    return (
        <div>
            <img className={"main-logo"} src={"../public/logo.svg"} alt={"logo"}/>
            <p className={"center-text"}>{status}</p>
            <div className={"container"}></div>
            <div className={"main-container"}>
                <div className={"youtube-downloader hover-card"}>
                    <Form name={"YouTube Downloader"} onSubmit={handleFormSubmit} inputName={"Download any video from YouTube using a link with the best quality"} inputPlaceholder={"Link https://yout..."} buttonName={"Download"} dropdowns={dropDownYT}></Form>
                </div>
            </div>
        </div>
    )
}




export default App
