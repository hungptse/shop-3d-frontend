import firebase from "./Firebase";

class FirebaseUitls {
  async getLinkImages(name) {

   var value = await firebase.storage().ref().child("productsImg/" + name ).getDownloadURL();
   return value;
  }
}

export default new FirebaseUitls();
