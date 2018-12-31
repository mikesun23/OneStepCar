
export class imageUploadObject {
  $key: string;
  name: string;
  url: string;

  post_id: string;
  

  imageList: string[];
  constructor(imageList: string[]) {
    this.imageList = imageList;
  }
}