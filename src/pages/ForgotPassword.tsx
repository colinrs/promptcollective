import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, sendVerificationCode } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    };

    // 验证邮箱
    if (!formData.email) {
      newErrors.email = t('forgotPassword.emailRequired');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('auth.emailInvalid');
      valid = false;
    }

    // 如果已发送验证码，验证其他字段
    if (codeSent) {
      if (!formData.code) {
        newErrors.code = t('forgotPassword.codeRequired');
        valid = false;
      }

      if (!formData.newPassword) {
        newErrors.newPassword = t('forgotPassword.newPasswordRequired');
        valid = false;
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = t('auth.passwordLength');
        valid = false;
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t('forgotPassword.confirmPasswordRequired');
        valid = false;
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = t('forgotPassword.passwordMismatch');
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSendCode = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await sendVerificationCode(formData.email);
      setCodeSent(true);
      // TODO: 显示成功提示
    } catch (error) {
      // TODO: 显示错误提示
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await resetPassword(formData.email, formData.code, formData.newPassword);
      // TODO: 显示成功提示
      navigate('/auth?mode=login');
    } catch (error) {
      // TODO: 显示错误提示
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <Card className="border-border/50 shadow-lg animate-scale-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                {t('forgotPassword.title')}
              </CardTitle>
              <CardDescription>
                {t('forgotPassword.description')}
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('forgotPassword.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                    disabled={codeSent}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {!codeSent ? (
                  <Button
                    type="button"
                    className="w-full"
                    onClick={handleSendCode}
                    disabled={isLoading}
                  >
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
                        {t('forgotPassword.sendCode')}...
                      </>
                    ) : (
                      t('forgotPassword.sendCode')
                    )}
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="code">{t('forgotPassword.verificationCode')}</Label>
                      <Input
                        id="code"
                        name="code"
                        placeholder="123456"
                        value={formData.code}
                        onChange={handleChange}
                        className={errors.code ? "border-red-500" : ""}
                      />
                      {errors.code && (
                        <p className="text-sm text-red-500">{errors.code}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">{t('forgotPassword.newPassword')}</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className={errors.newPassword ? "border-red-500" : ""}
                      />
                      {errors.newPassword && (
                        <p className="text-sm text-red-500">{errors.newPassword}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">{t('forgotPassword.confirmPassword')}</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? "border-red-500" : ""}
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                {codeSent && (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
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
                        {t('forgotPassword.resetPassword')}...
                      </>
                    ) : (
                      t('forgotPassword.resetPassword')
                    )}
                  </Button>
                )}
                
                <Link
                  to="/auth?mode=login"
                  className="text-sm text-center text-primary hover:underline"
                >
                  {t('forgotPassword.backToLogin')}
                </Link>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;