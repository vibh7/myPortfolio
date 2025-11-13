const Experience = () => (
  <div className="py-16 flex flex-col justify-center items-center px-6 transition-colors duration-300">
    <h2 className="text-4xl font-semibold mb-6 dark:text-white text-gray-900">Experience</h2>
    <div className="dark:bg-gray-800 bg-white rounded-xl p-6 w-full max-w-3xl shadow-lg dark:shadow-blue-500/10 shadow-gray-300/30 transition-colors duration-300">
      <h3 className="text-2xl font-bold dark:text-blue-400 text-blue-600 mb-2">
        Software Engineer @ QSC
      </h3>
      <p className="dark:text-gray-400 text-gray-600 mb-2">Jul 2024 - Present</p>
      <ul className="list-disc dark:text-gray-300 text-gray-700 pl-6 space-y-1">
        <li>Refactored legacy React dashboards in the internal Q-SYS Cloud Monitoring Portal into functional components using
React.memo and useMemo, cutting unnecessary re-renders by 30% and improving real-time telemetry updates.</li>
        <li>Optimized backend analytics services that power cloud-side metrics aggregation by replacing deeply nested SQL subqueries with
Common Table Expressions (CTEs), improving query performance 8× on customer-facing endpoints.</li>
        <li>Converted blocking middleware to non-blocking asynchronous logic with async/await, reducing event loop latency and
improving the responsiveness of telemetry APIs that process thousands of device updates per minute.</li>
        <li>Engineered diagnostic Lua modules within Q-SYS Designer to monitor real-time packet flow between Q-SYS video codecs,
enabling rapid identification of packet loss, jitter, and network sync issues directly from the Q-SYS control interface.</li>
        <li>Designed and implemented a CPU performance monitoring tool to track usage per process, enabling better system resource
allocation and improving overall device performance and reliability.</li>
      </ul>
    </div>
  </div>
);

export default Experience;
