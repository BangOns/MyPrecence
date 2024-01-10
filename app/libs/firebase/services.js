import { showFormattedDate } from "../index";
import { app } from "./init";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import bcryptjs from "bcryptjs";
const firestore = getFirestore(app);

export async function retrieveData(collect) {
  const q = await getDocs(collection(firestore, collect));
  const data = q.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return data;
}

export async function deleteUserById(collect, id) {
  await deleteDoc(doc(firestore, collect, id));
  return {
    message: "User berhasil di hapus",
  };
}

export async function login(data, callback) {
  let generateDate = showFormattedDate(new Date().toISOString());
  let dateNew = {
    date: generateDate,
    times: `${new Date().getHours()}:${new Date().getMinutes()}`,
  };
  const q = collection(firestore, "users");
  const checkUser = query(q, where("name", "==", data.name));
  const snapShot = await getDocs(checkUser);
  const user = snapShot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  const checkPassword =
    user.length !== 0
      ? bcryptjs.compareSync(data.password, user[0].password)
      : false;

  if (user.length !== 0 && checkPassword) {
    const updateUser = doc(firestore, "users", user[0].id);
    let checkPrecence = user[0].precence.filter((value) => {
      return (
        value.date.toLocaleLowerCase() === generateDate.toLocaleLowerCase()
      );
    });

    if (checkPrecence.length === 0) {
      user[0].precence = [...user[0].precence, dateNew];
      user[0].kehadiran = parseInt(user[0].kehadiran) + 1;
      const newuser = user[0];
      await updateDoc(updateUser, newuser);
    }
    return callback({
      status: true,
      data: user[0],
      statusCode: 200,
      message: "Selamat anda sudah login",
    });
  } else {
    return callback({
      status: false,
      statusCode: 500,
      message: "Nama atau Password salah",
    });
  }
}

export async function RegisterUser(data, callback) {
  let generateDate = showFormattedDate(new Date().toISOString());
  let dateNew = {
    date: generateDate,
    times: `${new Date().getHours()}:${new Date().getMinutes()}`,
  };
  const keyPassword = await bcryptjs.hash(data.password, 10);
  let newUser = {
    name: data.nama,
    semester: data.semester,
    password: keyPassword,
    role: parseInt(data.semester) > 0 ? "user" : "admin",
    precence: [dateNew],
    kehadiran: 1,
  };
  try {
    await addDoc(collection(firestore, "users"), newUser);
    return callback({
      status: true,
      data,
      statusCode: 200,
      message: "Selamat akun anda telah berhasil dibuat",
    });
  } catch (error) {
    return callback({
      status: false,
      statusCode: 500,
      message: "Mohon maaf ada kesalahan saat anda mendaftarkan akun",
    });
  }
}
export async function retrieveDataById(collect, id) {
  const getUsers = await getDoc(doc(firestore, collect, id));
  if (getUsers.exists()) {
    return getUsers.data();
  } else {
    return null;
  }
}

export async function updateUserPrecence(collect, data, callback) {
  const getUsers = await getDoc(doc(firestore, collect, data.id));
  const users = {
    id: getUsers.id,
    ...getUsers.data(),
  };
  const updateUser = doc(firestore, "users", users.id);

  if (data.password.length !== 0 && data.NewPassword.length !== 0) {
    const checkPassword = bcryptjs.compareSync(data.password, users.password);
    if (checkPassword) {
      const keyPassword = await bcryptjs.hash(data.NewPassword, 10);
      users.password = keyPassword;
    } else {
      return callback({
        status: 401,
        message: "Mohon maaf password anda salah",
        data: false,
      });
    }
  }
  users.name =
    data.name === users.name || data.name === "" ? users.name : data.name;
  users.semester =
    data.semester === users.semester || data.semester === ""
      ? users.semester
      : data.semester;
  const updatesUser = users;
  await updateDoc(updateUser, updatesUser);

  return callback({
    status: 200,
    message: "Selamat anda telah mengubah akun anda",
    data: true,
  });
}
