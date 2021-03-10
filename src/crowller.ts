import fs from 'fs';
import path from 'path';
// ts -> .d.ts 翻译文件 @type/superagent -> js
import superagent from 'superagent';
import cheerio from 'cheerio';

// nodejs 模块自带的三个参数，exports, require, module, __filename, __dirname

interface Music{
  cover: string,
  title: string,
  author: string
}
interface MusicResult{
  time: number,
  data: Music[]
}
interface Content{
  [propName: number]: Music[]
}

class Crowller {
  private url = 'https://y.qq.com/?ADTAG=myqq#type=index';
  private crowHtml = '';
  private filePath = path.resolve(__dirname, '../data/music.json');

  getMusicInfo(html: string){
    // const $ = cheerio.load('<h2 class="title">Hello world</h2>');
    // $('h2').addClass('welcome')
    // const musicItem = $('.title');
    // console.log($.html())
    // console.log(musicItem.length)
    const $ = cheerio.load(html);
    const musicItem = $('.playlist__list').eq(1).find('.playlist__item_box');
    const musicInfo: Array<Music> = [];
    musicItem.map((index, element) => { // 这是 jq 的 map方法，第一个参数是 index, 第二个参数是domElement
      const cover = $(element).find('.playlist__pic').attr('src');
      const title = $(element).find('.playlist__title a').text();
      const author = $(element).find('.playlist__author a').text();
      musicInfo.push({
        cover,
        title,
        author
      })
    })
    const result = {
      time: new Date().getTime(),
      data: musicInfo
    }
    // console.log(result)
    return result;
  }

  async getCrowHtml () {
    const result = await superagent.get(this.url);
    return result.text;
  }

  generateJsonContent(musicInfo: MusicResult){
    // 1、join是把各个path片段连接在一起， resolve把‘／’当成根目录
    // 2、join直接拼接字段，resolve解析路径并返回
    // const filePath1 = path.join(__dirname, '/data/music.json');
    let contentJson: Content = {};
    if(fs.existsSync(this.filePath)){
      contentJson = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    }
    contentJson[musicInfo.time] = musicInfo.data;
    return contentJson;
  }

  writeFile(content: string){
    fs.writeFileSync(this.filePath, content)
  }

  async initSpiderProcess() {
    const html = await this.getCrowHtml(); // getCrowHtml 是一个异步的函数，也需要 await,否则返回的是一个 Promise
    const musicInfo =  this.getMusicInfo(html);
    const contentJson = this.generateJsonContent(musicInfo);
    this.writeFile(JSON.stringify(contentJson));
  }

  constructor() {
    this.initSpiderProcess()
  }
}

const crowller = new Crowller();
