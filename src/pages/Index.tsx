
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, Zap, BarChart2, Users, Heart } from "lucide-react";

const Index = () => {
  // Track if user has scrolled
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
          <div className="flex items-center space-x-2">
            <Moon className="h-7 w-7 text-sleep-purple" />
            <span className="text-xl font-bold">SleepSync</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/features" className="text-sm font-medium text-muted-foreground hover:text-sleep-purple transition-colors">
              Features
            </Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-sleep-purple transition-colors">
              About
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-sleep-purple transition-colors">
              Pricing
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-sleep-purple hover:text-sleep-purple/90 hover:bg-sleep-purple/10">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-sleep-purple hover:bg-sleep-purple/90 text-white">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[70%] h-[70%] bg-gradient-to-br from-transparent via-sleep-light-purple/10 to-sleep-purple/5 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute -bottom-[10%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-tr from-transparent via-sleep-light-blue/10 to-sleep-blue/5 rounded-full blur-3xl opacity-70"></div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Track, Share & Improve Your <span className="text-sleep-purple">Sleep</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0"
              >
                Connect with friends, compare your sleep data, and climb the leaderboards with the most social sleep tracking platform.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Link to="/signup">
                  <Button className="px-8 py-6 bg-sleep-purple hover:bg-sleep-purple/90 text-white text-lg w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="px-8 py-6 border-sleep-purple/50 text-sleep-purple hover:text-sleep-purple/90 hover:bg-sleep-purple/10 text-lg w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-md">
                {/* App Dashboard Preview */}
                <img 
                  src="/lovable-uploads/83107339-14e3-4dce-b84b-082cfa4894b4.png" 
                  alt="SleepSync App Dashboard" 
                  className="rounded-xl shadow-2xl border border-border/50 w-full h-auto"
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 bg-sleep-purple/10 rounded-full p-3 animate-float shadow-lg border border-sleep-purple/20">
                  <Moon className="h-6 w-6 text-sleep-purple" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-sleep-blue/10 rounded-full p-3 animate-float shadow-lg border border-sleep-blue/20" style={{ animationDelay: "1s" }}>
                  <Zap className="h-6 w-6 text-sleep-blue" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Why SleepSync is Different
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Join thousands of people tracking and improving their sleep quality together
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Heart className="h-8 w-8 text-sleep-purple" />}
              title="Social Experience"
              description="Follow friends, share your sleep stats, and see how you compare to others in your network."
              delay={0}
            />
            
            <FeatureCard 
              icon={<BarChart2 className="h-8 w-8 text-sleep-purple" />}
              title="Detailed Analytics"
              description="Get comprehensive insights into your sleep patterns, quality, and trends over time."
              delay={0.2}
            />
            
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-sleep-purple" />}
              title="Global Leaderboards"
              description="Compete with users worldwide to reach the top of sleep quality rankings."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What Our Users Say
            </motion.h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sleep-purple/5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-sleep-light-purple/5 to-sleep-purple/10 rounded-full blur-3xl opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Sleep?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users already improving their sleep quality and habits with SleepSync.
            </p>
            
            <Link to="/signup">
              <Button className="px-8 py-6 bg-sleep-purple hover:bg-sleep-purple/90 text-white text-lg">
                Get Started for Free
              </Button>
            </Link>
            
            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required. Free plan available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 border-t">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Moon className="h-5 w-5 text-sleep-purple" />
                <span className="font-bold">SleepSync</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transform your sleep habits with the power of community and data.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-sleep-purple transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-sleep-purple transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="hover:text-sleep-purple transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-sleep-purple transition-colors">About</Link></li>
                <li><Link to="/blog" className="hover:text-sleep-purple transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-sleep-purple transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-sleep-purple transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-sleep-purple transition-colors">Terms</Link></li>
                <li><Link to="/cookies" className="hover:text-sleep-purple transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} SleepSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl p-6 border border-border/50 shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="bg-sleep-purple/10 rounded-full p-3 w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  content: string;
  delay: number;
}

const TestimonialCard = ({ name, role, avatar, content, delay }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl p-6 border border-border/50 shadow-md hover:shadow-lg transition-all duration-300"
    >
      <p className="text-muted-foreground italic mb-4">"{content}"</p>
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const testimonials = [
  {
    name: "Jessica T.",
    role: "Fitness Coach",
    avatar: "https://i.pravatar.cc/150?img=25",
    content: "SleepSync has revolutionized how I track my sleep. The social aspect keeps me accountable and I've improved my sleep score by 15% in just a month!"
  },
  {
    name: "Michael R.",
    role: "Software Developer",
    avatar: "https://i.pravatar.cc/150?img=8",
    content: "As someone who struggled with inconsistent sleep patterns, the insights from SleepSync have been game-changing. Now I'm regularly at the top of my friends' leaderboard."
  },
  {
    name: "Aisha K.",
    role: "Medical Student",
    avatar: "https://i.pravatar.cc/150?img=10",
    content: "The detailed analytics help me understand my sleep cycles better. I love competing with my classmates to see who can maintain the healthiest sleep schedule."
  }
];

export default Index;
