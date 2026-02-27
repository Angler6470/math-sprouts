// Lightweight internal analytics - no external service
const STORAGE_KEY = 'math_sprouts_analytics';
const DEBOUNCE_TIME = 2000; // 2 seconds

// In-memory cache for debouncing
const recentEvents = new Map();

/**
 * Get current date string for daily grouping (YYYY-MM-DD)
 */
const getDateKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Load existing analytics data from localStorage
 */
const loadAnalytics = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.warn('Failed to load analytics:', err);
    return {};
  }
};

/**
 * Save analytics data to localStorage
 */
const saveAnalytics = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to save analytics:', err);
  }
};

/**
 * Track an event with optional properties
 * @param {string} eventName - Name of the event (e.g., 'app_open', 'game_start')
 * @param {object} props - Optional event properties
 */
export const track = (eventName, props = {}) => {
  const isDev = process.env.NODE_ENV === 'development';
  
  // Create a key for debouncing (event name + stringified props)
  const eventKey = `${eventName}:${JSON.stringify(props)}`;
  const now = Date.now();
  
  // Check if this exact event was tracked recently (within DEBOUNCE_TIME)
  if (recentEvents.has(eventKey)) {
    const lastTime = recentEvents.get(eventKey);
    if (now - lastTime < DEBOUNCE_TIME) {
      // Skip duplicate event
      return;
    }
  }
  
  // Update recent events cache
  recentEvents.set(eventKey, now);
  
  // Clean up old entries from recentEvents (keep last 50)
  if (recentEvents.size > 50) {
    const entries = Array.from(recentEvents.entries());
    entries.sort((a, b) => a[1] - b[1]);
    entries.slice(0, entries.length - 50).forEach(([key]) => {
      recentEvents.delete(key);
    });
  }
  
  if (isDev) {
    // In development, just log to console
    console.log('[Analytics]', eventName, props);
  } else {
    // In production, store counts by day in localStorage
    const dateKey = getDateKey();
    const analytics = loadAnalytics();
    
    if (!analytics[dateKey]) {
      analytics[dateKey] = {};
    }
    
    if (!analytics[dateKey][eventName]) {
      analytics[dateKey][eventName] = 0;
    }
    
    analytics[dateKey][eventName]++;
    
    // Clean up old data (keep last 30 days)
    const dateKeys = Object.keys(analytics).sort();
    if (dateKeys.length > 30) {
      dateKeys.slice(0, dateKeys.length - 30).forEach(key => {
        delete analytics[key];
      });
    }
    
    saveAnalytics(analytics);
  }
};

/**
 * Get all analytics data (for debugging/inspection)
 */
export const getAnalytics = () => {
  return loadAnalytics();
};

/**
 * Clear all analytics data
 */
export const clearAnalytics = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear analytics:', err);
  }
};
