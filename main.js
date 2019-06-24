let ARWEAVE_URL = "https://arweave.net";

let presets = {
  "0": { //get info
    url: ARWEAVE_URL + "/info",
    method: "GET"
  },
  "1": { //get peers
    url: ARWEAVE_URL + "/peers",
    method: "GET"
  },
  "2": { //get transaction by id
    url: ARWEAVE_URL + "/tx/{id}",
    method: "GET"
  },
  "3": { //get transaction field
    url: ARWEAVE_URL + "/tx/{id}/{field}",
    method: "GET"
  },
  "4": { //get transaction data
    url: ARWEAVE_URL + "/tx/{id}/data.{extension}",
    method: "GET"
  },
  "5": { //get transaction price
    url: ARWEAVE_URL + "/price/{bytes}/{target}",
    method: "GET"
  },
  "6": {
    url: ARWEAVE_URL + "/block/hash/{block_hash}",
    method: "GET"
  },
  "7": { //create transaction
    url: ARWEAVE_URL + "/tx",
    method: "POST",
    body: "{id: {id}, last_tx: {last_tx}, owner: {owner}, tags: {tags}, target: {target}, quantity: {quantity}, data: {data}, reward: {reward}, signature: {signature}"
  },
  "8": { //get wallet balance
    url: ARWEAVE_URL + "/wallet/{address}/balance",
    method: "GET"
  },
  "9": { //Get last transaction ID
    url: ARWEAVE_URL + "/wallet/{address}/last_tx",
    method: "GET"
  },
}

const display = (code, data) =>{
  $("#server-response").text("Status code: " + code + "\n\n" + data);
  $("#response_title").animate({"font-size": "120%"}, 100);
  $("#response_title").animate({"font-size": "100%"}, 100);
}

$(document).ready(() => {
  $(".dropdown-item").on('click', event =>{
    let id = $(event.currentTarget).attr("id")
    $("#input-url").val(presets[id].url);
    $("#input-method").val(presets[id].method?presets[id].method:"");
    $("#input-body").val(presets[id].body?presets[id].body:"");
  });

  $("#searchForm").on('submit', (event) => {
    event.preventDefault();

    let method = $("#input-method").val();
    let url = $("#input-url").val();

    if(!url || !method){
      return;
    }

    if(method === "GET"){
      jQuery.get(url
      ).done((data, textStatus, jqXHR) => {
        display(jqXHR.status, data);
      }).fail((jqXHR, textStatus, errorThrown) => {
        display(jqXHR.status, errorThrown);
      });
    }
    else if(method === "POST"){
      let body = $("#input-body").val() ? $("#input-body").val() : "{}";
      let parsedBody = ""
      try{
        parsedBody = JSON.parse(body);
      }
      catch(e){
        alert("The provided body is not in proper JSON format")
        return;
      }

      $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: body,
        contentType: "application/json",
        success: (data, textStatus, jqXHR) => {
          display(jqXHR.status, data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          display(jqXHR.status, errorThrown);
        }
      });
    }
    else{
      alert("Method must be one of GET or POST");
    }
  });
});
