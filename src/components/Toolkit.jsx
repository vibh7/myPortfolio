import React from "react";
import {
  FaJava,
  FaPython,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaAws,
  FaLinux,
  FaDatabase,
  FaNetworkWired,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiJavascript,
  SiMysql,
  SiDocker,
  SiPostman,
  SiHibernate,
  SiExpress,
  // SiMicrosoftazure,
  SiGithub,
  SiGithubactions,
} from "react-icons/si";

const Toolkit = () => {
  const skills = [
    // 💻 Languages
    { icon: <FaPython className="text-[#3776AB] glow-icon" />, name: "Python" },
    { icon: <FaJava className="text-[#E76F00] glow-icon" />, name: "Java" },
    { icon: <SiJavascript className="text-[#F7DF1E] glow-icon" />, name: "JavaScript" },
    { icon: <SiMysql className="text-[#00758F] glow-icon" />, name: "SQL" },

    // ⚙️ Frameworks
    { icon: <FaReact className="text-[#61DBFB] glow-icon" />, name: "React.js" },
    { icon: <SiExpress className="text-[#000000] glow-icon" />, name: "Express.js" },
    { icon: <SiSpringboot className="text-[#6DB33F] glow-icon" />, name: "Spring Boot" },
    { icon: <SiHibernate className="text-[#59666C] glow-icon" />, name: "Hibernate" },
    { icon: <FaNodeJs className="text-[#3C873A] glow-icon" />, name: "Node.js" },

    // 🧰 Tools
    { icon: <SiDocker className="text-[#2496ED] glow-icon" />, name: "Docker" },
    { icon: <SiPostman className="text-[#FF6C37] glow-icon" />, name: "Postman" },
    { icon: <FaGitAlt className="text-[#F1502F] glow-icon" />, name: "Git" },
    { icon: <SiGithub className="text-[#181717] dark:text-white glow-icon" />, name: "GitHub" },

    // ☁️ Platforms
    // { icon: <SiMicrosoftazure className="text-[#0078D7] glow-icon" />, name: "Azure" },
    { icon: <FaAws className="text-[#FF9900] glow-icon" />, name: "AWS" },
    { icon: <FaLinux className="text-[#FCC624] glow-icon" />, name: "Linux" },
    { icon: <SiGithubactions className="text-[#2088FF] glow-icon" />, name: "GitHub Actions" },

    // 🎯 Core CS Concepts
    { icon: <FaDatabase className="text-[#2563EB] glow-icon" />, name: "Database" },
    { icon: <FaNetworkWired className="text-[#10B981] glow-icon" />, name: "Computer Networks" },
    { icon: <span className="text-3xl font-bold text-yellow-400">DSA</span>, name: "Data Structures & Algorithms" },
    { icon: <span className="text-3xl font-bold text-pink-400">OOP</span>, name: "OOPS" },
    { icon: <span className="text-3xl font-bold text-indigo-400">OS</span>, name: "Operating System" },
    { icon: <span className="text-3xl font-bold text-green-400">SD</span>, name: "System Design" },
  ];

  return (
    <section
      id="toolkit"
      className="py-12 sm:py-16 flex flex-col items-center justify-center overflow-hidden relative px-6 
      bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
    >
      <h2 className="text-4xl font-semibold mb-10 dark:text-white text-gray-900">
        My Toolkit
      </h2>

      <div className="relative w-full overflow-hidden group">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-8 min-w-[100px] 
              hover:scale-110 transition-transform duration-300"
            >
              <div className="text-6xl mb-2">{skill.icon}</div>
              <p className="text-sm dark:text-gray-300 text-gray-700 font-medium">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fading edges */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none" />
    </section>
  );
};

export default Toolkit;
