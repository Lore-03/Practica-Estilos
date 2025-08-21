type Environment = "development" | "production";

type APIBasePaths = {
  rickAndMortyAPI: string;
};

type APIConfig = {
  [key in Environment]: APIBasePaths;
};

const API_CONFIG: APIConfig = {
  development: {
    rickAndMortyAPI: "https://rickandmortyapi.com/api",
  },
  production: {
    rickAndMortyAPI: "https://rickandmortyapi.com/api",
  },
};

const getCurrentEnvironment = (): Environment => {
  return (import.meta.env.VITE_ENV as Environment) || "development";
};

const API_BASE_PATHS: APIBasePaths = API_CONFIG[getCurrentEnvironment()];

export default API_BASE_PATHS;
