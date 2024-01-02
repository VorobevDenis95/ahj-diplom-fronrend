const input = document.querySelector('.chat__input');
const fileInput = document.querySelector('.chat__file-input');
const chat = document.querySelector('.chat');

// import replaceType from "./utils";

// // input.addEventListener('keydown', (e) => {
// //    if (e.key === 'Enter' && e.shiftKey) {
// //         console.log(123);
// //       input.value += '\n';
// //       console.log(typeof input.value)
// //       return;
// //     }
// //     if (e.key === 'Enter') {
// //       e.preventDefault();
// //       console.log(input.value);
// //       const message = document.createElement('p');
// //       message.textContent = e.target.value;
// //       input.value = '';
// //       chat.append(message);
// //     }
// // })

// // const clip = document.querySelector('.chat__clip');
// // clip.addEventListener('click', () => {
// //   fileInput.dispatchEvent(new MouseEvent('click'));
// // })

// // fileInput.addEventListener('change', (e) => {

// //   console.log(fileInput.files);
// //   const file = fileInput.files && fileInput.files[0];

// //   // const data = new FormData(fileInput.files[0]);
// //   // console.log(fileInput.files);

// //   // fetch('http://localhost:3000/messages/createMessage', {
// //   //   method: "POST",
// //   //   body: data,
// //   // });
// // })





import { API_URL } from "./const";
import { urles } from "./api/urles";
import ChaosService from "./ChaosService";
import Chaos from "./Chaos";

// const input = document.querySelector('.input');
// const inputName = document.querySelector('.input__name');
// const form = document.querySelector('.form');

// const service = new ChaosService();

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const formData = new FormData();
//   const files =  Object.values(input.files);

//   if (files) {
//     files.forEach(key => {
//       formData.append(key.name, key);
//     });
//     // formData.append('user-file', file, file.name);
//   }
  

//   formData.append('name', inputName.value);

//   // service.create(formData).then(() => {
//   //   if (file) {
//   //     console.log(file.type);
//   //     if (replaceType(file.type) === 'image') {
//   //       const img = document.createElement('img');
//   //       img.src = `${API_URL}${file.name}`
//   //       document.querySelector('body').append(img);
//   //     }
//   //   }
//   // }) 

//    fetch(`${API_URL}${urles.create}`, {
//       method: "POST",
//       body: formData, 
//     }).then(res => res.json())
//     .then(data => {
      

//       // if (files) {
//       //   console.log(file.type);
//       //   if (replaceType(file.type) === 'image') {
//       //     const img = document.createElement('img');
//       //     img.src = `${API_URL}${file.name}`
//       //     document.querySelector('body').append(img);
//       //   }
//       // }

//       console.log(data);
//     })
//     .catch(err => console.log(err));
// })

// // input.addEventListener('change', (e) => {
// //   console.log(e);
// // })





// // service.list().then(data => console.log(data));

// // [
// //   [
// //     PersistentFile {
// //       _events: [Object: null prototype],
// //       _eventsCount: 1,
// //       _maxListeners: undefined,
// //       lastModifiedDate: 2023-11-30T18:27:39.103Z,
// //       filepath: '/tmp/783454baa81bf09c18106c600',
// //       newFilename: '783454baa81bf09c18106c600',
// //       originalFilename: 'user.file.jpeg',
// //       mimetype: 'image/png',
// //       hashAlgorithm: false,
// //       size: 7010,
// //       _writeStream: [WriteStream],
// //       hash: null,
// //       [Symbol(kCapture)]: false
// //     },
// //     PersistentFile {
// //       _events: [Object: null prototype],
// //       _eventsCount: 1,
// //       _maxListeners: undefined,
// //       lastModifiedDate: 2023-11-30T18:27:39.104Z,
// //       filepath: '/tmp/783454baa81bf09c18106c601',
// //       newFilename: '783454baa81bf09c18106c601',
// //       originalFilename: 'user.file.jpeg',
// //       mimetype: 'image/png',
// //       hashAlgorithm: false,
// //       size: 7010,
// //       _writeStream: [WriteStream],
// //       hash: null,
// //       [Symbol(kCapture)]: false
// //     }
// //   ]
// // ]

const root = document.querySelector('#root');
const app = new Chaos(root);
console.log(app.files);
