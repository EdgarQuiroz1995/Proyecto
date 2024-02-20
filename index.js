const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
// Habilitar CORS con opciones específicas
app.use(cors());
  
app.get('/buscar', async (req, res) => {
    const { palabraClave } = req.query;
    const url = 'https://www.redib.org/?lng=es';
    try {
        const resultado = await buscarEnlaces(url, palabraClave);
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud.' });
    }
});

async function buscarEnlaces(url, palabraClave) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.type('#searchForm_lookfor', palabraClave)
    await page.click('.form-inline button')
    // await page.waitForSelector('.search-results__record')
    await page.waitForNavigation('.search-results')
    const enlaces = await page.evaluate(() => {
        const results = document.querySelectorAll('.saving ');
        const links = [];
        for (const resultado of results) {
            const datos = resultado.querySelectorAll('#blockInfoTitle div a');
            links.push({ 
                link: datos[0].href,
                titulo: datos[0].title,
                autor: datos[1].title,
                autor_link: datos[1].href,
                publicado:datos[2].title,
                publicado_link:datos[2].href
                })
        } 
        return links;
    }); 
    // await page.screenshot({ path: 'test2.jpg' }) 
    await browser.close();
    return { enlaces };
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
