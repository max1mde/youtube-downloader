import express from'express';
import ytdl from 'ytdl-core';
import bodyParser from 'body-parser';
import {TiktokDL} from "@tobyg74/tiktok-api-dl";
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/download-youtube', async (req, res) => {
    const { link, mp4, quality } = req.body;

    try {
        const videoInfo = await ytdl.getInfo(link);
        const fileExtension = mp4 === true ? 'mp4' : 'mp3';

        let qualityValue;
        switch (quality) {
            case 0:
                qualityValue =  "highest";
                break;
            case 1:
                qualityValue =  "137";
                break;
            case 2:
                qualityValue =  "136";
                break;
            case 3:
                qualityValue =  "135";
                break;
            case 4:
                qualityValue =  "lowest";
                break;
        }
        let videoFormat
        try {
            videoFormat = ytdl.chooseFormat(videoInfo.formats, { quality: qualityValue });
        } catch (error) {
            videoFormat = ytdl.chooseFormat(videoInfo.formats, { quality: "highest" });
        }

        if (fileExtension === 'mp3') {
            videoFormat = ytdl.filterFormats(videoInfo.formats, 'audioonly')[0];
        }
        const fileName = `${videoInfo.videoDetails.title}.${fileExtension}`;


        res.set({
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'Content-Type': mp4 === 'true' ? 'video/mp4' : 'audio/mpeg',
        });

        ytdl(link, { format: videoFormat }).pipe(res);
    } catch (error) {
        console.error('Error downloading YouTube video:', error);
        res.status(500).send('Error downloading YouTube video');
    }
});

app.post('/download-tiktok', async (req, res) => {
    const { link } = req.body;

    try {
        TiktokDL(link).then(async (result) => {
            const videoUrl = result.result.video[0];

            const response = await axios.get(videoUrl, {
                responseType: 'stream',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
            });

            res.set({
                'Content-Disposition': 'attachment; filename="tiktokvideo.mp4"',
                'Content-Type': 'video/mp4',
            });

            response.data.pipe(res);
        });
    } catch (error) {
        console.error('Error downloading TikTok video:', error);
        res.status(500).send('Error downloading TikTok video');
    }
});

app.listen(4002, () => {
    console.log('Server is running on port 4002');
});
