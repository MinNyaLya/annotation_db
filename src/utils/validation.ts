export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidJiraTicket = (ticket: string): boolean => {
  // Matches patterns like "PROJ-123", "ABC-1", etc.
  return /^[A-Z]+-\d+$/.test(ticket);
};

export const validateJiraTicket = (ticket: string): string | null => {
  if (!ticket) return null;
  
  if (isValidUrl(ticket)) {
    try {
      const url = new URL(ticket);
      if (!url.hostname.includes('jira') && !url.pathname.includes('browse')) {
        return 'Please enter a valid JIRA URL';
      }
      return null;
    } catch {
      return 'Invalid URL format';
    }
  }
  
  if (!isValidJiraTicket(ticket)) {
    return 'Please enter a valid JIRA ticket (e.g., PROJ-123) or URL';
  }
  
  return null;
};