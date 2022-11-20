export const GLOBAl_API = {
  method: "POST",
  postBody: 
  `'{
      "interval": "hourly",
      "start": 1668788861,
      "end": 1668878861
    }'
  `,
  url: "'https://api.coinstatdata/public/api/v1/dynamo/global'",
  host: "api.coinstatdata",
  uri: "/public/api/v1/dynamo/global",
  content: "application/json",
  info: "-> Returns CSD 60 Global Index Data (hourly/daily)",
  nodeRequest:
  `
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'https://api.coinstatdata/public/api/v1/dynamo/global',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "interval": "hourly",
      "start": 1668788861,
      "end": 1668878861
    })
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });`,
  javaOkHttp: 
  `
  OkHttpClient client = new OkHttpClient().newBuilder().build();
  MediaType mediaType = MediaType.parse("application/json");
  RequestBody body = RequestBody.create(mediaType, 
    "{\r\n    \"interval\": \"hourly\",\r\n    \"start\": 1668788861,\r\n    \"end\": 1668878861\r\n}"
  );
  Request request = new Request.Builder()
    .url("http://api.coinstatdata/public/api/v1/dynamo/global")
    .method("POST", body)
    .addHeader("Content-Type", "application/json")
    .build();
  Response response = client.newCall(request).execute();
  `,
  sampleResponse:
`
  {
    "data": [
      {
        "stable_vol": 37084168132,
        "stable_mc": 143574109617,
        "total_vol": 70580776436,
        "interval": "hourly",
        "datetime": 1668790849,
        "none_stable_mc": 641395330934,
        "none_stable_vol": 33496608304,
        "total_mc": 784969440551
      },
      {
        "stable_vol": 37586413018,
        "stable_mc": 143410420060,
        "total_vol": 71120567947,
        "interval": "hourly",
        "datetime": 1668794449,
        "none_stable_mc": 637621843073,
        "none_stable_vol": 33534154929,
        "total_mc": 781032263133
      },
    ]
  }
`
};

export const CSD_INDEX_API = {
  method: "POST",
  postBody: 
  `'{
    "coin": "bitcoin",
    "interval": "hourly",
    "start": 1668788861,
    "end": 1668878861
    }'
  `,
  url: "'https://api.coinstatdata/public/api/v1/dynamo/csd-index'",
  host: "api.coinstatdata",
  uri: "/public/api/v1/dynamo/csd-index",
  content: "application/json",
  info: "-> Returns CSD60's individual coin Data. (hourly/daily)",
  nodeRequest:
  `
  var request = require('request');
  var options = {
    'method': 'POST',
    'url': 'http://api.coinstatdata.com/public/api/v1/dynamo/csd-index',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "coin": "bitcoin",
      "interval": "hourly",
      "start": 1668788861,
      "end": 1668878861
    })
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });`,

  javaOkHttp: 
  `
  OkHttpClient client = new OkHttpClient().newBuilder().build();
  MediaType mediaType = MediaType.parse("application/json");
  RequestBody body = RequestBody.create(mediaType, "{\r\n    \"coin\": \"bitcoin\",\r\n    \"interval\": \"hourly\",\r\n    \"start\": 1668788861,\r\n    \"end\": 1668878861\r\n}");
  Request request = new Request.Builder()
    .url("http://api.coinstatdata.com/public/api/v1/dynamo/csd-index")
    .method("POST", body)
    .addHeader("Content-Type", "application/json")
    .build();
  Response response = client.newCall(request).execute();
  `,

  sampleResponse:
  `
  {
    "data": [
      {
        "market_cap": 320689020353,
        "datetime": 1668790849,
        "price": 16635.99,
        "volumn": 21374228873,
        "coin": "bitcoin"
      },
      {
        "market_cap": 318625102126,
        "datetime": 1668794449,
        "price": 16604.38,
        "volumn": 21490551973,
        "coin": "bitcoin"
      },
    ]
  }
  `
};