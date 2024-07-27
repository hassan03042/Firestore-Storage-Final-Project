import {
  auth,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  storage,
  db,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../utility/utils.js";

const signup_user_btn = document.getElementById("signup_form");
const submit_btn = document.getElementById("submit_btn");

signup_user_btn.addEventListener("submit", function (e) {
  e.preventDefault();
  //  console.log(e);

  const img = e.target[0].files[0];
  const email = e.target[1].value;
  const password = e.target[2].value;
  const firstname = e.target[4].value;
  const lastname = e.target[5].value;
  const phone = e.target[6].value;
  const company = e.target[7].value;

  const userInfo = {
    img,
    email,
    password,
    firstname,
    lastname,
    phone,
    company,
  };

  //create Account
  submit_btn.disabled = true
  submit_btn.innerText = "PLEASE WAIT..."
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user);
      console.log("user uid =>", user.user.uid);

      //upload image
      const userRef = ref(storage, `images/${user.user.uid}`);
      uploadBytes(userRef, img)
        .then(() => {
          console.log("user image uploaded");

          //getting url of the image
          getDownloadURL(userRef)
            .then((url) => {
              console.log("Url AAGAYA BHAI", url);


              //update user info object
              userInfo.img = url

              //created user document reference
              const userdbRef = doc(db, "users",user.user.uid)

              //set this document to db
              setDoc(userdbRef, userInfo).then(()=>{
                console.log("user info added to db");
                window.location.href = "/";
                submit_btn.disabled = false
                submit_btn.innerText = "Submit"
              })
            })
            .catch((err) => {
              console.log("Url Nhi AAya Bhai Galti Hogayiii");
              submit_btn.disabled = false
                submit_btn.innerText = "Submit"
            });
        })
        .catch(() => {
          console.log("Error In Uploading Image");
          submit_btn.disabled = false
                submit_btn.innerText = "Submit"
        });
    })
    .catch((err) => {alert(err), (submit_btn.disabled = false); 
      submit_btn.innerText = "Submit";
});
  //  console.log(userInfo);
});
