var puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();
var operationTypes = require('../constants/operationTypes');

router.post('/scraper', function (req, res) {
  (async () => {
    var browser = await puppeteer.launch();
    var page = await browser.newPage();
    var operations = req.body;

    var result = { url: '', headers: [], rows: [[]] },
      rowData,
      i,
      j;

    for (i = 0; i < operations.length; i++) {
      switch (operations[i].type) {
        case operationTypes.OPEN:
          result.url = operations[i].outputs.url;

          await page.goto(result.url, {
            waitUntil: 'networkidle2'
          });
          break;
        case operationTypes.EXTRACT:
          result.headers.push(operations[i].outputs.name);

          rowData = await page.evaluate((selector) => {
            return Array.from(document.querySelectorAll(selector)).map(query => query.textContent);
          }, operations[i].outputs.selector);

          for (j = 0; j < rowData.length; j++) {
            if (result.rows[j] === undefined) {
              result.rows.push([rowData[j]]);
            } else {
              result.rows[j].push(rowData[j]);
            }
          }
          break;
      }
    }

    res.json({
      result: result,
      sucess: true
    });
  })();
});

module.exports = router;