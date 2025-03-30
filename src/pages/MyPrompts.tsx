
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromptCard from "@/components/ui/PromptCard";
import { Button } from "@/components/ui/button";
import { usePrompts,Prompt,ListPromptResponse } from "@/context/PromptContext";
import { useAuth } from "@/context/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyPrompts = () => {
  const navigate = useNavigate();
  const { userPrompts, deletePrompt, isLoading } = usePrompts();
  const { isAuthenticated } = useAuth();
  const [userListPrompts, setUserListPrompts] = useState<ListPromptResponse>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/auth?mode=login");
      return;
    }
    const fetchUserListPrompts = async () => {
      const prompts = await userPrompts();
      setUserListPrompts(prompts);
    };
    fetchUserListPrompts();
  }, [isAuthenticated, userPrompts, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Prompts</h1>
              <p className="text-gray-600">
                Manage your created prompts
              </p>
            </div>
            
            <Button onClick={() => navigate("/create")}>
              Create New Prompt
            </Button>
          </div>
          
          {/* Prompts Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-primary/20 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : userListPrompts?.list.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userListPrompts?.list.map(prompt => (
                <div key={prompt.id} className="relative group">
                  <PromptCard prompt={prompt} />
                  
                  {/* Action overlay */}
                  <div className="absolute inset-0 bg-black/0 opacity-0 group-hover:opacity-100 group-hover:bg-black/5 transition-all duration-300 rounded-lg flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => navigate(`/edit/${prompt.id}`)}
                        className="shadow-md"
                      >
                        Edit
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="shadow-md"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              prompt.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deletePrompt(prompt.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No prompts created yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first prompt to get started
              </p>
              <Button onClick={() => navigate("/create")}>
                Create Your First Prompt
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyPrompts;
