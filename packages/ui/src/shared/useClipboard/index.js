import { useState } from 'react';

const useClipboard = () => {
  const [isGrantedReadAccess, beGrantedReadAccess] = useState(null);
  const [isGrantedWriteAccess, beGrantedWriteAccess] = useState(null);

  const read = async () => {
    if (isGrantedReadAccess === false) return null; // Don't keep trying to access the clipboard

    try {
      const content = await navigator.clipboard.readText();

      beGrantedReadAccess(true);

      return content;
    } catch (error) {
      beGrantedReadAccess(false);
      // eslint-disable-next-line no-console
      console.warn('User has not granted clipboard read access');

      return null;
    }
  };

  const write = async (content) => {
    if (isGrantedWriteAccess === false) return false; // Don't keep trying to access the clipboard

    try {
      await navigator.clipboard.writeText(content);

      beGrantedWriteAccess(true);

      return true;
    } catch (error) {
      beGrantedWriteAccess(false);

      return false;
    }
  };

  return { read, write };
};

export { useClipboard };
