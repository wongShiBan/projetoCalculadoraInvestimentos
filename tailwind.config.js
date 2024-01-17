/** @type {import('tailwindcss').Config} */
export default {
  // optou por nao trabalhar em src  ["./src/**/*.{html,js}"], 
  // . (ponto é o diretório atual)
  // ./src -> vai para a pasta src 
  // /**   -> todas as subpasta de src e /* onde este ultimo asterisco é coringa 
  // /*.{html,js} -> . significa extensäo

  content: ["./**/*.{html,js}", "./*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

