// import React, { createContext, useState, useEffect } from 'react';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [isLightTheme, setIsLightTheme] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//       setIsLightTheme(savedTheme === 'light');
//       document.body.classList.toggle('light-theme', savedTheme === 'light');
//     }
//   }, []);

//   const toggleTheme = () => {
//     setIsLightTheme((prevTheme) => {
//       const newTheme = !prevTheme;
//       localStorage.setItem('theme', newTheme ? 'light' : 'dark');
//       document.body.classList.toggle('light-theme', newTheme);
//       return newTheme;
//     });
//   };

//   return (
//     <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };