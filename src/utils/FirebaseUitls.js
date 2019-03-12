import firebase from "./Firebase";

class FirebaseUitls {
  getLinkImages(name) {
    var value = firebase
      .storage()
      .ref()
      .child("productsImg/" + name)
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
