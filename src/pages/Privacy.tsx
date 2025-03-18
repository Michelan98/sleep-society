
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, ChevronLeft, Shield } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background px-4 py-8 animate-fade-in">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[30%] w-[80%] h-[80%] bg-gradient-to-br from-transparent via-sleep-light-purple/10 to-sleep-purple/5 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-[30%] -left-[30%] w-[80%] h-[80%] bg-gradient-to-tr from-transparent via-sleep-light-blue/10 to-sleep-blue/5 rounded-full blur-3xl opacity-70"></div>
      </div>
      
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <Link to="/" className="flex items-center mr-auto">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/" className="flex items-center justify-center">
            <Moon className="h-6 w-6 text-sleep-purple" />
            <span className="font-bold text-lg ml-2">SleepSync</span>
          </Link>
        </div>
        
        <div className="bg-card/80 border border-border/50 shadow-lg backdrop-blur-sm rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-left">
            <section>
              <div className="flex items-center mb-4">
                <Shield className="text-sleep-purple h-6 w-6 mr-2" />
                <h2 className="text-xl font-semibold">Your Privacy Matters</h2>
              </div>
              <p className="text-muted-foreground">
                At SleepSync, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-3">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Register for an account</li>
                <li>Connect third-party services such as Fitbit</li>
                <li>Create or share content</li>
                <li>Communicate with us</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                This information may include your name, email address, profile picture, and sleep data from connected services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">2. Sleep Data</h2>
              <p className="text-muted-foreground">
                When you connect third-party services like Fitbit, we access and store sleep-related data from these services, including sleep duration, sleep stages, and sleep quality metrics. This data is used to provide you with insights, analytics, and social features within the SleepSync platform.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Create and update your account</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Generate anonymized, aggregate statistics about how users interact with our platform</li>
                <li>Protect against, identify, and prevent fraud and other illegal activity</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">4. Sharing Your Information</h2>
              <p className="text-muted-foreground">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Other users as part of the social features of SleepSync (such as leaderboards), in accordance with your privacy settings</li>
                <li>Service providers who perform services on our behalf</li>
                <li>As required by law or to comply with legal process</li>
                <li>To protect the rights, property, or safety of SleepSync, our users, or others</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">5. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">6. Your Choices</h2>
              <p className="text-muted-foreground">
                You can access and update certain information about you through your account settings. You can also disconnect third-party services at any time. You may also contact us to request access to, correction of, or deletion of personal information that you have provided to us.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">7. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we learn we have collected or received personal information from a child under 13, we will delete that information.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">8. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@sleepsync.com.
              </p>
            </section>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
