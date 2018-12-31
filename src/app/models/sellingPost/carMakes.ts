export class CarMakes {
  carMakes = {
    BMW: {
      brand: 'BMW',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
      topPhoto: 'https://images.wallpaperscraft.com/image/bmw_m4_gts_f82_silver_rear_view_105645_1920x1080.jpg',
      feelingHint: 'Yeah! BMW all the way!',
      yearRange: { start: 1995, end: 2018 },
      yearArray: []
    },
    // Porsche: {
    //   brand: 'Porsche',
    //   logo: 'https://www.logolynx.com/images/logolynx/31/314057a00b5fdd76fa126d92a344ec22.png',
    //   topPhoto: 'https://hdqwalls.com/download/porsche-911-gt3-rs-2018-rear-vs-1920x1080.jpg',
    //   feelingHint: 'Nurburgring king is here!',
    //   yearRange: { start: 1990, end: 2018 },
    //   yearArray: []



    // },
    // Audi: {
    //   brand: 'Audi',
    //   logo: 'https://www.logolynx.com/images/logolynx/fa/faec621f230e682199f3e60907219b28.jpeg',
    //   topPhoto: 'https://images.wallpaperscraft.com/image/audi_rs7_red_side_view_mountain_100460_1920x1080.jpg',
    //   feelingHint: 'Quatro makes it a missile!',
    //   yearRange: { start: 1960, end: 2018 },
    //   yearArray: []


    // },
    // MercedesBenz: {
    //   brand: 'MercedesBenz',
    //   logo: 'https://www.logolynx.com/images/logolynx/55/55d838012d1b17d7c52cac24a659866a.jpeg',
    //   topPhoto: 'https://images.caricos.com/m/mercedes-benz/2015_mercedes-benz_s600/images/1920x1080/2015_mercedes-benz_s600_1_1920x1080.jpg',
    //   feelingHint: 'Luxury and AMG, two soul!',
    //   yearRange: { start: 1920, end: 2018 },
    //   yearArray: []


    // }
  };

  constructor() {
    Object.values(this.carMakes).map(make => {
      let tmpYearArray: number[] = [];
      for (let i = make.yearRange.start; i < make.yearRange.end + 1; i++) {
        tmpYearArray.push(i);
      }
      make.yearArray = tmpYearArray;
      return make;
    })
  }

  getMakes() {
    return this.carMakes;
  }


}