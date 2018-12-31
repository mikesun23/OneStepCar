import { map, filter } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarMakesDataService {

  constructor(private db: AngularFireDatabase) {

  }

  getAll() {
    return this.db.object('/AllCarMakesData/bmw').valueChanges();
  }

  getFullTree(make: string) {
    if (make.toLowerCase() !== 'bmw') return;

    return this.db.list('/AllCarMakesData/bmw/bmw').snapshotChanges()
      .pipe(
        map(data => { // the full data list
          let result: {} = {};
          data.map(model => { // each model or series
            const key = model.payload.key; // series_key

            const series = model.payload.val();
            const value = {};

            Object.keys(series).forEach(m => {
              const year = series[m];
              value[m] = Object.keys(year);
            })

            result[key] = value;
            
          })
          return result;
        })
      )
  }

  getModelListWithMake(make: string) {
    if (make.toLowerCase() !== 'bmw') return;

    return this.db.list('/AllCarMakesData/bmw/bmw').snapshotChanges()
      .pipe(
        map(models => {
          return models.map(a => a.payload.key);
        })
      )

  }

  getYearTrimListWithMakeModelYear(make: string, model: string, year: string) {
    if (make.toLowerCase() !== 'bmw') return;

    return this.db.list('/AllCarMakesData/bmw/bmw/' + model + '/' + year).snapshotChanges()
      .pipe(
        map(trimList => {
          return trimList.map(t => t.payload.key);
        })
      )
  }

  getModelListWithYearAndMake(make: string, year: string) {
    if (make.toLowerCase() !== 'bmw') return;


    return this.db.list('/AllCarMakesData/bmw/bmw').snapshotChanges()
      .pipe(
        map(series => {
          return series
            .map(a => {
              if (a.payload.val()[year] !== undefined) {
                const key = a.payload.key;
                const data = a.payload.val()[year];
                return { key, data }
              }
            })
            .filter(a => a !== undefined)
        })
      )
  }



  getPackageListByMakeModelYearTrim(make: string, model: string, year: string, trim: string) {
    if (make.toLowerCase() !== 'bmw') return;
    return this.db.list('/AllCarMakesData/bmw/bmw/' + model.toLocaleLowerCase() + '/' + year + '/' + trim + '/packages')
      .snapshotChanges()
      .pipe(
        map(packages => {
          return packages.map(a => a.payload.val())
        })
      )
  }
}
