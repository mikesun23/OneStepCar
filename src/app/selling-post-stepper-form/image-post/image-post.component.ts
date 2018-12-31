import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-post',
  templateUrl: './image-post.component.html',
  styleUrls: ['./image-post.component.css']
})
export class ImagePostComponent implements OnInit {

  @ViewChild('imageInput') imageInput: any;
  @Output() submitedImageList = new EventEmitter<{}[]>();
  @Output() submitAllInputsStatus = new EventEmitter<boolean>();

  imageList: {}[] = [];

  // space properties:
  spaceLimit: number = 1000; // metadata, change this for the limit of total allowed space/storage
  countLimit: number = 35;   // metadata, total number of photos limit, in case ppl upload too many small photos.(length of imageList)

  totalCount: number = 0;
  totalSpace: number = 0;
  spacePercentage: number = 0;
  spacePercentageStr: string = '0%';

  // alert flags:
  spaceLimitHitFlag: boolean = false;
  countLimitHitFlag: boolean = false;
  invalidInputHitFlag: boolean = false;

  // image property
  maxWidth: number = 640;
  maxHeight: number = 480;
  enlargedImage: string = '';

  constructor() { }

  ngOnInit() {
  }

  updateSpacePercentageAndCountOfImages(n) {
    this.totalCount += n;
    let tmpSpacePercentage = this.spacePercentage;
    this.spacePercentage = this.totalSpace / 1000 / this.spaceLimit * 100;

    if (this.spacePercentage <= 100) {
      if (this.totalCount > this.countLimit) {
        this.countLimitHitFlag = true;
        this.totalCount -= n;
      } else {
        this.countLimitHitFlag = false;
      }
      this.spaceLimitHitFlag = false;
      this.spacePercentageStr = Math.round(this.spacePercentage).toString() + '%';


    } else {
      if (this.totalCount > this.countLimit) {
        this.countLimitHitFlag = true;
        this.totalCount -= n;
      } else {
        this.countLimitHitFlag = false;
      }
      this.spaceLimitHitFlag = true;
      this.spacePercentage = tmpSpacePercentage;
      this.spacePercentageStr = Math.round(this.spacePercentage).toString() + '%';
    }


  }

  enlargeImage(image) {
    this.enlargedImage = image;
  }

  detectFiles(event) {

    let files = event.target.files;
    if (files) {
      this.invalidInputHitFlag = false;
      for (let file of files) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = (e: any) => {

          // blob stuff
          let blob = new Blob([e.target.result]);
          let blobURL = window.URL.createObjectURL(blob);

          const image = new Image();
          image.src = blobURL;
          image.onload = async () => {

            let orientIndex: number;
            await this.getOrientation(file).then(n => {
              orientIndex = n as number;
            });
            // image object
            const name: string = file.name;
            const type: string = file.type;
            const resizedImage = this.processImage(image, orientIndex);
            const compressedSize: number = Math.round((resizedImage.length - resizedImage.split(',')[0].length) * 3 / 4);

            // console.log('length: ', resizedImage.length);
            // console.log('compressed size: ', compressedSize);
            // console.log('original size: ', file.size);
            const originalSize: number = file.size;

            const imageObj = { name: name, image: resizedImage, compressedSize: compressedSize, type: type, originalSize: originalSize };
            if (this.imageList.length <= 0) {

              let tmpTotalSpace = this.totalSpace;
              this.totalSpace += compressedSize;
              this.updateSpacePercentageAndCountOfImages(1);
              if (!this.spaceLimitHitFlag && !this.countLimitHitFlag) {
                this.imageList.push(imageObj)
              } else {
                this.totalSpace = tmpTotalSpace;
              }
            } else {
              let duplicate: boolean = false;
              for (let x of this.imageList) {
                if (x['image'] === imageObj['image']) {
                  duplicate = true;
                }
              }
              if (!duplicate) {
                let tmpTotalSpace = this.totalSpace;
                this.totalSpace += compressedSize;
                this.updateSpacePercentageAndCountOfImages(1);
                if (!this.spaceLimitHitFlag && !this.countLimitHitFlag) {
                  this.imageList.push(imageObj)
                } else {
                  this.totalSpace = tmpTotalSpace;
                }
              }
            }
          }
        }
      }
    } else {
      this.invalidInputHitFlag = true;
      console.log(this.invalidInputHitFlag);
    }
  }


  getOrientation(file: File) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {

        if (!event.target) {
          let error = new Error('event.target is undefined');
          reject(error);
        }

        const file = event.target as FileReader;
        const view = new DataView(file.result as ArrayBuffer);
        if (view.getUint16(0, false) != 0xFFD8) {
          resolve(-2)
        }

        const length = view.byteLength
        let offset = 2;

        while (offset < length) {
          if (view.getUint16(offset + 2, false) <= 8) resolve(-1);
          let marker = view.getUint16(offset, false);
          offset += 2;

          if (marker == 0xFFE1) {
            if (view.getUint32(offset += 2, false) != 0x45786966) {
              resolve(-1);
            }

            let little = view.getUint16(offset += 6, false) == 0x4949;
            offset += view.getUint32(offset + 4, little);
            let tags = view.getUint16(offset, little);
            offset += 2;
            for (let i = 0; i < tags; i++) {
              if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                resolve(view.getUint16(offset + (i * 12) + 8, little));
              }
            }
          } else if ((marker & 0xFF00) != 0xFF00) {
            break;
          }
          else {
            offset += view.getUint16(offset, false);
          }
        }
        resolve(-1);
      };

      reader.readAsArrayBuffer(file);
    });

  }


  processImage(image, n) {

    // create/set canvas to draw
    let canvas = document.createElement('canvas');

    let width = image.width;
    let height = image.height;

    //  resize the height and width under the limit with same ratio.
    if (width > height) {
      if (width > this.maxWidth) {
        height = Math.round(height *= this.maxWidth / width);
        width = this.maxWidth;
      }
    } else {
      if (height > this.maxHeight) {
        //width *= this.maxHeight / height;
        width = Math.round(width *= this.maxHeight / height);
        height = this.maxHeight;
      }
    }

    if (4 < n && n < 9) {
      canvas.width = height;
      canvas.height = width;
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    let ctx = canvas.getContext("2d");

    // transform context before drawing image
    switch (n) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height, width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: break;
    }


    ctx.drawImage(image, 0, 0, width, height);


    return canvas.toDataURL("image/jpeg", 0.7);

  }

  removeAll() {
    this.imageInput.nativeElement.value = '';
    this.imageList = [];
    this.totalSpace = 0;
    this.updateSpacePercentageAndCountOfImages(-this.countLimit);
  }

  removeOne(index) {
    this.imageInput.nativeElement.value = '';

    let removedItem = this.imageList[index];
    this.imageList.splice(index, 1);
    this.totalSpace -= removedItem['compressedSize'];
    this.updateSpacePercentageAndCountOfImages(-1);
  }

  moveup(index) {
    if (index - 1 >= 0) {
      // insert the item at the target position
      this.imageList.splice(index - 1, 0, this.imageList[index]);
      // remove the old duplicated element from the list
      this.imageList.splice(index + 1, 1);
    }
  }

  movedown(index) {
    if (index + 1 < this.imageList.length) {
      // move 1 down is like moving the item below it up, so moveup(index + 1)
      this.moveup(index + 1);
    }
  }

  onSubmit(inputsStatusFlag) {
    // console.log(this.imageList);
    this.submitedImageList.emit(this.imageList);
  }

}


/**
 * TODO: 
 * 1. popup image for preview:                                    Done
 * 2. limit or convert the format of intake image                 May not need, have tested .png sideway img, successfully fixed
 * 3. submission
 * 4. preview/default table between buttons                       Done
 * 5. process bar                                                 Done
 * 
 * 6. begining state: disable 'submit button', enable 'add photo button' Done
 * 7. ending state: disable 'add photo button' when limit is readched, enable 'submit button' Done
 * 
 * medium priority:
 * notifications: 1. duplicated img; 2. space limit reached(Done); 3. 
 * 
 * 
 */