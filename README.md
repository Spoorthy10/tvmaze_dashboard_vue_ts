# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. 

This TVMaze application categorises the TV shows based on their genere and is sorted based on the ratings of the show. It is also provided with the search field to get the shows based on you preference.
### Features:
    1. User can browse for the shows based on the genre of the shows and further they are sorted based on their ratings(in descending order) in the dashboard.
    2. User can search for the particular show by entering the show name in the search field. 
    3. When clicked on the particular show , user will be navigated to another page which holds the details of that particular show.

### The framework and libraries used in this project are:
    Node : v22.14.0
    npm : v10.9.2
    Framework: Vue.js 3 - v3.5.24,
    Build Tool : Vite
    Routing : vue-router - v4.6.4
    // vue-router is used for handling the routing in this project.
    // It allows us to create single-page applications with multiple views and navigation between them.

    HTTP Client: Axios - v1.13.2, 
     // axios is used to make the API calls to fetch the data from the TVMaze API.
     // axios has better error handling and  it parses JSON responses automatically.
     // It also supports request and response interceptors, which can be useful for adding headers or logging.

    State Management : Pinia - v3.0.4,
        // Pinia is used for state management in this project. 
        // It is the official state management library for Vue.js and is designed to work seamlessly with Vue 3 and TypeScript.
        // Has minimal boilerplate compared to Vuex
        // Integrates seamlessly with the Composition API
    Styling : Tailwind CSS - v3.4.19   
        // Tailwind CSS is a utility-first CSS framework that provides a set of pre-defined classes to style the application.
        // It allows for rapid UI development and easy customization.

    Unit Testing : Vitest - v4.0.16
        // Vitest is a Vite-native unit testing framework that is fast and lightweight.
        // It provides a simple and intuitive API for writing unit tests for Vue components and other JavaScript code.

### Prerequisites
- Node.js (v18 or above)
- npm

### Installation: 
    1. Clone the repository to your local machine using:
       git clone https://github.com/Spoorthy10/tvmaze_dashboard_vue_ts.git
    2. Navigate to the project directory:
       cd tvmaze_dashboard_vue_ts
    3. Install the dependencies:
       npm install  
    4. Start the development server:
       npm run dev

### To run the unit tests:
    npm run test



