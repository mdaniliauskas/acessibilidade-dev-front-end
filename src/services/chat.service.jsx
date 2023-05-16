import {initializeApp} from "firebase/app";
import {child, getDatabase, onValue, orderByChild, push, query, ref, set, serverTimestamp} from "firebase/database";

const CONFIG = {
  databaseURL: "https://acessibilidade-dev-chat-default-rtdb.firebaseio.com",
};

const app = initializeApp(CONFIG);


let subscriptions = {};

export const getDb = () => {
  return getDatabase(app);
}

export const TIMESTAMP = serverTimestamp;

const db = getDb();

export async function writeData(payload) {
  const {path, data} = payload; 
  
  // pegar uma chave para o novo usuário
  let refId = push(child(ref(db), path)).key;

  try {
    await set(ref(db, path + "/" +refId), data);
    console.log(`referencia para ${path} criada com sucesso`)
    return {
      success: true,
      refId
    };
  } catch (e) {
    console.error(e.message);
    return {
      success: false,
      error: e.message
    };
  }
}

export function subscription(path, callback) {
  const unsubCallback = onValue(query(ref(db, path), orderByChild("createdAt")), (snapshot) => {
    let vet = [];
    snapshot.forEach((childSnapshot) => {
      const key = childSnapshot.key;
      const value = childSnapshot.val();
      vet.push({key, ...value})
    })
    callback(vet);
  });
  subscriptions[path] = unsubCallback;
}

export function unsubscription(path) {
  console.log("desinscrevendo " + path)
  subscriptions[path]()
}