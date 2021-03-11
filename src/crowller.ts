import fs from 'fs';
import path from 'path';
// ts -> .d.ts 翻译文件 @type/superagent -> js
import superagent from 'superagent';
import DellAnalyzer from './dellAnalyzer'
import LeeAnalyzer from './LeeAnalyzer'

// nodejs 模块自带的五个参数，exports, require, module, __filename, __dirname

export interface Analyzer{
  analyze: (html: string, filePath: string) => string
}

class Crowller {
  private url = 'https://y.qq.com/?ADTAG=myqq#type=index';
  private filePath = path.resolve(__dirname, '../data/music.json');

  async getCrowHtml () {
    const result = await superagent.get(this.url);
    return result.text;
  }

  writeFile(content: string){
    fs.writeFileSync(this.filePath, content)
  }

  async initSpiderProcess() {
    const html = await this.getCrowHtml(); // getCrowHtml 是一个异步的函数，也需要 await,否则返回的是一个 Promise
    const contentJson = this.analyzer.analyze(html, this.filePath)
    this.writeFile(contentJson);
  }

  constructor(private analyzer: Analyzer) {
    this.initSpiderProcess()
  }
}

const analyzer = DellAnalyzer.getAnalyzer();
new Crowller(analyzer);
