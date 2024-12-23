const { ipcMain, dialog, app } = require('electron');
const ytdlp = require('ytdlp-nodejs');
const path = require('node:path');


module.exports = (APP_PATH, window) => {

  ipcMain.handle('download-video', async (event, data) => {
    // console.log(data)

    dialog.showSaveDialog(window, {
      title: "Save Video",
      defaultPath: app.getPath('downloads'),
      filters: (
        data.filter === "audioonly" ? [
          { name: 'Audio', extensions: [data.format] }
        ] : [
          { name: 'Video', extensions: [data.format] }
        ]
      )
    }).then(result => {
      if (!result.canceled) {
        // console.log(result);

        ytdlp.download(data.url, {
          filter: data.filter,
          quality: (data.filter !== "audioonly" ? data.quality : (data.quality === "highest" ? 10 : 5)),
          output: {
            fileName: path.basename(result.filePath),
            outDir: path.dirname(result.filePath),
          },
          embedSubs: data.embedSubs || false,
          embedThumbnail: data.embedThumbnail || false,
        }).on("progress", (data) => {
          // console.log(data);
          window.webContents.send('download-progress', data);
        });

      } else {
        window.webContents.send('download-error', 'Download cancelled By User');
      }
    }).catch(err => {
      console.log(err);
    });

  });

};