
import {useState} from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Prompt } from "@/context/PromptContext";
import { usePrompts } from "@/context/PromptContext";
import CategoryBadge from "@/components/common/CategoryBadge";
import { formatDistanceToNow } from "date-fns";

interface PromptCardProps {
  prompt: Prompt;
  fullWidth?: boolean;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt: initialPrompt, fullWidth = false }) => {
  const {likePrompt, savePrompt } = usePrompts();
  const [prompt, setPrompt] = useState(initialPrompt);
  
  const category = {
    id: prompt.categoryId,
    name: prompt.category,
    color: prompt.categoryColor,
  };

  const timeAgo = formatDistanceToNow(new Date(prompt.createdAt), {
    addSuffix: true,
  });

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); 
    const action = prompt.liked ? "unlike" : "like";
    setPrompt(prev => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1
    }));
    likePrompt(prompt.id, action);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const action = prompt.saved ? "unSave" : "save";
    setPrompt(prev => ({
      ...prev,
      saved: !prev.saved
    }));
    savePrompt(prompt.id, action);
  };

  return (
    <Link 
      to={`/prompt/${prompt.id}`}
      className={`block transition-all duration-300 hover:no-underline ${
        fullWidth ? "w-full" : "w-full"
      }`}
    >
      <Card className="h-full prompt-card border border-border/50 overflow-hidden">
        <CardHeader className="pb-3 pt-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={prompt.createdBy.avatar || "/placeholder.svg"} />
                <AvatarFallback>{prompt.createdBy.name}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{prompt.createdBy.name}</p>
                <p className="text-xs text-muted-foreground">{timeAgo}</p>
              </div>
            </div>
            {category && <CategoryBadge category={category} />}
          </div>
          <h3 className="text-xl font-semibold mt-3 text-left">{prompt.title}</h3>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-gray-600 text-sm text-left line-clamp-3">
            {prompt.content}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4 pb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 px-2"
              onClick={handleLike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={prompt.liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={prompt.liked ? "text-red-500" : ""}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{prompt.likes}</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 px-2"
            onClick={handleSave}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={prompt.saved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={prompt.saved ? "text-primary" : ""}
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>{prompt.saved ? "Saved" : "Save"}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PromptCard;
