import React from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiSelector = ({ onEmojiSelect }) => {
  const handleEmojiClick = (emoji) => {
    onEmojiSelect(emoji.emoji);
  };

  return (
    <EmojiPicker
      onEmojiClick={handleEmojiClick}
      previewConfig={{ showPreview: false }} // Hides the preview section
      skinTonesDisabled={false} // Optional: disables skin tone selection
      searchDisabled={false} // Optional: disables the search bar
      width={350} // Adjust width as needed
      height={250} // Adjust height as needed
    />
  );
};

export default EmojiSelector;
