const qualitiesMap = {
  "4320p": 1,
  "4320p60": 2,
  "2160p": 3,
  "2160p60": 4,
  "2160p60 HDR": 5,
  "1440p": 6,
  "1440p60": 7,
  "1440p60 HDR": 8,
  "1080p": 9,
  "1080p60": 10,
  "1080p60 HDR": 11,
  "720p": 12,
  "720p60": 13,
  "720p60 HDR": 14,
  "480p": 15,
  "480p60 HDR": 16,
  "360p": 17,
  "360p60 HDR": 18,
  "270p": 19,
  "240p": 20,
  "240p60 HDR": 21,
  "144p": 22,
  "144p 15fps": 23,
  "144p60 HDR": 24,
};

const getQualityIndex = (quality) => qualitiesMap[quality] || 25;

const isValidQuality = (quality) => !!qualitiesMap[quality];

const isLowerQuality = (quality) => {
  const index = getQualityIndex(quality);
  return index >= 17 && index <= 24;
};

module.exports = {
  getQualityIndex,
  isValidQuality,
  isLowerQuality,
};
