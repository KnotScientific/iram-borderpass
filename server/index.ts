import http from "http";

http
  .createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');  
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    const jsonData = [
      {
        id: 3450,
        question: "What is thy?",
        type: "checkbox",
        optional: true,
        options: [
          {
            label: "a",
            value: "a",
          },
          {
            label: "b",
            value: "b",
          },
        ],
      },
      {
        id: 3250,
        question: "How is thy?",
        type: "text",
        optional: false,
      },
      {
        id: 3460,
        question: "Where is thy?",
        type: "dropdown",
        optional: true,
        options: [
          {
            label: "a",
            value: "a",
          },
          {
            label: "b",
            value: "b",
          },
        ],
      },
      {
        id: 30,
        question: "When is thy?",
        type: "radio",
        optional: true,
        options: [
          {
            label: "a",
            value: "a",
          },
          {
            label: "b",
            value: "b",
          },
        ],
      },
    ];

    res.end(JSON.stringify(jsonData));
  })
  .listen(8080);
