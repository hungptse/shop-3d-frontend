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

  


}
export default new FirebaseUitls();
