
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePrompts,Prompt } from "@/context/PromptContext";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CategoryBadge from "@/components/common/CategoryBadge";
import SocialShare from "@/components/common/SocialShare";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Bookmark, Copy } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const PromptDetails = () => {
  const { promptId } = useParams<{ promptId: string }>();
  const navigate = useNavigate();
  const { getPrompt, likePrompt, savePrompt } = usePrompts();
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState<Prompt>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromptDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getPrompt(promptId);
        if (response) {
          setPrompt(response);
        } else {
          toast.error("Prompt not found");
          navigate("/gallery");
        }
      } catch (error) {
        console.error("Failed to fetch prompt details:", error);
        toast.error("Failed to load prompt details");
      } finally {
        setIsLoading(false);
      }
    };

    if (promptId) {
      fetchPromptDetails();
    }
  }, [promptId, navigate, getPrompt]);

  const category = {
    id: prompt?.categoryId,
    name: prompt?.category,
    color: prompt?.categoryColor, // Assuming categoryColor is a string like "#ff0000"
  }

  const handleLike = () => {
    if (prompt) {
      const action = prompt.liked ? "unlike" : "like";
      likePrompt(prompt.id, action);
      // Update local state to show immediate feedback
      setPrompt(prev => ({
        ...prev,
        liked: !prev.liked,
        likes: prev.liked ? prev.likes - 1 : prev.likes + 1
      }));
    }
  };

  const handleSave = () => {
    if (prompt) {
      const action = prompt.saved ? "unSave" : "save";
      savePrompt(prompt.id, action);
      // Update local state
      setPrompt(prev => ({
        ...prev,
        saved: !prev.saved
      }));
    }
  };

  const handleCopyPrompt = async () => {
    if (!prompt || !prompt.content) {
      toast.error("No content to copy");
      return;
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(prompt.content);
      } else {
        // Fallback for browsers that don't support the clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = prompt.content;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          textArea.remove();
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
          textArea.remove();
          throw new Error('Copy failed');
        }
      }
      toast.success(t('promptDetails.copySuccess'));
    } catch (error) {
      console.error("Failed to copy prompt:", error);
      toast.error(t('promptDetails.copyError'));
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  // Get the current page URL for sharing
  const shareUrl = window.location.href;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Prompt not found</h2>
            <Button onClick={goBack}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const timeAgo = formatDistanceToNow(new Date(prompt.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6 pl-0 text-gray-600" 
            onClick={goBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('promptDetails.back')}
          </Button>
          
          {/* Prompt Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={prompt.createdBy.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{prompt.createdBy.name}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{prompt.createdBy.name}</p>
                  <p className="text-sm text-muted-foreground">{timeAgo}</p>
                </div>
              </div>
              {category && (
                <CategoryBadge category={category} />
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{prompt.title}</h1>
          </div>
          
          {/* Prompt Content */}
          <Card className="mb-8 border border-gray-200">
            <CardContent className="p-6">
              <div className="whitespace-pre-wrap text-gray-700">
                {prompt.content}
              </div>
            </CardContent>
          </Card>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              variant="outline"
              className="gap-2 min-w-[100px]"
              onClick={handleLike}
            >
              <Heart
                className={`h-5 w-5 ${prompt.liked ? "fill-red-500 text-red-500" : ""}`}
              />
              <span>{t('promptDetails.actions.like')}</span>
            </Button>
            
            <Button
              variant="outline"
              className="gap-2 min-w-[100px]"
              onClick={handleSave}
            >
              <Bookmark
                className={`h-5 w-5 ${
                  prompt.saved ? "fill-primary text-primary" : ""
                }`}
              />
              <span>{prompt.saved ? t('promptDetails.actions.saved') : t('promptDetails.actions.save')}</span>
            </Button>
            
            <Button
              variant="outline"
              className="gap-2 min-w-[100px]"
              onClick={handleCopyPrompt}
            >
              <Copy className="h-5 w-5" />
              <span>{t('promptDetails.actions.copy')}</span>
            </Button>
          </div>
          
          {/* Social Sharing */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-medium mb-4">{t('promptDetails.share.title')}</h3>
            <SocialShare 
              url={shareUrl} 
              title={prompt.title} 
              description={`Check out this awesome prompt: ${prompt.title}`} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PromptDetails;
