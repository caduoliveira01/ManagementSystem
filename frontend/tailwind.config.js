module.exports = {
  darkMode: "class",
};
module.exports = {
  // ...
  content: [
    // ...
  ],
  theme: {
    extend: {
      keyframes: {
        rotating: {
          "0%": { "--a": "0deg" },
          "100%": { "--a": "360deg" },
        },
      },
      animation: {
        rotating: "rotating 4s linear infinite",
      },
    },
  },
};
