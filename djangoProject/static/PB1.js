const websocketcn ={
  create0: () => new Promise((resolve, reject) =>{
    const socket1 = new WebSocket('chat/');
    socket1.onopen = function (e){
      const message = {
        'message': 'HELLO PB'
      };
      socket1.send(JSON.stringify(message));
    }
    socket1.onmessage = function (e){
      const  message = JSON.parse(e.data);
    }
  })
}

const ssecn= {
  create1: () => new Promise((resolve, reject) => {
    const source = new EventSource('source/');
    const timeout = window.setTimeout(() => {
      resolve(source);
    }, 200);
    source.onopen = function () {
      console.log("connection");
    }
    source.onmessage = function (e) {
      console.log(e.data);
    }
    source.onerror = () => {
      source.close();
      clearTimeout(timeout);
      reject(new Error("EventSource failed"));
    };
  }),
}

const  webworkercn = {
  create2: () => new Promise((resolve, reject) =>{
    const wk = new Worker('../static/worker.js');
  })
}

const {create0} = websocketcn;
const {create1} = ssecn;
const {create2} = webworkercn;

/*
const sleep = (ms) =>{
  return new Promise(resolve => setTimeout(resolve,ms));
};

async function receivems(){
    const messages = "";
    const Asciims = [];
    await consume(constants.Edge.maxSlots+10);
    await sleep(10)
      //try{
      //  const result = await consume(127);
      //  await sleep(10);
      //  if (result.status === "rejected"){
      //    throw new Erroe('full');
      //  }
      //} catch (error){
      //  Asciims.push(await release(resources.size));
      //  console.log('save number',error)
      //}
    console.log(resources.size);
    console.log(Asciims);
}

 */
function test(model){
  const n = document.getElementById('numberInput').value;
  if(n >= 0 && n <= 2000){
    if (model === '0'){
      for (let i=0; i<n; i++){
        create0();
      }
    } else if (model === '1'){
      for (let i=0; i<n; i++){
        create1();
      }
    } else if (model === '2'){
      for (let i=0; i<n; i++){
        create2();
      }
    }
  }else {
    alert('Please enter a number between 0 and 2000.');
  }
}