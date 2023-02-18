let logged;

function sendAnayltics(data: string) {
  console.log(data);
  logged = true;
  console.log(logged);
}

sendAnayltics("the data");
