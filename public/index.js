const socket = io();
const title = document.getElementById("title");
const price = document.getElementById("price");
const thumbnail = document.getElementById("thumbnail");
const email = document.getElementById("email");
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const age = document.getElementById("age");
const alias = document.getElementById("alias");
const avatar = document.getElementById("avatar");
const message = document.getElementById("message");

const avatarUrls = {
  women: [
    "https://res.cloudinary.com/dagruxu0y/image/upload/v1680229096/Avatars/4_nowksj.png",
    "https://res.cloudinary.com/dagruxu0y/image/upload/v1680229096/Avatars/5_zlqnmt.png",
    "https://res.cloudinary.com/dagruxu0y/image/upload/v1680229096/Avatars/3_wvl3vi.png",
  ],
  men: [
    "https://res.cloudinary.com/dagruxu0y/image/upload/v1680229096/Avatars/2_swsz1y.png",
    "https://res.cloudinary.com/dagruxu0y/image/upload/v1680229096/Avatars/1_lmmfev.png",
    "https://res.cloudinary.com/dagruxu0y/image/upload/v1680229096/Avatars/6_ygs1gu.png",
  ],
};

const formatMessage = (message) => {
  let newMessage = {};
  Object.entries(message).forEach(([key, value]) => {
    if (value) newMessage = { ...newMessage, [key]: value };
  });

  if (!newMessage.avatar)
    newMessage.avatar = `https://res.cloudinary.com/dagruxu0y/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1680376006/Avatars/3824210_l3s1ht.jpg`;

  if (!newMessage.alias) newMessage.alias = "Anónimo";
  return newMessage;
};

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
  e.preventDefault();

  const newMessage = {
    email: email.value,
    name: name.value,
    surname: surname.value,
    age: age.value,
    alias: alias.value,
    avatar: avatar.value,
    message: message.value,
    timestamp: new Date(),
  };

  const formattedMessage = formatMessage(newMessage);
  socket.emit("add-message", { ...formattedMessage });
  return false;
}

function renderMessages(messages) {
  const messageContainer = document.getElementById("messages");

  if (!messageContainer) return;

  if (messages.length) {
    const messageItems = messages
      .map(({ alias, avatar, message, id, timestamp }) => {
        const fyh = convertDate(timestamp);
        return `
          <div style="display: flex; align-items: start;">
            <img src="${avatar}" style="width: 30px; height: 30px; margin-right: 5px; border-radius: 50%;" />
            <p style="color: brown" key=${id}>
              <strong class="message-primary">${alias}</strong>
              [${fyh}]:
              <span class="message-success">${message}</span>
            </p>
          </div>`;
      })
      .join(" ");

    messageContainer.innerHTML = messageItems;
    email.value = "";
    name.value = "";
    surname.value = "";
    age.value = "";
    alias.value = "";
    avatar.value = "";
    message.value = "";
  } else
    messageContainer.innerHTML = `<div class="text-white text-center">No hay mensajes</div>`;
}

const convertDate = (date) => {
  const today = new Date();
  const messageDate = new Date(date);
  const messageDay = messageDate.getDate();
  const messageMonth = messageDate.getMonth();
  const messageYear = messageDate.getFullYear();
  const messageHour = messageDate.getHours();
  const messageMin = messageDate.getMinutes();
  const actualDay = today.getDate();
  const actualMonth = today.getMonth();

  const isToday = messageDay === actualDay && messageMonth === actualMonth;
  const isThisWeek =
    messageMonth === actualMonth && actualDay - messageDay <= 7;

  let fyh;

  if (isToday) fyh = `Hoy ${messageHour}:${messageMin}`;
  else if (isThisWeek) {
    const dayNumber = messageDate.getDay();
    const days = {
      0: "Domingo",
      1: "Lunes",
      2: "Martes",
      3: "Miércoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sábado",
    };
    fyh = `${days[dayNumber]} ${messageHour}:${messageMin}`;
  } else
    fyh = `${messageDay}/${messageMonth}/${messageYear} ${messageHour}:${messageMin}`;

  return fyh;
};

socket.on("show-all-messages", (data) => {
  renderMessages(data);
});

function addProduct(e) {
  e.preventDefault();

  const defaultThumbnail =
    "https://res.cloudinary.com/dagruxu0y/image/upload/v1680385409/Avatars/img_ckql0i.png";

  const productToAdd = {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value || defaultThumbnail,
  };

  socket.emit("add-product", productToAdd);
  return false;
}

socket.on("show-all-products", (products) => {
  const table = document.getElementById("sockets-table");
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
});

// socket.on("show-faker-products", (products) => {
//   const table = document.getElementById("faker-table");
//   const tableRows = document.getElementById("table-test");
//   const text = document.getElementById("no-products-text-test");

//   if (!table || !tableRows || !text) return;

//   if (!products.length) {
//     table.style.display = "none";
//     text.style.display = "block";
//     return;
//   }
//   table.style.display = "block";
//   text.style.display = "none";
//   const tableElements = products
//     .map(({ id, title, price, thumbnail }) => {
//       return `
//         <tr key=${id}>
//           <td scope="col">${title}</td>
//           <td scope="col">$${price}</td>
//           <td scope="col"><img src=${thumbnail} style='width:30px' /></td>
//         </tr>`;
//     })
//     .join(" ");

//   tableRows.innerHTML = tableElements;
// });

function logout() {
  console.log("aca");
  window.location.replace("/logout");
  setTimeout(() => {
    window.location.replace("/login");
  }, 3000);
}
