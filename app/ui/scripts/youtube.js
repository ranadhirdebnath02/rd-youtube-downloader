const videoFilters = {
  audioandvideo: {
    quality: ["highest", "lowest"],
    format: ["mp4", "webm"]
  },
  videoonly: {
    quality: ["2160p", "1440p", "1080p", "720p", "480p", "360p", "240p", "144p", "highest", "lowest"],
    format: ["mp4", "webm"]
  },
  audioonly: {
    // quality: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    quality: ["highest", "lowest"],
    format: ["mp3", "m4a", "aac", "flac", "opus", "vorbis", "wav", "alac"]
  },
  mergevideo: {
    quality: ["2160p", "1440p", "1080p", "720p", "480p", "360p", "240p", "144p", "highest", "lowest"],
    format: ["mp4", "webm", "mkv", "ogg", "flv"]
  }
};

function isValidYouTubeUrl(url) {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return regex.test(url);
}