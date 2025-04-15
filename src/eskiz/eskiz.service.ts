import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EskizService {
async sendSMS(phone:string,message:string){
  try {
    const responce = await axios.post("https://notify.eskiz.uz/api/message/sms/send",{
      mobilePhone:phone,
      message,
      from: '4546'
    })
  } catch (error) {
    
  }
}
}
