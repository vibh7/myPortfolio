const BlogManager = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        Manage Blog Posts
      </h1>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow mb-8">
        <h2 className="text-xl mb-4 font-semibold dark:text-white">
          Create / Edit Post
        </h2>

        <input
          className="w-full p-3 mb-3 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          placeholder="Title"
        />

        <textarea
          rows="5"
          className="w-full p-3 mb-3 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          placeholder="Content"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Save Post
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
        <h2 className="text-xl mb-4 font-semibold dark:text-white">Existing Posts</h2>

        <div className="space-y-3">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="border-b border-gray-300 dark:border-gray-700 pb-3 flex justify-between"
            >
              <div>
                <h3 className="font-semibold">Sample Blog {id}</h3>
                <p className="text-gray-500 text-sm">This is an example excerpt...</p>
              </div>

              <div className="flex gap-3">
                <button className="text-blue-600 font-medium">Edit</button>
                <button className="text-red-600 font-medium">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogManager;
