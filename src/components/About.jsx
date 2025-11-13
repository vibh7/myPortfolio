const About = () => {
  return (
    <section
      id="about"
      className="py-16 px-6 flex flex-col items-center text-center bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
    >
      <h2 className="text-4xl font-semibold mb-6 dark:text-white text-gray-900">
        About Me
      </h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-10">
        I'm a software engineer with expertise in building secure and scalable web applications.
        I love solving problems using Java, Spring Boot, and React.
        I aim to deliver clean, efficient, and maintainable code.
      </p>

      {/* Metrics */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Years of Experience */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl px-6 py-4 flex flex-col items-center transition-colors duration-300">
          <span className="text-3xl font-bold dark:text-blue-400 text-blue-600">2+</span>
          <span className="text-gray-600 dark:text-gray-300">Years of Experience</span>
        </div>

        {/* Projects Completed */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl px-6 py-4 flex flex-col items-center transition-colors duration-300">
          <span className="text-3xl font-bold dark:text-blue-400 text-blue-600">10+</span>
          <span className="text-gray-600 dark:text-gray-300">Projects Completed</span>
        </div>
      </div>
    </section>
  );
};

export default About;

