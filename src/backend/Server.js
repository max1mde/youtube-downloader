import express from'express';
import ytdl from 'ytdl-core';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/download', async (req, res) => {
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
