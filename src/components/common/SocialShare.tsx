
import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Share } from "lucide-react";
import { toast } from "sonner";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description = "" }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
  };

  const handleShareClick = (platform: string, shareUrl: string) => {
    window.open(shareUrl, `share-${platform}`, 'width=600,height=400');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => handleShareClick('twitter', shareUrls.twitter)}
      >
        <Twitter size={16} />
        Twitter
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => handleShareClick('facebook', shareUrls.facebook)}
      >
        <Facebook size={16} />
        Facebook
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => handleShareClick('pinterest', shareUrls.pinterest)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
        Pinterest
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={handleCopyLink}
      >
        <Share size={16} />
        Copy Link
      </Button>
    </div>
  );
};

export default SocialShare;
