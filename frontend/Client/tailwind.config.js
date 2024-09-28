/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-white": "#fff",
        gray: {
          "100": "#242424",
          "200": "rgba(0, 0, 0, 0.17)",
        },
        black: "#000",
        gainsboro: {
          "100": "#e6e6e6",
          "200": "#e0d9cf",
          "300": "#d9d9d9",
        },
        darkgray: "#9f9f9f",
        primary: "#b88e2f",
        darkgoldenrod: "#9e7514",
        "color-primary": "#e89f71",
        "color-gray-1": "#3a3a3a",
        "color-gray-4": "#b0b0b0",
        "color-gray-3": "#898989",
        "color-green-accents": "#2ec1ac",
        "color-red-accents": "#e97171",
        "color-light-bg": "#f4f5f7",
        darkslategray: {
          "100": "#333",
          "200": "rgba(58, 58, 58, 0.72)",
          "300": "rgba(51, 51, 51, 0.09)",
        },
        mediumslateblue: "#816dfa",
        linen: {
          "100": "#faf3ea",
          "200": "#f9f1e7",
        },
      },
      spacing: {},
      fontFamily: {
        poppins: "Poppins",
        montserrat: "Montserrat",
      },
      borderRadius: {
        mini: "15px",
        "3xs": "10px",
        "31xl": "50px",
        "8xs": "5px",
      },
    },
    fontSize: {
      base: "16px",
      sm: "14px",
      "5xl": "24px",
      lgi: "19px",
      xl: "20px",
      "17xl": "36px",
      "3xl": "22px",
      "10xl": "29px",
      "4xl": "23px",
      lg: "18px",
      smi: "13px",
      "23xl": "42px",
      "6xl": "25px",
      "15xl": "34px",
      "29xl": "48px",
      "19xl": "38px",
      xs: "12px",
      "13xl": "32px",
      "7xl": "26px",
      inherit: "inherit",
    },
    screens: {
      mq1350: {
        raw: "screen and (max-width: 1350px)",
      },
      mq1325: {
        raw: "screen and (max-width: 1325px)",
      },
      lg: {
        max: "1200px",
      },
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq800: {
        raw: "screen and (max-width: 800px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
