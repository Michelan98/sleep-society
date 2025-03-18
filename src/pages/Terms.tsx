
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, ChevronLeft } from "lucide-react";

const Terms = () => {
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
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="space-y-6 text-left">
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using SleepSync, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">2. Use License</h2>
              <p className="text-muted-foreground mb-3">
                Permission is granted to temporarily use SleepSync for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained in SleepSync</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">3. User Accounts</h2>
              <p className="text-muted-foreground">
                To use certain features of SleepSync, you must register for an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">4. Integration with Third-Party Services</h2>
              <p className="text-muted-foreground">
                SleepSync offers integration with third-party services such as Fitbit. By using these integrations, you acknowledge and agree that we are not responsible for the availability or accuracy of such services, and we do not endorse and are not responsible or liable for any content, advertising, products, or other materials available from such services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">5. Data and Privacy</h2>
              <p className="text-muted-foreground">
                Your use of SleepSync is also governed by our <Link to="/privacy" className="text-sleep-blue hover:text-sleep-purple underline">Privacy Policy</Link>, which outlines how we collect, use, and safeguard your personal information, including sleep data obtained through integrations with third-party services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">6. Disclaimer</h2>
              <p className="text-muted-foreground">
                The materials on SleepSync are provided on an 'as is' basis. SleepSync makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">7. Limitations</h2>
              <p className="text-muted-foreground">
                In no event shall SleepSync or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use SleepSync, even if SleepSync or a SleepSync authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">8. Revisions and Errata</h2>
              <p className="text-muted-foreground">
                The materials appearing on SleepSync could include technical, typographical, or photographic errors. SleepSync does not warrant that any of the materials on its website are accurate, complete or current. SleepSync may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">9. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-sleep-purple mb-3">10. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at legal@sleepsync.com.
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

export default Terms;
