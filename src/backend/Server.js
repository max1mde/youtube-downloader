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
        const videoFormat = ytdl.chooseFormat(videoInfo.formats, { quality });
        const fileExtension = mp4 === 'true' ? 'mp4' : 'mp3';
        const cleanedFileExtension = fileExtension.replace(/_/g, '');
        const fileName = `${videoInfo.videoDetails.title}.${cleanedFileExtension}`;


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
