import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import projects from "../data/projects";

const Projects = () => (
  <section
    id="projects"
    className="py-12 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
  >
    <h2 className="text-3xl sm:text-4xl font-semibold mb-10 text-center dark:text-white text-gray-900">
      Projects
    </h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
      {projects.map((proj) => (
        <div
          key={proj.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden 
                     transition-all duration-300 hover:shadow-blue-500/20 flex flex-col 
                     border border-transparent hover:border-blue-400/30"
        >
          {/* Project Image */}
          <div className="relative w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <img
              src={proj.image}
              alt={proj.name}
              className="w-full max-h-48 sm:max-h-56 object-cover rounded-t-lg 
                         transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Project Info */}
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 dark:text-blue-400 text-blue-600">
              {proj.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base leading-relaxed">
              {proj.description}
            </p>
            <div className="flex gap-5 mt-auto">
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 dark:text-gray-300 text-gray-700 transition-colors"
                title="View on GitHub"
              >
                <FaGithub size={22} />
              </a>
              <a
                href={proj.live}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 dark:text-gray-300 text-gray-700 transition-colors"
                title="Live Demo"
              >
                <FaExternalLinkAlt size={20} />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
