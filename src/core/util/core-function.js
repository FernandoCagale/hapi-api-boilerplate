export const filterProduction = (fileName) => {
  if (process.env.NODE_ENV === 'production' && fileName === 'documentation.js') {
    return false;
  }
  return true;
};

export const filterCoreDirectories = (dirName) => {
  if (dirName === 'modules') {
    return true;
  }
  return false;
};
