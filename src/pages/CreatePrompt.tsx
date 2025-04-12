
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
// 从 PromptContext 导入 usePrompts 钩子函数
import { usePrompts,Category } from "@/context/PromptContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface FormData {
  title: string;
  content: string;
  category: string;
  categoryId: number;
}

const CreatePrompt = () => {
  const { promptId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { 
    isLoading,
    createPrompt, 
    updatePrompt, 
    createCategory,
    getPrompt,
    listCategory
  } = usePrompts();
  
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    category: "",
    categoryId: 0,
  });
  
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  
  useEffect(() => {
    const loadCategories = async () => {
      const categoriesList = await listCategory();
      setCategories(categoriesList?.list);
      // 如果不是编辑模式且有分类列表，设置第一个分类为默认值
      if (!isEditMode && categoriesList?.list?.length > 0) {
        setFormData(prev => ({
          ...prev,
          categoryId: categoriesList.list[0].id
        }));
      }
    };
    loadCategories();
  }, [listCategory, isEditMode]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth?mode=login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // If promptId is provided, we're in edit mode
    if (promptId) {
      const findPromptToEdit = () => {
        getPrompt(promptId).then(prompt => {
          if (prompt) {
            setFormData({
              title: prompt.title,
              content: prompt.content,
              category: prompt.category,
              categoryId: prompt.categoryId,
            });
            setIsEditMode(true);
          } else {
            toast.error("Prompt not found");
            navigate("/my-prompts");
          }
        });
      };
      findPromptToEdit();
    }
  }, [promptId, navigate, getPrompt]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { title: "", content: "", categoryId: "" };
    
    if (!formData.title.trim()) {
      newErrors.title = t('create.validation.title');
      valid = false;
    }
    
    if (!formData.content.trim()) {
      newErrors.content = t('create.validation.content');
      valid = false;
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = t('create.validation.category');
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData(prev => ({ ...prev, categoryId: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (isEditMode && promptId) {
        await updatePrompt({
          id: Number(promptId),
          title: formData.title,
          content: formData.content,
          categoryId: formData.categoryId,
        });
        toast.success("Prompt updated successfully");
      } else {
        await createPrompt({
          title: formData.title,
          content: formData.content,
          categoryId: formData.categoryId,
        });
        toast.success("Prompt created successfully");
      }
      navigate("/my-prompts");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    await createCategory(newCategoryName);
    setOpenDialog(false);
    setNewCategoryName("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isEditMode ? t('create.editTitle') : t('create.title')}
            </h1>
            <p className="text-gray-600">
              {isEditMode
                ? t('create.editDescription')
                : t('create.description')}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">{t('create.form.title')}</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={t('create.form.titlePlaceholder')}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">{t('create.form.content')}</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder={t('create.form.contentPlaceholder')}
                className={`min-h-[200px] resize-y ${
                  errors.content ? "border-red-500" : ""
                }`}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content}</p>
              )}
              <p className="text-xs text-gray-500">
                Tip: Use curly braces for variables, e.g., {"{topic}"} that users can fill in when using your prompt.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="category">{t('create.form.category')}</Label>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" type="button">
                      {t('create.form.createCategory')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('create.form.newCategory')}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input
                          id="categoryName"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          placeholder="E.g. Creative Writing"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateCategory}>
                        Create
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <select
                id="category"
                name="category"
                value={formData.categoryId}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.categoryId ? "border-red-500" : "border-input"
                } px-3 py-2`}
              >
                <option value="" disabled>
                  {t('create.form.selectCategory')}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-sm text-red-500">{errors.categoryId}</p>
              )}
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                {t('create.form.cancel')}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isEditMode ? t('create.form.updating') : t('create.form.creating')}
                  </>
                ) : isEditMode ? (
                  t('create.form.update')
                ) : (
                  t('create.form.submit')
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreatePrompt;
