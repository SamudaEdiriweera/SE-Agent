To create a responsive React component for the LMS card design using Tailwind CSS, we will first define the structure of the component based on the provided Figma design data. We'll then apply Tailwind CSS classes to style the component accordingly.

Here's the React component code:

```jsx
import React from 'react';

const LMSCard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-100 p-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div>
            <h2 className="text-xl font-semibold">Hi, Alex</h2>
            <p className="text-sm text-gray-600">E173037</p>
          </div>
        </div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-3 p-2 bg-blue-500 text-white rounded-md">
            <div className="w-8 h-8 bg-blue-700 rounded-full"></div>
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-md">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>My Courses</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-md">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>Assignments</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-md">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>Time Table</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-md">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>Settings</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <h2 className="text-2xl font-semibold mb-2">Welcome Back, Alex</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="text-xl font-medium">Teacher</h3>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="text-xl font-medium">Reference</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSCard;
```

This component uses Tailwind CSS classes to style the layout and elements. The sidebar contains navigation links, and the main content area displays a welcome message and some placeholder content.

Now, let's save this code to a file using the `write_file` tool.

```python
write_file('LMSCard.js', """
import React from 'react';

const LMSCard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-100 p-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div>
            <h2 className="text-xl font-semibold">Hi, Alex</h2>
            <p className="text-sm text-gray-600">E173037</p>
          </div>
        </div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-3 p-2 bg-blue-500 text-white rounded-md">
            <div className="w-8 h-8 bg-blue-700 rounded-full"></div>
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-md">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>My Courses</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-md">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>Assignments</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-md">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>Time Table</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-md">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>Settings</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <h2 className="text-2xl font-semibold mb-2">Welcome Back, Alex</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="text-xl font-medium">Teacher</h3>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h3 className="text-xl font-medium">Reference</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSCard;
""")
```

This code will create a file named `LMSCard.js` in the workspace with the React component code.