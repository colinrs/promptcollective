import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { sendVerificationCode, isLoading } = useAuth();
  const { email } = location.state || {};
  
  const handleResendEmail = async () => {
    if (!email) {
      navigate('/auth?mode=register');
      return;
    }
    try {
      await sendVerificationCode(email);
    } catch (error) {
      console.error('Failed to send verification code:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <Card className="border-border/50 shadow-lg animate-scale-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                {t('emailVerification.title')}
              </CardTitle>
              <CardDescription className="text-center">
                {t('emailVerification.description')}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  {t('emailVerification.checkEmail')}
                </p>
              </div>
              
              <p className="text-sm text-gray-500">
                {t('emailVerification.spamNotice')}
              </p>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendEmail}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
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
                    {t('emailVerification.resending')}...
                  </>
                ) : (
                  t('emailVerification.resend')
                )}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => navigate('/auth?mode=login')}
              >
                {t('emailVerification.backToLogin')}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EmailVerification;