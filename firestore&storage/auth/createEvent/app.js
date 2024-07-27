import {
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    db,
    collection,
    addDoc,
    auth
 } from "../../utility/utils.js";

 console.log("auth", auth);
 const event_form = document.getElementById('event_form');

 event_form.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log(e);

    const eventInfo = {
        banner : e.target[0].files[0],
        title : e.target[1].value,
        description : e.target[2].value,
        location : e.target[3].value,
        date : e.target[4].value,    
        createdBy : auth.currentUser.uid,
        createdByEmail : auth.currentUser.email,
        Likes: [],

    };

    const imgRef = ref(storage, eventInfo.banner.name)
    uploadBytes(imgRef, eventInfo.banner).then(() =>{
        console.log("File Upload Done");

        getDownloadURL(imgRef).then((url)=>{
            console.log("Url Aagaya", url);
            eventInfo.banner = url;

            //add document to event collection

            const eventcollection = collection(db, "events");
            addDoc(eventcollection, eventInfo).then(()=>{
                console.log("Document Added");
                window.location.href = '/'
            })
        });
    }); 
 });