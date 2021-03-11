import fs from 'fs';
import cheerio from 'cheerio';

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

export default class DellAnalyzer{
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

  generateJsonContent(musicInfo: MusicResult, filePath: string){
    // 1、join是把各个path片段连接在一起， resolve把‘／’当成根目录
    // 2、join直接拼接字段，resolve解析路径并返回
    // const filePath1 = path.join(__dirname, '/data/music.json');
    let contentJson: Content = {};
    if(fs.existsSync(filePath)){
      contentJson = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    contentJson[musicInfo.time] = musicInfo.data;
    return contentJson;
  }

  public analyze(html: string, filePath: string){
    const musicInfo =  this.getMusicInfo(html);
    const contentJson = this.generateJsonContent(musicInfo, filePath);
    return JSON.stringify(contentJson);
  }
}
