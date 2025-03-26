const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2347039269770",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicURYV2J3Ynlia1VVTUcrMTZ5VGJlWmJPQWxIN1BQU1Nadzc1VEhoOEhVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoialZFemc0SEpIeXM3K2cxYXpJWlBHekpsQTB6Y1pGUUJVdHpJZUg5bXVnUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RW5INkhpT0g3d3pLTi9jUUFYWXU2VW1KbnFpV3dMRDFJZVh5SkJzZFZ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5THNwaTdIZzlJMjJnb1hBcEhNM09TKzBqTnhTS2FGWndkdGZDa3J5amg0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllMcmF1aUl5cDllYnQ3Znh5a25rcHFIei9Yb2pRQk1BK2g1NURNTU1va0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpnZzIvMXRiNEd5eVdMNkJadU1obkNXZEoxY3BKWVRMU0ZvZlUxZjMyMnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUxGZ2daOVRrajZ2b2hEb0xnM1dVN3hpMTh3Vkwwc3pkcjZ1a2Y3enFFMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1NCSnY3YnhGd2FhK1FZRUtCRVRPRGF0UU9sWHMyYlJGL2w5QzV3djMzQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlLSTg0ZmFEN2pLWjNVU0RmSmd3QXZ5dENFamxIWXVyVk11Sk9jck1QSmRYUUxnYjVHSkhKMzZQSENrSW9nQlMzVkdweUJSYzE3MDBUVVg0eXJWL2dBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDgsImFkdlNlY3JldEtleSI6ImlHK2tkL3Rxd29aYTlqWE83eHp2NWNOK0tZWXpTTGR1QjI2WGZNSC83bTQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkNBU0tZVFBQIiwibWUiOnsiaWQiOiIyMzQ3MDM5MjY5NzcwOjE4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuC8hsieyrjhtZbhtYnKs+GthMOExJDDhE0nxZogUMWWw5bEtMOLxIrImiBWzYfMv0nNh8y/UM2HzL8iLCJsaWQiOiIyMzM2NTI3NjQzMDUwNzoxOEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0luM3Fwd0dFT1d0a2I4R0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImMxR2IxT2EzT0sxS2xMU1E3NzA1dmU2cXMzTkVmc3R2N3g2ZEt5M2Q4Rjg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjJvUTlrM0tHVk9ZKzZnWWx6eDBsYUNZajllRlRBNHAzOUdFYTZLNldzQUo4Tm9jN3l2TjdvMlZsZHliV3FqVzZaWWlxQzhVRVB2ZUxUZnMzYWswcURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJaYWFpQmdqaUd4ZXBDTm1FL1V6S2ZjRUV4VXJpaVgxNVdQVlNpQ1hSZDNnK2VIcG14SW5xdk1Cem53akxrNmVzdER5ZE9EMGdZREoySnRmOEVpNkNpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMzkyNjk3NzA6MThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWE5SbTlUbXR6aXRTcFMwa08rOU9iM3Vxck56Ukg3TGIrOGVuU3N0M2ZCZiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQzMDE3NzE1LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUswbCJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
