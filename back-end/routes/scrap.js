var puppeteer = require('puppeteer');
var express = require('express');
var router = express.Router();
var operationTypes = require('../constants/operationTypes');

var browser = null;

router.post('/scrap', function (req, res) {
  (async () => {
    if (!browser) {
      browser = await puppeteer.launch();
    }

    var page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (req) => {
      if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
        req.abort();
      }
      else {
        req.continue();
      }
    });

    var operations = req.body;

    var result = { url: '', fields: [], data: [[]] };

    var rowData, i, j;

    for (i = 0; i < operations.length; i++) {
      switch (operations[i].type) {
        case operationTypes.OPEN:
          result.url = operations[i].outputs.url;

          await page.goto(result.url, {
            waitUntil: 'networkidle2'
          });
          break;
        case operationTypes.EXTRACT:
          result.fields.push(operations[i].outputs.name);

          rowData = await page.evaluate((selector) => {
            return Array.from(document.querySelectorAll(selector)).map(query => query.textContent);
          }, operations[i].outputs.selector);

          for (j = 0; j < rowData.length; j++) {
            if (result.data[j] === undefined) {
              result.data.push([rowData[j]]);
            } else {
              result.data[j].push(rowData[j]);
            }
          }

          break;
        case operationTypes.CLICK:
          await page.click(operations[i].outputs.selector)
          break;
        case operationTypes.TYPE:
          await page.click(operations[i].outputs.selector, operations[i].outputs.text)
          break;
      }
    }

    await page.close();

    res.json({
      result: result,
      sucess: true
    });
  })();
});

module.exports = router;