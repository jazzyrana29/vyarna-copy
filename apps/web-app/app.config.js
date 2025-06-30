import "dotenv/config";
import * as fs from "fs";

// Manually load .env.local or .env.production
const ENV_FILE = process.env.LOAD_ENV_FILE || ".env.production";

if (fs.existsSync(ENV_FILE)) {
  require("dotenv").config({ path: ENV_FILE });
}

export default ({ config }) => {
  return {
    ...config,
    extra: {
      baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      youtubeLink: process.env.EXPO_PUBLIC_YOUTUBE_LINK,
      instagramLink: process.env.EXPO_PUBLIC_INSTAGRAM_LINK,
      facebookLink: process.env.EXPO_PUBLIC_FACEBOOK_LINK,
      tiktokLink: process.env.EXPO_PUBLIC_TIKTOK_LINK,
      linkedinLink: process.env.EXPO_PUBLIC_LINKEDIN_LINK,
    },
  };
};
