import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegrafService {
    private bot:Telegraf
    constructor(){
        this.bot = new Telegraf("7767530890:AAHVryUx0NAgde3DROWlCA5IG0p56qaHKGk")
    }
    async sendNotifecation(orderDetails:any){
        const adminId = '7427077349'
        try {
            await this.bot.telegram.sendMessage(adminId,orderDetails)
        } catch (error) {
            console.log(error);
        }
    }
    startBot(){
        this.bot.launch()
    }
}
