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

  uploadImages(images) {
    images.map(img => {
      var imgRef = firebase
        .storage()
        .ref()
        .child("productsImg/" + img.name)
        .put(img)
        .then(snapshot => {
          console.log("Uploaded", snapshot);
        });
    });
  }
}
export default new FirebaseUitls();
