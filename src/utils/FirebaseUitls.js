import firebase from "./Firebase";

class FirebaseUitls {
  getLinkImages(folder,name) {
    var value = firebase
      .storage()
      .ref()
      .child(folder + "/" + name)
      .getDownloadURL();
    return value;
  }


  uploadImages(image) {
    firebase
      .storage()
      .ref()
      .child("productsImg/" + image.name)
      .put(image)
      .then(snapshot => {
        console.log("Uploaded", snapshot);
      });
  }
 
}
export default new FirebaseUitls();
