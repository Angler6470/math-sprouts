// Auto-generated version information
import packageJson from '../package.json';

export const APP_NAME = 'Math Sprouts';
export const APP_VERSION = packageJson.version;

// BUILD_TIME is injected at build time via REACT_APP_BUILD_TIME env var
// Falls back to current timestamp if not set
export const BUILD_TIME = process.env.REACT_APP_BUILD_TIME 
  ? parseInt(process.env.REACT_APP_BUILD_TIME, 10)
  : Date.now();

// Format build time for display
export const formatBuildTime = () => {
  const date = new Date(BUILD_TIME);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
