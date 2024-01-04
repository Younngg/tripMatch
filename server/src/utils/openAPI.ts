import request from 'request';
import 'dotenv/config';
import { Festival, Stay } from '../interfaces';

export default function openAPI(eventStartDate?: string): Promise<[]> {
  return new Promise((res, rej) => {
    request(
      {
        uri: `http://apis.data.go.kr/B551011/KorService1/${
          eventStartDate ? 'searchFestival1' : 'searchStay1'
        }?numOfRows=20&MobileOS=ETC&MobileApp=AppTest&serviceKey=${
          process.env.SERVICE_KEY
        }&_type=json&arrange=${
          eventStartDate ? 'C&eventStartDate=' + eventStartDate : 'R'
        }`,
        method: 'GET',
        json: true,
      },
      (error: any, response: request.Response) => {
        if (error) rej(error);
        else {
          console.log(response.body);
          res(
            response.body.response.body.items.item.map(
              eventStartDate
                ? (obj: Festival) => ({
                    addr1: obj.addr1,
                    eventstartdate: obj.eventstartdate,
                    eventenddate: obj.eventenddate,
                    firstimage: obj.firstimage,
                    tel: obj.tel,
                    title: obj.title,
                  })
                : (obj: Stay) => ({
                    addr1: obj.addr1,
                    firstimage: obj.firstimage,
                    goodstay: obj.goodstay,
                    tel: obj.tel,
                    title: obj.title,
                  })
            )
          );
        }
      }
    );
  });
}
