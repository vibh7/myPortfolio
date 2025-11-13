
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaArrowDown, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";


const Home = () => {
  return (
    <section
        id="home"
        className="h-screen flex flex-col justify-center items-center text-center px-6 
        bg-gradient-to-b from-gray-100 via-white to-gray-200 
        dark:from-gray-900 dark:via-gray-950 dark:to-black
        relative overflow-hidden transition-colors duration-500"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] dark:bg-blue-600/20 bg-blue-300/20 rounded-full blur-3xl"></div>
        </div>


      {/* Greeting */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold mb-4 dark:text-white text-gray-900"
      >
        Hi, I'm <span className="text-blue-500 dark:text-blue-400">Vikas Bharti</span> 👋
      </motion.h1>


      {/* Type Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xl md:text-2xl dark:text-gray-300 mb-8 font-light text-blue-950"
      >
        <TypeAnimation
          sequence={[
            "Java Fullstack Developer 💻",
            2000,
            "Problem Solver 🧠",
            2000,
            "Tech Enthusiast 🚀",
            2000,
             "Node.js Developer 💻",
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </motion.div>


      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-10"
      >
        I build secure, scalable, and efficient web applications using modern Java
        and React-based technologies. My focus is delivering impactful user
        experiences and robust backend solutions.
      </motion.p>


      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="flex gap-4 mb-8"
      >
        <a
          href="https://linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full 
          bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 
          hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 
          transition-all duration-300 hover:scale-110 transform shadow-md"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={22} />
        </a>
        <a
          href="https://github.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full 
          bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 
          hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 
          transition-all duration-300 hover:scale-110 transform shadow-md"
          aria-label="GitHub"
        >
          <FaGithub size={22} />
        </a>
        <a
          href="https://leetcode.com/your-username"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full 
          bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 
          hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 
          transition-all duration-300 hover:scale-110 transform shadow-md"
          aria-label="LeetCode"
        >
          <SiLeetcode size={22} />
        </a>
      </motion.div>


      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="flex gap-4 flex-wrap justify-center"
      >
        <a
          href="#projects"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-blue-500/30"
        >
          View Projects
        </a>
        <a
          href="/VikasBharti_Resume.pdf"
          target="_blank"
          download="VikasBharti_Resume.pdf"
          className="border border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-all"
        >
          Download Resume
        </a>
        <a
          href="/VikasBharti_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-all"
        >
          View Resume
        </a>
      </motion.div>


      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2.2, repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 text-blue-400 cursor-pointer"
      >
        <a href="#about" className="flex flex-col items-center">
          <FaArrowDown size={20} />
          <span className="text-xs text-gray-400 mt-1">Scroll Down</span>
        </a>
      </motion.div>
    </section>
  );
};


export default Home;