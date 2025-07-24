import React, { useState, useRef } from "react";
import Image from "components/AppImage";
import Button from "components/ui/Button";
import imageUrls from '../../../image.json'; 

function SuggestedUser({ user, onFollow }) {
  const [followed, setFollowed] = useState(false);
  // Assign a random avatar only once per mount using ref
  const avatarRef = useRef(
    imageUrls[Math.floor(Math.random() * imageUrls.length)]
  );

  const handleFollow = () => {
    if (!followed) {
      setFollowed(true);
      onFollow(user.user_id);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <Image
        src={avatarRef.current}
        alt={user.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-1">
          <h4 className="font-medium text-text-primary text-sm truncate">
            {user.name}
          </h4>
        </div>
        <p className="text-xs text-text-muted">{`@${user.name.toLowerCase()}`}</p>
      </div>
      <Button
        variant={followed ? "secondary" : "primary"}
        size="xs"
        disabled={followed}
        onClick={handleFollow}
      >
        {followed ? "Followed" : "Follow"}
      </Button>
    </div>
  );
}

export default SuggestedUser;
