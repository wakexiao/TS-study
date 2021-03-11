import fs from 'fs';
import cheerio from 'cheerio';
import {Analyzer} from './crowller'

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

// 1、单例类只能有一个实例
// 2、单例类  必须自己创建自己的唯一实例
// 3、单例类必须给其他所有对象提供这一实例
export default class DellAnalyzer implements Analyzer{ // extends只能继承一个类，但implements可以实现多个接口, 展示还不理解 implements 用法
  private constructor(){} // 将 constructor 属性设置成 private，外部就不能直接 new
  private static instance: DellAnalyzer;
  static getAnalyzer(){ // 使用单例模式 getAnalyzer需要使用static, static属性不需要new就可以直接在类上面使用
    if(!DellAnalyzer.instance){
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance
  }

  private getMusicInfo(html: string){
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

  private generateJsonContent(musicInfo: MusicResult, filePath: string){
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

  public analyze(html: string, filePath: string){ // public 属性需要 new了之后才能使用
    const musicInfo =  this.getMusicInfo(html);
    const contentJson = this.generateJsonContent(musicInfo, filePath);
    return JSON.stringify(contentJson);
  }
}
