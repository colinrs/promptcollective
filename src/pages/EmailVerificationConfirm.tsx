import { useEffect, useState } from "react";
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

const EmailVerificationConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { verificationCode, sendVerificationCode, isLoading } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasAttempted, setHasAttempted] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (hasAttempted) return;

    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const email = searchParams.get('email');

    if (!code || !email) {
      setVerificationStatus('error');
      setErrorMessage(t('emailVerification.invalidParams'));
      return;
    }

    const verifyEmail = async () => {
      try {
        await verificationCode(code, email);
        setVerificationStatus('success');
      } catch (error) {
        setVerificationStatus('error');
        setErrorMessage(t('emailVerification.verificationFailed'));
      }
    };

    setHasAttempted(true);
    verifyEmail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleResendEmail = async () => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    if (!email) return;

    setIsResending(true);
    try {
      await sendVerificationCode(email, "emailVerification");
    } catch (error) {
      console.error('Failed to send verification code:', error);
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'success':
        return (
          <>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">
                {t('emailVerification.success')}
              </p>
            </div>
            <Button
              type="button"
              className="w-full"
              onClick={() => navigate('/auth?mode=login')}
            >
              {t('emailVerification.proceedToLogin')}
            </Button>
          </>
        );
      case 'error':
        return (
          <>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-red-800">{errorMessage}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendEmail}
                disabled={isResending}
              >
                {isResending ? (
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
                onClick={() => navigate('/auth?mode=register')}
              >
                {t('emailVerification.backToRegister')}
              </Button>
            </div>
          </>
        );
      default:
        return (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        );
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
                {t('emailVerification.confirmTitle')}
              </CardTitle>
              <CardDescription className="text-center">
                {t('emailVerification.confirmDescription')}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 text-center">
              {renderContent()}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default EmailVerificationConfirm;