import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer id="footer" className="bg-theme-bg text-theme-text py-20 border-t border-theme-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-theme-accent w-6 h-6" />
              <span className="text-2xl font-serif tracking-widest uppercase italic text-theme-accent">Sairam Jewels</span>
            </div>
            <p className="text-sm text-theme-text-dim font-light leading-relaxed">
              Curating brilliance and crafting legends. We are more than just jewelry; we are the guardians of your most precious moments.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 border border-theme-border flex items-center justify-center hover:bg-theme-accent hover:text-theme-bg transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-8 uppercase tracking-widest text-theme-text font-light">Collections</h4>
            <ul className="space-y-4 text-sm text-theme-text-dim font-light">
              <li><a href="#" className="hover:text-theme-accent transition-colors">Engagement Rings</a></li>
              <li><a href="#" className="hover:text-theme-accent transition-colors">Bridal Necklaces</a></li>
              <li><a href="#" className="hover:text-theme-accent transition-colors">High Jewelry</a></li>
              <li><a href="#" className="hover:text-theme-accent transition-colors">Men's Collection</a></li>
              <li><a href="#" className="hover:text-theme-accent transition-colors">Gift Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-8 uppercase tracking-widest text-theme-text font-light">Services</h4>
            <ul className="space-y-4 text-sm text-theme-text-dim font-light">
              <li><a href="#" className="hover:text-theme-accent transition-colors">Bespoke Design</a></li>
              <li><a href="#" className="hover:text-theme-accent transition-colors">Jewelry Care</a></li>
              <li><a href="#" className="hover:text-theme-accent transition-colors">Valuation</a></li>
              <li><a href="#" className="hover:text-theme-accent transition-colors">Returns & Shipping</a></li>
              <li><a href="#" className="hover:text-theme-accent transition-colors">Sizing Guide</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-serif text-lg mb-8 uppercase tracking-widest text-theme-text font-light">Atelier</h4>
            <div className="flex gap-4 text-sm text-theme-text-dim font-light items-start">
               <MapPin className="w-5 h-5 flex-shrink-0 text-theme-accent" />
               <p>sitaramaswamy Temple Shop no-2, <br />main road, chowtra center, chilakaluripet</p>
            </div>
            <div className="flex gap-4 text-sm text-theme-text-dim font-light items-center">
               <Phone className="w-4 h-4 flex-shrink-0 text-theme-accent" />
               <p>+91 7013636652</p>
            </div>
            <div className="flex gap-4 text-sm text-theme-text-dim font-light items-center">
               <Mail className="w-4 h-4 flex-shrink-0 text-theme-accent" />
               <p>pothuguntitrinadh@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-theme-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-theme-text-dim">
            © 2026 Sairam Jewels. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-theme-text-dim">
            <a href="#" className="hover:text-theme-text transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-theme-text transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
