export const items = {
  login: {
    title: "Login de usuario",
    actionPath: "/login",
    items: [
      {
        id: "username",
        label: "Email",
        type: "text",
        placeholder: "email",
      },
      {
        id: "password",
        label: "Contraseña",
        type: "password",
        placeholder: "contraseña",
      },
    ],
    buttons: [
      {
        text: "Iniciar sesión",
        type: "submit",
        class: "btn-light",
      },
      {
        text: "Registrarse",
        type: "button",
        class: "btn-outline-light",
        id: "go-to-register",
      },
    ],
  },
  register: {
    title: "Registrarse",
    actionPath: "/register",
    items: [
      {
        id: "username",
        label: "Email",
        type: "text",
        placeholder: "email",
      },
      {
        id: "password",
        label: "Contraseña",
        type: "password",
        placeholder: "contraseña",
      },
    ],
    buttons: [
      {
        text: "Registrar",
        type: "submit",
        class: "btn-light",
      },
      {
        text: "Ya estoy registrado",
        type: "button",
        class: "btn-outline-light",
        id: "go-to-login",
      },
    ],
  },
};
