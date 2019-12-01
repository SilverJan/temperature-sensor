import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-ai-test',
  templateUrl: './ai-test.component.html',
  styleUrls: ['./ai-test.component.scss']
})
export class AiTestComponent implements OnInit, AfterViewInit {

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;

  public predictions: Array<any>;

  public model: any

  public constructor() {
    this.captures = [];
    this.predictions = [];
  }

  public ngOnInit() {
    this.loadModel()
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public async loadModel()  {
    // Load the model.
    this.model = await mobilenet.load();
  }

  public capture() {
    this.canvas.nativeElement.getContext("2d")
      .drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));

    this.predict()
  }

  public async predict() {
    var img = new Image;
    img.src = this.captures[this.captures.length];
    img.height = 480
    img.width = 640

    // Classify the image
    this.predictions = await this.model.classify(img)
    // this.model.classify(img).then(value => {
    //   console.log(value)
    // }).catch((err => {
    //   console.error(err)
    // }))
    console.log(this.predictions)
  }

}
