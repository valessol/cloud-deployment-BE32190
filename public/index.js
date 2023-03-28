const title = document.getElementById("title");
const price = document.getElementById("price");
const thumbnail = document.getElementById("thumbnail");
const email = document.getElementById("email");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const edad = document.getElementById("edad");
const alias = document.getElementById("alias");
const avatar = document.getElementById("avatar");
const text = document.getElementById("text");

const showProducts = (products) => {
  const table = document.getElementById("table-container");
  const tableRows = document.getElementById("table");
  const text = document.getElementById("no-products-text");

  if (!table || !tableRows || !text) return;

  if (!products.length) {
    table.style.display = "none";
    text.style.display = "block";
    return;
  }
  table.style.display = "block";
  text.style.display = "none";
  const tableElements = products
    .map(({ id, title, price, thumbnail }) => {
      return `
        <tr key=${id}>
          <td scope="col">${title}</td>
          <td scope="col">$${price}</td>
          <td scope="col"><img src=${thumbnail} style='width:30px' /></td>
        </tr>`;
    })
    .join(" ");

  tableRows.innerHTML = tableElements;
  title.value = "";
  price.value = "";
  thumbnail.value = "";
};

function addMessage(e) {
  const newMessage = {
    author: {
      email: email.value,
      nombre: nombre.value,
      apellido: apellido.value,
      edad: edad.value,
      alias: alias.value,
      avatar: avatar.value,
    },
    text: text.value,
  };
  socket.emit("add-message", { ...newMessage });
  return false;
}

function renderMessages(messages) {
  const messageContainer = document.getElementById("messages");

  if (!messageContainer) return;

  if (messages.length) {
    const messageItems = messages
      .map(({ author, text, id, fyh }) => {
        return `
          <div style="display: flex; align-items: start;">
            <img src="${author.avatar}" style="width: 30px; height: 30px; margin-right: 5px; border-radius: 50%;" />
            <p style="color: brown" key=${id}>
              <strong class="text-primary">${author.alias}</strong>
              [${fyh}]: 
              <span class="text-success">${text}</span>
            </p>
          </div>`;
      })
      .join(" ");
    messageContainer.innerHTML = messageItems;
    email.value = "";
    nombre.value = "";
    apellido.value = "";
    edad.value = "";
    alias.value = "";
    avatar.value = "";
    text.value = "";
  }
}

function renderCompressionPercentage(compression) {
  const container = document.getElementById("compressionPercentage");

  if (!container) return;

  const compressionPercent = Math.round(compression);
  container.innerHTML = `${compressionPercent}%`;
}

socket.on("show-all-messages", (data) => {
  const { messages, compression } = data;
  renderMessages(messages);
  renderCompressionPercentage(compression);
});

socket.on("show-faker-products", (products) => {
  const table = document.getElementById("faker-table");
  const tableRows = document.getElementById("table-test");
  const text = document.getElementById("no-products-text-test");

  if (!table || !tableRows || !text) return;

  if (!products.length) {
    table.style.display = "none";
    text.style.display = "block";
    return;
  }
  table.style.display = "block";
  text.style.display = "none";
  const tableElements = products
    .map(({ id, title, price, thumbnail }) => {
      return `
        <tr key=${id}>
          <td scope="col">${title}</td>
          <td scope="col">$${price}</td>
          <td scope="col"><img src=${thumbnail} style='width:30px' /></td>
        </tr>`;
    })
    .join(" ");

  tableRows.innerHTML = tableElements;
});

function logout() {
  console.log("aca");
  window.location.replace("/logout");
  setTimeout(() => {
    window.location.replace("/login");
  }, 3000);
}
