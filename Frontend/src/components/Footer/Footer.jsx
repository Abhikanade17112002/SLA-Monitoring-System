import React from "react";
import { Heart, Github, Linkedin, Mail, Network } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full backdrop-blur-2xl bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 border-t border-white/10 py-8 mt-auto shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          
          {/* Left Section - Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Network size={24} className="text-white" />
            </div>
            <div>
              <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SLA Monitor
              </div>
              <p className="text-xs text-gray-500">Real-time API Monitoring</p>
            </div>
          </div>

          {/* Center Section - Links */}
          <div className="flex gap-6 text-sm text-gray-400">
            <a 
              href="/about" 
              className="hover:text-cyan-400 transition-colors"
            >
              About
            </a>
            <a 
              href="/docs" 
              className="hover:text-cyan-400 transition-colors"
            >
              Docs
            </a>
            <a 
              href="/privacy" 
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy
            </a>
            <a 
              href="/terms" 
              className="hover:text-cyan-400 transition-colors"
            >
              Terms
            </a>
          </div>

          {/* Right Section - Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/abhishekkanade"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all transform hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={18} className="text-gray-400 hover:text-white transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/abhishekkanade"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} className="text-gray-400 hover:text-white transition-colors" />
            </a>
            <a
              href="mailto:abhishek@example.com"
              className="p-2 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all transform hover:scale-110"
              aria-label="Email"
            >
              <Mail size={18} className="text-gray-400 hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gradient-to-r from-transparent via-gray-800 to-transparent">
              <Heart size={16} className="text-red-400 fill-red-400 animate-pulse" />
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
              SLA Monitor
            </span>
            . All rights reserved.
          </p>

          <p className="text-center md:text-right flex items-center gap-2">
            Built with{" "}
            <Heart size={14} className="text-red-400 fill-red-400 animate-pulse" />
            by{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              Abhishek Kanade
            </span>
          </p>
        </div>

        {/* Tech Stack Badge */}
        <div className="mt-6 flex justify-center">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white border-2 border-gray-800">
                R
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white border-2 border-gray-800">
                N
              </div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-[10px] font-bold text-white border-2 border-gray-800">
                S
              </div>
            </div>
            <span className="text-xs text-gray-400">React • Node.js • Spring Boot</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;