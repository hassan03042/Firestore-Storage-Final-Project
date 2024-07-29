import {
  auth,
  db,
  storage,
  getDoc,
  getDocs,
  doc,
  onAuthStateChanged,
  signOut,
  collection,
} from "./utility/utils.js";

const logout_btn = document.getElementById("logout_btn");
const login_link = document.getElementById("login_link");
const user_img = document.getElementById("user_img");
const events_card_container = document.getElementById("events_card_container");
// console.log(auth);
// console.log(db);
// console.log(storage);

getAllEvents();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    login_link.style.display = "none";
    user_img.style.display = "inline-block";
    getUserInfo(uid);
  } else {
    //  window.location.href = '/auth/login/index.html';
    login_link.style.display = "inline-block";
    user_img.style.display = "none";
  }
});

logout_btn.addEventListener("click", () => {
  signOut(auth);
});

function getUserInfo(uid) {
  const userRef = doc(db, "users", uid);
  getDoc(userRef).then((data) => {
    console.log("data =>", data.id);
    console.log("data =>", data.data());

    user_img.src = data.data().img;
  });
}

async function getAllEvents() {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    events_card_container.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);

      const event = doc.data();

      const { banner, title, location, createdByEmail, description, date } =
        event;

      const card = ` <div class="event-card">
            <img src="${banner}" alt="Event Image">
            <div class="event-card-content">
                <h2 class="event-title">${title}</h2>
                <h5 class="event-description">${description}</h5>
                <p class="event-time">${date}</p>
                <p class="event-creator">${createdByEmail || "--"}</p>
                <p class="event-location">${location}</p>
            </div>
        </div>
    </div>`;

      events_card_container.innerHTML += card;
      console.log("event", event);
    });
  } catch (error) {
    alert(error);
  }
}
