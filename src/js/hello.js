const echo = (text) => {
  return text + ": Me Too";

};

const request_callback = (text) => {
  let callback = echo(text);
  return callback;

};

const get_talk = () => {
  const $final_talk = document.getElementsByClassName("final");
  if ($final_talk.length !== 0) {
    if(last_talk !== $final_talk[$final_talk.length - 1].textContent){
      last_talk = $final_talk[$final_talk.length - 1].textContent;
      add_response(request_callback(last_talk));

    }
  }
};

const add_response = (text) => {
  const $response = document.getElementById("response");
  const text_node = document.createTextNode(text); 
  const $p = document.createElement("p");
  $p.classList.add("fin_response");
  $p.appendChild(text_node);
  $response.appendChild($p);

};

const remove_all_response = () => {
  const $response = document.getElementById("response");
  while ($response.firstChild) {
   $response.removeChild($response.firstChild);
  
  }
};

let speechRecognition = new webkitSpeechRecognition(); 
speechRecognition.onresult = console.log; 
speechRecognition.start();
let intervalId;

window.addEventListener("DOMContentLoaded", () => { 
  const $button1 = document.getElementById("button1"); 
  const $result = document.getElementById("result"); 
  const $main = document.getElementById("main"); 

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition 
  if (typeof SpeechRecognition === "undefined") { 
      $button1.remove(); 
      const message = document.getElementById("message"); 
      message.removeAttribute("hidden"); 
      message.setAttribute("aria-hidden", "false"); 
  } else { 
      // good stuff to come here 
    let listening = false; 
    const recognition = new SpeechRecognition(); 
    const start = () => { 
        recognition.start(); 
        $button1.textContent = "Stop listening"; 
        $main.classList.add("speaking"); 
        remove_all_response();
        intervalId = setInterval(get_talk, 1500);

    }; 
    const stop = () => { 
        recognition.stop(); 
        $button1.textContent = "Start listening"; 
        $main.classList.remove("speaking"); 
        clearInterval(intervalId);
        last_talk = "";

    };
    const onResult = event => { 
      $result.innerHTML = ""; 
      for (const res of event.results) { 
        const text = document.createTextNode(res[0].transcript); 
        const p = document.createElement("p"); 
        if (res.isFinal) { 
          p.classList.add("final");

        }
        p.appendChild(text); 
        $result.appendChild(p);

      }
    };
    recognition.continuous = true; 
    recognition.interimResults = true; 
    recognition.addEventListener("result", onResult);
    $button1.addEventListener("click", () => { 
      listening ? stop() : start(); 
      listening = !listening; 
    });
  }
}); 

/* talk words*/
let last_talk = "";

