const Experience = () => (
  <div className="py-16 flex flex-col justify-center items-center px-6 transition-colors duration-300">
    <h2 className="text-4xl font-semibold mb-6 dark:text-white text-gray-900">Experience</h2>
    <div className="dark:bg-gray-800 bg-white rounded-xl p-6 w-full max-w-3xl shadow-lg dark:shadow-blue-500/10 shadow-gray-300/30 transition-colors duration-300">
      <h3 className="text-2xl font-bold dark:text-blue-400 text-blue-600 mb-2">
        Software Engineer @ QSC
      </h3>
      <p className="dark:text-gray-400 text-gray-600 mb-2">Jul 2024 - Present</p>
      <ul className="list-disc dark:text-gray-300 text-gray-700 pl-6 space-y-1">
        <li>Modernized legacy React dashboards in the Q-SYS Cloud Monitoring Portal into functional components,
using React.memo and useMemo to reduce re-renders and stabilize real-time telemetry views.</li>
        <li>Designed and documented a microservices architecture that improved code maintainability and reduced deployment
time by 30%.</li>
        <li>Improved database performance with targeted indexing and query tuning, cutting average query execution
time by 50% and lowering server load by 35%.</li>
        <li>Developed Lua diagnostic modules in Q-SYS Designer to trace packet flow between video codecs, enabling faster
detection of packet loss, jitter, and network synchronization issues from the control UI.</li>
        <li>Built a CPU performance monitoring service to track per-process usage, enhancing observability, resource
allocation, and device reliability.</li>
      </ul>
    </div>
  </div>
);

export default Experience;
